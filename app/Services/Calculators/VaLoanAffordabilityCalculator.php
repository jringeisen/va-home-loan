<?php

namespace App\Services\Calculators;

use App\Services\VaDisabilityCompensationService;

class VaLoanAffordabilityCalculator
{
    private const MAX_DTI_RATIO = 0.41; // VA allows up to 41% DTI
    private const PROPERTY_TAX_RATE = 0.011; // 1.1% average
    private const HOME_INSURANCE_RATE = 0.0035; // 0.35% of home value

    /**
     * VA Funding Fee rates for first-time use.
     * Key format: down_payment_percentage => fee_rate
     */
    private const FUNDING_FEE_FIRST_USE = [
        0 => 0.0215,    // 0% down = 2.15%
        5 => 0.015,     // 5%+ down = 1.5%
        10 => 0.0125,   // 10%+ down = 1.25%
    ];

    /**
     * VA Funding Fee rates for subsequent use.
     */
    private const FUNDING_FEE_SUBSEQUENT_USE = [
        0 => 0.033,     // 0% down = 3.3%
        5 => 0.015,     // 5%+ down = 1.5%
        10 => 0.0125,   // 10%+ down = 1.25%
    ];

    public function __construct(
        private VaDisabilityCompensationService $compensationService = new VaDisabilityCompensationService
    ) {}

    /**
     * @param array{
     *   annual_income: float,
     *   monthly_debts: float,
     *   down_payment: float,
     *   interest_rate: float,
     *   loan_term_years?: int,
     *   is_first_use?: bool,
     *   disability_rating?: int,
     *   disability_dependents?: int,
     *   property_tax_rate?: float,
     *   home_insurance_rate?: float,
     * } $inputs
     * @return array{
     *   max_purchase_price: float,
     *   max_loan_amount: float,
     *   monthly_payment: float,
     *   monthly_principal_interest: float,
     *   monthly_taxes: float,
     *   monthly_insurance: float,
     *   funding_fee: float,
     *   funding_fee_financed: float,
     *   dti_ratio: float,
     *   max_monthly_housing: float,
     *   disability_income: float,
     *   total_monthly_income: float,
     * }
     */
    public function calculate(array $inputs): array
    {
        $annualIncome = (float) $inputs['annual_income'];
        $monthlyDebts = (float) $inputs['monthly_debts'];
        $downPayment = (float) $inputs['down_payment'];
        $interestRate = (float) $inputs['interest_rate'] / 100; // Convert from percentage
        $loanTermYears = (int) ($inputs['loan_term_years'] ?? 30);
        $isFirstUse = (bool) ($inputs['is_first_use'] ?? true);
        $disabilityRating = (int) ($inputs['disability_rating'] ?? 0);
        $disabilityDependents = (int) ($inputs['disability_dependents'] ?? 0);
        $propertyTaxRate = (float) ($inputs['property_tax_rate'] ?? self::PROPERTY_TAX_RATE);
        $homeInsuranceRate = (float) ($inputs['home_insurance_rate'] ?? self::HOME_INSURANCE_RATE);

        // Calculate disability income using shared service
        $monthlyDisabilityIncome = $this->compensationService->getMonthlyCompensationByDependents(
            $disabilityRating,
            $disabilityDependents
        );

        // Determine if veteran is exempt from funding fee (10%+ service-connected)
        $isDisabledVeteran = $this->compensationService->isExemptFromFundingFee($disabilityRating);

        // Total monthly income (employment + disability)
        $monthlyEmploymentIncome = $annualIncome / 12;
        $totalMonthlyIncome = $monthlyEmploymentIncome + $monthlyDisabilityIncome;

        $maxMonthlyHousing = ($totalMonthlyIncome * self::MAX_DTI_RATIO) - $monthlyDebts;

        if ($maxMonthlyHousing <= 0) {
            return $this->formatZeroResult();
        }

        // Calculate max home price iteratively (taxes and insurance depend on home value)
        $maxPurchasePrice = $this->calculateMaxPurchasePrice(
            $maxMonthlyHousing,
            $downPayment,
            $interestRate,
            $loanTermYears,
            $propertyTaxRate,
            $homeInsuranceRate,
            $isFirstUse,
            $isDisabledVeteran
        );

        $loanAmount = $maxPurchasePrice - $downPayment;

        // Calculate funding fee
        $downPaymentPercent = $maxPurchasePrice > 0 ? ($downPayment / $maxPurchasePrice) * 100 : 0;
        $fundingFeeRate = $this->getFundingFeeRate($downPaymentPercent, $isFirstUse, $isDisabledVeteran);
        $fundingFee = $loanAmount * $fundingFeeRate;

        // Total loan with funding fee financed
        $totalLoanAmount = $loanAmount + $fundingFee;

        // Monthly P&I on total loan
        $monthlyPI = $this->calculateMonthlyPayment($totalLoanAmount, $interestRate, $loanTermYears);

        // Monthly taxes and insurance
        $monthlyTaxes = ($maxPurchasePrice * $propertyTaxRate) / 12;
        $monthlyInsurance = ($maxPurchasePrice * $homeInsuranceRate) / 12;

        $totalMonthlyPayment = $monthlyPI + $monthlyTaxes + $monthlyInsurance;
        $actualDTI = $totalMonthlyIncome > 0 ? ($totalMonthlyPayment + $monthlyDebts) / $totalMonthlyIncome : 0;

        return [
            'max_purchase_price' => round($maxPurchasePrice, 2),
            'max_loan_amount' => round($loanAmount, 2),
            'monthly_payment' => round($totalMonthlyPayment, 2),
            'monthly_principal_interest' => round($monthlyPI, 2),
            'monthly_taxes' => round($monthlyTaxes, 2),
            'monthly_insurance' => round($monthlyInsurance, 2),
            'funding_fee' => round($fundingFee, 2),
            'funding_fee_financed' => round($totalLoanAmount, 2),
            'dti_ratio' => round($actualDTI * 100, 2),
            'max_monthly_housing' => round($maxMonthlyHousing, 2),
            'no_pmi' => true, // VA loans never have PMI
            'disability_income' => round($monthlyDisabilityIncome, 2),
            'total_monthly_income' => round($totalMonthlyIncome, 2),
            'funding_fee_exempt' => $isDisabledVeteran,
        ];
    }

