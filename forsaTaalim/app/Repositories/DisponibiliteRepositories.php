<?php
namespace App\Repositories;

use CreateDisponibilitesTable;
use Disponibilite;



class DisponibiliteRepositories
{

    protected $model;
    public function __construct(Disponibilite $model)
    {
        $this->model = $model;
    }
    public function index($data)
    {
        return  Disponibilite::all();
    }
    public function store($data){
        return $this->model->create($data);
    }
    public function update($id ,$data){
        $Disponibilite = Disponibilite::findOrFail($id);
        return $Disponibilite->update($data);
    }
    public function delete($id)
    {
        return $this->model->findOrFail($id)->delete();  
       
    }
  

}