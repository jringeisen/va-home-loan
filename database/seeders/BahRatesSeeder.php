<?php

namespace Database\Seeders;

use App\Models\BahRate;
use Illuminate\Database\Seeder;

class BahRatesSeeder extends Seeder
{
    /**
     * Sample BAH (Basic Allowance for Housing) rates for major military areas.
     * Source: Defense Travel Management Office (DTMO) 2024 rates
     */
    public function run(): void
    {
        $year = 2024;

        // Major military housing areas with representative zip codes
        // Format: [zip_code, mha, state, base_rate_without_dependents, base_rate_with_dependents]
        $locations = [
            ['22314', 'Washington DC', 'VA', 2500, 3100],      // Pentagon area
            ['23502', 'Norfolk', 'VA', 1950, 2400],             // Naval Station Norfolk
            ['92101', 'San Diego', 'CA', 2850, 3500],           // Naval Base San Diego
            ['96860', 'Honolulu', 'HI', 3200, 3900],            // Joint Base Pearl Harbor-Hickam
            ['80913', 'Colorado Springs', 'CO', 1800, 2250],    // Fort Carson
            ['31098', 'Warner Robins', 'GA', 1350, 1700],       // Robins AFB
            ['73503', 'Lawton', 'OK', 1200, 1500],              // Fort Sill
            ['28307', 'Fayetteville', 'NC', 1300, 1650],        // Fort Bragg
            ['78234', 'San Antonio', 'TX', 1550, 1950],         // JBSA
            ['32403', 'Panama City', 'FL', 1400, 1750],         // Tyndall AFB
            ['89101', 'Las Vegas', 'NV', 1700, 2100],           // Nellis AFB
            ['85707', 'Tucson', 'AZ', 1350, 1700],              // Davis-Monthan AFB
            ['98433', 'Tacoma', 'WA', 2100, 2600],              // JBLM
            ['99506', 'Anchorage', 'AK', 2200, 2700],           // JBER
            ['63118', 'St. Louis', 'MO', 1400, 1750],           // Scott AFB area
            ['68113', 'Omaha', 'NE', 1500, 1850],               // Offutt AFB
            ['21201', 'Baltimore', 'MD', 2100, 2600],           // Fort Meade area
            ['02138', 'Boston', 'MA', 2800, 3450],              // Hanscom AFB area
            ['10001', 'New York', 'NY', 3200, 3900],            // NYC area
            ['60601', 'Chicago', 'IL', 2000, 2450],             // Great Lakes
        ];

        // Pay grade multipliers (approximate ratios based on typical BAH tables)
        $payGradeMultipliers = [
            'E-1' => 0.70,
            'E-2' => 0.72,
            'E-3' => 0.75,
            'E-4' => 0.80,
            'E-5' => 0.85,
            'E-6' => 0.90,
            'E-7' => 0.95,
            'E-8' => 1.00,
            'E-9' => 1.05,
            'W-1' => 0.92,
            'W-2' => 0.96,
            'W-3' => 1.00,
            'W-4' => 1.05,
            'W-5' => 1.10,
            'O-1' => 0.90,
            'O-2' => 0.95,
            'O-3' => 1.00,
            'O-4' => 1.08,
            'O-5' => 1.15,
            'O-6' => 1.22,
            'O-7' => 1.30,
            'O-8' => 1.35,
            'O-9' => 1.40,
            'O-10' => 1.45,
        ];

        $records = [];

        foreach ($locations as [$zipCode, $mha, $state, $baseWithout, $baseWith]) {
            foreach ($payGradeMultipliers as $payGrade => $multiplier) {
                // Without dependents
                $records[] = [
                    'zip_code' => $zipCode,
                    'mha' => $mha,
                    'state' => $state,
                    'pay_grade' => $payGrade,
                    'with_dependents' => false,
                    'rate' => round($baseWithout * $multiplier, 2),
                    'year' => $year,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];

                // With dependents
                $records[] = [
                    'zip_code' => $zipCode,
                    'mha' => $mha,
                    'state' => $state,
                    'pay_grade' => $payGrade,
                    'with_dependents' => true,
                    'rate' => round($baseWith * $multiplier, 2),
                    'year' => $year,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }

        // Insert in chunks to avoid memory issues
        foreach (array_chunk($records, 500) as $chunk) {
            BahRate::insert($chunk);
        }
    }
}
