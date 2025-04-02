<?php
namespace App\Repositories;

use App\Models\Tag;

class TagRepositories
{

    protected $model;
    public function __construct(Tag $model)
    {
        $this->model = $model;
    }
    public function create($data)
    {
        return $this->model->create($data);
    }
    public function update($id ,$data){
      return  $this->model->findOrFail($id)->update($data);
    }
    public function delete($id)
    {
      return  $this->model->findOrFail($id)->delete();

    }
}