<?php

namespace Database\Seeders;

use App\Models\VaDisabilityRate;
use Illuminate\Database\Seeder;

class VaDisabilityRatesSeeder extends Seeder
{
    /**
     * VA disability compensation rates for 2026 (effective Dec 1, 2025).
     * Source: VA.gov official compensation rates
     * https://www.va.gov/disability/compensation-rates/veteran-rates/
     */
    public function run(): void
    {
        $year = 2026;

        // Base rates for veterans with no dependents (2026)
        $baseRates = [
            10 => 180.42,
            20 => 356.66,
            30 => 552.47,
            40 => 795.84,
            50 => 1132.90,
            60 => 1435.02,
            70 => 1808.45,
            80 => 2102.15,
            90 => 2362.30,
            100 => 3938.58,
        ];

        // Rates for veteran with spouse only (no children) - 30%+ only
        $withSpouseRates = [
            30 => 617.47,
            40 => 882.84,
            50 => 1241.90,
            60 => 1566.02,
            70 => 1961.45,
            80 => 2277.15,
            90 => 2559.30,
            100 => 4158.17,
        ];

        // Rates for veteran with spouse and 1 child - 30%+ only
        $withSpouseAnd1ChildRates = [
            30 => 666.47,
            40 => 947.84,
            50 => 1322.90,
            60 => 1663.02,
            70 => 2074.45,
            80 => 2406.15,
            90 => 2704.30,
            100 => 4318.99,
        ];

        // Additional amount per child under 18 (after first child with spouse)
        $additionalChildRates = [
            30 => 32.00,
            40 => 43.00,
            50 => 54.00,
            60 => 65.00,
            70 => 76.00,
            80 => 87.00,
            90 => 98.00,
            100 => 109.11,
        ];

        // Rates for veteran with child only (no spouse) - 30%+ only
        $with1ChildOnlyRates = [
            30 => 596.47,
            40 => 853.84,
            50 => 1205.90,
            60 => 1523.02,
            70 => 1910.45,
            80 => 2219.15,
            90 => 2494.30,
            100 => 4085.43,
        ];

        $records = [];

        foreach ($baseRates as $rating => $baseRate) {
            // For 10-20%, no dependent additions
            if ($rating < 30) {
                for ($dependents = 0; $dependents <= 9; $dependents++) {
                    $records[] = [
                        'rating' => $rating,
                        'dependents' => $dependents,
                        'monthly_rate' => round($baseRate, 2),
                        'year' => $year,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                }

                continue;
            }

            // 30%+ ratings - dependents matter
            for ($dependents = 0; $dependents <= 9; $dependents++) {
                if ($dependents === 0) {
                    // No dependents
                    $monthlyRate = $baseRate;
                } elseif ($dependents === 1) {
                    // Assume 1 dependent = spouse
                    $monthlyRate = $withSpouseRates[$rating];
                } else {
                    // 2+ dependents = spouse + children
                    // Start with spouse + 1 child rate, add additional children
                    $childCount = $dependents - 1; // Subtract spouse
                    $monthlyRate = $withSpouseAnd1ChildRates[$rating];

                    // Add additional children beyond the first
                    if ($childCount > 1) {
                        $monthlyRate += ($childCount - 1) * $additionalChildRates[$rating];
                    }
                }

                $records[] = [
                    'rating' => $rating,
                    'dependents' => $dependents,
                    'monthly_rate' => round($monthlyRate, 2),
                    'year' => $year,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }

        // Clear old data and insert new
        VaDisabilityRate::query()->delete();

        VaDisabilityRate::insert($records);
    }
}
