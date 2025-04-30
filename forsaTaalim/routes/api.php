<?php

use App\Http\Controllers\AnnouncementController;
use App\Http\Controllers\DisponibiliteController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AvisController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\CompetenceController;
use App\Http\Controllers\EtudiantController;
use App\Http\Controllers\FavoritesController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\PaymentMail;
use App\Http\Controllers\ProfesseurController;
use App\Http\Controllers\ResevationController;
use App\Http\Controllers\SocialiteController;
use App\Http\Controllers\TagController;
use App\Models\Notification;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use Illuminate\Http\Request;
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
    // Route::post('forgotPassword', [AuthController::class, 'forgotPassword']);
    Route::get('reset-password', [AuthController::class, 'resetPassword']);

    Route::middleware('auth:api')->group(function () {
        Route::post('logout', [AuthController::class, 'logout']);

    });

    Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])
        ->name('password.email');

    Route::post('/reset-password', [NewPasswordController::class, 'store'])
        ->name('password.reset');


});

Route::get('/Professeur', [ProfesseurController::class, 'getAll']);
Route::get('/avies/index', [AvisController::class, 'getTopAvies']);



// Route::get('login/google', [SocialiteController::class, 'redirectToGoogle']);
// Route::get('login/google/callback', [SocialiteController::class, 'googleAuthentication']);


Route::post('/categorie_matiere', [CategorieMatiereController::class, 'store']);

Route::group(['middleware' => ['auth:api', 'role:admin']], function () {
    Route::get('/admin/categorie_matiere', [CategorieMatiereController::class, 'getAllCategorieMatiere']);
    Route::get('/categorie_matiere', [CategorieMatiereController::class, 'show']);
    Route::put('/categorie_matiere/{id}', [CategorieMatiereController::class, 'update']);
    Route::delete('/categorie_matiere/{id}', [CategorieMatiereController::class, 'destroy']);
    Route::delete('/users/{id}', [AdminController::class, 'deleteUser']);
    Route::put('/users/{id}/role', [AdminController::class, 'update']);
    Route::patch('/users/{id}/suspend', [AdminController::class, 'Suspendre']);
    Route::get('/users/total', [AdminController::class, 'TotalUser']);
    Route::get('/users/total-active', [AdminController::class, 'TotalUserActive']);
    Route::get('/users/total-suspended', [AdminController::class, 'TotalUserSospande']);
    Route::get('/announcements/total', [AdminController::class, 'TotalAnnonce']);
    Route::get('reports/forsataalim', [AdminController::class, 'generateActivityReport']);


});
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return response()->json($request->user());
});
/*
|--------------------------------------------------------------------------
| API Professeur
|-----
---------------------------------------------------------------------
*/


Route::group(['middleware' => ['auth:api', 'role:tuteur,admin']], function () {
    Route::post('messages/{id}', [ChatController::class, 'message']);
    Route::get('messages/{id}/room/{chat_user_id}', [ChatController::class, 'getMessage']);
    Route::post('/Professeur', [ProfesseurController::class, 'create']);
    Route::patch('/Professeur/{id}', [ProfesseurController::class, 'update']);
    Route::post('/Professeur/competence', [ProfesseurController::class, 'AddCompetence']);
    // Route::get('/Professeur', [ProfesseurController::class, 'getAll']);
    // Route::post('/Professeur/{filter}', [ProfesseurController::class, 'filter']);
    Route::get('reports/tuteur', [ProfesseurController::class, 'generateActivityReport']);

    /*
    |--------------------------------------------------------------------------
    | API Competence
    |--------------------------------------------------------------------------
    */
    Route::post('/Competence', [CompetenceController::class, 'create']);
    Route::put('/Competence/{id}', [CompetenceController::class, 'update']);
    Route::delete('/Competence/{id}', [CompetenceController::class, 'delete']);
    Route::get('/Competence', [CompetenceController::class, 'show']);
    Route::get('/Competence/{id}', [CompetenceController::class, 'getById']);
    /*
    |--------------------------------------------------------------------------
    | API Announcment
    |--------------------------------------------------------------------------
    */
    Route::post('/announcment', [AnnouncementController::class, 'create']);
    Route::put('/announcment/{id}', [AnnouncementController::class, 'update']);
    Route::delete('/announcment/{id}', [AnnouncementController::class, 'delete']);
    Route::get('/announcment/Show', [AnnouncementController::class, 'Show']);

    Route::put('/Reservation/approved/{id}', [ResevationController::class, 'updateStatusReservationsToApproved']);
    Route::get('/disponibilite', [DisponibiliteController::class, 'index']);
    Route::post('/disponibilite', [DisponibiliteController::class, 'store']);
    Route::put('disponibilite/{id}', [DisponibiliteController::class, 'update']);
    Route::delete('disponibilite/{id}', [DisponibiliteController::class, 'delete']);
    Route::post('disponibilite/available_time', [DisponibiliteController::class, 'Createavailable_time']);

    Route::get('/professeur/chart', [ResevationController::class, 'chartjsReservation']);
    Route::get('/professeur/Reservation', [ResevationController::class, 'reserverProfesseur']);
});

