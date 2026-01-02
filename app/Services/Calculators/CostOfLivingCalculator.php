<?php

namespace App\Services\Calculators;

use App\Models\BahRate;
use App\Models\CostOfLivingData;

/**
 * Cost of Living Calculator
 *
 * Data Sources:
 * - MERIC (Missouri Economic Research and Information Center) Q3 2025
 *   URL: https://meric.mo.gov/data/cost-living-data-series
 *   Categories: grocery, housing, utilities, transportation, health, misc
 *
 * - WalletHub Tax Burden by State 2025
 *   URL: https://wallethub.com/edu/states-with-highest-lowest-tax-burden/20494
 *   Category: taxes (as % of personal income, converted to index where 100 = 8.82% average)
 */
class CostOfLivingCalculator
{
    private const CATEGORIES = ['grocery', 'housing', 'utilities', 'transportation', 'health', 'misc', 'taxes'];

    /**
     * Q3 2025 data from MERIC + WalletHub tax burden
     * Index values where 100 = national average
     */
    private const DEFAULT_INDICES = [
        'AL' => ['grocery' => 97.7, 'housing' => 71.1, 'utilities' => 97.1, 'transportation' => 88.5, 'health' => 88.6, 'misc' => 94.8, 'taxes' => 90.6],
        'AK' => ['grocery' => 124.4, 'housing' => 126.1, 'utilities' => 155.5, 'transportation' => 120.0, 'health' => 142.6, 'misc' => 123.8, 'taxes' => 55.9],
        'AZ' => ['grocery' => 100.4, 'housing' => 125.3, 'utilities' => 101.2, 'transportation' => 100.2, 'health' => 93.6, 'misc' => 105.2, 'taxes' => 93.2],
        'AR' => ['grocery' => 92.3, 'housing' => 77.9, 'utilities' => 95.7, 'transportation' => 88.6, 'health' => 85.8, 'misc' => 96.4, 'taxes' => 97.6],
        'CA' => ['grocery' => 107.5, 'housing' => 181.8, 'utilities' => 144.9, 'transportation' => 136.2, 'health' => 104.1, 'misc' => 115.3, 'taxes' => 124.7],
        'CO' => ['grocery' => 100.9, 'housing' => 106.8, 'utilities' => 87.8, 'transportation' => 97.9, 'health' => 105.4, 'misc' => 104.4, 'taxes' => 99.0],
        'CT' => ['grocery' => 107.0, 'housing' => 124.1, 'utilities' => 125.0, 'transportation' => 103.9, 'health' => 113.4, 'misc' => 109.1, 'taxes' => 112.2],
        'DE' => ['grocery' => 103.8, 'housing' => 102.1, 'utilities' => 97.1, 'transportation' => 100.0, 'health' => 103.3, 'misc' => 104.8, 'taxes' => 73.9],
        'FL' => ['grocery' => 105.7, 'housing' => 99.1, 'utilities' => 96.6, 'transportation' => 94.9, 'health' => 94.0, 'misc' => 99.7, 'taxes' => 73.6],
        'GA' => ['grocery' => 97.8, 'housing' => 78.8, 'utilities' => 99.5, 'transportation' => 94.0, 'health' => 97.2, 'misc' => 96.7, 'taxes' => 96.0],
        'HI' => ['grocery' => 130.5, 'housing' => 298.6, 'utilities' => 185.3, 'transportation' => 137.8, 'health' => 128.1, 'misc' => 120.1, 'taxes' => 157.8],
        'ID' => ['grocery' => 96.9, 'housing' => 102.3, 'utilities' => 70.5, 'transportation' => 109.2, 'health' => 105.0, 'misc' => 100.6, 'taxes' => 85.5],
        'IL' => ['grocery' => 100.9, 'housing' => 84.9, 'utilities' => 100.2, 'transportation' => 103.8, 'health' => 102.0, 'misc' => 99.1, 'taxes' => 115.9],
        'IN' => ['grocery' => 99.7, 'housing' => 76.2, 'utilities' => 96.1, 'transportation' => 98.6, 'health' => 100.7, 'misc' => 93.6, 'taxes' => 103.1],
        'IA' => ['grocery' => 97.9, 'housing' => 77.2, 'utilities' => 87.2, 'transportation' => 101.3, 'health' => 96.7, 'misc' => 94.9, 'taxes' => 104.6],
        'KS' => ['grocery' => 95.5, 'housing' => 77.5, 'utilities' => 97.7, 'transportation' => 92.3, 'health' => 93.2, 'misc' => 91.6, 'taxes' => 105.8],
        'KY' => ['grocery' => 99.7, 'housing' => 75.0, 'utilities' => 88.4, 'transportation' => 96.6, 'health' => 92.9, 'misc' => 102.0, 'taxes' => 101.2],
        'LA' => ['grocery' => 95.9, 'housing' => 84.1, 'utilities' => 84.8, 'transportation' => 96.0, 'health' => 92.3, 'misc' => 99.5, 'taxes' => 101.4],
        'ME' => ['grocery' => 102.4, 'housing' => 139.6, 'utilities' => 119.4, 'transportation' => 102.1, 'health' => 114.9, 'misc' => 100.4, 'taxes' => 120.6],
        'MD' => ['grocery' => 107.0, 'housing' => 147.5, 'utilities' => 113.4, 'transportation' => 100.0, 'health' => 108.2, 'misc' => 108.3, 'taxes' => 113.8],
        'MA' => ['grocery' => 102.4, 'housing' => 232.9, 'utilities' => 155.4, 'transportation' => 105.9, 'health' => 133.9, 'misc' => 117.3, 'taxes' => 108.5],
        'MI' => ['grocery' => 99.1, 'housing' => 85.4, 'utilities' => 97.0, 'transportation' => 98.9, 'health' => 97.7, 'misc' => 98.4, 'taxes' => 93.5],
        'MN' => ['grocery' => 100.5, 'housing' => 80.6, 'utilities' => 96.1, 'transportation' => 96.6, 'health' => 103.9, 'misc' => 100.1, 'taxes' => 110.2],
        'MS' => ['grocery' => 94.3, 'housing' => 70.2, 'utilities' => 88.9, 'transportation' => 86.9, 'health' => 93.6, 'misc' => 91.7, 'taxes' => 102.7],
        'MO' => ['grocery' => 95.2, 'housing' => 77.8, 'utilities' => 91.3, 'transportation' => 85.9, 'health' => 96.6, 'misc' => 94.8, 'taxes' => 88.8],
        'MT' => ['grocery' => 100.2, 'housing' => 123.3, 'utilities' => 83.6, 'transportation' => 106.0, 'health' => 111.4, 'misc' => 110.2, 'taxes' => 89.2],
        'NE' => ['grocery' => 98.2, 'housing' => 79.0, 'utilities' => 88.9, 'transportation' => 91.7, 'health' => 100.9, 'misc' => 98.4, 'taxes' => 99.5],
        'NV' => ['grocery' => 101.8, 'housing' => 108.0, 'utilities' => 82.8, 'transportation' => 117.1, 'health' => 89.5, 'misc' => 89.8, 'taxes' => 97.7],
        'NH' => ['grocery' => 99.8, 'housing' => 113.9, 'utilities' => 113.0, 'transportation' => 103.8, 'health' => 106.1, 'misc' => 110.4, 'taxes' => 67.3],
        'NJ' => ['grocery' => 104.4, 'housing' => 139.6, 'utilities' => 102.1, 'transportation' => 103.9, 'health' => 113.7, 'misc' => 104.4, 'taxes' => 116.8],
        'NM' => ['grocery' => 96.4, 'housing' => 85.6, 'utilities' => 83.7, 'transportation' => 92.3, 'health' => 101.4, 'misc' => 97.4, 'taxes' => 109.1],
        'NY' => ['grocery' => 103.5, 'housing' => 178.6, 'utilities' => 104.4, 'transportation' => 105.8, 'health' => 112.9, 'misc' => 106.7, 'taxes' => 153.7],
        'NC' => ['grocery' => 100.3, 'housing' => 92.2, 'utilities' => 94.4, 'transportation' => 93.2, 'health' => 107.1, 'misc' => 101.0, 'taxes' => 92.7],
        'ND' => ['grocery' => 94.3, 'housing' => 76.5, 'utilities' => 81.1, 'transportation' => 98.5, 'health' => 109.2, 'misc' => 100.4, 'taxes' => 74.9],
        'OH' => ['grocery' => 98.7, 'housing' => 84.4, 'utilities' => 100.3, 'transportation' => 93.2, 'health' => 90.7, 'misc' => 95.5, 'taxes' => 106.1],
        'OK' => ['grocery' => 94.7, 'housing' => 67.9, 'utilities' => 98.6, 'transportation' => 87.7, 'health' => 93.1, 'misc' => 87.9, 'taxes' => 79.5],
        'OR' => ['grocery' => 106.7, 'housing' => 122.4, 'utilities' => 96.6, 'transportation' => 126.3, 'health' => 116.5, 'misc' => 104.6, 'taxes' => 102.7],
        'PA' => ['grocery' => 100.0, 'housing' => 87.0, 'utilities' => 108.8, 'transportation' => 104.3, 'health' => 94.4, 'misc' => 99.7, 'taxes' => 97.3],
        'RI' => ['grocery' => 105.6, 'housing' => 120.4, 'utilities' => 127.8, 'transportation' => 102.5, 'health' => 103.5, 'misc' => 111.8, 'taxes' => 114.3],
        'SC' => ['grocery' => 100.0, 'housing' => 79.8, 'utilities' => 96.0, 'transportation' => 95.5, 'health' => 93.2, 'misc' => 98.1, 'taxes' => 92.4],
        'SD' => ['grocery' => 97.2, 'housing' => 84.9, 'utilities' => 85.8, 'transportation' => 95.2, 'health' => 110.1, 'misc' => 93.1, 'taxes' => 73.2],
        'TN' => ['grocery' => 96.8, 'housing' => 83.0, 'utilities' => 87.7, 'transportation' => 87.6, 'health' => 87.7, 'misc' => 95.2, 'taxes' => 72.3],
        'TX' => ['grocery' => 94.6, 'housing' => 78.7, 'utilities' => 101.9, 'transportation' => 92.5, 'health' => 96.1, 'misc' => 95.2, 'taxes' => 88.1],
        'UT' => ['grocery' => 95.7, 'housing' => 107.6, 'utilities' => 82.7, 'transportation' => 104.7, 'health' => 89.7, 'misc' => 97.5, 'taxes' => 107.3],
        'VT' => ['grocery' => 107.6, 'housing' => 128.7, 'utilities' => 113.4, 'transportation' => 104.1, 'health' => 113.0, 'misc' => 106.7, 'taxes' => 130.7],
        'VA' => ['grocery' => 100.6, 'housing' => 99.7, 'utilities' => 98.4, 'transportation' => 99.2, 'health' => 103.9, 'misc' => 100.3, 'taxes' => 100.5],
        'WA' => ['grocery' => 106.5, 'housing' => 120.1, 'utilities' => 99.5, 'transportation' => 130.4, 'health' => 114.1, 'misc' => 111.3, 'taxes' => 97.6],
        'WV' => ['grocery' => 96.1, 'housing' => 70.8, 'utilities' => 89.2, 'transportation' => 97.7, 'health' => 91.1, 'misc' => 95.8, 'taxes' => 100.3],
        'WI' => ['grocery' => 100.1, 'housing' => 97.8, 'utilities' => 89.2, 'transportation' => 97.4, 'health' => 102.3, 'misc' => 98.2, 'taxes' => 94.2],
        'WY' => ['grocery' => 99.8, 'housing' => 87.2, 'utilities' => 101.3, 'transportation' => 93.3, 'health' => 101.3, 'misc' => 98.2, 'taxes' => 65.6],
        'DC' => ['grocery' => 106.5, 'housing' => 199.4, 'utilities' => 104.6, 'transportation' => 103.6, 'health' => 122.8, 'misc' => 112.2, 'taxes' => 107.7],
    ];