    private function calculateMaxPurchasePrice(
        float $maxMonthlyPayment,
        float $downPayment,
        float $interestRate,
        int $loanTermYears,
        float $propertyTaxRate,
        float $homeInsuranceRate,
        bool $isFirstUse,
        bool $isDisabledVeteran
    ): float {
        // Binary search for max purchase price
        $low = 0;
        $high = 2000000; // $2M max for calculation
        $tolerance = 100; // $100 tolerance

        while ($high - $low > $tolerance) {
            $mid = ($low + $high) / 2;

            $loanAmount = $mid - $downPayment;
            if ($loanAmount <= 0) {
                $low = $mid;
                continue;
            }

            $downPaymentPercent = ($downPayment / $mid) * 100;
            $fundingFeeRate = $this->getFundingFeeRate($downPaymentPercent, $isFirstUse, $isDisabledVeteran);
            $fundingFee = $loanAmount * $fundingFeeRate;
            $totalLoan = $loanAmount + $fundingFee;

            $monthlyPI = $this->calculateMonthlyPayment($totalLoan, $interestRate, $loanTermYears);
            $monthlyTaxes = ($mid * $propertyTaxRate) / 12;
            $monthlyInsurance = ($mid * $homeInsuranceRate) / 12;

            $totalMonthly = $monthlyPI + $monthlyTaxes + $monthlyInsurance;

            if ($totalMonthly <= $maxMonthlyPayment) {
                $low = $mid;
            } else {
                $high = $mid;
            }
        }

        return $low;
    }

    private function calculateMonthlyPayment(float $principal, float $annualRate, int $years): float
    {
        if ($principal <= 0) {
            return 0;
        }

        $monthlyRate = $annualRate / 12;
        $numPayments = $years * 12;

        if ($monthlyRate === 0.0) {
            return $principal / $numPayments;
        }

        return $principal * ($monthlyRate * pow(1 + $monthlyRate, $numPayments)) /
               (pow(1 + $monthlyRate, $numPayments) - 1);
    }

    private function getFundingFeeRate(float $downPaymentPercent, bool $isFirstUse, bool $isDisabledVeteran): float
    {
        // Disabled veterans are exempt from funding fee
        if ($isDisabledVeteran) {
            return 0;
        }

        $rates = $isFirstUse ? self::FUNDING_FEE_FIRST_USE : self::FUNDING_FEE_SUBSEQUENT_USE;

        if ($downPaymentPercent >= 10) {
            return $rates[10];
        } elseif ($downPaymentPercent >= 5) {
            return $rates[5];
        }

        return $rates[0];
    }

    private function formatZeroResult(): array
    {
        return [
            'max_purchase_price' => 0,
            'max_loan_amount' => 0,
            'monthly_payment' => 0,
            'monthly_principal_interest' => 0,
            'monthly_taxes' => 0,
            'monthly_insurance' => 0,
            'funding_fee' => 0,
            'funding_fee_financed' => 0,
            'dti_ratio' => 0,
            'max_monthly_housing' => 0,
            'no_pmi' => true,
            'disability_income' => 0,
            'total_monthly_income' => 0,
            'funding_fee_exempt' => false,
        ];
    }
}
