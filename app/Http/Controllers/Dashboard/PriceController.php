<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\GalleryItem;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PriceController extends Controller
{
    public function index(Request $request)
    {
        $query = GalleryItem::with('category')->orderBy('sort_order');

        if ($request->has('category') && $request->category !== 'all') {
            $query->where('category_id', $request->category);
        }

        $items = $query->get();
        $categories = Category::orderBy('name')->get();

        return Inertia::render('dashboard/prices/index', [
            'items' => $items,
            'categories' => $categories,
            'filters' => [
                'category' => $request->category,
            ],
        ]);
    }

    public function update(Request $request, GalleryItem $item)
    {
        $validated = $request->validate([
            'price' => ['required', 'numeric', 'min:0', 'max:99999.99'],
        ]);

        $item->update($validated);

        return back()->with('success', 'Price updated successfully');
    }

    public function toggleStatus(GalleryItem $item)
    {
        $item->update([
            'is_active' => ! $item->is_active,
        ]);

        return back()->with('success', 'Status updated successfully');
    }
}
