<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
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
        $post = $request->user()->posts()->get()->map(function ($post) {
            $post->image = asset(Storage::url($post->image));
            return $post;
        });

        return Inertia::render('posts/index', [
            'posts' => PostResource::collection($post),
        ]);
    }
}
