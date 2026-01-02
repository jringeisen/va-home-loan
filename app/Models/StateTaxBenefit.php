<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StateTaxBenefit extends Model
{
    protected $fillable = [
        'state',
        'income_tax_exempt',
        'property_tax_min_rating',
        'property_tax_exemption_type',
        'property_tax_exemption_amount',
        'notes',
    ];

    protected function casts(): array
    {
        return [
            'income_tax_exempt' => 'boolean',
            'property_tax_min_rating' => 'integer',
            'property_tax_exemption_amount' => 'decimal:2',
        ];
    }

    public function scopeForState($query, string $state)
    {
        return $query->where('state', strtoupper($state));
    }

    public function scopeWithIncomeTaxExemption($query)
    {
        return $query->where('income_tax_exempt', true);
    }

    public function scopeWithPropertyTaxExemption($query)
    {
        return $query->whereNotNull('property_tax_min_rating');
    }

    public static function getBenefitsForState(string $state): ?self
    {
        return static::forState($state)->first();
    }

    public function qualifiesForPropertyTaxExemption(int $rating): bool
    {
        if (is_null($this->property_tax_min_rating)) {
            return false;
        }

        return $rating >= $this->property_tax_min_rating;
    }

    public function getPropertyTaxExemptionDescription(): ?string
    {
        if (is_null($this->property_tax_exemption_type)) {
            return null;
        }

        return match ($this->property_tax_exemption_type) {
            'full' => 'Full property tax exemption',
            'partial' => "Partial exemption up to $" . number_format($this->property_tax_exemption_amount, 0),
            'percentage' => $this->property_tax_exemption_amount . '% exemption',
            default => $this->notes,
        };
    }
}
