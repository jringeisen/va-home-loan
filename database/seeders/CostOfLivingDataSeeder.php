<?php

namespace Database\Seeders;

use App\Models\CostOfLivingData;
use Illuminate\Database\Seeder;

class CostOfLivingDataSeeder extends Seeder
{
    /**
     * Cost of living indices by state (100 = national average).
     *
     * Data Sources:
     * - MERIC (Missouri Economic Research and Information Center) Q3 2025
     *   https://meric.mo.gov/data/cost-living-data-series
     *   Categories: grocery, housing, utilities, transportation, health, misc
     *
     * - WalletHub 2025 State Tax Burden Study
     *   https://wallethub.com/edu/states-with-highest-lowest-tax-burden/20494
     *   Category: taxes (converted from % of income to index, 100 = 8.82% average)
     */
    public function run(): void
    {
        $year = 2025;

        // State cost of living data - 7 categories
        // MERIC Q3 2025: grocery, housing, utilities, transportation, health, misc
        // WalletHub 2025: taxes
        $stateData = [
            'AL' => ['grocery' => 97.7, 'housing' => 71.1, 'utilities' => 97.1, 'transportation' => 88.5, 'health' => 88.6, 'misc' => 94.8, 'taxes' => 90.6],
            'AK' => ['grocery' => 94.9, 'housing' => 126.1, 'utilities' => 158.8, 'transportation' => 105.8, 'health' => 125.4, 'misc' => 99.3, 'taxes' => 55.9],
            'AZ' => ['grocery' => 95.6, 'housing' => 120.9, 'utilities' => 104.4, 'transportation' => 102.7, 'health' => 94.8, 'misc' => 97.5, 'taxes' => 93.2],
            'AR' => ['grocery' => 95.9, 'housing' => 66.3, 'utilities' => 97.7, 'transportation' => 92.4, 'health' => 85.5, 'misc' => 93.9, 'taxes' => 97.6],
            'CA' => ['grocery' => 107.0, 'housing' => 188.6, 'utilities' => 134.7, 'transportation' => 126.7, 'health' => 105.6, 'misc' => 102.7, 'taxes' => 124.7],
            'CO' => ['grocery' => 99.1, 'housing' => 131.7, 'utilities' => 93.1, 'transportation' => 102.2, 'health' => 99.1, 'misc' => 101.9, 'taxes' => 99.0],
            'CT' => ['grocery' => 102.7, 'housing' => 121.4, 'utilities' => 131.7, 'transportation' => 109.9, 'health' => 106.2, 'misc' => 105.4, 'taxes' => 112.2],
            'DE' => ['grocery' => 105.9, 'housing' => 100.6, 'utilities' => 109.4, 'transportation' => 108.5, 'health' => 103.7, 'misc' => 101.6, 'taxes' => 73.9],
            'FL' => ['grocery' => 102.8, 'housing' => 119.4, 'utilities' => 101.4, 'transportation' => 106.7, 'health' => 98.2, 'misc' => 100.4, 'taxes' => 73.6],
            'GA' => ['grocery' => 98.1, 'housing' => 89.9, 'utilities' => 96.6, 'transportation' => 95.9, 'health' => 93.8, 'misc' => 95.0, 'taxes' => 96.0],
            'HI' => ['grocery' => 130.0, 'housing' => 272.2, 'utilities' => 156.6, 'transportation' => 134.2, 'health' => 108.5, 'misc' => 116.5, 'taxes' => 157.8],
            'ID' => ['grocery' => 96.1, 'housing' => 108.5, 'utilities' => 86.7, 'transportation' => 94.9, 'health' => 98.9, 'misc' => 96.9, 'taxes' => 85.5],
            'IL' => ['grocery' => 99.2, 'housing' => 96.0, 'utilities' => 101.9, 'transportation' => 108.9, 'health' => 98.9, 'misc' => 99.3, 'taxes' => 115.9],
            'IN' => ['grocery' => 97.9, 'housing' => 76.8, 'utilities' => 100.0, 'transportation' => 95.4, 'health' => 97.5, 'misc' => 96.5, 'taxes' => 103.1],
            'IA' => ['grocery' => 97.2, 'housing' => 75.8, 'utilities' => 100.7, 'transportation' => 96.9, 'health' => 95.9, 'misc' => 95.7, 'taxes' => 104.6],
            'KS' => ['grocery' => 96.0, 'housing' => 72.9, 'utilities' => 102.9, 'transportation' => 95.9, 'health' => 97.3, 'misc' => 92.9, 'taxes' => 105.8],
            'KY' => ['grocery' => 96.7, 'housing' => 72.5, 'utilities' => 95.6, 'transportation' => 93.9, 'health' => 88.8, 'misc' => 95.2, 'taxes' => 101.2],
            'LA' => ['grocery' => 98.5, 'housing' => 79.7, 'utilities' => 84.9, 'transportation' => 97.2, 'health' => 97.9, 'misc' => 97.8, 'taxes' => 101.4],
            'ME' => ['grocery' => 101.0, 'housing' => 113.6, 'utilities' => 114.7, 'transportation' => 105.7, 'health' => 109.7, 'misc' => 103.7, 'taxes' => 120.6],
            'MD' => ['grocery' => 106.1, 'housing' => 148.7, 'utilities' => 114.5, 'transportation' => 110.3, 'health' => 101.0, 'misc' => 102.1, 'taxes' => 113.8],
            'MA' => ['grocery' => 104.2, 'housing' => 165.8, 'utilities' => 124.6, 'transportation' => 108.3, 'health' => 113.7, 'misc' => 107.8, 'taxes' => 108.5],
            'MI' => ['grocery' => 95.7, 'housing' => 86.7, 'utilities' => 101.6, 'transportation' => 99.9, 'health' => 94.0, 'misc' => 97.2, 'taxes' => 93.5],
            'MN' => ['grocery' => 100.9, 'housing' => 102.9, 'utilities' => 98.8, 'transportation' => 102.1, 'health' => 103.7, 'misc' => 101.9, 'taxes' => 110.2],
            'MS' => ['grocery' => 98.0, 'housing' => 62.2, 'utilities' => 91.2, 'transportation' => 91.6, 'health' => 89.7, 'misc' => 93.9, 'taxes' => 102.7],
            'MO' => ['grocery' => 96.3, 'housing' => 76.7, 'utilities' => 102.8, 'transportation' => 93.9, 'health' => 93.7, 'misc' => 94.5, 'taxes' => 88.8],
            'MT' => ['grocery' => 98.7, 'housing' => 119.5, 'utilities' => 86.3, 'transportation' => 96.7, 'health' => 103.9, 'misc' => 99.4, 'taxes' => 89.2],
            'NE' => ['grocery' => 97.6, 'housing' => 86.9, 'utilities' => 93.9, 'transportation' => 94.9, 'health' => 98.9, 'misc' => 95.5, 'taxes' => 99.5],
            'NV' => ['grocery' => 101.6, 'housing' => 127.9, 'utilities' => 92.9, 'transportation' => 112.7, 'health' => 100.6, 'misc' => 101.1, 'taxes' => 97.7],
            'NH' => ['grocery' => 102.3, 'housing' => 129.7, 'utilities' => 118.9, 'transportation' => 102.8, 'health' => 109.6, 'misc' => 104.9, 'taxes' => 67.3],
            'NJ' => ['grocery' => 104.9, 'housing' => 148.9, 'utilities' => 108.5, 'transportation' => 111.9, 'health' => 104.9, 'misc' => 103.8, 'taxes' => 116.8],
            'NM' => ['grocery' => 98.1, 'housing' => 95.7, 'utilities' => 91.7, 'transportation' => 98.5, 'health' => 95.6, 'misc' => 98.1, 'taxes' => 109.1],
            'NY' => ['grocery' => 106.4, 'housing' => 155.0, 'utilities' => 117.9, 'transportation' => 115.3, 'health' => 106.8, 'misc' => 108.0, 'taxes' => 153.7],
            'NC' => ['grocery' => 97.5, 'housing' => 94.5, 'utilities' => 99.0, 'transportation' => 96.1, 'health' => 102.6, 'misc' => 96.3, 'taxes' => 92.7],
            'ND' => ['grocery' => 99.7, 'housing' => 85.2, 'utilities' => 96.2, 'transportation' => 97.5, 'health' => 103.6, 'misc' => 95.5, 'taxes' => 74.9],
            'OH' => ['grocery' => 98.2, 'housing' => 70.7, 'utilities' => 97.4, 'transportation' => 97.3, 'health' => 94.7, 'misc' => 96.6, 'taxes' => 106.1],
            'OK' => ['grocery' => 96.6, 'housing' => 66.0, 'utilities' => 98.3, 'transportation' => 93.2, 'health' => 93.4, 'misc' => 94.1, 'taxes' => 79.5],
            'OR' => ['grocery' => 101.9, 'housing' => 148.7, 'utilities' => 89.7, 'transportation' => 114.9, 'health' => 107.3, 'misc' => 103.9, 'taxes' => 102.7],
            'PA' => ['grocery' => 102.5, 'housing' => 91.8, 'utilities' => 108.5, 'transportation' => 104.5, 'health' => 97.0, 'misc' => 98.8, 'taxes' => 97.3],
            'RI' => ['grocery' => 103.0, 'housing' => 129.9, 'utilities' => 115.6, 'transportation' => 106.1, 'health' => 107.1, 'misc' => 104.9, 'taxes' => 114.3],
            'SC' => ['grocery' => 98.7, 'housing' => 88.9, 'utilities' => 103.7, 'transportation' => 95.0, 'health' => 99.5, 'misc' => 96.9, 'taxes' => 92.4],
            'SD' => ['grocery' => 99.5, 'housing' => 96.9, 'utilities' => 96.8, 'transportation' => 96.8, 'health' => 103.9, 'misc' => 99.5, 'taxes' => 73.2],
            'TN' => ['grocery' => 96.4, 'housing' => 86.9, 'utilities' => 96.7, 'transportation' => 93.9, 'health' => 91.9, 'misc' => 93.9, 'taxes' => 72.3],
            'TX' => ['grocery' => 95.7, 'housing' => 87.3, 'utilities' => 103.9, 'transportation' => 98.0, 'health' => 95.4, 'misc' => 95.3, 'taxes' => 88.1],
            'UT' => ['grocery' => 96.1, 'housing' => 122.9, 'utilities' => 82.5, 'transportation' => 99.5, 'health' => 95.1, 'misc' => 99.5, 'taxes' => 107.3],
            'VT' => ['grocery' => 102.5, 'housing' => 127.6, 'utilities' => 119.9, 'transportation' => 103.4, 'health' => 110.5, 'misc' => 105.7, 'taxes' => 130.7],
            'VA' => ['grocery' => 99.2, 'housing' => 116.1, 'utilities' => 103.0, 'transportation' => 101.9, 'health' => 95.8, 'misc' => 96.7, 'taxes' => 100.5],
            'WA' => ['grocery' => 104.3, 'housing' => 158.4, 'utilities' => 93.9, 'transportation' => 117.4, 'health' => 108.5, 'misc' => 106.9, 'taxes' => 97.6],
            'WV' => ['grocery' => 98.8, 'housing' => 63.6, 'utilities' => 97.5, 'transportation' => 97.7, 'health' => 93.1, 'misc' => 97.4, 'taxes' => 100.3],
            'WI' => ['grocery' => 98.5, 'housing' => 93.9, 'utilities' => 104.6, 'transportation' => 98.8, 'health' => 99.3, 'misc' => 98.7, 'taxes' => 94.2],
            'WY' => ['grocery' => 97.5, 'housing' => 96.9, 'utilities' => 88.1, 'transportation' => 98.5, 'health' => 100.7, 'misc' => 97.2, 'taxes' => 65.6],
            'DC' => ['grocery' => 109.4, 'housing' => 236.7, 'utilities' => 108.7, 'transportation' => 117.6, 'health' => 107.0, 'misc' => 109.9, 'taxes' => 107.7],
        ];

        // Median values for reference (national averages)
        $medianValues = [
            'grocery' => 600.00,        // Monthly grocery cost
            'housing' => 350000.00,     // Median home price
            'utilities' => 200.00,      // Monthly utilities
            'transportation' => 750.00, // Monthly transportation
            'health' => 500.00,         // Monthly healthcare
            'misc' => 400.00,           // Monthly miscellaneous
            'taxes' => 800.00,          // Monthly effective tax impact
        ];

        $records = [];

        foreach ($stateData as $state => $categories) {
            foreach ($categories as $category => $index) {
                $records[] = [
                    'state' => $state,
                    'category' => $category,
                    'index' => $index,
                    'median_value' => round(($medianValues[$category] ?? 0) * ($index / 100), 2),
                    'year' => $year,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }

        CostOfLivingData::upsert(
            $records,
            ['state', 'category', 'year'],
            ['index', 'median_value', 'updated_at']
        );
    }
}
