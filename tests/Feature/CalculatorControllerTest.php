<?php

use App\Models\Calculation;
use App\Models\User;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

/*
|--------------------------------------------------------------------------
| Affordability Calculator Tests
|--------------------------------------------------------------------------
*/

describe('Affordability Calculator', function () {
    it('displays the affordability calculator page', function () {
        $response = $this->get('/calculators/affordability');

        $response->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('Calculators/Affordability')
                ->has('results')
                ->has('inputs')
            );
    });

    it('loads affordability calculator with URL parameters', function () {
        $response = $this->get('/calculators/affordability?income=100000&debts=1000&down=20000&rate=7.0&term=15');

        $response->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('Calculators/Affordability')
                ->where('inputs.annual_income', fn ($value) => $value == 100000)
                ->where('inputs.monthly_debts', fn ($value) => $value == 1000)
                ->where('inputs.down_payment', fn ($value) => $value == 20000)
                ->where('inputs.interest_rate', fn ($value) => $value == 7.0)
                ->where('inputs.loan_term_years', 15)
            );
    });

    it('loads affordability calculator with disability rating from URL', function () {
        $response = $this->get('/calculators/affordability?rating=50&spouse=true&children=2');

        $response->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('Calculators/Affordability')
                ->where('inputs.disability_rating', 50)
                ->where('inputs.has_spouse', true)
                ->where('inputs.children_count', 2)
            );
    });

    it('calculates affordability with valid inputs', function () {
        $response = $this->post('/calculators/affordability/calculate', [
            'annual_income' => 75000,
            'monthly_debts' => 500,
            'down_payment' => 10000,
            'interest_rate' => 6.5,
            'loan_term_years' => 30,
            'is_first_use' => true,
            'disability_rating' => 0,
        ]);

        $response->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('Calculators/Affordability')
                ->has('results.max_purchase_price')
                ->has('results.monthly_payment')
                ->has('results.funding_fee')
                ->where('results.no_pmi', true)
            );
    });

    it('validates required fields for affordability calculation', function () {
        $response = $this->post('/calculators/affordability/calculate', []);

        $response->assertInvalid(['annual_income', 'monthly_debts', 'down_payment', 'interest_rate']);
    });

    it('validates interest rate range', function () {
        $response = $this->post('/calculators/affordability/calculate', [
            'annual_income' => 75000,
            'monthly_debts' => 500,
            'down_payment' => 10000,
            'interest_rate' => 25, // Too high
        ]);

        $response->assertInvalid(['interest_rate']);
    });

    it('validates loan term options', function () {
        $response = $this->post('/calculators/affordability/calculate', [
            'annual_income' => 75000,
            'monthly_debts' => 500,
            'down_payment' => 10000,
            'interest_rate' => 6.5,
            'loan_term_years' => 40, // Invalid term
        ]);

        $response->assertInvalid(['loan_term_years']);
    });

    it('includes disability income when rating is provided', function () {
        $response = $this->post('/calculators/affordability/calculate', [
            'annual_income' => 75000,
            'monthly_debts' => 500,
            'down_payment' => 10000,
            'interest_rate' => 6.5,
            'disability_rating' => 50,
            'disability_dependents' => 2,
        ]);

        $response->assertOk()
            ->assertInertia(fn ($page) => $page
                ->where('results.disability_income', fn ($value) => $value > 0)
            );
    });

    it('exempts disabled veterans from funding fee', function () {
        $response = $this->post('/calculators/affordability/calculate', [
            'annual_income' => 75000,
            'monthly_debts' => 500,
            'down_payment' => 10000,
            'interest_rate' => 6.5,
            'disability_rating' => 10, // 10%+ is exempt
        ]);

        $response->assertOk()
            ->assertInertia(fn ($page) => $page
                ->where('results.funding_fee_exempt', true)
                ->where('results.funding_fee', 0)
            );
    });
});

/*
|--------------------------------------------------------------------------
| Cost of Living Calculator Tests
|--------------------------------------------------------------------------
*/

