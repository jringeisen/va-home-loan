<?php

use App\Services\Calculators\DisabilityImpactCalculator;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

describe('DisabilityImpactCalculator', function () {
    beforeEach(function () {
        $this->calculator = new DisabilityImpactCalculator;
    });

    it('calculates disability compensation', function () {
        $result = $this->calculator->calculate([
            'disability_rating' => 50,
        ]);

        expect($result)->toHaveKeys([
            'disability_rating',
            'base_monthly_compensation',
            'total_monthly_compensation',
            'annual_compensation',
            'is_tax_free',
        ]);
    });

    it('returns zero compensation for 0% rating', function () {
        $result = $this->calculator->calculate([
            'disability_rating' => 0,
        ]);

        expect($result['base_monthly_compensation'])->toEqual(0);
        expect($result['total_monthly_compensation'])->toEqual(0);
    });

    it('normalizes rating to nearest 10%', function () {
        $result = $this->calculator->calculate([
            'disability_rating' => 47,
        ]);

        expect($result['disability_rating'])->toBe(50);

        $result = $this->calculator->calculate([
            'disability_rating' => 44,
        ]);

        expect($result['disability_rating'])->toBe(40);
    });

    it('clamps rating to valid range', function () {
        $result = $this->calculator->calculate([
            'disability_rating' => 150,
        ]);

        expect($result['disability_rating'])->toBe(100);

        $result = $this->calculator->calculate([
            'disability_rating' => -10,
        ]);

        expect($result['disability_rating'])->toBe(0);
    });

    it('increases compensation with higher rating', function () {
        $rating50 = $this->calculator->calculate(['disability_rating' => 50]);
        $rating70 = $this->calculator->calculate(['disability_rating' => 70]);
        $rating100 = $this->calculator->calculate(['disability_rating' => 100]);

        expect($rating70['total_monthly_compensation'])
            ->toBeGreaterThan($rating50['total_monthly_compensation']);
        expect($rating100['total_monthly_compensation'])
            ->toBeGreaterThan($rating70['total_monthly_compensation']);
    });

    it('adds dependent compensation for 30%+ rating', function () {
        $withoutDependents = $this->calculator->calculate([
            'disability_rating' => 50,
            'has_spouse' => false,
            'children_count' => 0,
        ]);

        $withSpouse = $this->calculator->calculate([
            'disability_rating' => 50,
            'has_spouse' => true,
            'children_count' => 0,
        ]);

        expect($withSpouse['dependent_addition'])->toBeGreaterThan(0);
        expect($withSpouse['total_monthly_compensation'])
            ->toBeGreaterThan($withoutDependents['total_monthly_compensation']);
    });

    it('does not add dependent compensation below 30% rating', function () {
        $result = $this->calculator->calculate([
            'disability_rating' => 20,
            'has_spouse' => true,
            'children_count' => 3,
        ]);

        expect($result['dependent_addition'])->toEqual(0);
    });

    it('calculates annual compensation correctly', function () {
        $result = $this->calculator->calculate([
            'disability_rating' => 50,
        ]);

        expect($result['annual_compensation'])
            ->toBe(round($result['total_monthly_compensation'] * 12, 2));
    });

    it('marks compensation as tax free', function () {
        $result = $this->calculator->calculate([
            'disability_rating' => 50,
        ]);

        expect($result['is_tax_free'])->toBeTrue();
    });

    it('includes state benefits when state provided', function () {
        $result = $this->calculator->calculate([
            'disability_rating' => 100,
            'state' => 'TX',
            'home_value' => 300000,
        ]);

        expect($result['state_benefits'])->not->toBeNull();
        expect($result['state_benefits']['income_tax_exempt'])->toBeTrue();
    });

    it('returns generic state benefits when no state provided', function () {
        $result = $this->calculator->calculate([
            'disability_rating' => 50,
        ]);

        expect($result['state_benefits']['income_tax_exempt'])->toBeTrue();
        expect($result['state_benefits']['property_tax_exemption'])->toBeNull();
    });

    it('calculates total annual benefit including property tax savings', function () {
        $result = $this->calculator->calculate([
            'disability_rating' => 100,
            'state' => 'TX',
            'home_value' => 400000,
        ]);

        // Total benefit should be at least annual compensation
        expect($result['total_annual_benefit'])
            ->toBeGreaterThanOrEqual($result['annual_compensation']);
    });

    it('includes additional benefits based on rating', function () {
        // 10% rating - basic benefits
        $result10 = $this->calculator->calculate(['disability_rating' => 10]);
        expect($result10['additional_benefits']['va_healthcare'])->toBeTrue();
        expect($result10['additional_benefits']['education_benefits'])->toBeTrue();

        // 30% rating - dependent education
        $result30 = $this->calculator->calculate(['disability_rating' => 30]);
        expect($result30['additional_benefits']['dependent_education'])->toBeTrue();

        // 100% rating - all benefits
        $result100 = $this->calculator->calculate(['disability_rating' => 100]);
        expect($result100['additional_benefits']['dental_care'])->toBeTrue();
        expect($result100['additional_benefits']['champ_va'])->toBeTrue();
    });

    it('handles spouse and children together', function () {
        $spouseOnly = $this->calculator->calculate([
            'disability_rating' => 50,
            'has_spouse' => true,
            'children_count' => 0,
        ]);

        $spouseAndChild = $this->calculator->calculate([
            'disability_rating' => 50,
            'has_spouse' => true,
            'children_count' => 1,
        ]);

        $spouseAndChildren = $this->calculator->calculate([
            'disability_rating' => 50,
            'has_spouse' => true,
            'children_count' => 3,
        ]);

        expect($spouseAndChild['total_monthly_compensation'])
            ->toBeGreaterThan($spouseOnly['total_monthly_compensation']);
        expect($spouseAndChildren['total_monthly_compensation'])
            ->toBeGreaterThan($spouseAndChild['total_monthly_compensation']);
    });

    it('handles children without spouse', function () {
        $childOnly = $this->calculator->calculate([
            'disability_rating' => 50,
            'has_spouse' => false,
            'children_count' => 1,
        ]);

        $noDepends = $this->calculator->calculate([
            'disability_rating' => 50,
            'has_spouse' => false,
            'children_count' => 0,
        ]);

        expect($childOnly['total_monthly_compensation'])
            ->toBeGreaterThan($noDepends['total_monthly_compensation']);
    });

    it('uses 2025 VA disability rates', function () {
        // 2025 rates from va.gov
        $result = $this->calculator->calculate([
            'disability_rating' => 50,
        ]);

        // 50% base rate for 2025 is $1,102.73
        expect($result['base_monthly_compensation'])->toBe(1102.73);
    });
});
