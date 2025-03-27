<?php
namespace App\Repositories;

use App\Models\CategorieMatiere;
use App\Models\User;
use Auth;
use Hash;
use Session;
use Tymon\JWTAuth\Facades\JWTAuth;
use function PHPUnit\Framework\returnArgument;

class CategorieMatiereRepository
{

    protected $model;
    public function __construct(CategorieMatiere $model)
    {
        $this->model = $model;
    }
    public function create($data)
    {
        return $this->model->create($data);
    }
    public function update($id ,$data){
        $categorie = CategorieMatiere::findOrFail($id); 
        $categorie->update($data);
    }
    public function delete($id)
    {

      $categorie = CategorieMatiere::findOrFail($id);
       $categorie->delete();
  
        return $categorie;
    }

}