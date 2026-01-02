<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();

        $recentCalculations = $user->calculations()
            ->latest()
            ->take(5)
            ->get();

        $calculationCounts = [
            'affordability' => $user->calculations()->affordability()->count(),
            'cost_of_living' => $user->calculations()->costOfLiving()->count(),
            'disability' => $user->calculations()->disability()->count(),
        ];

        return Inertia::render('Dashboard/Index', [
            'recentCalculations' => $recentCalculations,
            'calculationCounts' => $calculationCounts,
            'hasPaid' => $user->hasPaid(),
        ]);
    }

    public function calculations(Request $request): Response
    {
        $user = $request->user();

        $calculations = $user->calculations()
            ->latest()
            ->paginate(10);

        return Inertia::render('Dashboard/Calculations', [
            'calculations' => $calculations,
        ]);
    }

    public function settings(Request $request): Response
    {
        return Inertia::render('Dashboard/Settings', [
            'user' => $request->user()->only(['id', 'name', 'email']),
        ]);
    }
}
