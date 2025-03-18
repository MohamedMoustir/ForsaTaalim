<?php

use App\Http\Controllers\AnnouncementController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CompetenceController;
use App\Http\Controllers\ProfesseurController;
use App\Http\Controllers\SocialiteController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategorieMatiereController;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
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
Route::post('/register',[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'login']);
Route::post('/logout',[AuthController::class,'logout']);



Route::get('login/google', [SocialiteController::class, 'redirectToGoogle']);
Route::get('login/google/callback', [SocialiteController::class, 'googleAuthentication']);

/*
|--------------------------------------------------------------------------
| API admin
|--------------------------------------------------------------------------
*/

Route::group(['middleware' => ['auth:api', 'role:admin']], function () {
Route::post('/categorie_matiere', [CategorieMatiereController::class, 'createCategorieMatiere']);
Route::get('/categorie_matiere', [CategorieMatiereController::class, 'showcategorieMatiere']);
Route::put('/categorie_matiere/{id}', [CategorieMatiereController::class, 'updateCategorieMatiere']);
Route::delete('/categorie_matiere/{id}', [CategorieMatiereController::class, 'destroycategorieMatiere']);
});

/*
|--------------------------------------------------------------------------
| API Professeur
|--------------------------------------------------------------------------
*/

Route::post('/Professeur', [ProfesseurController::class, 'createProfile']);
Route::patch('/Professeur/{id}', [ProfesseurController::class, 'updateProfile']);
Route::post('/Professeur/competence', [ProfesseurController::class, 'AddCompetence']);
Route::get('/Professeur/{id}', [ProfesseurController::class, 'showProfile']);

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


