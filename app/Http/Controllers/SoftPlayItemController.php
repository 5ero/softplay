<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSoftPlayItemRequest;
use App\Models\SoftPlayItem;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SoftPlayItemController extends Controller
{
    /**
     * Display a listing for the public soft play page.
     */
    public function publicIndex(Request $request)
    {
        $query = SoftPlayItem::query()->where('is_active', true);

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        if ($request->filled('min_price')) {
            $query->where('price', '>=', $request->input('min_price'));
        }
        if ($request->filled('max_price')) {
            $query->where('price', '<=', $request->input('max_price'));
        }

        $items = $query->orderBy('sort_order')->get();

        return Inertia::render('soft-play', [
            'items' => $items,
            'filters' => [
                'search' => $request->input('search'),
                'min_price' => $request->input('min_price'),
                'max_price' => $request->input('max_price'),
            ],
        ]);
    }

    /**
     * Display a single item for the public soft play page.
     */
    public function publicShow(SoftPlayItem $softPlayItem)
    {
        if (! $softPlayItem->is_active) {
            abort(404);
        }

        $softPlayItem->increment('view_count');

        return Inertia::render('soft-play-item', [
            'item' => $softPlayItem,
        ]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $items = SoftPlayItem::query()->orderBy('sort_order')->get();

        return Inertia::render('dashboard/soft-play/index', [
            'items' => $items,
            'filters' => [],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('dashboard/soft-play/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSoftPlayItemRequest $request): RedirectResponse
    {
        $data = $request->validated();

        $images = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $file) {
                $images[] = Storage::disk('public')->putFile('soft-play', $file);
            }
        }
        $data['images'] = $images;

        if ($request->has('main_image_index') && count($images) > 0) {
            $mainImageIndex = (int) $request->input('main_image_index');
            if (isset($images[$mainImageIndex])) {
                $data['main_image'] = $images[$mainImageIndex];
            }
        }

        $videos = [];
        if ($request->hasFile('videos')) {
            foreach ($request->file('videos') as $file) {
                $videos[] = Storage::disk('public')->putFile('soft-play/videos', $file);
            }
        }
        $data['videos'] = $videos;

        if (isset($data['icons']) && is_string($data['icons'])) {
            $data['icons'] = json_decode($data['icons'], true);
        }

        SoftPlayItem::create($data);

        return redirect()->route('dashboard.soft-play.index')->with('success', 'Soft play item created');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $item = SoftPlayItem::findOrFail($id);

        return Inertia::render('dashboard/soft-play/show', [
            'item' => $item,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $item = SoftPlayItem::findOrFail($id);

        return Inertia::render('dashboard/soft-play/edit', [
            'item' => $item,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreSoftPlayItemRequest $request, string $id): RedirectResponse
    {
        $item = SoftPlayItem::findOrFail($id);
        $data = $request->validated();

        $images = [];
        if ($request->has('existing_images')) {
            $existingImages = json_decode($request->input('existing_images'), true);
            if (is_array($existingImages)) {
                $images = $existingImages;
            }
        }

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $file) {
                $images[] = Storage::disk('public')->putFile('soft-play', $file);
            }
        }
        $data['images'] = $images;

        if ($request->has('main_image')) {
            $data['main_image'] = $request->input('main_image');
        }

        $videos = [];
        if ($request->has('existing_videos')) {
            $existingVideos = json_decode($request->input('existing_videos'), true);
            if (is_array($existingVideos)) {
                $videos = $existingVideos;
            }
        }

        if ($request->hasFile('videos')) {
            foreach ($request->file('videos') as $file) {
                $videos[] = Storage::disk('public')->putFile('soft-play/videos', $file);
            }
        }
        $data['videos'] = $videos;

        if (isset($data['icons']) && is_string($data['icons'])) {
            $data['icons'] = json_decode($data['icons'], true);
        }

        $item->update($data);

        return redirect()->route('dashboard.soft-play.index')->with('success', 'Soft play item updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): RedirectResponse
    {
        $item = SoftPlayItem::findOrFail($id);

        if (is_array($item->images)) {
            foreach ($item->images as $path) {
                Storage::disk('public')->delete($path);
            }
        }

        if (is_array($item->videos)) {
            foreach ($item->videos as $path) {
                Storage::disk('public')->delete($path);
            }
        }

        $item->delete();

        return redirect()->route('dashboard.soft-play.index')->with('success', 'Soft play item deleted');
    }
}
