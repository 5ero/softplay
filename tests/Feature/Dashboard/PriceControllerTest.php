<?php

use App\Models\Category;
use App\Models\GalleryItem;
use App\Models\User;

use function Pest\Laravel\actingAs;

beforeEach(function () {
    $this->user = User::factory()->create();
});

it('can toggle item status from active to inactive', function () {
    $category = Category::factory()->create();
    $item = GalleryItem::factory()->create([
        'category_id' => $category->id,
        'is_active' => true,
    ]);

    actingAs($this->user)
        ->patch("/dashboard/prices/{$item->id}/toggle-status")
        ->assertRedirect();

    expect($item->fresh()->is_active)->toBeFalse();
});

it('can toggle item status from inactive to active', function () {
    $category = Category::factory()->create();
    $item = GalleryItem::factory()->create([
        'category_id' => $category->id,
        'is_active' => false,
    ]);

    actingAs($this->user)
        ->patch("/dashboard/prices/{$item->id}/toggle-status")
        ->assertRedirect();

    expect($item->fresh()->is_active)->toBeTrue();
});

it('requires authentication to toggle status', function () {
    $category = Category::factory()->create();
    $item = GalleryItem::factory()->create([
        'category_id' => $category->id,
    ]);

    $this->patch("/dashboard/prices/{$item->id}/toggle-status")
        ->assertRedirect('/login');
});

it('can update item price', function () {
    $category = Category::factory()->create();
    $item = GalleryItem::factory()->create([
        'category_id' => $category->id,
        'price' => 50.00,
    ]);

    actingAs($this->user)
        ->patch("/dashboard/prices/{$item->id}", ['price' => 75.50])
        ->assertRedirect();

    expect($item->fresh()->price)->toBe('75.50');
});

it('validates price is required', function () {
    $category = Category::factory()->create();
    $item = GalleryItem::factory()->create([
        'category_id' => $category->id,
    ]);

    actingAs($this->user)
        ->patch("/dashboard/prices/{$item->id}", ['price' => ''])
        ->assertSessionHasErrors('price');
});

it('validates price is numeric', function () {
    $category = Category::factory()->create();
    $item = GalleryItem::factory()->create([
        'category_id' => $category->id,
    ]);

    actingAs($this->user)
        ->patch("/dashboard/prices/{$item->id}", ['price' => 'not-a-number'])
        ->assertSessionHasErrors('price');
});
