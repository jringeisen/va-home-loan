<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    {{-- Default SEO Meta Tags --}}
    <meta name="description" content="Free VA loan calculators for veterans. Calculate home affordability, compare cost of living between states, and estimate VA disability compensation.">
    <meta name="keywords" content="VA loan, VA home loan, veteran mortgage, VA disability calculator, military BAH, veteran benefits">
    <meta name="author" content="VA Home Loan Calculator">

    {{-- Open Graph / Social Sharing --}}
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="VA Home Loan Calculator">
    <meta property="og:title" content="{{ config('app.name', 'VA Home Loan Calculator') }}">
    <meta property="og:description" content="Free VA loan calculators for veterans. Calculate home affordability, compare cost of living, and estimate disability compensation.">
    <meta property="og:locale" content="en_US">

    {{-- Twitter Card --}}
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{{ config('app.name', 'VA Home Loan Calculator') }}">
    <meta name="twitter:description" content="Free VA loan calculators for veterans. Calculate home affordability, compare cost of living, and estimate disability compensation.">

    <title inertia>{{ config('app.name', 'VA Home Loan') }}</title>

    {{-- Favicon --}}
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <link rel="icon" type="image/png" href="/favicon.svg">

    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=inter:400,500,600,700&display=swap" rel="stylesheet" />

    @vite(['resources/css/app.css', 'resources/js/app.js'])
    @inertiaHead
</head>
<body class="font-sans antialiased">
    @inertia
</body>
</html>
