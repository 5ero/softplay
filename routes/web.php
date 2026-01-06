<?php

use App\Http\Controllers\ContactController;
use App\Models\Category;
use App\Models\GalleryItem;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $softPlayCategory = Category::where('slug', 'soft-play-sets')->first();
    $sets = $softPlayCategory
        ? GalleryItem::where('category_id', $softPlayCategory->id)
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->get()
        : collect();

    return Inertia::render('welcome', [
        'sets' => $sets,
    ]);
})->name('home');

Route::get('/contact', function () {
    return Inertia::render('contact');
})->name('contact');

Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

Route::get('/gallery', [\App\Http\Controllers\GalleryItemController::class, 'publicIndex'])->name('gallery');
Route::get('/gallery/{galleryItem:slug}', [\App\Http\Controllers\GalleryItemController::class, 'publicShow'])->name('gallery.show');

Route::get('/prices', function () {
    $items = GalleryItem::with('category')
        ->where('is_active', true)
        ->where('is_package', false)
        ->orderBy('sort_order')
        ->get();

    return Inertia::render('prices', [
        'items' => $items,
    ]);
})->name('prices');

Route::get('/packages', function () {
    $packages = GalleryItem::with('category')
        ->where('is_active', true)
        ->where('is_package', true)
        ->orderBy('sort_order')
        ->get();

    $categories = Category::orderBy('sort_order')->get();

    return Inertia::render('packages', [
        'items' => $packages,
        'categories' => $categories,
        'filters' => [
            'search' => request('search'),
            'category' => request('category'),
            'min_price' => request('min_price'),
            'max_price' => request('max_price'),
        ],
    ]);
})->name('packages');

Route::get('/event-decor', function () {
    $themes = \App\Models\PartyTheme::where('is_active', true)
        ->orderBy('sort_order')
        ->get();

    return Inertia::render('party-themes', [
        'items' => $themes,
    ]);
})->name('event-decor');

Route::get('/event-decor/{partyTheme:slug}', function (\App\Models\PartyTheme $partyTheme) {
    if (!$partyTheme->is_active) {
        abort(404);
    }

    return Inertia::render('party-theme', [
        'theme' => $partyTheme,
    ]);
})->name('event-decor.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $stats = [
            'total_items' => GalleryItem::count(),
            'active_items' => GalleryItem::where('is_active', true)->count(),
            'total_categories' => Category::count(),
            'total_views' => GalleryItem::sum('view_count'),
        ];

        $mostViewed = GalleryItem::with('category')
            ->orderBy('view_count', 'desc')
            ->take(5)
            ->get();

        $recentlyAdded = GalleryItem::with('category')
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get();

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'mostViewed' => $mostViewed,
            'recentlyAdded' => $recentlyAdded,
        ]);
    })->name('dashboard');

    // dashboard resource routes for category and gallery management
    Route::prefix('dashboard')->name('dashboard.')->group(function () {
        Route::resource('categories', \App\Http\Controllers\CategoryController::class);
        Route::resource('gallery', \App\Http\Controllers\GalleryItemController::class)->parameters(['gallery' => 'gallery:id']);
        Route::resource('party-themes', \App\Http\Controllers\Dashboard\PartyThemeController::class)->parameters(['party-themes' => 'party_theme:id']);
        Route::resource('locations', \App\Http\Controllers\Dashboard\LocationController::class);
        Route::resource('landing-pages', \App\Http\Controllers\Dashboard\LandingPageController::class)->parameters(['landing-pages' => 'landing_page:id']);
        Route::get('prices', [\App\Http\Controllers\Dashboard\PriceController::class, 'index'])->name('prices.index');
        Route::patch('prices/{item:id}', [\App\Http\Controllers\Dashboard\PriceController::class, 'update'])->name('prices.update');
        Route::patch('prices/{item:id}/toggle-status', [\App\Http\Controllers\Dashboard\PriceController::class, 'toggleStatus'])->name('prices.toggle-status');
    });
});

require __DIR__.'/settings.php';

// Landing page catch-all route - MUST be last!
Route::get('/{landingPage:slug}', function (\App\Models\LandingPage $landingPage) {
    if (!$landingPage->is_active) {
        abort(404);
    }

    $landingPage->load('location');
    $galleryItems = $landingPage->galleryItems();

    return Inertia::render('landing-page', [
        'page' => $landingPage,
        'galleryItems' => $galleryItems,
    ]);
})->name('landing-page.show');
