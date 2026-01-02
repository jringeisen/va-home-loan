<?php

use App\Http\Controllers\CalculatorController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PaymentController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Favicon redirect for browsers that request .ico
Route::get('/favicon.ico', fn () => redirect('/favicon.svg'));

// Home
Route::get('/', fn () => Inertia::render('Home'))->name('home');

// Public calculator routes (guest accessible)
Route::prefix('calculators')->name('calculators.')->group(function () {
    Route::get('/affordability', [CalculatorController::class, 'affordability'])->name('affordability');
    Route::post('/affordability/calculate', [CalculatorController::class, 'calculateAffordability'])->name('affordability.calculate');

    Route::get('/cost-of-living', [CalculatorController::class, 'costOfLiving'])->name('cost-of-living');
    Route::post('/cost-of-living/calculate', [CalculatorController::class, 'calculateCostOfLiving'])->name('cost-of-living.calculate');

    Route::get('/disability', [CalculatorController::class, 'disability'])->name('disability');
    Route::post('/disability/calculate', [CalculatorController::class, 'calculateDisability'])->name('disability.calculate');
});

// Authenticated routes
Route::middleware(['auth'])->group(function () {
    // Save/delete calculations
    Route::post('/calculations', [CalculatorController::class, 'store'])->name('calculations.store');
    Route::delete('/calculations/{calculation}', [CalculatorController::class, 'destroy'])->name('calculations.destroy');

    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/dashboard/calculations', [DashboardController::class, 'calculations'])->name('dashboard.calculations');
    Route::get('/dashboard/settings', [DashboardController::class, 'settings'])->name('dashboard.settings');

    // Support (one-time payment)
    Route::get('/support', [PaymentController::class, 'index'])->name('support.index');
    Route::post('/support/checkout', [PaymentController::class, 'checkout'])->name('support.checkout');
    Route::get('/support/thank-you', [PaymentController::class, 'success'])->name('support.success');
});
