<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CalculateAffordabilityRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, array<int, string>>
     */
    public function rules(): array
    {
        return [
            'annual_income' => ['required', 'numeric', 'min:0'],
            'monthly_debts' => ['required', 'numeric', 'min:0'],
            'down_payment' => ['required', 'numeric', 'min:0'],
            'interest_rate' => ['required', 'numeric', 'min:0', 'max:20'],
            'loan_term_years' => ['sometimes', 'integer', 'in:15,20,25,30'],
            'is_first_use' => ['sometimes', 'boolean'],
            'disability_rating' => ['sometimes', 'integer', 'min:0', 'max:100'],
            'disability_dependents' => ['sometimes', 'integer', 'min:0', 'max:20'],
            'property_tax_rate' => ['sometimes', 'numeric', 'min:0', 'max:0.1'],
            'home_insurance_rate' => ['sometimes', 'numeric', 'min:0', 'max:0.1'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'annual_income.required' => 'Annual income is required.',
            'annual_income.min' => 'Annual income must be a positive number.',
            'monthly_debts.required' => 'Monthly debts amount is required.',
            'interest_rate.required' => 'Interest rate is required.',
            'interest_rate.max' => 'Interest rate cannot exceed 20%.',
            'loan_term_years.in' => 'Loan term must be 15, 20, 25, or 30 years.',
            'disability_rating.max' => 'Disability rating cannot exceed 100%.',
        ];
    }
}
