<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreCalculationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    /**
     * @return array<string, array<int, mixed>>
     */
    public function rules(): array
    {
        return [
            'type' => ['required', 'string', Rule::in(['affordability', 'cost_of_living', 'disability'])],
            'name' => ['nullable', 'string', 'max:255'],
            'inputs' => ['required', 'array'],
            'results' => ['required', 'array'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'type.required' => 'Calculation type is required.',
            'type.in' => 'Invalid calculation type.',
            'inputs.required' => 'Calculation inputs are required.',
            'results.required' => 'Calculation results are required.',
            'name.max' => 'Calculation name cannot exceed 255 characters.',
        ];
    }
}
