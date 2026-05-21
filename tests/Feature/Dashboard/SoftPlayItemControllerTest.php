<?php

use App\Models\SoftPlayItem;
use App\Models\User;

use function Pest\Laravel\actingAs;

beforeEach(function () {
    $this->user = User::factory()->create();
});

it('can list soft play items in dashboard', function () {
    SoftPlayItem::factory()->count(3)->create();

    actingAs($this->user)
        ->get('/dashboard/soft-play')
        ->assertOk()
        ->assertInertia(fn ($page) => $page->component('dashboard/soft-play/index'));
});

it('requires authentication for dashboard soft play index', function () {
    $this->get('/dashboard/soft-play')->assertRedirect('/login');
});

it('can show create soft play item form', function () {
    actingAs($this->user)
        ->get('/dashboard/soft-play/create')
        ->assertOk()
        ->assertInertia(fn ($page) => $page->component('dashboard/soft-play/create'));
});

it('can store a new soft play item', function () {
    actingAs($this->user)
        ->post('/dashboard/soft-play', [
            'title' => 'Test Soft Play Set',
            'description' => 'A great soft play set',
            'price' => '150.00',
            'sort_order' => 0,
            'is_active' => true,
        ])
        ->assertRedirect('/dashboard/soft-play');

    expect(SoftPlayItem::where('title', 'Test Soft Play Set')->exists())->toBeTrue();
});

it('validates required fields when storing', function () {
    actingAs($this->user)
        ->post('/dashboard/soft-play', [])
        ->assertSessionHasErrors(['title', 'price']);
});

it('can show edit soft play item form', function () {
    $item = SoftPlayItem::factory()->create();

    actingAs($this->user)
        ->get("/dashboard/soft-play/{$item->id}/edit")
        ->assertOk()
        ->assertInertia(fn ($page) => $page->component('dashboard/soft-play/edit'));
});

it('can update a soft play item', function () {
    $item = SoftPlayItem::factory()->create(['title' => 'Original Title']);

    actingAs($this->user)
        ->put("/dashboard/soft-play/{$item->id}", [
            'title' => 'Updated Title',
            'description' => 'Updated description',
            'price' => '200.00',
            'sort_order' => 1,
            'is_active' => true,
        ])
        ->assertRedirect('/dashboard/soft-play');

    expect($item->fresh()->title)->toBe('Updated Title');
});

it('can delete a soft play item', function () {
    $item = SoftPlayItem::factory()->create();

    actingAs($this->user)
        ->delete("/dashboard/soft-play/{$item->id}")
        ->assertRedirect('/dashboard/soft-play');

    expect(SoftPlayItem::find($item->id))->toBeNull();
});

it('can view soft play public listing', function () {
    SoftPlayItem::factory()->count(2)->create(['is_active' => true]);
    SoftPlayItem::factory()->create(['is_active' => false]);

    $this->get('/soft-play')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('soft-play')
            ->has('items', 2)
        );
});

it('can view a single soft play item', function () {
    $item = SoftPlayItem::factory()->create(['is_active' => true]);

    $this->get("/soft-play/{$item->slug}")
        ->assertOk()
        ->assertInertia(fn ($page) => $page->component('soft-play-item'));
});

it('returns 404 for inactive soft play item on public page', function () {
    $item = SoftPlayItem::factory()->create(['is_active' => false]);

    $this->get("/soft-play/{$item->slug}")->assertNotFound();
});
