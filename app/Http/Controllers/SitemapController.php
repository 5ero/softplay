<?php

namespace App\Http\Controllers;

use App\Models\GalleryItem;
use App\Models\LandingPage;
use App\Models\PartyTheme;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    public function index(): Response
    {
        $landingPages = LandingPage::where('is_active', true)
            ->orderBy('updated_at', 'desc')
            ->get();

        $partyThemes = PartyTheme::where('is_active', true)
            ->orderBy('updated_at', 'desc')
            ->get();

        $galleryItems = GalleryItem::where('is_active', true)
            ->orderBy('updated_at', 'desc')
            ->get();

        $sitemap = '<?xml version="1.0" encoding="UTF-8"?>'.PHP_EOL;
        $sitemap .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'.PHP_EOL;

        // Static pages
        $staticPages = [
            ['url' => '/', 'priority' => '1.0', 'changefreq' => 'daily'],
            ['url' => '/gallery', 'priority' => '0.9', 'changefreq' => 'daily'],
            ['url' => '/event-decor', 'priority' => '0.9', 'changefreq' => 'weekly'],
            ['url' => '/prices', 'priority' => '0.8', 'changefreq' => 'weekly'],
            ['url' => '/contact', 'priority' => '0.7', 'changefreq' => 'monthly'],
        ];

        foreach ($staticPages as $page) {
            $sitemap .= $this->generateUrlEntry(
                url($page['url']),
                now(),
                $page['changefreq'],
                $page['priority']
            );
        }

        // Landing pages
        foreach ($landingPages as $landingPage) {
            $sitemap .= $this->generateUrlEntry(
                url('/'.$landingPage->slug),
                $landingPage->updated_at,
                'weekly',
                '0.9'
            );
        }

        // Event Decor (Party Themes)
        foreach ($partyThemes as $theme) {
            $sitemap .= $this->generateUrlEntry(
                url('/event-decor/'.$theme->slug),
                $theme->updated_at,
                'weekly',
                '0.7'
            );
        }

        // Gallery Items
        foreach ($galleryItems as $item) {
            $sitemap .= $this->generateUrlEntry(
                url('/gallery/'.$item->slug),
                $item->updated_at,
                'weekly',
                '0.6'
            );
        }

        $sitemap .= '</urlset>';

        return response($sitemap)
            ->header('Content-Type', 'application/xml')
            ->header('Cache-Control', 'public, max-age=3600');
    }

    private function generateUrlEntry(string $url, $lastmod, string $changefreq, string $priority): string
    {
        $entry = '  <url>'.PHP_EOL;
        $entry .= '    <loc>'.htmlspecialchars($url, ENT_XML1).'</loc>'.PHP_EOL;
        $entry .= '    <lastmod>'.$lastmod->toAtomString().'</lastmod>'.PHP_EOL;
        $entry .= '    <changefreq>'.$changefreq.'</changefreq>'.PHP_EOL;
        $entry .= '    <priority>'.$priority.'</priority>'.PHP_EOL;
        $entry .= '  </url>'.PHP_EOL;

        return $entry;
    }
}
