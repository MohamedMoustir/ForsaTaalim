<?php
namespace App\Repositories;

use App\Models\Announcement;
use App\Models\CategorieMatiere;
use App\Models\User;
use Auth;
use DB;
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
   public function getById($id){
    return DB::table('announcements as ann')
    ->leftJoin('users as u','ann.professeur_id' , '=','u.id')
    ->where('ann.professeur_id','=',$id)
    ->select(
        'ann.id as id_annonce',
        'ann.*',
        'u.*'
    )
    ->get();
   }

   public function getByIdAnnonce($id){
    return DB::table('announcements as ann')
    ->leftJoin('users as u','ann.professeur_id' , '=','u.id')
    ->leftJoin('professeurs as p','u.id','=','p.user_id')
    ->leftJoin('categorie_matieres as c','p.categorieMatiere_id','=','c.id')
    ->where('ann.id','=',$id)
    ->select(
        'u.*',
        'p.*',
        'ann.*',
        'c.nom as categorie_matieres',

    )
    ->first();
   }
}