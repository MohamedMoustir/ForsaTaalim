<?php

namespace App\Repositories;

use App\Models\CategorieMatiere;
use App\Models\Etudiant;
use App\Repositories\CategorieMatiereRepository;
use App\Interface\CrudInterface;
use App\Repositories\AuthRepository;
use App\Repositories\ChatRepositories;
use DB;


class EtudiantRepositories
{
    protected $model;

    public function __construct(Etudiant $model)
    {
        $this->model = $model;
    }


    public function create($data)
    {
        return $this->model->create($data);
    }

    public function update($id, $data)
    {
         return Etudiant::findOrFail($id)->update($data);
    }

    public function delete($id)
    {

        return  Etudiant::findOrFail($id)->delete();

        
    }

    public function getById($id)
    {

        $showProfile = DB::table('etudiants as e')
            ->join('users as u', 'e.user_id', '=', 'u.id')
            ->where('u.role', '=', 'etudiant')
            ->select(
                'e.*',
                'u.prenom',
                'u.email',
                'u.photo',
                'u.age',
                'u.telephone',
                'u.role',
                'u.email_verified_at',
                'u.password',
                'u.remember_token',
            )
            ->where('u.id', '=', $id)
            ->get();

        return $showProfile;
    }

    public function getAll()
    {
        return DB::table('etudiants as e')
            ->join('users as u', 'e.user_id', '=', 'u.id')
            ->where('u.role', '=', 'etudiant')
            ->select(
                'e.*',
                'u.prenom',
                'u.email',
                'u.photo',
                'u.age',
                'u.telephone',
                'u.role',
                'u.email_verified_at',
                'u.password',
                'u.remember_token',
            )->paginate(6);


    }

}