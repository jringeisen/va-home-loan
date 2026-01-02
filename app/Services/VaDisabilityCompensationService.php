<?php

namespace App\Services;

use App\Models\VaDisabilityRate;

class VaDisabilityCompensationService
{
    /**
     * 2025 VA Disability Compensation Rates (effective Dec 1, 2024).
     * Source: va.gov/disability/compensation-rates/veteran-rates/
     */
    private const BASE_RATES = [
        10 => 175.51,
        20 => 347.06,
        30 => 537.62,
        40 => 774.44,
        50 => 1102.73,
        60 => 1395.93,
        70 => 1759.77,
        80 => 2045.59,
        90 => 2297.96,
        100 => 3832.72,
    ];

    /**
     * Rates for veteran with spouse only (no children) - 30%+ only.
     */
    private const WITH_SPOUSE_RATES = [
        30 => 601.62,
        40 => 859.44,
        50 => 1208.73,
        60 => 1522.93,
        70 => 1907.77,
        80 => 2214.59,
        90 => 2489.96,
        100 => 4044.51,
    ];

    /**
     * Rates for veteran with spouse and 1 child - 30%+ only.
     */
    private const WITH_SPOUSE_AND_CHILD_RATES = [
        30 => 649.62,
        40 => 921.44,
        50 => 1284.73,
        60 => 1612.93,
        70 => 2011.77,
        80 => 2332.59,
        90 => 2630.96,
        100 => 4198.44,
    ];

    /**
     * Additional amount per child under 18 (after first child).
     */
    private const ADDITIONAL_CHILD_RATES = [
        30 => 32.00,
        40 => 43.00,
        50 => 54.00,
        60 => 65.00,
        70 => 75.00,
        80 => 86.00,
        90 => 95.00,
        100 => 108.47,
    ];

    /**
     * Rates for veteran with child only (no spouse) - 30%+ only.
     */
    private const WITH_CHILD_ONLY_RATES = [
        30 => 580.62,
        40 => 831.44,
        50 => 1173.73,
        60 => 1480.93,
        70 => 1858.77,
        80 => 2158.59,
        90 => 2425.96,
        100 => 4026.65,
    ];

    /**
     * Get monthly compensation for a given rating with dependents.
     */
    public function getMonthlyCompensation(int $rating, bool $hasSpouse = false, int $childrenCount = 0): float
    {
        $normalizedRating = $this->normalizeRating($rating);

        if ($normalizedRating === 0) {
            return 0;
        }

        // Calculate total dependents for database lookup
        $totalDependents = ($hasSpouse ? 1 : 0) + $childrenCount;

        // Try database first
        $dbRate = $this->getFromDatabase($normalizedRating, $totalDependents);
        if ($dbRate !== null) {
            return $dbRate;
        }

        // Fall back to calculated rate from constants
        return $this->calculateFromConstants($normalizedRating, $hasSpouse, $childrenCount);
    }

    /**
     * Get monthly compensation using total dependents count.
     * Assumes first dependent is spouse if dependents > 0.
     */
    public function getMonthlyCompensationByDependents(int $rating, int $dependents): float
    {
        $normalizedRating = $this->normalizeRating($rating);

        if ($normalizedRating === 0) {
            return 0;
        }

        // Try database first
        $dbRate = $this->getFromDatabase($normalizedRating, $dependents);
        if ($dbRate !== null) {
            return $dbRate;
        }

        // Fall back to calculated rate (assume first dependent is spouse)
        $hasSpouse = $dependents > 0;
        $childrenCount = max(0, $dependents - 1);

        return $this->calculateFromConstants($normalizedRating, $hasSpouse, $childrenCount);
    }

    /**
     * Normalize rating to nearest valid 10% increment.
     */
    public function normalizeRating(int $rating): int
    {
        $rating = max(0, min(100, $rating));

        return (int) (round($rating / 10) * 10);
    }

    /**
     * Check if veteran is exempt from VA funding fee (10%+ rating).
     */
    public function isExemptFromFundingFee(int $rating): bool
    {
        return $rating >= 10;
    }

    /**
     * Get base rate (no dependents) for a rating.
     */
    public function getBaseRate(int $rating): float
    {
        $normalizedRating = $this->normalizeRating($rating);

        return self::BASE_RATES[$normalizedRating] ?? 0;
    }

    private function getFromDatabase(int $rating, int $dependents): ?float
    {
        $dbRate = VaDisabilityRate::where('rating', $rating)
            ->where('dependents', min($dependents, 9))
            ->orderBy('year', 'desc')
            ->first();

        return $dbRate ? (float) $dbRate->monthly_rate : null;
    }

    private function calculateFromConstants(int $rating, bool $hasSpouse, int $childrenCount): float
    {
        // 10-20% ratings don't get dependent additions
        if ($rating < 30) {
            return self::BASE_RATES[$rating] ?? 0;
        }

        // No dependents
        if (! $hasSpouse && $childrenCount === 0) {
            return self::BASE_RATES[$rating] ?? 0;
        }

        // Spouse only
        if ($hasSpouse && $childrenCount === 0) {
            return self::WITH_SPOUSE_RATES[$rating] ?? 0;
        }

        // Children only (no spouse)
        if (! $hasSpouse && $childrenCount > 0) {
            $baseWithChild = self::WITH_CHILD_ONLY_RATES[$rating] ?? 0;
            $additionalChildren = max(0, $childrenCount - 1);

            return $baseWithChild + ($additionalChildren * (self::ADDITIONAL_CHILD_RATES[$rating] ?? 0));
        }

        // Spouse + children
        $baseWithSpouseAndChild = self::WITH_SPOUSE_AND_CHILD_RATES[$rating] ?? 0;
        $additionalChildren = max(0, $childrenCount - 1);

        return $baseWithSpouseAndChild + ($additionalChildren * (self::ADDITIONAL_CHILD_RATES[$rating] ?? 0));
    }
}
