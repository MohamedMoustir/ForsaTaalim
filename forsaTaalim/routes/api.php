<?php

use App\Http\Controllers\AnnouncementController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CompetenceController;
use App\Http\Controllers\ProfesseurController;
use App\Http\Controllers\SocialiteController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategorieMatiereController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\NewPasswordController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
/*
|--------------------------------------------------------------------------
| API Auth
|--------------------------------------------------------------------------
*/

Route::prefix('auth')->group(function () {

    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::get('refresh', [AuthController::class, 'refresh']);
    Route::middleware('auth:api')->group(function () {
        Route::post('logout', [AuthController::class, 'logout']);
    });

    Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])
        ->name('password.email');

    Route::post('/reset-password', [NewPasswordController::class, 'store'])
        ->name('password.reset');
});


Route::get('login/google', [SocialiteController::class, 'redirectToGoogle']);
Route::get('login/google/callback', [SocialiteController::class, 'googleAuthentication']);

/*
|--------------------------------------------------------------------------
| API admin
|--------------------------------------------------------------------------
*/

Route::group(['middleware' => ['auth:api', 'role:admin']], function () {
    Route::post('/categorie_matiere', [CategorieMatiereController::class, 'store']);
    Route::get('/categorie_matiere', [CategorieMatiereController::class, 'show']);
    Route::put('/categorie_matiere/{id}', [CategorieMatiereController::class, 'update']);
    Route::delete('/categorie_matiere/{id}', [CategorieMatiereController::class, 'destroy']);
});

/*
|--------------------------------------------------------------------------
| API Professeur
|--------------------------------------------------------------------------
*/
Route::group(['middleware' => ['auth:api', 'role:tuteur']], function () {

Route::post('/Professeur', [ProfesseurController::class, 'create']);
Route::patch('/Professeur/{id}', [ProfesseurController::class, 'update']);
Route::post('/Professeur/competence', [ProfesseurController::class, 'create']);
Route::get('/Professeur/{id}', [ProfesseurController::class, 'show']);

});

/*
|--------------------------------------------------------------------------
| API Competence
|--------------------------------------------------------------------------
*/

Route::post('/Competence', [CompetenceController::class, 'createCompetence']);
Route::put('/Competence/{id}', [CompetenceController::class, 'updateCompetence']);
Route::delete('/Competence/{id}', [CompetenceController::class, 'deleteCompetence']);
Route::get('/Competence', [CompetenceController::class, 'showCompetence']);


/*
|--------------------------------------------------------------------------
| API Announcment
|--------------------------------------------------------------------------
*/
Route::post('/Announcment', [AnnouncementController::class, 'createAnnouncment']);
Route::put('/Announcment/{id}', [AnnouncementController::class, 'updatesAnnouncment']);
Route::delete('/Announcment/{id}', [AnnouncementController::class, 'deleteAnnouncment']);
Route::get('/Announcment/{id}', [AnnouncementController::class, 'ShowAnnouncmentById']);
Route::get('/Announcment', [AnnouncementController::class, 'ShowAnnouncment']);


Route::post('messages/{id}', [\App\Http\Controllers\ChatController::class, 'message']);
Route::get('messages/{id}', [\App\Http\Controllers\ChatController::class, 'getMessage']);
