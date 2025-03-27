<?php

namespace App\Services;

use App\Models\CategorieMatiere;
use App\Repositories\CategorieMatiereRepository;
use App\Interface\CrudInterface;
use App\Repositories\AuthRepository;
use Illuminate\Support\Facades\Log;

class CategorieMatiereService implements CrudInterface
{
    protected $categorieMatiereRepository;

    public function __construct(CategorieMatiereRepository $categorieMatiereRepository)
    {
        $this->categorieMatiereRepository = $categorieMatiereRepository;
    }
    public function create(array $data)
    {
        return $this->categorieMatiereRepository->create($data);
    }
    public function getAll()
    {
        return CategorieMatiere::all();
    }
    public function getById($id)
    {
        return CategorieMatiere::findOrFail($id);
    }
    public function update($id, array $data)
    {

        return $this->categorieMatiereRepository->update($id, $data);

    }
    public function delete($id)
    {
        return $this->categorieMatiereRepository->delete($id);
    }
}