    /**
     * @param array{
     *   from_state: string,
     *   to_state: string,
     *   current_salary?: float,
     *   is_military?: bool,
     *   zip_code?: string,
     *   pay_grade?: string,
     *   has_dependents?: bool,
     * } $inputs
     */
    public function calculate(array $inputs): array
    {
        $fromState = strtoupper($inputs['from_state']);
        $toState = strtoupper($inputs['to_state']);
        $currentSalary = (float) ($inputs['current_salary'] ?? 0);
        $isMilitary = (bool) ($inputs['is_military'] ?? false);
        $zipCode = $inputs['zip_code'] ?? null;
        $payGrade = $inputs['pay_grade'] ?? null;
        $hasDependents = (bool) ($inputs['has_dependents'] ?? false);

        // Get state comparison data
        $comparison = $this->getStateComparison($fromState, $toState);

        // Calculate overall index difference
        $fromOverall = $this->calculateOverallIndex($fromState);
        $toOverall = $this->calculateOverallIndex($toState);
        $overallDifference = round($toOverall - $fromOverall, 2);
        $overallPercentChange = $fromOverall > 0 ? round((($toOverall - $fromOverall) / $fromOverall) * 100, 2) : 0;

        // Calculate equivalent salary
        $equivalentSalary = null;
        if ($currentSalary > 0) {
            $equivalentSalary = round($currentSalary * ($toOverall / $fromOverall), 2);
        }

        // Get BAH rates if military
        $bahComparison = null;
        if ($isMilitary && $zipCode && $payGrade) {
            $bahComparison = $this->getBahComparison($zipCode, $payGrade, $hasDependents, $fromState, $toState);
        }

        return [
            'from_state' => $fromState,
            'to_state' => $toState,
            'from_overall_index' => $fromOverall,
            'to_overall_index' => $toOverall,
            'overall_difference' => $overallDifference,
            'overall_percent_change' => $overallPercentChange,
            'category_comparison' => $comparison,
            'current_salary' => $currentSalary,
            'equivalent_salary' => $equivalentSalary,
            'salary_adjustment' => $equivalentSalary ? round($equivalentSalary - $currentSalary, 2) : null,
            'bah_comparison' => $bahComparison,
            'cost_difference_description' => $this->getCostDifferenceDescription($overallPercentChange),
        ];
    }

