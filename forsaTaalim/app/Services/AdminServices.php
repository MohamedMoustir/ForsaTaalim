<?php

namespace App\Services;

use App\Models\Announcement;
use App\Models\CategorieMatiere;
use App\Models\User;
use App\Repositories\AdminRepositories;
use App\Repositories\AnnouncementRepositories;
use App\Repositories\CategorieMatiereRepository;
use App\Interface\CrudInterface;
use App\Repositories\AuthRepository;
use DB;
use Illuminate\Support\Facades\Log;

class AdminServices implements CrudInterface
{

    protected $adminRepositories;
    public function __construct(AdminRepositories $adminRepositories)
    {
        $this->adminRepositories = $adminRepositories;
    }
    public function getstudent(){
        return User::where('role','=','etudiant')->paginate(6);
    }
    public function getTuteur(){
        return DB::table('users')
        ->join('professeurs','users.id','=','professeurs.user_id')
        ->join('categorie_matieres','professeurs.categorieMatiere_id','=','categorie_matieres.id')
        ->select('users.photo','users.prenom','users.email','users.telephone','categorie_matieres.nom','users.isActive','users.*')
        ->where('users.role','=','tuteur')->paginate(8);
    }
    public function create(array $data)
    {
        return $this->adminRepositories->create($data);
    }
    public function getAll()
    {
        return Announcement::all();
    }
    public function getById($id)
    {
        return Announcement::findOrFail($id);
    }
    public function update($id, array $data)
    {
        return $this->adminRepositories->update($id, $data);
    }
    public function delete($id)
    {
        return $this->adminRepositories->delete($id);
    }
    public function suspended($id)
    {
        return $this->adminRepositories->suspended($id);
    }
    public function TotalUser(){
        return $this->adminRepositories->TotalUser();
    }
    public function TotalAnnonce(){
        return $this->adminRepositories->TotalAnnonce();
    }
    public function TotalUserActive(){
        return $this->adminRepositories->TotalUserActive();
    } public function TotalUsersuspended(){
        return $this->adminRepositories->TotalUsersuspended();
    }
    public function generateActivityReport(){
        return $this->adminRepositories->generateActivityReport();
    }
    public function Activitehebdomadaire(){
        return $this->adminRepositories->Activitehebdomadaire();
    }
    
}
