<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class GenerateSitemap extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sitemap:generate';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate the sitemap.xml file for SEO';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $baseUrl = rtrim(config('app.url'), '/');
        $paths = config('seo.sitemap.paths', []);
        $lastmod = now()->toW3cString();

        $xml = '<?xml version="1.0" encoding="UTF-8"?>'.PHP_EOL;
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'.PHP_EOL;

        foreach ($paths as $path => $options) {
            $url = $baseUrl.($path === '/' ? '' : $path);
            $priority = $options['priority'] ?? '0.5';
            $changefreq = $options['changefreq'] ?? 'monthly';

            $xml .= '    <url>'.PHP_EOL;
            $xml .= '        <loc>'.htmlspecialchars($url, ENT_XML1, 'UTF-8').'</loc>'.PHP_EOL;
            $xml .= '        <lastmod>'.$lastmod.'</lastmod>'.PHP_EOL;
            $xml .= '        <changefreq>'.$changefreq.'</changefreq>'.PHP_EOL;
            $xml .= '        <priority>'.$priority.'</priority>'.PHP_EOL;
            $xml .= '    </url>'.PHP_EOL;
        }

        $xml .= '</urlset>'.PHP_EOL;

        $path = public_path('sitemap.xml');
        File::put($path, $xml);

        $this->info('Sitemap generated successfully at: '.$path);

        return self::SUCCESS;
    }
}
