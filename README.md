# VA Home Loan Calculator

A web application providing veterans with financial planning calculators that leverage their VA benefits. Built with Laravel 12, Inertia.js, and Vue 3.

## Features

### Calculators

- **VA Loan Affordability Calculator** - Calculate maximum home purchase price based on income, debts, and VA loan benefits. Includes VA disability income, funding fee calculations, and no PMI savings.

- **Cost of Living Comparison** - Compare cost of living between states with category breakdowns (housing, utilities, transportation, healthcare). Includes BAH rate comparisons for active duty military.

- **Disability Rating Impact Calculator** - Calculate monthly VA disability compensation based on rating and dependents. Shows state-specific tax benefits and property tax exemptions.

### User Features

- Guest access to all calculators (no account required)
- Save unlimited calculations with a one-time "pay what you want" contribution ($5 minimum)
- Dashboard to view and manage saved calculations
- Secure authentication with Laravel Fortify

## Tech Stack

- **Backend:** Laravel 12, PHP 8.3
- **Frontend:** Vue 3, Inertia.js, TailwindCSS v4
- **Authentication:** Laravel Fortify
- **Payments:** Stripe (via Laravel Cashier)
- **Database:** MySQL

## Installation

### Prerequisites

- PHP 8.3+
- Composer
- Node.js 18+
- MySQL

### Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd va-home-loan
   ```

2. Install PHP dependencies:
   ```bash
   composer install
   ```

3. Install Node dependencies:
   ```bash
   npm install
   ```

4. Copy the environment file and configure:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

5. Configure your `.env` file:
   ```env
   DB_DATABASE=va_home_loan
   DB_USERNAME=your_username
   DB_PASSWORD=your_password

   STRIPE_KEY=pk_test_...
   STRIPE_SECRET=sk_test_...
   ```

6. Run migrations and seeders:
   ```bash
   php artisan migrate
   php artisan db:seed
   ```

7. Build frontend assets:
   ```bash
   npm run build
   ```

8. Start the development server:
   ```bash
   php artisan serve
   ```

## Development

Run the development server with hot reloading:

```bash
composer run dev
```

Or run separately:

```bash
php artisan serve
npm run dev
```

### Running Tests

```bash
php artisan test
```

### Code Formatting

```bash
vendor/bin/pint
```

## Project Structure

```
app/
├── Http/Controllers/
│   ├── CalculatorController.php    # Calculator pages and API
│   ├── DashboardController.php     # User dashboard
│   └── PaymentController.php       # Stripe one-time payments
├── Models/
│   ├── User.php
│   ├── Calculation.php             # Saved calculations
│   ├── VaDisabilityRate.php        # VA compensation rates
│   ├── StateTaxBenefit.php         # State veteran benefits
│   └── CostOfLivingData.php        # State COL indices
└── Services/
    ├── VaDisabilityCompensationService.php  # Shared disability calc logic
    └── Calculators/
        ├── VaLoanAffordabilityCalculator.php
        ├── CostOfLivingCalculator.php
        └── DisabilityImpactCalculator.php

resources/js/
├── Pages/
│   ├── Calculators/
│   │   ├── Affordability.vue
│   │   ├── CostOfLiving.vue
│   │   └── Disability.vue
│   ├── Dashboard/
│   │   ├── Index.vue
│   │   ├── Calculations.vue
│   │   └── Settings.vue
│   └── Support/
│       ├── Index.vue               # Pay what you want page
│       └── ThankYou.vue
└── Components/
    └── Layout/
        ├── AppLayout.vue
        └── GuestLayout.vue
```

## VA Disability Rates

The application includes 2025 VA disability compensation rates (effective December 1, 2024). Rates are stored in both:
- Database table (`va_disability_rates`) for flexibility
- Service constants (`VaDisabilityCompensationService`) as fallback

To update rates, modify the `VaDisabilityRatesSeeder` and re-run:

```bash
php artisan db:seed --class=VaDisabilityRatesSeeder
```

## Payment Model

This application uses a "pay what you want" model instead of subscriptions:

- All calculators are free to use
- Saving calculations requires a one-time payment ($5 minimum)
- Supporters get lifetime access to unlimited saves
- Payments processed via Stripe Checkout

## SEO Setup

The application includes comprehensive SEO optimization. Before going to production:

1. **Update robots.txt** - Edit `public/robots.txt` and replace the sitemap URL with your production domain
2. **Generate sitemap** - Run `php artisan sitemap:generate` to create/update `public/sitemap.xml`
3. **Validate structured data** - Test your pages at [Google's Rich Results Test](https://search.google.com/test/rich-results)
4. **Submit to Google** - Add your sitemap URL to [Google Search Console](https://search.google.com/search-console)

## License

This project is proprietary software.
