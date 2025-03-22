<?php

namespace App\Services;

use App\Models\Announcement;
use App\Models\CategorieMatiere;
use App\Repositories\AnnouncementRepositories;
use App\Repositories\CategorieMatiereRepository;
use App\Interface\CrudInterface;
use App\Repositories\AuthRepository;
use Illuminate\Support\Facades\Log;

class AnnouncementService implements CrudInterface
{
    protected $AnnouncementRepository;

    public function __construct(AnnouncementRepositories $AnnouncementRepository)
    {
        $this->AnnouncementRepository = $AnnouncementRepository;
    }


    public function create(array $data)
    {
        return $this->AnnouncementRepository->create($data );
    }


    public function getAll()
    {
        return Announcement::all();
    }

    public function getById($id)
    {
        return Announcement::findOrFail($id);
    }


    public function update($id, array $data)
    {
        return $this->AnnouncementRepository->update($id, $data);
    }

    public function delete($id)
    {
        return $this->AnnouncementRepository->delete($id);
    }
}
