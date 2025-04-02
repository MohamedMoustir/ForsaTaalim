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
    public function index()
    {
        return  $this->model->all();
    }
    public function store($data){
        return $this->model->create($data);
    }
    public function update($id ,$data){
        return $this->model->findOrFail($id)->update($data);
    }
    public function delete($id)
    {
        return $this->model->findOrFail($id)->delete();  
       
    }
  

}