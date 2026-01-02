<?php

use App\Services\Calculators\VaLoanAffordabilityCalculator;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

describe('VaLoanAffordabilityCalculator', function () {
    beforeEach(function () {
        $this->calculator = new VaLoanAffordabilityCalculator;
    });

    it('calculates max purchase price based on income', function () {
        $result = $this->calculator->calculate([
            'annual_income' => 100000,
            'monthly_debts' => 0,
            'down_payment' => 0,
            'interest_rate' => 6.5,
        ]);

        expect($result['max_purchase_price'])->toBeGreaterThan(0);
        expect($result['monthly_payment'])->toBeGreaterThan(0);
    });

    it('returns zero results when debts exceed income', function () {
        $result = $this->calculator->calculate([
            'annual_income' => 50000,
            'monthly_debts' => 5000, // More than 41% of monthly income
            'down_payment' => 0,
            'interest_rate' => 6.5,
        ]);

        expect($result['max_purchase_price'])->toBe(0);
        expect($result['monthly_payment'])->toBe(0);
    });

    it('increases purchase power with down payment', function () {
        $withoutDown = $this->calculator->calculate([
            'annual_income' => 75000,
            'monthly_debts' => 500,
            'down_payment' => 0,
            'interest_rate' => 6.5,
        ]);

        $withDown = $this->calculator->calculate([
            'annual_income' => 75000,
            'monthly_debts' => 500,
            'down_payment' => 50000,
            'interest_rate' => 6.5,
        ]);

        expect($withDown['max_purchase_price'])->toBeGreaterThan($withoutDown['max_purchase_price']);
    });

    it('applies correct funding fee for first time use', function () {
        $result = $this->calculator->calculate([
            'annual_income' => 75000,
            'monthly_debts' => 0,
            'down_payment' => 0,
            'interest_rate' => 6.5,
            'is_first_use' => true,
        ]);

        // First use with 0% down = 2.15% funding fee
        expect($result['funding_fee'])->toBeGreaterThan(0);
        expect($result['funding_fee_exempt'])->toBeFalse();
    });

    it('applies higher funding fee for subsequent use', function () {
        $firstUse = $this->calculator->calculate([
            'annual_income' => 75000,
            'monthly_debts' => 0,
            'down_payment' => 0,
            'interest_rate' => 6.5,
            'is_first_use' => true,
        ]);

        $subsequentUse = $this->calculator->calculate([
            'annual_income' => 75000,
            'monthly_debts' => 0,
            'down_payment' => 0,
            'interest_rate' => 6.5,
            'is_first_use' => false,
        ]);

        expect($subsequentUse['funding_fee'])->toBeGreaterThan($firstUse['funding_fee']);
    });

    it('exempts disabled veterans from funding fee', function () {
        $result = $this->calculator->calculate([
            'annual_income' => 75000,
            'monthly_debts' => 0,
            'down_payment' => 0,
            'interest_rate' => 6.5,
            'disability_rating' => 10,
        ]);

        expect($result['funding_fee'])->toBe(0.0);
        expect($result['funding_fee_exempt'])->toBeTrue();
    });

    it('includes disability income in calculations', function () {
        $withoutDisability = $this->calculator->calculate([
            'annual_income' => 75000,
            'monthly_debts' => 0,
            'down_payment' => 0,
            'interest_rate' => 6.5,
            'disability_rating' => 0,
        ]);

        $withDisability = $this->calculator->calculate([
            'annual_income' => 75000,
            'monthly_debts' => 0,
            'down_payment' => 0,
            'interest_rate' => 6.5,
            'disability_rating' => 50,
            'disability_dependents' => 2,
        ]);

        expect($withDisability['disability_income'])->toBeGreaterThan(0);
        expect($withDisability['total_monthly_income'])->toBeGreaterThan($withoutDisability['total_monthly_income']);
        expect($withDisability['max_purchase_price'])->toBeGreaterThan($withoutDisability['max_purchase_price']);
    });

    it('calculates monthly taxes and insurance', function () {
        $result = $this->calculator->calculate([
            'annual_income' => 100000,
            'monthly_debts' => 0,
            'down_payment' => 0,
            'interest_rate' => 6.5,
        ]);

        expect($result['monthly_taxes'])->toBeGreaterThan(0);
        expect($result['monthly_insurance'])->toBeGreaterThan(0);
    });

    it('never has PMI on VA loans', function () {
        $result = $this->calculator->calculate([
            'annual_income' => 75000,
            'monthly_debts' => 0,
            'down_payment' => 0, // Even 0% down
            'interest_rate' => 6.5,
        ]);

        expect($result['no_pmi'])->toBeTrue();
    });

    it('handles different loan terms', function () {
        $thirtyYear = $this->calculator->calculate([
            'annual_income' => 75000,
            'monthly_debts' => 0,
            'down_payment' => 0,
            'interest_rate' => 6.5,
            'loan_term_years' => 30,
        ]);

        $fifteenYear = $this->calculator->calculate([
            'annual_income' => 75000,
            'monthly_debts' => 0,
            'down_payment' => 0,
            'interest_rate' => 6.5,
            'loan_term_years' => 15,
        ]);

        // 15-year loan means higher monthly payments, so lower max price
        expect($fifteenYear['max_purchase_price'])->toBeLessThan($thirtyYear['max_purchase_price']);
    });

    it('respects 41% DTI limit', function () {
        $result = $this->calculator->calculate([
            'annual_income' => 120000, // $10k/month
            'monthly_debts' => 1000,
            'down_payment' => 0,
            'interest_rate' => 6.5,
        ]);

        $monthlyIncome = 120000 / 12;
        $maxAllowedPayment = ($monthlyIncome * 0.41) - 1000;

        // Monthly payment should be at or below the DTI limit
        expect($result['monthly_payment'])->toBeLessThanOrEqual($maxAllowedPayment + 100); // Small tolerance
    });

    it('calculates max monthly housing correctly', function () {
        $result = $this->calculator->calculate([
            'annual_income' => 72000, // $6k/month
            'monthly_debts' => 500,
            'down_payment' => 0,
            'interest_rate' => 6.5,
        ]);

        // Max housing = (6000 * 0.41) - 500 = 1960
        expect($result['max_monthly_housing'])->toBe(1960.0);
    });
});
