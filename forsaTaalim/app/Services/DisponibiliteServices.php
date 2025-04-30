<?php
namespace App\Services;

use App\Models\Available_time;
use App\Models\CategorieMatiere;
use App\Models\Competence;
use App\Models\Professeur;
use App\Models\User;
use App\Repositories\CategorieMatiereRepository;
use App\Interface\CrudInterface;
use App\Repositories\AuthRepository;
use App\Repositories\disponibiliteRepositories;
use App\Repositories\ProfesseurRepositories;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class DisponibiliteServices
{
    protected $disponibiliteRepositories;

    public function __construct(DisponibiliteRepositories $disponibiliteRepositories)
    {
        $this->disponibiliteRepositories = $disponibiliteRepositories;
    }
    public function store($data)
    {
        $data['tuteur_id'] = Auth::id();
        return $this->disponibiliteRepositories->store($data);
    }
    public function index()
    {
        return $this->disponibiliteRepositories->index();
    }
    public function update($id, array $data)
    {
        return $this->disponibiliteRepositories->update($id, $data);

    }
    public function delete($id)
    {
        return $this->disponibiliteRepositories->delete($id);
    }
    public function getById($id)
    {
        return $this->disponibiliteRepositories->getById($id);
    }
    public function Createavailable_time($data)
    {
        return $this->disponibiliteRepositories->Createavailable_time($data);
    }
    public function getByIdProfeTime($id)
    {
        return Available_time::where('prof_id', $id)->latest()->first();
    }
}