Route::group(['middleware' => ['auth:api', 'role:tuteur,etudiant,admin']], function () {
    Route::post('messages/{id}', [ChatController::class, 'message']);
    Route::get('messages/{id}/room/{chat_user_id}', [ChatController::class, 'getMessage']);
    Route::get('messages/Contacts', [ChatController::class, 'getContacts']);

    Route::put('/Reservation/refuser/{id}', [ResevationController::class, 'updateStatusReservationsTorefuser']);
    Route::delete('/Reservation/{id}', [ResevationController::class, 'deleteReservations']);
    Route::put('/Reservation/session/{id}', [ResevationController::class, 'SendLinkReservations']);

    Route::get('/Professeur/{id}', [ProfesseurController::class, 'getById']);
    Route::post('/notification', [NotificationController::class, 'create']);
    Route::get('/notification', [NotificationController::class, 'show']);
    Route::delete('/notification/{id}', [NotificationController::class, 'destroy']);
    Route::delete('/user/delete', [NewPasswordController::class, 'deleteAccount']);
    Route::get('/disponibilite/{id}', [DisponibiliteController::class, 'getById']);
    Route::get('/announcment/{id}', [AnnouncementController::class, 'getById']);
    Route::get('/detile/announcment/{id}', [AnnouncementController::class, 'getByIdAnnonce']);
    Route::post('/sendEmail', [PaymentMail::class, 'SendEmail']);
    Route::get('/disponibilite/available_times/{id}', [DisponibiliteController::class, 'getByIdProfeTime']);

});
Route::get('payment/success', [ResevationController::class, 'success']);


Route::group(['middleware' => ['auth:api', 'role:etudiant,admin']], function () {
    Route::post('/Etudiant', [EtudiantController::class, 'create']);
    Route::patch('/Etudiant/{id}', [EtudiantController::class, 'update']);
    Route::get('/Etudiant/profile', [EtudiantController::class, 'getById']);
    Route::get('/Etudiant', [EtudiantController::class, 'getAll']);
    Route::delete('/Etudiant/{id}', [EtudiantController::class, 'destroy']);
    Route::post('Etudiant/pay/{id}', [ResevationController::class, 'createReservations']);
    Route::get('error', [ResevationController::class, 'error']);
    Route::get('/Reservation/pay', [ResevationController::class, 'getByIdEtudiant']);
    Route::post('/avis', [AvisController::class, 'poster']);
    Route::put('/avis/{id}', [AvisController::class, 'edit']);
    Route::delete('/avis/{id}', [AvisController::class, 'delete']);
    Route::get('/avis/{id}', [AvisController::class, 'getById']);

    Route::get('/favorites', [FavoritesController::class, 'index']);
    Route::post('/favorites', [FavoritesController::class, 'store']);
    Route::delete('/favorites/{id}', [FavoritesController::class, 'destroy']);
    Route::get('/Reservation/{id}', [ResevationController::class, 'getByIdReservations']);


});


Route::group(['middleware' => ['auth:api', 'role:admin']], function () {
    Route::get('/Reservation', [ResevationController::class, 'getAllReservations']);
    // Route::get('/Reservation/{id}', [ResevationController::class, 'getByIdReservations']);
    Route::get('reports/performance', [AdminController::class, 'Activitehebdomadaire']);
    Route::get('admin/Student', [AdminController::class, 'getstudent']);
    Route::get('admin/Tuteur', [AdminController::class, 'getTuteur']);


    Route::post('/tag', [TagController::class, 'store']);
    Route::get('/tag', [TagController::class, 'show']);
    Route::put('/tag/{id}', [TagController::class, 'update']);
    Route::delete('/tag/{id}', [TagController::class, 'destroy']);
});

Route::get('/performance', function () {
    return response()->json([
        'load_time' => session('load_time', 0)
    ]);
});


Route::group(['middleware' => ['auth:api', 'role:admin,etudiant']], function () {

});

Route::get('/categorie_matiere', [CategorieMatiereController::class, 'show']);




// Route::resource('categories', CategoryControlle::class);
// Route::resource('tags', TagController::class);

// Route::get('statistics', [StatisticsController::class, 'show']);