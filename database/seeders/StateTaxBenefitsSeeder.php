<?php

namespace Database\Seeders;

use App\Models\StateTaxBenefit;
use Illuminate\Database\Seeder;

class StateTaxBenefitsSeeder extends Seeder
{
    /**
     * State veteran tax benefits data.
     * Source: Various state tax authorities
     */
    public function run(): void
    {
        $benefits = [
            // States with full income tax exemption for VA disability
            ['state' => 'AL', 'income_tax_exempt' => true, 'property_tax_min_rating' => 100, 'property_tax_exemption_type' => 'full', 'property_tax_exemption_amount' => null, 'notes' => 'Full property tax exemption for 100% P&T'],
            ['state' => 'AK', 'income_tax_exempt' => true, 'property_tax_min_rating' => 50, 'property_tax_exemption_type' => 'partial', 'property_tax_exemption_amount' => 150000.00, 'notes' => 'No state income tax. Property tax exemption up to $150k'],
            ['state' => 'AZ', 'income_tax_exempt' => true, 'property_tax_min_rating' => 100, 'property_tax_exemption_type' => 'partial', 'property_tax_exemption_amount' => 28459.00, 'notes' => 'Property tax exemption up to $28,459 assessed value'],
            ['state' => 'AR', 'income_tax_exempt' => true, 'property_tax_min_rating' => 100, 'property_tax_exemption_type' => 'full', 'property_tax_exemption_amount' => null, 'notes' => 'Full exemption for 100% disabled veterans'],
            ['state' => 'CA', 'income_tax_exempt' => true, 'property_tax_min_rating' => 100, 'property_tax_exemption_type' => 'partial', 'property_tax_exemption_amount' => 161083.00, 'notes' => 'Exemption for low-income 100% disabled veterans'],
            ['state' => 'CO', 'income_tax_exempt' => true, 'property_tax_min_rating' => 100, 'property_tax_exemption_type' => 'partial', 'property_tax_exemption_amount' => 200000.00, 'notes' => '50% exemption up to first $200k for 100% disabled'],
            ['state' => 'CT', 'income_tax_exempt' => true, 'property_tax_min_rating' => 10, 'property_tax_exemption_type' => 'partial', 'property_tax_exemption_amount' => 3000.00, 'notes' => 'Exemption amount varies by rating'],
            ['state' => 'DE', 'income_tax_exempt' => true, 'property_tax_min_rating' => 100, 'property_tax_exemption_type' => 'full', 'property_tax_exemption_amount' => null, 'notes' => 'Full exemption for 100% P&T'],
            ['state' => 'FL', 'income_tax_exempt' => true, 'property_tax_min_rating' => 10, 'property_tax_exemption_type' => 'partial', 'property_tax_exemption_amount' => 5000.00, 'notes' => 'No state income tax. Full exemption for 100% P&T'],
            ['state' => 'GA', 'income_tax_exempt' => true, 'property_tax_min_rating' => 100, 'property_tax_exemption_type' => 'full', 'property_tax_exemption_amount' => null, 'notes' => 'Full exemption for 100% service-connected'],
            ['state' => 'HI', 'income_tax_exempt' => true, 'property_tax_min_rating' => 100, 'property_tax_exemption_type' => 'full', 'property_tax_exemption_amount' => null, 'notes' => 'Full exemption for 100% disabled veterans'],
            ['state' => 'ID', 'income_tax_exempt' => true, 'property_tax_min_rating' => 10, 'property_tax_exemption_type' => 'partial', 'property_tax_exemption_amount' => 1500.00, 'notes' => 'Exemption from $1,320 to full based on rating'],
            ['state' => 'IL', 'income_tax_exempt' => true, 'property_tax_min_rating' => 30, 'property_tax_exemption_type' => 'partial', 'property_tax_exemption_amount' => 250000.00, 'notes' => 'Homestead exemption up to $250k for 70%+'],
            ['state' => 'IN', 'income_tax_exempt' => true, 'property_tax_min_rating' => 10, 'property_tax_exemption_type' => 'partial', 'property_tax_exemption_amount' => 37440.00, 'notes' => 'Deduction amounts vary by rating'],
            ['state' => 'IA', 'income_tax_exempt' => true, 'property_tax_min_rating' => 100, 'property_tax_exemption_type' => 'full', 'property_tax_exemption_amount' => null, 'notes' => 'Full exemption for 100% disabled'],
            ['state' => 'KS', 'income_tax_exempt' => true, 'property_tax_min_rating' => 50, 'property_tax_exemption_type' => 'partial', 'property_tax_exemption_amount' => null, 'notes' => 'Refund program for disabled veterans'],
            ['state' => 'KY', 'income_tax_exempt' => true, 'property_tax_min_rating' => 100, 'property_tax_exemption_type' => 'full', 'property_tax_exemption_amount' => null, 'notes' => 'Full exemption for 100% P&T'],
            ['state' => 'LA', 'income_tax_exempt' => true, 'property_tax_min_rating' => 100, 'property_tax_exemption_type' => 'partial', 'property_tax_exemption_amount' => 150000.00, 'notes' => 'Exemption up to $150k assessed value'],
            ['state' => 'ME', 'income_tax_exempt' => true, 'property_tax_min_rating' => 100, 'property_tax_exemption_type' => 'partial', 'property_tax_exemption_amount' => 6000.00, 'notes' => 'Exemption of $6,000 for 100% veterans'],
            ['state' => 'MD', 'income_tax_exempt' => true, 'property_tax_min_rating' => 100, 'property_tax_exemption_type' => 'full', 'property_tax_exemption_amount' => null, 'notes' => 'Full exemption for 100% P&T'],
            ['state' => 'MA', 'income_tax_exempt' => true, 'property_tax_min_rating' => 10, 'property_tax_exemption_type' => 'partial', 'property_tax_exemption_amount' => 2000.00, 'notes' => 'Clause 22 exemptions based on rating'],
            ['state' => 'MI', 'income_tax_exempt' => true, 'property_tax_min_rating' => 100, 'property_tax_exemption_type' => 'full', 'property_tax_exemption_amount' => null, 'notes' => 'Full exemption for 100% disabled'],
            ['state' => 'MN', 'income_tax_exempt' => true, 'property_tax_min_rating' => 70, 'property_tax_exemption_type' => 'partial', 'property_tax_exemption_amount' => 300000.00, 'notes' => 'Up to $300k market value exclusion'],
            ['state' => 'MS', 'income_tax_exempt' => true, 'property_tax_min_rating' => 100, 'property_tax_exemption_type' => 'full', 'property_tax_exemption_amount' => null, 'notes' => 'Full exemption for 100% disabled'],
            ['state' => 'MO', 'income_tax_exempt' => true, 'property_tax_min_rating' => 100, 'property_tax_exemption_type' => 'full', 'property_tax_exemption_amount' => null, 'notes' => 'Full exemption for 100% P&T'],
            ['state' => 'MT', 'income_tax_exempt' => true, 'property_tax_min_rating' => 100, 'property_tax_exemption_type' => 'partial', 'property_tax_exemption_amount' => 200000.00, 'notes' => 'Market value reduction for disabled vets'],
            ['state' => 'NE', 'income_tax_exempt' => true, 'property_tax_min_rating' => 100, 'property_tax_exemption_type' => 'full', 'property_tax_exemption_amount' => null, 'notes' => 'Full exemption for 100% disabled'],
            ['state' => 'NV', 'income_tax_exempt' => true, 'property_tax_min_rating' => 60, 'property_tax_exemption_type' => 'partial', 'property_tax_exemption_amount' => 30800.00, 'notes' => 'No state income tax. Exemption up to $30,800'],
            ['state' => 'NH', 'income_tax_exempt' => true, 'property_tax_min_rating' => 100, 'property_tax_exemption_type' => 'full', 'property_tax_exemption_amount' => null, 'notes' => 'No income tax on wages. Full property exemption for 100% P&T'],
            ['state' => 'NJ', 'income_tax_exempt' => true, 'property_tax_min_rating' => 100, 'property_tax_exemption_type' => 'full', 'property_tax_exemption_amount' => null, 'notes' => 'Full exemption for 100% disabled'],
            ['state' => 'NM', 'income_tax_exempt' => true, 'property_tax_min_rating' => 100, 'property_tax_exemption_type' => 'full', 'property_tax_exemption_amount' => null, 'notes' => 'Full exemption for 100% P&T'],
            ['state' => 'NY', 'income_tax_exempt' => true, 'property_tax_min_rating' => 10, 'property_tax_exemption_type' => 'partial', 'property_tax_exemption_amount' => null, 'notes' => 'Exemption percentage based on rating'],
            ['state' => 'NC', 'income_tax_exempt' => true, 'property_tax_min_rating' => 100, 'property_tax_exemption_type' => 'partial', 'property_tax_exemption_amount' => 45000.00, 'notes' => 'First $45k assessed value exempt'],
            ['state' => 'ND', 'income_tax_exempt' => true, 'property_tax_min_rating' => 50, 'property_tax_exemption_type' => 'partial', 'property_tax_exemption_amount' => 120000.00, 'notes' => 'Credit for disabled veterans'],
            ['state' => 'OH', 'income_tax_exempt' => true, 'property_tax_min_rating' => 100, 'property_tax_exemption_type' => 'full', 'property_tax_exemption_amount' => null, 'notes' => 'Full exemption for 100% P&T'],
            ['state' => 'OK', 'income_tax_exempt' => true, 'property_tax_min_rating' => 100, 'property_tax_exemption_type' => 'full', 'property_tax_exemption_amount' => null, 'notes' => 'Full exemption for 100% disabled'],
            ['state' => 'OR', 'income_tax_exempt' => true, 'property_tax_min_rating' => 40, 'property_tax_exemption_type' => 'partial', 'property_tax_exemption_amount' => 28012.00, 'notes' => 'Exemption up to $28,012 for 40%+ disabled'],
            ['state' => 'PA', 'income_tax_exempt' => true, 'property_tax_min_rating' => 100, 'property_tax_exemption_type' => 'full', 'property_tax_exemption_amount' => null, 'notes' => 'Full exemption for 100% P&T'],
            ['state' => 'RI', 'income_tax_exempt' => true, 'property_tax_min_rating' => 100, 'property_tax_exemption_type' => 'partial', 'property_tax_exemption_amount' => null, 'notes' => 'Varies by municipality'],
            ['state' => 'SC', 'income_tax_exempt' => true, 'property_tax_min_rating' => 100, 'property_tax_exemption_type' => 'full', 'property_tax_exemption_amount' => null, 'notes' => 'Full exemption for 100% P&T'],
            ['state' => 'SD', 'income_tax_exempt' => true, 'property_tax_min_rating' => 100, 'property_tax_exemption_type' => 'partial', 'property_tax_exemption_amount' => 150000.00, 'notes' => 'No state income tax. Exemption up to $150k'],
            ['state' => 'TN', 'income_tax_exempt' => true, 'property_tax_min_rating' => 100, 'property_tax_exemption_type' => 'partial', 'property_tax_exemption_amount' => 175000.00, 'notes' => 'No state income tax. Exemption on first $175k'],
            ['state' => 'TX', 'income_tax_exempt' => true, 'property_tax_min_rating' => 10, 'property_tax_exemption_type' => 'partial', 'property_tax_exemption_amount' => 12000.00, 'notes' => 'No state income tax. Full exemption for 100% disabled'],
            ['state' => 'UT', 'income_tax_exempt' => true, 'property_tax_min_rating' => 10, 'property_tax_exemption_type' => 'partial', 'property_tax_exemption_amount' => null, 'notes' => 'Exemption percentage matches disability rating'],
            ['state' => 'VT', 'income_tax_exempt' => true, 'property_tax_min_rating' => 50, 'property_tax_exemption_type' => 'partial', 'property_tax_exemption_amount' => 40000.00, 'notes' => 'Exemption up to $40k for 50%+ disabled'],
            ['state' => 'VA', 'income_tax_exempt' => true, 'property_tax_min_rating' => 100, 'property_tax_exemption_type' => 'full', 'property_tax_exemption_amount' => null, 'notes' => 'Full exemption for 100% P&T'],
            ['state' => 'WA', 'income_tax_exempt' => true, 'property_tax_min_rating' => 80, 'property_tax_exemption_type' => 'partial', 'property_tax_exemption_amount' => null, 'notes' => 'No state income tax. Property exemption for 80%+'],
            ['state' => 'WV', 'income_tax_exempt' => true, 'property_tax_min_rating' => 100, 'property_tax_exemption_type' => 'full', 'property_tax_exemption_amount' => null, 'notes' => 'Full exemption for 100% P&T'],
            ['state' => 'WI', 'income_tax_exempt' => true, 'property_tax_min_rating' => 100, 'property_tax_exemption_type' => 'full', 'property_tax_exemption_amount' => null, 'notes' => 'Full exemption for 100% disabled'],
            ['state' => 'WY', 'income_tax_exempt' => true, 'property_tax_min_rating' => 100, 'property_tax_exemption_type' => 'partial', 'property_tax_exemption_amount' => null, 'notes' => 'No state income tax. Property exemption for vets'],
            ['state' => 'DC', 'income_tax_exempt' => true, 'property_tax_min_rating' => 100, 'property_tax_exemption_type' => 'partial', 'property_tax_exemption_amount' => 445000.00, 'notes' => 'Homestead deduction for disabled veterans'],
        ];

        foreach ($benefits as $benefit) {
            $benefit['created_at'] = now();
            $benefit['updated_at'] = now();
        }

        StateTaxBenefit::upsert(
            $benefits,
            ['state'],
            ['income_tax_exempt', 'property_tax_min_rating', 'property_tax_exemption_type', 'property_tax_exemption_amount', 'notes', 'updated_at']
        );
    }
}
