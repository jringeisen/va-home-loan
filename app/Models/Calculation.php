<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Calculation extends Model
{
    /** @use HasFactory<\Database\Factories\CalculationFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'type',
        'name',
        'inputs',
        'results',
    ];

    protected function casts(): array
    {
        return [
            'inputs' => 'array',
            'results' => 'array',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function scopeOfType($query, string $type)
    {
        return $query->where('type', $type);
    }

    public function scopeAffordability($query)
    {
        return $query->ofType('affordability');
    }

    public function scopeCostOfLiving($query)
    {
        return $query->ofType('cost_of_living');
    }

    public function scopeDisability($query)
    {
        return $query->ofType('disability');
    }
}