describe('Cost of Living Calculator', function () {
    it('displays the cost of living calculator page', function () {
        $response = $this->get('/calculators/cost-of-living');

        $response->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('Calculators/CostOfLiving')
                ->has('states')
                ->has('results')
                ->has('inputs')
            );
    });

    it('loads cost of living calculator with URL parameters', function () {
        $response = $this->get('/calculators/cost-of-living?from=CA&to=TX&salary=100000');

        $response->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('Calculators/CostOfLiving')
                ->where('inputs.from_state', 'CA')
                ->where('inputs.to_state', 'TX')
                ->where('inputs.current_salary', fn ($value) => $value == 100000)
            );
    });

    it('loads cost of living with military parameters', function () {
        $response = $this->get('/calculators/cost-of-living?from=TX&to=CA&military=true&zip=78201&grade=E-5&dependents=true');

        $response->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('Calculators/CostOfLiving')
                ->where('inputs.is_military', true)
                ->where('inputs.zip_code', '78201')
                ->where('inputs.pay_grade', 'E-5')
                ->where('inputs.has_dependents', true)
            );
    });

    it('calculates cost of living with valid inputs', function () {
        $response = $this->post('/calculators/cost-of-living/calculate', [
            'from_state' => 'TX',
            'to_state' => 'CA',
            'current_salary' => 75000,
        ]);

        $response->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('Calculators/CostOfLiving')
                ->has('results.overall_percent_change')
                ->has('results.equivalent_salary')
                ->has('results.category_comparison')
            );
    });

    it('validates required state fields', function () {
        $response = $this->post('/calculators/cost-of-living/calculate', [
            'current_salary' => 75000,
        ]);

        $response->assertInvalid(['from_state', 'to_state']);
    });

    it('validates state code format', function () {
        $response = $this->post('/calculators/cost-of-living/calculate', [
            'from_state' => 'Texas', // Should be 2 characters
            'to_state' => 'CA',
        ]);

        $response->assertInvalid(['from_state']);
    });

    it('shows higher cost when moving to expensive state', function () {
        $response = $this->post('/calculators/cost-of-living/calculate', [
            'from_state' => 'TX',
            'to_state' => 'CA',
            'current_salary' => 75000,
        ]);

        $response->assertOk()
            ->assertInertia(fn ($page) => $page
                ->where('results.overall_percent_change', fn ($value) => $value > 0)
                ->where('results.equivalent_salary', fn ($value) => $value > 75000)
            );
    });

    it('shows lower cost when moving to cheaper state', function () {
        $response = $this->post('/calculators/cost-of-living/calculate', [
            'from_state' => 'CA',
            'to_state' => 'TX',
            'current_salary' => 100000,
        ]);

        $response->assertOk()
            ->assertInertia(fn ($page) => $page
                ->where('results.overall_percent_change', fn ($value) => $value < 0)
                ->where('results.equivalent_salary', fn ($value) => $value < 100000)
            );
    });
});

/*
|--------------------------------------------------------------------------
| Disability Calculator Tests
|--------------------------------------------------------------------------
*/

