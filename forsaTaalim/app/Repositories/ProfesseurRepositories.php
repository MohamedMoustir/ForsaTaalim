<?php
namespace App\Repositories;

use App\Models\CategorieMatiere;
use App\Models\Professeur;
use App\Models\User;
use Auth;
use DB;
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
            ->leftjoin('competence_professeurs as cp', 'u.id', '=', 'cp.professeur_id')
            ->leftjoin('competences as com', 'cp.competence_id', '=', 'com.id')
            ->select(
                'p.*',
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
                'com.name'
            )
            ->where('u.id', '=', $id)
            ->get();

        return $showProfile;
    }
    // you want test
    public function getAll($data)
    {

        $Tuteur = DB::table('professeurs as p')
            ->join('users as u', 'p.user_id', '=', 'u.id')
            ->join('categorie_matieres as c', 'p.categorieMatiere_id', '=', 'c.id')
            ->leftjoin('competence_professeurs as cp', 'u.id', '=', 'cp.professeur_id')
            ->leftjoin('competences as com', 'cp.competence_id', '=', 'com.id')
            ->select(
                'p.*',
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
                'com.name'
            );

        if ($data['search'] || $data['sear']) {
            $search = $data['search'];
            $sear = $data['sear'];
            $Tuteur->whereHas('professeurs', function ($query) use ($search) {
                $query->where('tarifHoraire', 'ILIKE', "%{$search}%");
            });

            $trajets->whereHas('driveer', function ($query) use ($sear) {
                $query->where('disponible', 'ILIKE', "%{$sear}%");
            });
        }



    }
    public function filter($value)
    {
        $filterPar = DB::table('professeurs as p')
            ->join('users as u', 'p.user_id', '=', 'u.id')
            ->join('categorie_matieres as c', 'p.categorieMatiere_id', '=', 'c.id')
            ->leftjoin('competence_professeurs as cp', 'u.id', '=', 'cp.professeur_id')
            ->leftjoin('competences as com', 'cp.competence_id', '=', 'com.id')
            ->where('com.name', 'like', '%', $value, '%')
            ->select(
                'p.*',
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
                'com.name'
            )->paginate(6);
    }

}