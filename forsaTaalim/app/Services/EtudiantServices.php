<?php

namespace App\Services;

use App\Models\CategorieMatiere;
use App\Models\User;
use App\Repositories\CategorieMatiereRepository;
use App\Interface\CrudInterface;
use App\Repositories\AuthRepository;
use App\Repositories\EtudiantRepositories;


class EtudiantServices implements CrudInterface
{
    protected $etudiantRepositories;

    public function __construct(EtudiantRepositories $etudiantRepositories)
    {
        $this->etudiantRepositories = $etudiantRepositories;
    }
    public function create(array $data)
    {
        $lastInsertUser = User::latest()->first();
        $data['user_id'] = $lastInsertUser->id;
        return $this->etudiantRepositories->create($data);
    }
    public function getAll()
    {

        return $this->etudiantRepositories->getAll();
    }

    public function getById($id)
    {
        return $this->etudiantRepositories->getById($id);
    }
    public function update($id, array $data)
    {
        return $this->etudiantRepositories->update($id, $data);

    }
    public function delete($id)
    {
        return $this->etudiantRepositories->delete($id);
    }
    public function filter($résulter)
    {
        return $this->etudiantRepositories->filter($résulter);
    }


}