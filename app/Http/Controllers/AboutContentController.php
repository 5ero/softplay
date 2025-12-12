<?php

namespace App\Http\Controllers;

use App\Models\AboutContent;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AboutContentController extends Controller
{
    /**
     * Show the form for editing the about content.
     */
    public function edit(): Response
    {
        $content = AboutContent::firstOrCreate(
            ['id' => 1],
            [
                'title' => 'Funtime Softplay',
                'content' => 'areas for kids provide a vibrant and safe environment where children can unleash their boundless energy and indulge in imaginative play. These playgrounds are filled with colorful padded structures, ball pits, tunnels, slides, and obstacle courses, all designed to encourage active exploration and social interaction among young ones. Soft play not only promotes physical development by enhancing agility, coordination, and balance but also stimulates creativity and cognitive skills through pretend play scenarios. These spaces often serve as havens for children to engage in unstructured play, fostering their social skills as they navigate through various challenges together. With its cushioned surfaces ensuring a secure play space, soft play offers an ideal setting for kids to frolic and have a blast while parents relish the peace of mind knowing their little ones are having a fun and safe time.',
            ]
        );

        return Inertia::render('dashboard/about/edit', [
            'content' => $content,
        ]);
    }

    /**
     * Update the about content.
     */
    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'],
        ]);

        $content = AboutContent::firstOrCreate(['id' => 1]);
        $content->update($validated);

        return redirect()->route('dashboard.about.edit')->with('success', 'About content updated successfully');
    }

    /**
     * Get the about content for public display.
     */
    public function show(): Response
    {
        $content = AboutContent::firstOrCreate(
            ['id' => 1],
            [
                'title' => 'Funtime Softplay',
                'content' => 'areas for kids provide a vibrant and safe environment where children can unleash their boundless energy and indulge in imaginative play. These playgrounds are filled with colorful padded structures, ball pits, tunnels, slides, and obstacle courses, all designed to encourage active exploration and social interaction among young ones. Soft play not only promotes physical development by enhancing agility, coordination, and balance but also stimulates creativity and cognitive skills through pretend play scenarios. These spaces often serve as havens for children to engage in unstructured play, fostering their social skills as they navigate through various challenges together. With its cushioned surfaces ensuring a secure play space, soft play offers an ideal setting for kids to frolic and have a blast while parents relish the peace of mind knowing their little ones are having a fun and safe time.',
            ]
        );

        return Inertia::render('about', [
            'content' => $content,
        ]);
    }
}
