<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCalculationRequest extends FormRequest
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
            'inputs.required' => 'Calculation inputs are required.',
            'results.required' => 'Calculation results are required.',
            'name.max' => 'Calculation name cannot exceed 255 characters.',
        ];
    }
}
