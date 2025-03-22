<?php
namespace App\Repositories;

use App\Models\Announcement;
use App\Models\CategorieMatiere;
use App\Models\User;
use Auth;
use Hash;
use Session;
use Tymon\JWTAuth\Facades\JWTAuth;
use function PHPUnit\Framework\returnArgument;

class AnnouncementRepositories
{

    protected $model;
    public function __construct(Announcement $model)
    {
        $this->model = $model;
    }

    public function create($data)
    {
        return $this->model->create($data);
    }

    public function update($id ,$data){
        return $this->model->findOrFail($id)->update($data);
    }

    public function delete($id)
    {
        return  $this->model->findOrFail($id)->delete();
    }

}