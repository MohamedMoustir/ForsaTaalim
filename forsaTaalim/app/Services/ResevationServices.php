<?php

namespace App\Services;

use App\Interface\CoursInterface;
use App\Interface\ResevationInterface;
use App\Models\CategorieMatiere;
use App\Models\User;
use App\Repositories\CategorieMatiereRepository;
use App\Interface\CrudInterface;
use App\Repositories\AuthRepository;
use App\Repositories\EtudiantRepositories;
use App\Repositories\ResevationRepositories;
use Illuminate\Http\Request;


class ResevationServices implements ResevationInterface
{
    protected $resevationRepositories;

    public function __construct(ResevationRepositories $resevationRepositories)
    {
        $this->resevationRepositories = $resevationRepositories;
    }
    public function createReservations($data, $id)
    {
        return $this->resevationRepositories->createReservations($data, $id);
    }
    public function success($request)
    {
        return $this->resevationRepositories->success($request);

    }
    public function getAllReservations()
    {
        return $this->resevationRepositories->getAllReservations();
    }
    public function getByIdReservations($id)
    {
        return $this->resevationRepositories->getByIdReservations($id);
    }
    public function getByIdEtudiant($id){
        return $this->resevationRepositories->getByIdEtudiant($id);
    }
    public function updateStatusReservationsToApproved($id)
    {
        return $this->resevationRepositories->updateStatusReservationsToApproved($id);
    }
    public function updateStatusReservationsTorefuser($id)
    {
        return $this->resevationRepositories->updateStatusReservationsTorefuser($id);
    }
    public function deleteReservations($id)
    {
        return $this->resevationRepositories->deleteReservations($id);
    }
  
  
    public function reserverProfesseur($id)
    {
        return $this->resevationRepositories->reserverProfesseur($id);
    }
 
  


}