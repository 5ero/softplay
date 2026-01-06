<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\GalleryItem;
use App\Models\LandingPage;
use App\Models\Location;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LandingPageController extends Controller
{
    public function index()
    {
        $pages = LandingPage::with('location')->orderBy('sort_order')->get();

        return Inertia::render('dashboard/landing-pages/index', [
            'pages' => $pages,
        ]);
    }

    public function create()
    {
        $locations = Location::where('is_active', true)->orderBy('sort_order')->get();
        $galleryItems = GalleryItem::where('is_active', true)
            ->where('is_package', false)
            ->orderBy('sort_order')
            ->get();
        $packages = GalleryItem::where('is_active', true)
            ->where('is_package', true)
            ->orderBy('sort_order')
            ->get();

        return Inertia::render('dashboard/landing-pages/create', [
            'locations' => $locations,
            'galleryItems' => $galleryItems,
            'packages' => $packages,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'location_id' => 'nullable|exists:locations,id',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'gallery_item_ids' => 'nullable|array',
            'gallery_item_ids.*' => 'exists:gallery_items,id',
            'package_ids' => 'nullable|array',
            'package_ids.*' => 'exists:gallery_items,id',
            'sort_order' => 'nullable|integer',
        ]);

        $data['sort_order'] = $data['sort_order'] ?? 0;
        $data['is_active'] = $request->input('is_active') === '1';

        LandingPage::create($data);

        return redirect()->route('dashboard.landing-pages.index')->with('success', 'Landing page created');
    }

    public function edit(string $id)
    {
        $page = LandingPage::with('location')->findOrFail($id);
        $locations = Location::where('is_active', true)->orderBy('sort_order')->get();
        $galleryItems = GalleryItem::where('is_active', true)
            ->where('is_package', false)
            ->orderBy('sort_order')
            ->get();
        $packages = GalleryItem::where('is_active', true)
            ->where('is_package', true)
            ->orderBy('sort_order')
            ->get();

        return Inertia::render('dashboard/landing-pages/edit', [
            'page' => $page,
            'locations' => $locations,
            'galleryItems' => $galleryItems,
            'packages' => $packages,
        ]);
    }

    public function update(Request $request, string $id): RedirectResponse
    {
        $page = LandingPage::findOrFail($id);

        $data = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'location_id' => 'nullable|exists:locations,id',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'gallery_item_ids' => 'nullable|array',
            'gallery_item_ids.*' => 'exists:gallery_items,id',
            'package_ids' => 'nullable|array',
            'package_ids.*' => 'exists:gallery_items,id',
            'sort_order' => 'nullable|integer',
        ]);

        $data['sort_order'] = $data['sort_order'] ?? 0;
        $data['is_active'] = $request->input('is_active') === '1';

        $page->update($data);

        return redirect()->route('dashboard.landing-pages.index')->with('success', 'Landing page updated');
    }

    public function destroy(string $id): RedirectResponse
    {
        $page = LandingPage::findOrFail($id);
        $page->delete();

        return redirect()->route('dashboard.landing-pages.index')->with('success', 'Landing page deleted');
    }
}