    private function getStateComparison(string $fromState, string $toState): array
    {
        $comparison = [];

        foreach (self::CATEGORIES as $category) {
            $fromIndex = $this->getIndex($fromState, $category);
            $toIndex = $this->getIndex($toState, $category);

            $comparison[$category] = [
                'from_index' => $fromIndex,
                'to_index' => $toIndex,
                'difference' => round($toIndex - $fromIndex, 2),
                'percent_change' => $fromIndex > 0 ? round((($toIndex - $fromIndex) / $fromIndex) * 100, 2) : 0,
            ];
        }

        return $comparison;
    }

    private function getIndex(string $state, string $category): float
    {
        // Try to get from database first
        $data = CostOfLivingData::forState($state)
            ->forCategory($category)
            ->forYear(now()->year)
            ->first();

        if ($data) {
            return (float) $data->index;
        }

        // Fall back to default data
        return self::DEFAULT_INDICES[$state][$category] ?? 100;
    }

    private function calculateOverallIndex(string $state): float
    {
        $weights = [
            'grocery' => 0.10,
            'housing' => 0.28,
            'utilities' => 0.08,
            'transportation' => 0.12,
            'health' => 0.05,
            'misc' => 0.12,
            'taxes' => 0.25,
        ];

        $weightedSum = 0;
        foreach (self::CATEGORIES as $category) {
            $index = $this->getIndex($state, $category);
            $weightedSum += $index * $weights[$category];
        }

        return round($weightedSum, 2);
    }

    private function getBahComparison(?string $zipCode, string $payGrade, bool $hasDependents, string $fromState, string $toState): ?array
    {
        $currentRate = BahRate::getRateForLocation($zipCode, $payGrade, $hasDependents);

        if (! $currentRate) {
            return null;
        }

        return [
            'current_rate' => $currentRate,
            'note' => 'BAH rates vary by specific location. Contact your finance office for exact rates at your new duty station.',
        ];
    }

    private function getCostDifferenceDescription(float $percentChange): string
    {
        if ($percentChange > 20) {
            return 'Significantly more expensive';
        } elseif ($percentChange > 10) {
            return 'Moderately more expensive';
        } elseif ($percentChange > 0) {
            return 'Slightly more expensive';
        } elseif ($percentChange > -10) {
            return 'Slightly less expensive';
        } elseif ($percentChange > -20) {
            return 'Moderately less expensive';
        }

        return 'Significantly less expensive';
    }
}
