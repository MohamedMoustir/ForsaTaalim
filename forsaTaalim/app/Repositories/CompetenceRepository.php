<?php
namespace App\Repositories;

use App\Models\CategorieMatiere;
use App\Models\Competence;
use App\Models\Professeur;
use App\Models\User;
use Auth;
use DB;
use Hash;
use Session;
use Tymon\JWTAuth\Facades\JWTAuth;
use function PHPUnit\Framework\returnArgument;

class CompetenceRepository
{

    protected $model;
    public function __construct(Competence $model)
    {
        $this->model = $model;
    }

    public function create($data)
    {
        return $this->model->create($data );
    }

    public function update($id ,$data){
        $profile = Competence::findOrFail($id);
        return $profile->update($data);
    }

    public function delete($id)
    {
        return $this->model->findOrFail($id)->delete();  
       
    }

    public function getById($id){
            return $this->model->findOrFail($id);
    }

}