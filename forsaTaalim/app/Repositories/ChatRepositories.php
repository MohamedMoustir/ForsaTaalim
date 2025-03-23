<?php
namespace App\Repositories;

use App\Models\CategorieMatiere;
use App\Models\Chat;
use App\Models\Competence;
use App\Models\Professeur;
use App\Models\User;
use Auth;
use DB;
use Hash;
use Session;
use Tymon\JWTAuth\Facades\JWTAuth;
use function PHPUnit\Framework\returnArgument;

class ChatRepositories
{

    protected $model;
    public function __construct(Chat $model)
    {
        $this->model = $model;
    }

    public function create($data)
    {
        return $this->model->create($data );
    }

}