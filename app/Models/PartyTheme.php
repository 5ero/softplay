<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class PartyTheme extends Model
{
    /** @use HasFactory<\Database\Factories\PartyThemeFactory> */
    use HasFactory;

    protected static function booted(): void
    {
        static::creating(function (PartyTheme $theme) {
            if (empty($theme->slug) && ! empty($theme->title)) {
                $theme->slug = static::generateUniqueSlug($theme->title);
            }
        });

        static::updating(function (PartyTheme $theme) {
            if ($theme->isDirty('title') && empty($theme->slug)) {
                $theme->slug = static::generateUniqueSlug($theme->title, $theme->id);
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
        'title',
        'slug',
        'description',
        'images',
        'main_image',
        'sort_order',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'images' => 'array',
            'is_active' => 'boolean',
        ];
    }

    /**
     * Get the route key for the model.
     */
    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
