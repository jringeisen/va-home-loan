<?php

namespace App\Http\Middleware;

use App\Services\SeoService;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $seoService = app(SeoService::class);

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
                'hasPaid' => $request->user()?->hasPaid() ?? false,
            ],
            'flash' => [
                'message' => fn () => $request->session()->get('message'),
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
            'seo' => [
                'siteName' => config('seo.site_name'),
                'canonical' => $seoService->generateCanonicalUrl(),
                'appUrl' => config('app.url'),
            ],
        ];
    }
}
