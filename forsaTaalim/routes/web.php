<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/
use App\Http\Controllers\SocialiteController;


Route::get('/', function () {
    return view('welcome');
});

Route::get('login/google', [SocialiteController::class, 'redirectToGoogle']);
Route::get('login/google/callback', [SocialiteController::class, 'googleAuthentication']);