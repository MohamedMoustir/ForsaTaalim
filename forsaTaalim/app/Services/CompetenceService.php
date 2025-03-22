<?php
namespace App\Services;

use App\Models\CategorieMatiere;
use App\Models\Competence;
use App\Models\Professeur;
use App\Models\User;
use App\Repositories\CategorieMatiereRepository;
use App\Interface\CrudInterface;
use App\Repositories\AuthRepository;
use App\Repositories\CompetenceRepository;
use App\Repositories\ProfesseurRepositories;
use Illuminate\Support\Facades\Log;

class CompetenceService implements CrudInterface
{
    protected $competenceRepository;

    public function __construct(CompetenceRepository $competenceRepository)
    {
        $this->competenceRepository = $competenceRepository;
    }


    public function create(array $data)
    {
        return $this->competenceRepository->create($data);
    }


    public function getAll()
    {
        return Competence::all();
    }

    public function getById($id)
    {
        return  $this->competenceRepository->getById($id);
    }


    public function update($id, array $data)
    {
        return $this->competenceRepository->update($id, $data);

    }

 
    public function delete($id)
    {
        return $this->competenceRepository->delete($id);
    }
}
