<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Location;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LocationController extends Controller
{
    public function index()
    {
        $locations = Location::orderBy('sort_order')->get();

        return Inertia::render('dashboard/locations/index', [
            'locations' => $locations,
        ]);
    }

    public function create()
    {
        return Inertia::render('dashboard/locations/create');
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'sort_order' => 'nullable|integer',
        ]);

        $data['sort_order'] = $data['sort_order'] ?? 0;
        $data['is_active'] = $request->input('is_active') === '1';

        Location::create($data);

        return redirect()->route('dashboard.locations.index')->with('success', 'Location created');
    }

    public function edit(string $id)
    {
        $location = Location::findOrFail($id);

        return Inertia::render('dashboard/locations/edit', [
            'location' => $location,
        ]);
    }

    public function update(Request $request, string $id): RedirectResponse
    {
        $location = Location::findOrFail($id);

        $data = $request->validate([
            'name' => 'required|string|max:255',
            'sort_order' => 'nullable|integer',
        ]);

        $data['sort_order'] = $data['sort_order'] ?? 0;
        $data['is_active'] = $request->input('is_active') === '1';

        $location->update($data);

        return redirect()->route('dashboard.locations.index')->with('success', 'Location updated');
    }

    public function destroy(string $id): RedirectResponse
    {
        $location = Location::findOrFail($id);
        $location->delete();

        return redirect()->route('dashboard.locations.index')->with('success', 'Location deleted');
    }
}
