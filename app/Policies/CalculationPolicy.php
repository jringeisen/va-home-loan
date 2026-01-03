<?php

namespace App\Policies;

use App\Models\Calculation;
use App\Models\User;

class CalculationPolicy
{
    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->canSaveCalculations();
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Calculation $calculation): bool
    {
        return $calculation->user_id === $user->id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Calculation $calculation): bool
    {
        return $calculation->user_id === $user->id;
    }
}
