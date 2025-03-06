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
            'title' => 'required',
            'content' => 'required',
            'image' => 'required|image',
        ]);

        $data['slug'] = Str::slug($data['title']);
        
        if ($request->hasFile('image')) {
            $data['image'] = Storage::disk('public')->put('posts', $data['image']);
        }

        $request->user()->posts()->create($data);

        return to_route('posts.index');
    }
}
