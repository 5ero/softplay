<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class LandingPage extends Model
{
    /** @use HasFactory<\Database\Factories\LandingPageFactory> */
    use HasFactory;

    protected static function booted(): void
    {
        static::creating(function (LandingPage $page) {
            if (empty($page->slug) && ! empty($page->title)) {
                $page->slug = static::generateUniqueSlug($page->title);
            }
        });

        static::updating(function (LandingPage $page) {
            if ($page->isDirty('title') && empty($page->slug)) {
                $page->slug = static::generateUniqueSlug($page->title, $page->id);
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
        'location_id',
        'title',
        'slug',
        'content',
        'meta_title',
        'meta_description',
        'gallery_item_ids',
        'sort_order',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'gallery_item_ids' => 'array',
            'is_active' => 'boolean',
        ];
    }

    public function location(): BelongsTo
    {
        return $this->belongsTo(Location::class);
    }

    public function galleryItems()
    {
        if (empty($this->gallery_item_ids)) {
            return collect();
        }

        return GalleryItem::whereIn('id', $this->gallery_item_ids)
            ->where('is_active', true)
            ->orderByRaw('FIELD(id, '.implode(',', $this->gallery_item_ids).')')
            ->get();
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
