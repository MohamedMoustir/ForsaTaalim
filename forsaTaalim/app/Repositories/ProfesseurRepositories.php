<?php
namespace App\Repositories;

use App\Models\CategorieMatiere;
use App\Models\Professeur;
use App\Models\Reservation;
use App\Models\User;
use Auth;
use DB;
use Dom\Comment;
use Hash;
use Session;
use Tymon\JWTAuth\Facades\JWTAuth;
use function PHPUnit\Framework\returnArgument;

class ProfesseurRepositories
{

    protected $model;
    public function __construct(Professeur $model)
    {
        $this->model = $model;
    }
    public function create($data)
    {
        return $this->model->create($data);
    }
    public function update($id, $data)
    {
        $profile = Professeur::findOrFail($id);
        return $profile->update($data);
    }
    public function delete($id)
    {

        $Professeur = Professeur::findOrFail($id);
        $Professeur->delete();

        return $Professeur;
    }
    public function getById($id)
    {

        $showProfile = DB::table('professeurs as p')
            ->join('users as u', 'p.user_id', '=', 'u.id')
            ->join('categorie_matieres as c', 'p.categorieMatiere_id', '=', 'c.id')
            ->leftJoin('competence_professeurs as cp', 'u.id', '=', 'cp.professeur_id')
            ->leftJoin('competences as com', 'cp.competence_id', '=', 'com.id')
            ->leftJoin('comments as comme1', 'u.id', '=', 'comme1.tuteur_id')
            ->select(
                'p.id',
                'p.diplomes',
                'p.experiences',
                'p.tarifHoraire',
                'p.location',
                'p.biographie',
                'p.video',
                'u.prenom',
                'u.email',
                'u.photo',
                'u.age',
                'u.telephone',
                'u.role',
                'u.email_verified_at',
                'u.password',
                'u.remember_token',
                'c.nom as nom_matiere',
                'com.name as competencesName',
                'u.id as profe_id',
                DB::raw('COUNT(comme1.rating) as total_ratings'),
                DB::raw('AVG(comme1.rating) as average_rating')
            )->groupBy(
                'p.id',
                'p.diplomes',
                'p.experiences',
                'p.tarifHoraire',
                'p.location',
                'p.biographie',
                'p.video',
                'u.prenom',
                'u.email',
                'u.photo',
                'u.age',
                'u.telephone',
                'u.role',
                'u.email_verified_at',
                'u.password',
                'u.remember_token',
                'c.nom',
                'com.name',
                'profe_id'

            )
            ->where('p.id', '=', $id)
            ->orWhere('p.user_id', '=', $id)
            ->first();

        return $showProfile;
    }
    // you want test
    public function getAll()
    {

        $Tuteur = DB::table('professeurs as p')
            ->join('users as u', 'p.user_id', '=', 'u.id')
            ->join('categorie_matieres as c', 'p.categorieMatiere_id', '=', 'c.id')
            ->leftJoin('competence_professeurs as cp', 'u.id', '=', 'cp.professeur_id')
            ->leftJoin('competences as com', 'cp.competence_id', '=', 'com.id')
            ->leftJoin('comments as comme1', 'u.id', '=', 'comme1.tuteur_id')
            ->select(
                'p.id',
                'p.diplomes',
                'p.experiences',
                'p.tarifHoraire',
                'p.location',
                'p.biographie',
                'p.video',
                'u.prenom',
                'u.email',
                'u.photo',
                'u.age',
                'u.telephone',
                'u.role',
                'u.email_verified_at',
                'u.password',
                'u.remember_token',
                'c.nom as nom_matiere',
                'com.name as competencesName',
                'u.id as profe_id',
                DB::raw('COUNT(comme1.rating) as total_ratings'),
                DB::raw('AVG(comme1.rating) as average_rating')
            )
            ->groupBy(
                'p.id',
                'p.diplomes',
                'p.experiences',
                'p.tarifHoraire',
                'p.location',
                'p.biographie',
                'p.video',
                'u.prenom',
                'u.email',
                'u.photo',
                'u.age',
                'u.telephone',
                'u.role',
                'u.email_verified_at',
                'u.password',
                'u.remember_token',
                'c.nom',
                'com.name',
                'profe_id'
            )
            ->get();





    }
    public function getAllwithout()
    {
        return DB::table('professeurs as p')
            ->join('users as u', 'p.user_id', '=', 'u.id')
            ->join('categorie_matieres as c', 'p.categorieMatiere_id', '=', 'c.id')
            ->leftJoin('competence_professeurs as cp', 'u.id', '=', 'cp.professeur_id')
            ->leftJoin('competences as com', 'cp.competence_id', '=', 'com.id')
            ->leftJoin('comments as comme1', 'u.id', '=', 'comme1.tuteur_id')
            ->select(
                'p.id',
                'p.diplomes',
                'p.experiences',
                'p.tarifHoraire',
                'p.location',
                'p.biographie',
                'p.video',
                'u.prenom',
                'u.email',
                'u.photo',
                'u.age',
                'u.telephone',
                'u.role',
                'u.email_verified_at',
                'u.password',
                'u.remember_token',
                'c.nom as nom_matiere',
                'com.name as competencesName',
                'u.id as profe_id',
                DB::raw('COUNT(comme1.rating) as total_ratings'),
                DB::raw('AVG(comme1.rating) as average_rating')
            )
            ->groupBy(
                'p.id',
                'p.diplomes',
                'p.experiences',
                'p.tarifHoraire',
                'p.location',
                'p.biographie',
                'p.video',
                'u.prenom',
                'u.email',
                'u.photo',
                'u.age',
                'u.telephone',
                'u.role',
                'u.email_verified_at',
                'u.password',
                'u.remember_token',
                'c.nom',
                'com.name',
                'profe_id',
            )
            ->paginate(6);
    }
    public function generateActivityReport()
    {

        $totalUsers = DB::table('reservations as res')
            ->leftJoin('etudiants as etu', 'etu.id', '=', 'res.etudiant_id')
            ->leftJoin('professeurs as por', 'por.id', '=', 'res.professeur_id')
            ->where('res.professeur_id', '=', Auth::id())
            ->count();

        $totalMessage = DB::table('chat_users as chat')
            ->leftJoin('users as u1', 'u1.id', '=', 'chat.user_id1')
            ->leftJoin('users as u2', 'u2.id', '=', 'chat.user_id2')
            ->where(function ($query) {
                $query->where('chat.user_id1', Auth::id())
                    ->orWhere('chat.user_id2', Auth::id());
            })
            ->count();

        $totalComment = DB::table('comments')
            ->where('tuteur_id', '=', Auth::id())->count();

        $PaymentApproved = DB::table('reservations')
        ->where('professeur_id', '=', Auth::id())
        ->where('status', '=', 'approved')
        ->count();

        $PaymentRefuser= DB::table('reservations')
        ->where('professeur_id', '=', Auth::id())
        ->where('status', '=', 'refuser')
        ->count();
        

        return response()->json([
            'totalUsers' => $totalUsers,
            'totalMessage' => $totalMessage,
            'totalComment' => $totalComment,
            'PaymentApproved' => $totalComment,
            'PaymentRefuser' => $totalComment,
        ]);
    }
    

}