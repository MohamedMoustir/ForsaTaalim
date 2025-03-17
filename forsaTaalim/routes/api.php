<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfesseurController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategorieMatiereController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register',[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'login']);
Route::post('/logout',[AuthController::class,'logout']);




Route::post('/categorie_matiere', [CategorieMatiereController::class, 'createCategorieMatiere']);
Route::get('/categorie_matiere', [CategorieMatiereController::class, 'showcategorieMatiere']);
Route::put('/categorie_matiere/{id}', [CategorieMatiereController::class, 'updateCategorieMatiere']);
Route::delete('/categorie_matiere/{id}', [CategorieMatiereController::class, 'destroycategorieMatiere']);


Route::post('/Professeur', [ProfesseurController::class, 'createProfesseur']);

