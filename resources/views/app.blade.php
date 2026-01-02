<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    {{-- Default SEO Meta Tags --}}
    <meta name="description" content="{{ config('seo.default_description') }}">
    <meta name="keywords" content="VA loan, VA home loan, veteran mortgage, VA disability calculator, military BAH, veteran benefits">
    <meta name="author" content="{{ config('seo.site_name') }}">

    {{-- Open Graph / Social Sharing --}}
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="{{ config('seo.site_name') }}">
    <meta property="og:title" content="{{ config('seo.site_name') }}">
    <meta property="og:description" content="{{ config('seo.default_description') }}">
    <meta property="og:locale" content="en_US">
    <meta property="og:url" content="{{ url()->current() }}">

    {{-- Twitter Card --}}
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{{ config('seo.site_name') }}">
    <meta name="twitter:description" content="{{ config('seo.default_description') }}">

    <title inertia>{{ config('app.name', 'VA Home Loan') }}</title>

    {{-- Canonical URL --}}
    <link rel="canonical" href="{{ url()->current() }}">

    {{-- Favicon --}}
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <link rel="icon" type="image/png" href="/favicon.svg">

    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=inter:400,500,600,700&display=swap" rel="stylesheet" />

    {{-- Organization Schema (site-wide) --}}
    <script type="application/ld+json">
    {
        "@@context": "https://schema.org",
        "@@type": "Organization",
        "name": "{{ config('seo.organization.name') }}",
        "description": "{{ config('seo.organization.description') }}",
        "url": "{{ config('app.url') }}"
    }
    </script>

    {{-- WebSite Schema --}}
    <script type="application/ld+json">
    {
        "@@context": "https://schema.org",
        "@@type": "WebSite",
        "name": "{{ config('seo.site_name') }}",
        "url": "{{ config('app.url') }}"
    }
    </script>

    @env('production')
    <!-- Fathom - beautiful, simple website analytics -->
    <script src="https://cdn.usefathom.com/script.js" data-spa="auto" data-site="HOAGXHJE" defer></script>
    <!-- / Fathom -->
    @endenv

    @vite(['resources/css/app.css', 'resources/js/app.js'])
    @inertiaHead
</head>
<body class="font-sans antialiased">
    @inertia
</body>
</html>
