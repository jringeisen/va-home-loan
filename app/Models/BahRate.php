<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BahRate extends Model
{
    protected $fillable = [
        'zip_code',
        'mha',
        'state',
        'pay_grade',
        'with_dependents',
        'rate',
        'year',
    ];

    protected function casts(): array
    {
        return [
            'with_dependents' => 'boolean',
            'rate' => 'decimal:2',
            'year' => 'integer',
        ];
    }

    public function scopeForZipCode($query, string $zipCode)
    {
        return $query->where('zip_code', $zipCode);
    }

    public function scopeForPayGrade($query, string $payGrade)
    {
        return $query->where('pay_grade', strtoupper($payGrade));
    }

    public function scopeWithDependents($query, bool $hasDependents = true)
    {
        return $query->where('with_dependents', $hasDependents);
    }

    public function scopeForYear($query, int $year)
    {
        return $query->where('year', $year);
    }

    public static function getRateForLocation(string $zipCode, string $payGrade, bool $withDependents, ?int $year = null): ?float
    {
        $year = $year ?? now()->year;

        $rate = static::forZipCode($zipCode)
            ->forPayGrade($payGrade)
            ->withDependents($withDependents)
            ->forYear($year)
            ->first();

        return $rate?->rate;
    }
}
