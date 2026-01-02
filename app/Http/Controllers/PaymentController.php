<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Cashier\Cashier;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse;

class PaymentController extends Controller
{
    private const MIN_AMOUNT_CENTS = 500; // $5.00 minimum

    public function index(Request $request): Response
    {
        $user = $request->user();

        return Inertia::render('Support/Index', [
            'hasPaid' => $user->hasPaid(),
            'suggestedAmounts' => [5, 10, 20],
            'minAmount' => 5,
        ]);
    }

    public function checkout(Request $request): SymfonyResponse
    {
        $validated = $request->validate([
            'amount' => ['required', 'numeric', 'min:5'],
        ]);

        $amountCents = (int) ($validated['amount'] * 100);

        if ($amountCents < self::MIN_AMOUNT_CENTS) {
            return back()->with('error', 'Minimum amount is $5.');
        }

        $user = $request->user();

        // Create or get Stripe customer
        $user->createOrGetStripeCustomer();

        // Create Stripe Checkout session with dynamic pricing
        $session = Cashier::stripe()->checkout->sessions->create([
            'customer' => $user->stripe_id,
            'payment_method_types' => ['card'],
            'line_items' => [[
                'price_data' => [
                    'currency' => 'usd',
                    'unit_amount' => $amountCents,
                    'product_data' => [
                        'name' => 'VA Home Loan Calculator - Lifetime Access',
                        'description' => 'One-time payment to support the site and unlock unlimited calculation saves.',
                    ],
                ],
                'quantity' => 1,
            ]],
            'mode' => 'payment',
            'success_url' => route('support.success').'?session_id={CHECKOUT_SESSION_ID}',
            'cancel_url' => route('support.index'),
            'metadata' => [
                'user_id' => $user->id,
                'amount_cents' => $amountCents,
            ],
        ]);

        // Use Inertia::location for external redirects to avoid CORS issues
        return Inertia::location($session->url);
    }

    public function success(Request $request): Response|RedirectResponse
    {
        $sessionId = $request->query('session_id');

        if (! $sessionId) {
            return redirect()->route('support.index');
        }

        // Retrieve the checkout session from Stripe
        $session = Cashier::stripe()->checkout->sessions->retrieve($sessionId);

        if ($session->payment_status === 'paid') {
            $user = $request->user();

            // Mark user as paid if not already
            if (! $user->hasPaid()) {
                $user->update([
                    'paid_at' => now(),
                    'payment_amount' => $session->amount_total,
                ]);
            }

            return Inertia::render('Support/ThankYou', [
                'amount' => $session->amount_total / 100,
            ]);
        }

        return redirect()->route('support.index')->with('error', 'Payment was not completed.');
    }
}
