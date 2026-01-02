<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Calculation>
 */
class CalculationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => \App\Models\User::factory(),
            'type' => fake()->randomElement(['affordability', 'cost_of_living', 'disability']),
            'name' => fake()->optional()->sentence(3),
            'inputs' => [],
            'results' => [],
        ];
    }

    /**
     * Create an affordability calculation.
     */
    public function affordability(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'affordability',
            'inputs' => [
                'annual_income' => 75000,
                'monthly_debts' => 500,
                'down_payment' => 10000,
                'interest_rate' => 6.5,
                'loan_term_years' => 30,
            ],
            'results' => [
                'max_purchase_price' => 350000,
                'monthly_payment' => 2500,
            ],
        ]);
    }

    /**
     * Create a cost of living calculation.
     */
    public function costOfLiving(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'cost_of_living',
            'inputs' => [
                'from_state' => 'TX',
                'to_state' => 'CA',
                'current_salary' => 75000,
            ],
            'results' => [
                'overall_percent_change' => 15.5,
                'equivalent_salary' => 86625,
            ],
        ]);
    }

    /**
     * Create a disability calculation.
     */
    public function disability(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'disability',
            'inputs' => [
                'disability_rating' => 50,
                'has_spouse' => true,
                'children_count' => 2,
                'state' => 'TX',
            ],
            'results' => [
                'total_monthly_compensation' => 1200,
                'annual_compensation' => 14400,
            ],
        ]);
    }
}
