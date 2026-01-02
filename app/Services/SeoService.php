<?php

namespace App\Services;

use Illuminate\Support\Facades\URL;

class SeoService
{
    /**
     * Generate a canonical URL for the current request.
     */
    public function generateCanonicalUrl(?string $path = null): string
    {
        if ($path) {
            return rtrim(config('app.url'), '/').'/'.ltrim($path, '/');
        }

        return URL::current();
    }

    /**
     * Build Organization JSON-LD schema.
     *
     * @return array<string, mixed>
     */
    public function buildOrganizationSchema(): array
    {
        return [
            '@context' => 'https://schema.org',
            '@type' => 'Organization',
            'name' => config('seo.organization.name'),
            'description' => config('seo.organization.description'),
            'url' => config('seo.organization.url'),
        ];
    }

    /**
     * Build FAQPage JSON-LD schema.
     *
     * @param  array<int, array{question: string, answer: string}>  $questions
     * @return array<string, mixed>
     */
    public function buildFaqSchema(array $questions): array
    {
        $mainEntity = array_map(fn ($q) => [
            '@type' => 'Question',
            'name' => $q['question'],
            'acceptedAnswer' => [
                '@type' => 'Answer',
                'text' => $q['answer'],
            ],
        ], $questions);

        return [
            '@context' => 'https://schema.org',
            '@type' => 'FAQPage',
            'mainEntity' => $mainEntity,
        ];
    }

    /**
     * Build BreadcrumbList JSON-LD schema.
     *
     * @param  array<int, array{name: string, url: string}>  $items
     * @return array<string, mixed>
     */
    public function buildBreadcrumbSchema(array $items): array
    {
        $itemListElement = array_map(fn ($item, $index) => [
            '@type' => 'ListItem',
            'position' => $index + 1,
            'name' => $item['name'],
            'item' => $item['url'],
        ], $items, array_keys($items));

        return [
            '@context' => 'https://schema.org',
            '@type' => 'BreadcrumbList',
            'itemListElement' => $itemListElement,
        ];
    }

    /**
     * Build WebSite JSON-LD schema.
     *
     * @return array<string, mixed>
     */
    public function buildWebsiteSchema(): array
    {
        return [
            '@context' => 'https://schema.org',
            '@type' => 'WebSite',
            'name' => config('seo.site_name'),
            'url' => config('app.url'),
        ];
    }

    /**
     * Get breadcrumb items for a calculator page.
     *
     * @return array<int, array{name: string, url: string}>
     */
    public function getCalculatorBreadcrumbs(string $calculatorKey, string $calculatorName): array
    {
        $baseUrl = config('app.url');

        return [
            ['name' => 'Home', 'url' => $baseUrl],
            ['name' => 'Calculators', 'url' => $baseUrl.'/calculators/affordability'],
            ['name' => $calculatorName, 'url' => $baseUrl.'/calculators/'.$calculatorKey],
        ];
    }

    /**
     * Get related calculator tools (excluding current).
     *
     * @return array<string, array{name: string, url: string, description: string}>
     */
    public function getRelatedTools(string $currentCalculator): array
    {
        $baseUrl = config('app.url');

        $tools = [
            'affordability' => [
                'name' => 'VA Loan Affordability Calculator',
                'url' => $baseUrl.'/calculators/affordability',
                'description' => 'Calculate your maximum VA home loan amount',
            ],
            'disability' => [
                'name' => 'VA Disability Calculator',
                'url' => $baseUrl.'/calculators/disability',
                'description' => 'Estimate your VA disability compensation',
            ],
            'cost-of-living' => [
                'name' => 'Cost of Living Calculator',
                'url' => $baseUrl.'/calculators/cost-of-living',
                'description' => 'Compare cost of living between states',
            ],
        ];

        unset($tools[$currentCalculator]);

        return $tools;
    }
}
