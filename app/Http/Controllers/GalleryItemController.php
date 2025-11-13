<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreGalleryItemRequest;
use App\Models\Category;
use App\Models\GalleryItem;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class GalleryItemController extends Controller
{
    /**
     * Display a listing for the public gallery page.
     */
    public function publicIndex(Request $request)
    {
        $query = GalleryItem::with('category')
            ->where('is_active', true);

        // Search filter
        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // Category filter
        if ($request->filled('category')) {
            $query->where('category_id', $request->input('category'));
        }

        // Price filter
        if ($request->filled('min_price')) {
            $query->where('price', '>=', $request->input('min_price'));
        }
        if ($request->filled('max_price')) {
            $query->where('price', '<=', $request->input('max_price'));
        }

        $items = $query->orderBy('sort_order')->get();
        $categories = Category::orderBy('sort_order')->get();

        return Inertia::render('gallery', [
            'items' => $items,
            'categories' => $categories,
            'filters' => [
                'search' => $request->input('search'),
                'category' => $request->input('category'),
                'min_price' => $request->input('min_price'),
                'max_price' => $request->input('max_price'),
            ],
        ]);
    }

    /**
     * Display a single item for the public gallery page.
     */
    public function publicShow($id)
    {
        $item = GalleryItem::with('category')
            ->where('is_active', true)
            ->findOrFail($id);

        // Increment view count
        $item->increment('view_count');

        return Inertia::render('gallery-item', [
            'item' => $item,
        ]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $items = GalleryItem::with('category')->orderBy('sort_order')->get();

        return Inertia::render('dashboard/gallery/index', [
            'items' => $items,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::orderBy('sort_order')->get();

        return Inertia::render('dashboard/gallery/create', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreGalleryItemRequest $request): RedirectResponse
    {
        $data = $request->validated();

        $images = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $file) {
                $images[] = Storage::disk('public')->putFile('gallery', $file);
            }
        }

        $data['images'] = $images;

        // decode icons from JSON string if present
        if (isset($data['icons']) && is_string($data['icons'])) {
            $data['icons'] = json_decode($data['icons'], true);
        }

        GalleryItem::create($data);

        return redirect()->route('dashboard.gallery.index')->with('success', 'Gallery item created');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $item = GalleryItem::with('category')->findOrFail($id);

        return Inertia::render('dashboard/gallery/show', [
            'item' => $item,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $item = GalleryItem::findOrFail($id);
        $categories = Category::orderBy('sort_order')->get();

        return Inertia::render('dashboard/gallery/edit', [
            'item' => $item,
            'categories' => $categories,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreGalleryItemRequest $request, $id): RedirectResponse
    {
        $item = GalleryItem::findOrFail($id);
        $data = $request->validated();

        // Handle existing images
        $images = [];
        if ($request->has('existing_images')) {
            $existingImages = json_decode($request->input('existing_images'), true);
            if (is_array($existingImages)) {
                $images = $existingImages;
            }
        }

        // Add new images
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $file) {
                $images[] = Storage::disk('public')->putFile('gallery', $file);
            }
        }

        $data['images'] = $images;

        // decode icons from JSON string if present
        if (isset($data['icons']) && is_string($data['icons'])) {
            $data['icons'] = json_decode($data['icons'], true);
        }

        $item->update($data);

        return redirect()->route('dashboard.gallery.index')->with('success', 'Gallery item updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): RedirectResponse
    {
        $item = GalleryItem::findOrFail($id);

        // remove images from disk
        if (is_array($item->images)) {
            foreach ($item->images as $path) {
                Storage::disk('public')->delete($path);
            }
        }

        $item->delete();

        return redirect()->route('dashboard.gallery.index')->with('success', 'Gallery item deleted');
    }
}
