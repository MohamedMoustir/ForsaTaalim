<?php

namespace App\Interface;

use Illuminate\Http\JsonResponse;

interface ResevationInterface
{
    public function createReservations(array $data ,$id);
    public function getAllReservations();
    public function getByIdReservations($id);
    public function updateStatusReservationsTorefuser($id);
    public function updateStatusReservationsToApproved($id);
    public function deleteReservations($id);
    public function reserverProfesseur();
    public function historiqueReservations();
    public function ajouterPreferences(array $preferences);
}
