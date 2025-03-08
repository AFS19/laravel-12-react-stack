<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('posts', \App\Http\Controllers\PostIndexController::class)->name('posts.index');
    Route::inertia('posts/create', 'posts/create')->name('posts.create');
    Route::post('posts', \App\Http\Controllers\PostStoreController::class)->name('posts.store');
    Route::get('posts/{post}/edit', \App\Http\Controllers\PostEditController::class)->name('posts.edit');
    Route::put('posts/{post}', \App\Http\Controllers\PostUpdateController::class)->name('posts.update');
    Route::delete('posts/{post}', \App\Http\Controllers\PostDestroyController::class)->name('posts.destroy');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