describe('Disability Calculator', function () {
    it('displays the disability calculator page', function () {
        $response = $this->get('/calculators/disability');

        $response->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('Calculators/Disability')
                ->has('states')
                ->has('results')
                ->has('inputs')
            );
    });

    it('loads disability calculator with URL parameters', function () {
        $response = $this->get('/calculators/disability?rating=70&spouse=true&children=3&state=FL&home=400000');

        $response->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('Calculators/Disability')
                ->where('inputs.disability_rating', 70)
                ->where('inputs.has_spouse', true)
                ->where('inputs.children_count', 3)
                ->where('inputs.state', 'FL')
                ->where('inputs.home_value', fn ($value) => $value == 400000)
            );
    });

    it('calculates disability compensation with valid inputs', function () {
        $response = $this->post('/calculators/disability/calculate', [
            'disability_rating' => 50,
            'has_spouse' => true,
            'children_count' => 2,
            'state' => 'TX',
            'home_value' => 300000,
        ]);

        $response->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('Calculators/Disability')
                ->has('results.total_monthly_compensation')
                ->has('results.annual_compensation')
                ->has('results.state_benefits')
                ->where('results.is_tax_free', true)
            );
    });

    it('validates disability rating is required', function () {
        $response = $this->post('/calculators/disability/calculate', [
            'state' => 'TX',
        ]);

        $response->assertInvalid(['disability_rating']);
    });

    it('validates disability rating range', function () {
        $response = $this->post('/calculators/disability/calculate', [
            'disability_rating' => 150, // Too high
        ]);

        $response->assertInvalid(['disability_rating']);
    });

    it('normalizes rating to nearest 10 percent', function () {
        $response = $this->post('/calculators/disability/calculate', [
            'disability_rating' => 47, // Should normalize to 50
        ]);

        $response->assertOk()
            ->assertInertia(fn ($page) => $page
                ->where('results.disability_rating', 50)
            );
    });

    it('includes dependent additions for 30+ rating', function () {
        $response = $this->post('/calculators/disability/calculate', [
            'disability_rating' => 50,
            'has_spouse' => true,
            'children_count' => 1,
        ]);

        $response->assertOk()
            ->assertInertia(fn ($page) => $page
                ->where('results.dependent_addition', fn ($value) => $value > 0)
            );
    });

    it('shows no dependent additions below 30 rating', function () {
        $response = $this->post('/calculators/disability/calculate', [
            'disability_rating' => 20,
            'has_spouse' => true,
            'children_count' => 2,
        ]);

        $response->assertOk()
            ->assertInertia(fn ($page) => $page
                ->where('results.dependent_addition', 0)
            );
    });

    it('includes additional benefits based on rating', function () {
        $response = $this->post('/calculators/disability/calculate', [
            'disability_rating' => 100,
        ]);

        $response->assertOk()
            ->assertInertia(fn ($page) => $page
                ->where('results.additional_benefits.va_healthcare', true)
                ->where('results.additional_benefits.dental_care', true)
                ->where('results.additional_benefits.champ_va', true)
            );
    });
});

/*
|--------------------------------------------------------------------------
| Calculation Save/Delete Tests
|--------------------------------------------------------------------------
*/

describe('Saving Calculations', function () {
    it('requires authentication to save calculations', function () {
        $response = $this->post('/calculations', [
            'type' => 'affordability',
            'inputs' => ['annual_income' => 75000],
            'results' => ['max_purchase_price' => 350000],
        ]);

        $response->assertRedirect('/login');
    });

    it('requires payment to save calculations', function () {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/calculations', [
            'type' => 'affordability',
            'inputs' => ['annual_income' => 75000],
            'results' => ['max_purchase_price' => 350000],
        ]);

        $response->assertForbidden();
    });

    it('allows paid users to save calculations', function () {
        $user = User::factory()->paid()->create();

        $response = $this->actingAs($user)->post('/calculations', [
            'type' => 'affordability',
            'name' => 'My First Calculation',
            'inputs' => ['annual_income' => 75000],
            'results' => ['max_purchase_price' => 350000],
        ]);

        $response->assertRedirect()
            ->assertSessionHas('success', 'Calculation saved successfully!');

        $this->assertDatabaseHas('calculations', [
            'user_id' => $user->id,
            'type' => 'affordability',
            'name' => 'My First Calculation',
        ]);
    });

    it('validates calculation type', function () {
        $user = User::factory()->paid()->create();

        $response = $this->actingAs($user)->post('/calculations', [
            'type' => 'invalid_type',
            'inputs' => [],
            'results' => [],
        ]);

        $response->assertInvalid(['type']);
    });

    it('validates required save fields', function () {
        $user = User::factory()->paid()->create();

        $response = $this->actingAs($user)->post('/calculations', []);

        $response->assertInvalid(['type', 'inputs', 'results']);
    });

    it('allows saving without a name', function () {
        $user = User::factory()->paid()->create();

        $response = $this->actingAs($user)->post('/calculations', [
            'type' => 'disability',
            'inputs' => ['disability_rating' => 50],
            'results' => ['total_monthly_compensation' => 1000],
        ]);

        $response->assertRedirect()
            ->assertSessionHas('success');

        $this->assertDatabaseHas('calculations', [
            'user_id' => $user->id,
            'type' => 'disability',
            'name' => null,
        ]);
    });
});

