<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PostUpdateController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, Post $post)
    {
        $data = $request->validate([
            'title' => ['required', 'max:196'],
            'content' => ['required', 'max:255'],
            'image' => ['required', 'image', 'max:2048'],
        ]);

        $data['slug'] = Str::slug($data['title']);
        $data['image'] = $post->image;

        if ($request->hasFile('image')) {
            Storage::disk('public')->delete($post->image);
            $data['image'] = Storage::disk('public')->put('posts', $request->file('image'));
        }

        $post->update($data);

        return redirect()->route('posts.index');
    }
}
