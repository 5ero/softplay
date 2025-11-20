<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GalleryItem extends Model
{
    /** @use HasFactory<\Database\Factories\GalleryItemFactory> */
    use HasFactory;

    protected $fillable = [
        'category_id',
        'title',
        'description',
        'coverage',
        'price',
        'images',
        'main_image',
        'videos',
        'icons',
        'sort_order',
        'is_active',
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
        ];
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}
