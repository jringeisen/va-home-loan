<?php

namespace App\Http\Controllers;

use App\Http\Requests\CalculateAffordabilityRequest;
use App\Http\Requests\CalculateCostOfLivingRequest;
use App\Http\Requests\CalculateDisabilityRequest;
use App\Http\Requests\StoreCalculationRequest;
use App\Http\Requests\UpdateCalculationRequest;
use App\Models\Calculation;
use App\Services\Calculators\CostOfLivingCalculator;
use App\Services\Calculators\DisabilityImpactCalculator;
use App\Services\Calculators\VaLoanAffordabilityCalculator;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CalculatorController extends Controller
{
    public function affordability(Request $request): Response
    {
        // Read URL parameters with defaults for shareable links
        $hasSpouse = $request->query('spouse') === 'true';
        $childrenCount = (int) $request->query('children', 0);

        $inputs = [
            'annual_income' => (float) $request->query('income', 75000),
            'monthly_debts' => (float) $request->query('debts', 500),
            'down_payment' => (float) $request->query('down', 10000),
            'interest_rate' => (float) $request->query('rate', 6.5),
            'loan_term_years' => (int) $request->query('term', 30),
            'is_first_use' => $request->query('first', 'true') !== 'false',
            'disability_rating' => (int) $request->query('rating', 0),
            'has_spouse' => $hasSpouse,
            'children_count' => $childrenCount,
            'disability_dependents' => ($hasSpouse ? 1 : 0) + $childrenCount,
        ];

        $calculator = new VaLoanAffordabilityCalculator;
        $results = $calculator->calculate($inputs);

        return Inertia::render('Calculators/Affordability', [
            'results' => $results,
            'inputs' => $inputs,
        ]);
    }

    public function calculateAffordability(CalculateAffordabilityRequest $request): Response
    {
        $validated = $request->validated();

        $calculator = new VaLoanAffordabilityCalculator;
        $results = $calculator->calculate($validated);

        return Inertia::render('Calculators/Affordability', [
            'results' => $results,
            'inputs' => $validated,
        ]);
    }

    public function costOfLiving(Request $request): Response
    {
        $isMilitary = $request->query('military') === 'true';

        $inputs = [
            'from_state' => $request->query('from', 'TX'),
            'to_state' => $request->query('to', 'CA'),
            'current_salary' => (float) $request->query('salary', 75000),
            'is_military' => $isMilitary,
            'zip_code' => $request->query('zip', ''),
            'pay_grade' => $request->query('grade', ''),
            'has_dependents' => $request->query('dependents') === 'true',
        ];

        $calculator = new CostOfLivingCalculator;
        $results = $calculator->calculate($inputs);

        return Inertia::render('Calculators/CostOfLiving', [
            'states' => $this->getStates(),
            'results' => $results,
            'inputs' => $inputs,
        ]);
    }

    public function calculateCostOfLiving(CalculateCostOfLivingRequest $request): Response
    {
        $validated = $request->validated();

        $calculator = new CostOfLivingCalculator;
        $results = $calculator->calculate($validated);

        return Inertia::render('Calculators/CostOfLiving', [
            'states' => $this->getStates(),
            'results' => $results,
            'inputs' => $validated,
        ]);
    }

    public function disability(Request $request): Response
    {
        $hasSpouse = $request->query('spouse') === 'true';
        $childrenCount = (int) $request->query('children', 0);

        $inputs = [
            'disability_rating' => (int) $request->query('rating', 50),
            'has_spouse' => $hasSpouse,
            'children_count' => $childrenCount,
            'state' => $request->query('state', 'TX'),
            'home_value' => (float) $request->query('home', 300000),
        ];

        $calculator = new DisabilityImpactCalculator;
        $results = $calculator->calculate($inputs);

        return Inertia::render('Calculators/Disability', [
            'states' => $this->getStates(),
            'results' => $results,
            'inputs' => $inputs,
        ]);
    }

    public function calculateDisability(CalculateDisabilityRequest $request): Response
    {
        $validated = $request->validated();

        $calculator = new DisabilityImpactCalculator;
        $results = $calculator->calculate($validated);

        return Inertia::render('Calculators/Disability', [
            'states' => $this->getStates(),
            'results' => $results,
            'inputs' => $validated,
        ]);
    }

    public function store(StoreCalculationRequest $request): RedirectResponse
    {
        $this->authorize('create', Calculation::class);

        $request->user()->calculations()->create($request->validated());

        return back()->with('success', 'Calculation saved successfully!');
    }

    public function update(UpdateCalculationRequest $request, Calculation $calculation): RedirectResponse
    {
        $this->authorize('update', $calculation);

        $calculation->update($request->validated());

        return back()->with('success', 'Calculation updated successfully!');
    }

    public function destroy(Calculation $calculation): RedirectResponse
    {
        $this->authorize('delete', $calculation);

        $calculation->delete();

        return back()->with('success', 'Calculation deleted successfully!');
    }

    private function getStates(): array
    {
        return [
            'AL' => 'Alabama', 'AK' => 'Alaska', 'AZ' => 'Arizona', 'AR' => 'Arkansas',
            'CA' => 'California', 'CO' => 'Colorado', 'CT' => 'Connecticut', 'DE' => 'Delaware',
            'FL' => 'Florida', 'GA' => 'Georgia', 'HI' => 'Hawaii', 'ID' => 'Idaho',
            'IL' => 'Illinois', 'IN' => 'Indiana', 'IA' => 'Iowa', 'KS' => 'Kansas',
            'KY' => 'Kentucky', 'LA' => 'Louisiana', 'ME' => 'Maine', 'MD' => 'Maryland',
            'MA' => 'Massachusetts', 'MI' => 'Michigan', 'MN' => 'Minnesota', 'MS' => 'Mississippi',
            'MO' => 'Missouri', 'MT' => 'Montana', 'NE' => 'Nebraska', 'NV' => 'Nevada',
            'NH' => 'New Hampshire', 'NJ' => 'New Jersey', 'NM' => 'New Mexico', 'NY' => 'New York',
            'NC' => 'North Carolina', 'ND' => 'North Dakota', 'OH' => 'Ohio', 'OK' => 'Oklahoma',
            'OR' => 'Oregon', 'PA' => 'Pennsylvania', 'RI' => 'Rhode Island', 'SC' => 'South Carolina',
            'SD' => 'South Dakota', 'TN' => 'Tennessee', 'TX' => 'Texas', 'UT' => 'Utah',
            'VT' => 'Vermont', 'VA' => 'Virginia', 'WA' => 'Washington', 'WV' => 'West Virginia',
            'WI' => 'Wisconsin', 'WY' => 'Wyoming',
        ];
    }
}
