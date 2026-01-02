<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VaDisabilityRate extends Model
{
    protected $fillable = [
        'rating',
        'dependents',
        'monthly_rate',
        'year',
    ];

    protected function casts(): array
    {
        return [
            'rating' => 'integer',
            'dependents' => 'integer',
            'monthly_rate' => 'decimal:2',
            'year' => 'integer',
        ];
    }

    public function scopeForRating($query, int $rating)
    {
        return $query->where('rating', $rating);
    }

    public function scopeForDependents($query, int $dependents)
    {
        return $query->where('dependents', $dependents);
    }

    public function scopeForYear($query, int $year)
    {
        return $query->where('year', $year);
    }

    public static function getMonthlyRate(int $rating, int $dependents = 0, ?int $year = null): ?float
    {
        $year = $year ?? now()->year;

        // Clamp dependents to max stored value (usually 5+)
        $dependents = min($dependents, 5);

        $rate = static::forRating($rating)
            ->forDependents($dependents)
            ->forYear($year)
            ->first();

        return $rate?->monthly_rate;
    }

    public static function getAnnualCompensation(int $rating, int $dependents = 0, ?int $year = null): ?float
    {
        $monthlyRate = static::getMonthlyRate($rating, $dependents, $year);

        return $monthlyRate ? $monthlyRate * 12 : null;
    }
}
