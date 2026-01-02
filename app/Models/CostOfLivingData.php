<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CostOfLivingData extends Model
{
    protected $table = 'cost_of_living_data';

    protected $fillable = [
        'state',
        'category',
        'index',
        'median_value',
        'year',
    ];

    protected function casts(): array
    {
        return [
            'index' => 'decimal:2',
            'median_value' => 'decimal:2',
            'year' => 'integer',
        ];
    }

    public function scopeForState($query, string $state)
    {
        return $query->where('state', strtoupper($state));
    }

    public function scopeForYear($query, int $year)
    {
        return $query->where('year', $year);
    }

    public function scopeForCategory($query, string $category)
    {
        return $query->where('category', $category);
    }

    public static function getStateComparison(string $fromState, string $toState, ?int $year = null): array
    {
        $year = $year ?? now()->year;

        $fromData = static::forState($fromState)->forYear($year)->get()->keyBy('category');
        $toData = static::forState($toState)->forYear($year)->get()->keyBy('category');

        $categories = ['housing', 'utilities', 'transportation', 'healthcare', 'taxes'];
        $comparison = [];

        foreach ($categories as $category) {
            $fromIndex = $fromData->get($category)?->index ?? 100;
            $toIndex = $toData->get($category)?->index ?? 100;

            $comparison[$category] = [
                'from_index' => $fromIndex,
                'to_index' => $toIndex,
                'difference' => round($toIndex - $fromIndex, 2),
                'percentage_change' => $fromIndex > 0 ? round((($toIndex - $fromIndex) / $fromIndex) * 100, 2) : 0,
            ];
        }

        return $comparison;
    }
}
