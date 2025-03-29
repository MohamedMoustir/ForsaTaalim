<?php

namespace App\Services;


use App\Models\CategorieMatiere;
use App\Interface\CrudInterface;
use App\Repositories\AuthRepository;
use App\Repositories\AvisRepositories;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class AvisServices implements CrudInterface
{
    protected $avisRepositories;

    public function __construct(AvisRepositories $avisRepositories)
    {
        $this->avisRepositories = $avisRepositories;
    }
    public function create(array $data)
    {
        $data['user_id'] = Auth::id();
        return $this->avisRepositories->create($data);
    }
    public function getAll()
    {
        return CategorieMatiere::all();
    }
    public function getById($id)
    {
        $etudiant_id = Auth::id();
        return $this->avisRepositories->getById($id,$etudiant_id);
    }
    public function update($id, array $data)
    {
        return $this->avisRepositories->update($id, $data);
    }
    public function delete($id)
    {
        return $this->avisRepositories->delete($id);
    }
}
