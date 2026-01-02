<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Site Name
    |--------------------------------------------------------------------------
    |
    | The name of the site used in title templates and organization schema.
    |
    */

    'site_name' => env('APP_NAME', 'VA Home Loan Calculator'),

    /*
    |--------------------------------------------------------------------------
    | Title Template
    |--------------------------------------------------------------------------
    |
    | The template used for page titles. %s will be replaced with the page title.
    |
    */

    'title_template' => '%s | VA Home Loan Calculator',

    /*
    |--------------------------------------------------------------------------
    | Default Meta Description
    |--------------------------------------------------------------------------
    |
    | The default meta description used when no page-specific description is set.
    |
    */

    'default_description' => 'Free VA loan calculators for veterans and military families. Calculate home affordability, disability compensation, and compare cost of living by state.',

    /*
    |--------------------------------------------------------------------------
    | Organization Schema
    |--------------------------------------------------------------------------
    |
    | Data used to generate the Organization JSON-LD schema.
    |
    */

    'organization' => [
        'name' => 'VA Home Loan Calculator',
        'description' => 'Free VA loan calculators and tools for veterans, service members, and military families.',
        'url' => env('APP_URL', 'http://localhost'),
    ],

    /*
    |--------------------------------------------------------------------------
    | Calculator Pages
    |--------------------------------------------------------------------------
    |
    | SEO data for each calculator page. Used for meta tags, breadcrumbs,
    | and related tools linking.
    |
    */

    'calculators' => [
        'affordability' => [
            'title' => 'VA Loan Affordability Calculator | How Much Home Can You Afford?',
            'description' => 'Calculate your maximum VA home loan amount based on income, debts, and disability benefits. Free calculator with funding fee estimates and no PMI savings.',
            'h1' => 'VA Loan Affordability Calculator',
            'keywords' => ['va loan calculator', 'va loan affordability calculator', 'va home loan calculator', 'how much house can i afford va loan'],
        ],
        'disability' => [
            'title' => 'VA Disability Calculator 2025 | Monthly Compensation Rates',
            'description' => 'Calculate your VA disability compensation with 2025 rates. Includes dependent additions, state tax benefits, and property tax exemptions for veterans.',
            'h1' => 'VA Disability Compensation Calculator',
            'keywords' => ['va disability calculator', 'va disability compensation calculator', 'va disability rating calculator'],
        ],
        'cost-of-living' => [
            'title' => 'Military Cost of Living Calculator | Compare States for PCS',
            'description' => 'Compare cost of living between states for military PCS moves. Includes BAH rates, housing costs, and equivalent salary calculations for veterans.',
            'h1' => 'Cost of Living Comparison Calculator',
            'keywords' => ['military cost of living calculator', 'pcs move calculator', 'bah calculator'],
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Home Page SEO
    |--------------------------------------------------------------------------
    |
    | SEO data for the home page.
    |
    */

    'home' => [
        'title' => 'VA Loan Calculator | Free VA Home Loan Tools for Veterans',
        'description' => 'Free VA loan calculators for veterans and military families. Calculate home affordability, disability compensation, and compare cost of living by state.',
        'keywords' => ['va loan calculator', 'va home loan calculator', 'veteran home loan calculator', 'va mortgage calculator'],
    ],

    /*
    |--------------------------------------------------------------------------
    | Sitemap Configuration
    |--------------------------------------------------------------------------
    |
    | Configuration for sitemap generation.
    |
    */

    'sitemap' => [
        'paths' => [
            '/' => ['priority' => '1.0', 'changefreq' => 'weekly'],
            '/calculators/affordability' => ['priority' => '0.9', 'changefreq' => 'weekly'],
            '/calculators/disability' => ['priority' => '0.8', 'changefreq' => 'monthly'],
            '/calculators/cost-of-living' => ['priority' => '0.8', 'changefreq' => 'monthly'],
        ],
    ],

];
