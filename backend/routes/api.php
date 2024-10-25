<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;

// Login with email and password
Route::post('/login', [AuthController::class, 'login']);

// Google OAuth Routes
Route::post('/social-login', [AuthController::class, 'handleProviderCallback']);
Route::get('/auth/google/callback', [AuthController::class, 'handleGoogleCallback']);

// GitHub OAuth Routes
Route::get('/auth/github/redirect', [AuthController::class, 'redirectToGithub']);
Route::get('/auth/github/callback', [AuthController::class, 'handleGithubCallback']);
