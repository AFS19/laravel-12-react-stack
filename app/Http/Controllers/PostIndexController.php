<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PostIndexController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $post = Post::all()->map(function ($post) {
            $post->image = asset(Storage::url($post->image));
            return $post;
        });

        return Inertia::render('posts/index', [
            'posts' => $post,
        ]);
    }
}