describe('Updating Calculations', function () {
    it('requires authentication to update calculations', function () {
        $calculation = Calculation::factory()->affordability()->create();

        $response = $this->put("/calculations/{$calculation->id}", [
            'inputs' => ['annual_income' => 80000],
            'results' => ['max_purchase_price' => 400000],
        ]);

        $response->assertRedirect('/login');
    });

    it('prevents users from updating other users calculations', function () {
        $owner = User::factory()->create();
        $otherUser = User::factory()->create();
        $calculation = Calculation::factory()->affordability()->for($owner)->create();

        $response = $this->actingAs($otherUser)->put("/calculations/{$calculation->id}", [
            'inputs' => ['annual_income' => 80000],
            'results' => ['max_purchase_price' => 400000],
        ]);

        $response->assertForbidden();
    });

    it('allows users to update their own calculations', function () {
        $user = User::factory()->create();
        $calculation = Calculation::factory()->affordability()->for($user)->create();

        $response = $this->actingAs($user)->put("/calculations/{$calculation->id}", [
            'name' => 'Updated Calculation',
            'inputs' => ['annual_income' => 80000],
            'results' => ['max_purchase_price' => 400000],
        ]);

        $response->assertRedirect()
            ->assertSessionHas('success', 'Calculation updated successfully!');

        $this->assertDatabaseHas('calculations', [
            'id' => $calculation->id,
            'name' => 'Updated Calculation',
        ]);
    });

    it('validates required update fields', function () {
        $user = User::factory()->create();
        $calculation = Calculation::factory()->affordability()->for($user)->create();

        $response = $this->actingAs($user)->put("/calculations/{$calculation->id}", []);

        $response->assertInvalid(['inputs', 'results']);
    });

    it('does not allow changing calculation type', function () {
        $user = User::factory()->create();
        $calculation = Calculation::factory()->affordability()->for($user)->create();

        $response = $this->actingAs($user)->put("/calculations/{$calculation->id}", [
            'type' => 'disability',
            'inputs' => ['disability_rating' => 50],
            'results' => ['total_monthly_compensation' => 1000],
        ]);

        $response->assertRedirect();

        // Type should remain unchanged
        $this->assertDatabaseHas('calculations', [
            'id' => $calculation->id,
            'type' => 'affordability',
        ]);
    });
});

describe('Deleting Calculations', function () {
    it('requires authentication to delete calculations', function () {
        $calculation = Calculation::factory()->affordability()->create();

        $response = $this->delete("/calculations/{$calculation->id}");

        $response->assertRedirect('/login');
    });

    it('prevents users from deleting other users calculations', function () {
        $owner = User::factory()->create();
        $otherUser = User::factory()->create();
        $calculation = Calculation::factory()->affordability()->for($owner)->create();

        $response = $this->actingAs($otherUser)->delete("/calculations/{$calculation->id}");

        $response->assertForbidden();
        $this->assertDatabaseHas('calculations', ['id' => $calculation->id]);
    });

    it('allows users to delete their own calculations', function () {
        $user = User::factory()->create();
        $calculation = Calculation::factory()->affordability()->for($user)->create();

        $response = $this->actingAs($user)->delete("/calculations/{$calculation->id}");

        $response->assertRedirect();
        $this->assertDatabaseMissing('calculations', ['id' => $calculation->id]);
    });
});
