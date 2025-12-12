<?php

use App\Http\Controllers\ContactController;
use App\Models\Category;
use App\Models\GalleryItem;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

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

Route::get('/about', [\App\Http\Controllers\AboutContentController::class, 'show'])->name('about');

Route::get('/contact', function () {
    return Inertia::render('contact');
})->name('contact');

Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

Route::get('/gallery', [\App\Http\Controllers\GalleryItemController::class, 'publicIndex'])->name('gallery');
Route::get('/gallery/{id}', [\App\Http\Controllers\GalleryItemController::class, 'publicShow'])->name('gallery.show');

Route::get('/prices', function () {
    return Inertia::render('prices');
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
        Route::resource('gallery', \App\Http\Controllers\GalleryItemController::class);
        Route::get('about', [\App\Http\Controllers\AboutContentController::class, 'edit'])->name('about.edit');
        Route::put('about', [\App\Http\Controllers\AboutContentController::class, 'update'])->name('about.update');
    });
});

require __DIR__.'/settings.php';
