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
    Route::get('posts/create', \App\Http\Controllers\PostCreateController::class)->name('posts.create');
    Route::post('posts', \App\Http\Controllers\PostStoreController::class)->name('posts.store');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
