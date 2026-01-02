<?php

namespace App\Services\Calculators;

use App\Models\StateTaxBenefit;
use App\Services\VaDisabilityCompensationService;

class DisabilityImpactCalculator
{
    public function __construct(
        private VaDisabilityCompensationService $compensationService = new VaDisabilityCompensationService
    ) {}

    /**
     * @param array{
     *   disability_rating: int,
     *   has_spouse?: bool,
     *   children_count?: int,
     *   state?: string,
     *   home_value?: float,
     * } $inputs
     */
    public function calculate(array $inputs): array
    {
        $rating = (int) $inputs['disability_rating'];
        $hasSpouse = (bool) ($inputs['has_spouse'] ?? false);
        $childrenCount = (int) ($inputs['children_count'] ?? 0);
        $state = isset($inputs['state']) ? strtoupper($inputs['state']) : null;
        $homeValue = (float) ($inputs['home_value'] ?? 0);

        // Normalize rating to nearest 10%
        $normalizedRating = $this->compensationService->normalizeRating($rating);

        // Get base rate (no dependents) for display
        $baseMonthlyCompensation = $this->compensationService->getBaseRate($normalizedRating);

        // Get total compensation with dependents
        $totalMonthly = $this->compensationService->getMonthlyCompensation(
            $normalizedRating,
            $hasSpouse,
            $childrenCount
        );

        // Calculate dependent addition for display
        $dependentAddition = $totalMonthly - $baseMonthlyCompensation;

        $annualCompensation = $totalMonthly * 12;

        // Get state-specific benefits
        $stateBenefits = $this->getStateBenefits($state, $normalizedRating, $homeValue);

        // Calculate total annual benefit
        $totalAnnualBenefit = $annualCompensation + ($stateBenefits['annual_property_tax_savings'] ?? 0);

        return [
            'disability_rating' => $normalizedRating,
            'base_monthly_compensation' => round($baseMonthlyCompensation, 2),
            'dependent_addition' => round($dependentAddition, 2),
            'total_monthly_compensation' => round($totalMonthly, 2),
            'annual_compensation' => round($annualCompensation, 2),
            'is_tax_free' => true,
            'state' => $state,
            'state_benefits' => $stateBenefits,
            'total_annual_benefit' => round($totalAnnualBenefit, 2),
            'additional_benefits' => $this->getAdditionalBenefits($normalizedRating),
        ];
    }

    private function getStateBenefits(?string $state, int $rating, float $homeValue): array
    {
        if (! $state) {
            return [
                'income_tax_exempt' => true, // VA disability is always federal tax-free
                'property_tax_exemption' => null,
                'annual_property_tax_savings' => 0,
                'notes' => 'Select a state to see state-specific benefits.',
            ];
        }

        $benefits = StateTaxBenefit::getBenefitsForState($state);

        if (! $benefits) {
            return [
                'income_tax_exempt' => true,
                'state_income_tax_exempt' => null,
                'property_tax_exemption' => null,
                'annual_property_tax_savings' => 0,
                'notes' => 'State benefit data not available.',
            ];
        }

        $propertyTaxSavings = 0;
        $propertyTaxExemption = null;

        if ($benefits->qualifiesForPropertyTaxExemption($rating) && $homeValue > 0) {
            $propertyTaxExemption = $benefits->getPropertyTaxExemptionDescription();

            // Estimate savings (using average 1.1% property tax rate)
            $annualPropertyTax = $homeValue * 0.011;

            switch ($benefits->property_tax_exemption_type) {
                case 'full':
                    $propertyTaxSavings = $annualPropertyTax;
                    break;
                case 'partial':
                    $propertyTaxSavings = min($benefits->property_tax_exemption_amount, $annualPropertyTax);
                    break;
                case 'percentage':
                    $propertyTaxSavings = $annualPropertyTax * ($benefits->property_tax_exemption_amount / 100);
                    break;
            }
        }

        return [
            'income_tax_exempt' => true, // Federal always tax-free
            'state_income_tax_exempt' => $benefits->income_tax_exempt,
            'property_tax_exemption' => $propertyTaxExemption,
            'property_tax_min_rating' => $benefits->property_tax_min_rating,
            'qualifies_for_property_exemption' => $benefits->qualifiesForPropertyTaxExemption($rating),
            'annual_property_tax_savings' => round($propertyTaxSavings, 2),
            'notes' => $benefits->notes,
        ];
    }

    private function getAdditionalBenefits(int $rating): array
    {
        $benefits = [
            'va_healthcare' => $rating >= 10,
            'education_benefits' => $rating >= 10,
            'vocational_rehabilitation' => $rating >= 10,
        ];

        if ($rating >= 30) {
            $benefits['dependent_education'] = true;
        }

        if ($rating >= 100) {
            $benefits['dental_care'] = true;
            $benefits['champ_va'] = true;
            $benefits['commissary_access'] = true;
        }

        return $benefits;
    }
}
