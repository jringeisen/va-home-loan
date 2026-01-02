<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CalculateCostOfLivingRequest extends FormRequest
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
            'from_state' => ['required', 'string', 'size:2'],
            'to_state' => ['required', 'string', 'size:2'],
            'current_salary' => ['sometimes', 'numeric', 'min:0'],
            'is_military' => ['sometimes', 'boolean'],
            'zip_code' => ['nullable', 'string', 'max:5'],
            'pay_grade' => ['nullable', 'string'],
            'has_dependents' => ['sometimes', 'boolean'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'from_state.required' => 'Please select a state to move from.',
            'from_state.size' => 'State code must be 2 characters (e.g., TX, CA).',
            'to_state.required' => 'Please select a state to move to.',
            'to_state.size' => 'State code must be 2 characters (e.g., TX, CA).',
            'current_salary.min' => 'Salary must be a positive number.',
            'zip_code.max' => 'ZIP code must be 5 characters or less.',
        ];
    }
}
