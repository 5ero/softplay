<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Soft Play Sets', 'slug' => 'soft-play-sets', 'sort_order' => 1],
            ['name' => 'Rides', 'slug' => 'rides', 'sort_order' => 2],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
