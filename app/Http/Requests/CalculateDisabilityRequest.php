<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CalculateDisabilityRequest extends FormRequest
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
            'disability_rating' => ['required', 'integer', 'min:0', 'max:100'],
            'has_spouse' => ['sometimes', 'boolean'],
            'children_count' => ['sometimes', 'integer', 'min:0', 'max:20'],
            'state' => ['sometimes', 'string', 'size:2'],
            'home_value' => ['sometimes', 'numeric', 'min:0'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'disability_rating.required' => 'Disability rating is required.',
            'disability_rating.min' => 'Disability rating must be at least 0%.',
            'disability_rating.max' => 'Disability rating cannot exceed 100%.',
            'children_count.max' => 'Children count cannot exceed 20.',
            'state.size' => 'State code must be 2 characters (e.g., TX, CA).',
            'home_value.min' => 'Home value must be a positive number.',
        ];
    }
}
