<?php
namespace App\Repositories;

use Disponibilite;

class DisponibiliteRepositories
{

    protected $model;
    public function __construct(\App\Models\Disponibilite $model)
    {
        $this->model = $model;
    }
    public function index()
    {
        return $this->model->all();
    }
    public function store($data)
    {
        return $this->model->create($data);
    }
    public function update($id, $data)
    {
        return $this->model->findOrFail($id)->update($data);
    }
    public function delete($id)
    {
        return $this->model->findOrFail($id)->delete();

    }

    public function getById($id)
    {
        return $this->model->where('tuteur_id', '=', $id)->get();
    }
}