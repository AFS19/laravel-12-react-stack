<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PostStoreController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|max:196',
            'content' => 'required|max:255',
            'image' => 'required|image|max:2048',
        ]);

        $data['slug'] = Str::slug($data['title']);

        if ($request->hasFile('image')) {
            $data['image'] = Storage::disk('public')->put('posts', $request->file('image'));
        }

        $request->user()->posts()->create($data);

        return to_route('posts.index')->with('success', 'Post created successfully.');
    }
}
