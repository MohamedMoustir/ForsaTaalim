<?php
namespace App\Repositories;

use App\Models\driveer;
use Illuminate\Http\Request;
use App\Models\Comment;
use Illuminate\Support\Facades\Auth;

class AvisRepositories
{
    protected $model;
    public function __construct(Comment $model)
    {
        $this->model = $model;
    }
    public function create($data)
    {
        return $this->model->create($data);
    }

    public function delete($id)
    {
        return $this->model->findOrFAIL($id)->delete();
    }
    public function update($id, $data)
    {
        $dat = $this->model->findOrFail($id)->update($data);
        return $dat;
    }
    public function getById($id, $etudiant_id)
    {
        return $this->model  ->where('tuteur_id', '=', $id)->get();
    }


}
