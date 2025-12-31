<?php

use App\Models\GalleryItem;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Add slug column as nullable first
        Schema::table('gallery_items', function (Blueprint $table) {
            $table->string('slug')->nullable()->after('title');
        });

        // Generate slugs for existing items
        GalleryItem::chunk(100, function ($items) {
            foreach ($items as $item) {
                $baseSlug = Str::slug($item->title);
                $slug = $baseSlug;
                $counter = 1;

                // Ensure uniqueness
                while (GalleryItem::where('slug', $slug)->where('id', '!=', $item->id)->exists()) {
                    $slug = $baseSlug.'-'.$counter;
                    $counter++;
                }

                $item->update(['slug' => $slug]);
            }
        });

        // Make slug unique and not nullable
        Schema::table('gallery_items', function (Blueprint $table) {
            $table->string('slug')->nullable(false)->unique()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('gallery_items', function (Blueprint $table) {
            $table->dropColumn('slug');
        });
    }
};
