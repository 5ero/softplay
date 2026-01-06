<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\PartyTheme;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PartyThemeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $themes = PartyTheme::orderBy('sort_order')->get();

        return Inertia::render('dashboard/party-themes/index', [
            'themes' => $themes,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('dashboard/party-themes/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'images' => 'nullable|array',
            'images.*' => 'file|image|max:10240',
            'main_image_index' => 'nullable|integer',
            'sort_order' => 'nullable|integer',
        ]);

        // Set defaults
        $data['sort_order'] = $data['sort_order'] ?? 0;
        $data['is_active'] = $request->input('is_active') === '1';

        $images = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $file) {
                $images[] = Storage::disk('public')->putFile('party-themes', $file);
            }
        }
        $data['images'] = $images;

        // Set main image based on index
        if ($request->has('main_image_index') && count($images) > 0) {
            $mainImageIndex = (int) $request->input('main_image_index');
            if (isset($images[$mainImageIndex])) {
                $data['main_image'] = $images[$mainImageIndex];
            }
        }

        PartyTheme::create($data);

        return redirect()->route('dashboard.party-themes.index')->with('success', 'Party theme created');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $theme = PartyTheme::findOrFail($id);

        return Inertia::render('dashboard/party-themes/show', [
            'theme' => $theme,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $theme = PartyTheme::findOrFail($id);

        return Inertia::render('dashboard/party-themes/edit', [
            'theme' => $theme,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): RedirectResponse
    {
        $theme = PartyTheme::findOrFail($id);

        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'images' => 'nullable|array',
            'images.*' => 'file|image|max:10240',
            'main_image_index' => 'nullable|integer',
            'sort_order' => 'nullable|integer',
        ]);

        // Set defaults
        $data['sort_order'] = $data['sort_order'] ?? 0;
        $data['is_active'] = $request->input('is_active') === '1';

        $images = $theme->images ?? [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $file) {
                $images[] = Storage::disk('public')->putFile('party-themes', $file);
            }
        }
        $data['images'] = $images;

        // Set main image based on index
        if ($request->has('main_image_index') && count($images) > 0) {
            $mainImageIndex = (int) $request->input('main_image_index');
            if (isset($images[$mainImageIndex])) {
                $data['main_image'] = $images[$mainImageIndex];
            }
        }

        $theme->update($data);

        return redirect()->route('dashboard.party-themes.index')->with('success', 'Party theme updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): RedirectResponse
    {
        $theme = PartyTheme::findOrFail($id);

        // Delete images from storage
        if ($theme->images) {
            foreach ($theme->images as $image) {
                Storage::disk('public')->delete($image);
            }
        }

        $theme->delete();

        return redirect()->route('dashboard.party-themes.index')->with('success', 'Party theme deleted');
    }
}
