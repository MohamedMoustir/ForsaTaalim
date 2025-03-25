<?php
namespace App\Services;

use App\Models\CategorieMatiere;
use App\Models\Professeur;
use App\Models\User;
use App\Repositories\CategorieMatiereRepository;
use App\Interface\CrudInterface;
use App\Repositories\AuthRepository;
use App\Repositories\ProfesseurRepositories;
use Illuminate\Support\Facades\Log;

class professeurService implements CrudInterface
{
    protected $professeurRepositories;

    public function __construct(ProfesseurRepositories $professeurRepositories)
    {
        $this->professeurRepositories = $professeurRepositories;
    }


    public function create(array $data)
    {
        $lastInsertUser = User::latest()->first();
        $data['user_id'] = $lastInsertUser->id;
        $video = $data['video'];
        $videoPath = time() . '_' . $video->getClientOriginalName();
        $video->move(public_path('videos'), $videoPath);
        return $this->professeurRepositories->create($data);
    }


    public function getAll()
    {
        
        return  $this->professeurRepositories->getAll();
    }

    public function getById($id)
    {
        return  $this->professeurRepositories->getById($id);
    }


    public function update($id, array $data)
    {
        // if (!$data['video'] == null) {
        //     $video = $data['video'];
        //     $videoPath = time() . '_' . $video->getClientOriginalName();
        //     $video->move(public_path('videos'), $videoPath);
        //     $profile->update(['video' => $videoPath]);
        // }
        return $this->professeurRepositories->update($id, $data);

    }

 
    public function delete($id)
    {
        return $this->professeurRepositories->delete($id);
    }

    public function filter($résulter){
        return $this->professeurRepositories->filter($résulter);
    }
}
