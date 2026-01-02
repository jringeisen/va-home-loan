<?php

use App\Services\Calculators\CostOfLivingCalculator;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

describe('CostOfLivingCalculator', function () {
    beforeEach(function () {
        $this->calculator = new CostOfLivingCalculator;
    });

    it('calculates cost of living comparison between states', function () {
        $result = $this->calculator->calculate([
            'from_state' => 'TX',
            'to_state' => 'CA',
        ]);

        expect($result)->toHaveKeys([
            'from_state',
            'to_state',
            'from_overall_index',
            'to_overall_index',
            'overall_difference',
            'overall_percent_change',
            'category_comparison',
        ]);
    });

    it('shows California more expensive than Texas', function () {
        $result = $this->calculator->calculate([
            'from_state' => 'TX',
            'to_state' => 'CA',
        ]);

        expect($result['overall_percent_change'])->toBeGreaterThan(0);
        expect($result['to_overall_index'])->toBeGreaterThan($result['from_overall_index']);
    });

    it('shows Texas less expensive than California', function () {
        $result = $this->calculator->calculate([
            'from_state' => 'CA',
            'to_state' => 'TX',
        ]);

        expect($result['overall_percent_change'])->toBeLessThan(0);
    });

    it('handles same state comparison', function () {
        $result = $this->calculator->calculate([
            'from_state' => 'TX',
            'to_state' => 'TX',
        ]);

        expect($result['overall_percent_change'])->toBe(0.0);
        expect($result['overall_difference'])->toBe(0.0);
    });

    it('calculates equivalent salary', function () {
        $result = $this->calculator->calculate([
            'from_state' => 'TX',
            'to_state' => 'CA',
            'current_salary' => 75000,
        ]);

        expect($result['equivalent_salary'])->toBeGreaterThan(75000);
        expect($result['salary_adjustment'])->toBeGreaterThan(0);
    });

    it('returns null equivalent salary when no salary provided', function () {
        $result = $this->calculator->calculate([
            'from_state' => 'TX',
            'to_state' => 'CA',
        ]);

        expect($result['equivalent_salary'])->toBeNull();
        expect($result['salary_adjustment'])->toBeNull();
    });

    it('includes all category comparisons', function () {
        $result = $this->calculator->calculate([
            'from_state' => 'TX',
            'to_state' => 'NY',
        ]);

        $categories = ['grocery', 'housing', 'utilities', 'transportation', 'health', 'misc', 'taxes'];

        foreach ($categories as $category) {
            expect($result['category_comparison'])->toHaveKey($category);
            expect($result['category_comparison'][$category])->toHaveKeys([
                'from_index',
                'to_index',
                'difference',
                'percent_change',
            ]);
        }
    });

    it('handles uppercase state codes', function () {
        $result = $this->calculator->calculate([
            'from_state' => 'tx',
            'to_state' => 'ca',
        ]);

        expect($result['from_state'])->toBe('TX');
        expect($result['to_state'])->toBe('CA');
    });

    it('provides cost difference description', function () {
        // Significantly more expensive
        $result = $this->calculator->calculate([
            'from_state' => 'TX',
            'to_state' => 'HI', // Hawaii is very expensive
        ]);

        expect($result['cost_difference_description'])->toBe('Significantly more expensive');

        // Significantly less expensive
        $result = $this->calculator->calculate([
            'from_state' => 'HI',
            'to_state' => 'MS', // Mississippi is very cheap
        ]);

        expect($result['cost_difference_description'])->toBe('Significantly less expensive');
    });

    it('returns null bah comparison when military params not provided', function () {
        $result = $this->calculator->calculate([
            'from_state' => 'TX',
            'to_state' => 'CA',
            'is_military' => false,
        ]);

        expect($result['bah_comparison'])->toBeNull();
    });

    it('calculates weighted overall index', function () {
        $result = $this->calculator->calculate([
            'from_state' => 'TX',
            'to_state' => 'CA',
        ]);

        // Overall index should be a reasonable number (not 0, not extreme)
        expect($result['from_overall_index'])->toBeGreaterThan(50);
        expect($result['from_overall_index'])->toBeLessThan(200);
        expect($result['to_overall_index'])->toBeGreaterThan(50);
        expect($result['to_overall_index'])->toBeLessThan(200);
    });

    it('correctly identifies moderately expensive moves', function () {
        $result = $this->calculator->calculate([
            'from_state' => 'TX',
            'to_state' => 'CO', // Colorado is moderately more expensive
        ]);

        expect($result['overall_percent_change'])->toBeGreaterThan(0);
        expect(in_array($result['cost_difference_description'], [
            'Slightly more expensive',
            'Moderately more expensive',
        ]))->toBeTrue();
    });
});
