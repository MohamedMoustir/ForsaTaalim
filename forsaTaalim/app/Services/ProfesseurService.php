<?php
namespace App\Services;

use App\Models\CategorieMatiere;
use App\Models\Professeur;
use App\Models\User;
use App\Repositories\CategorieMatiereRepository;
use App\Interface\CrudInterface;
use App\Repositories\AuthRepository;
use App\Repositories\ProfesseurRepositories;
use Illuminate\Support\Facades\Auth;
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
        $data['user_id'] = Auth::id();
    
        if (isset($data['video'])) {
            $video = $data['video'];
            $videoName = time() . '_' . $video->getClientOriginalName();
            $videoPath = $video->storeAs('videos', $videoName, 'public');
            $data['video'] = $videoPath;
        }
    
        return $this->professeurRepositories->create($data);
    }
    public function getAllAndSerch($data)
    {
        if ($data) {
            return $this->professeurRepositories->getAll($data);
        }

    }
    public function getById($id)
    {
        return $this->professeurRepositories->getById($id);
    }
    public function update($id, array $data)
    {
        return $this->professeurRepositories->update($id, $data);

    }
    public function delete($id)
    {
        return $this->professeurRepositories->delete($id);
    }
    public function filter($résulter)
    {
        return $this->professeurRepositories->filter($résulter);
    }
    public function getAll()
    {
        return $this->professeurRepositories->getAllwithout();
    }
    public function generateActivityReport(){
        return $this->professeurRepositories->generateActivityReport();
    }
}
