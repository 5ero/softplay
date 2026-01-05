<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class GalleryItem extends Model
{
    /** @use HasFactory<\Database\Factories\GalleryItemFactory> */
    use HasFactory;

    protected static function booted(): void
    {
        static::creating(function (GalleryItem $item) {
            if (empty($item->slug) && ! empty($item->title)) {
                $item->slug = static::generateUniqueSlug($item->title);
            }
        });

        static::updating(function (GalleryItem $item) {
            if ($item->isDirty('title') && empty($item->slug)) {
                $item->slug = static::generateUniqueSlug($item->title, $item->id);
            }
        });
    }

    protected static function generateUniqueSlug(string $title, ?int $excludeId = null): string
    {
        $baseSlug = Str::slug($title);
        $slug = $baseSlug;
        $counter = 1;

        $query = static::where('slug', $slug);
        if ($excludeId !== null) {
            $query->where('id', '!=', $excludeId);
        }

        while ($query->exists()) {
            $slug = $baseSlug.'-'.$counter;
            $counter++;

            $query = static::where('slug', $slug);
            if ($excludeId !== null) {
                $query->where('id', '!=', $excludeId);
            }
        }

        return $slug;
    }

    protected $fillable = [
        'category_id',
        'title',
        'slug',
        'description',
        'coverage',
        'price',
        'images',
        'main_image',
        'videos',
        'icons',
        'sort_order',
        'is_active',
        'is_package',
        'view_count',
    ];

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'images' => 'array',
            'videos' => 'array',
            'icons' => 'array',
            'is_active' => 'boolean',
            'is_package' => 'boolean',
        ];
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Get the route key for the model.
     */
    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
