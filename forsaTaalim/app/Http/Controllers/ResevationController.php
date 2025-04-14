<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReservationRequests;
use App\Interface\CoursInterface;
use App\Models\Reservation;
use App\Services\ResevationServices;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ResevationController
{
    protected $resevationServices;
    public function __construct(ResevationServices $resevationServices)
    {
        $this->resevationServices = $resevationServices;
    }
    public function createReservations(ReservationRequests $request, $id)
    {
        
        $valdate = $request->validated();
        $reservation = $this->resevationServices->createReservations($valdate, $id);
        return response()->json(['message' => 'Reservation ajoute successfully!', 'reservation' => $reservation]);
    }
    public function success(Request $request)
    {
        $validatedData = $request->all();
        $payment = $this->resevationServices->success($validatedData);
        return  redirect()->away('http://localhost:3000/reservation/' . $payment);
    }
    public function getAllReservations()
    {
        $reservation = $this->resevationServices->getAllReservations();
        return response()->json(['message' => 'reservation get successfully!', 'reservation' => $reservation]);
    }
    public function getByIdReservations($id)
    {
        $reservation = $this->resevationServices->getByIdReservations($id);
        return response()->json(['message' => 'reservation get successfully!', 'reservation' => $reservation]);
    }

    public function getByIdEtudiant()
    {
      
        $id = Auth::id();
        $reservation = $this->resevationServices->getByIdEtudiant($id);
        return response()->json(['message' => 'reservation get successfully!', 'reservation' => $reservation]);
    }

    public function updateStatusReservationsToApproved($id)
    {
        $StatusReservation = $this->resevationServices->updateStatusReservationsToApproved($id);
        return response()->json(['message' => 'Status Update successfully!', 'reservation' => $StatusReservation]);

    }
    public function updateStatusReservationsTorefuser($id)
    {
        $StatusReservation = $this->resevationServices->updateStatusReservationsTorefuser($id);
        return response()->json(['message' => 'Status Update successfully!', 'reservation' => $StatusReservation]);

    }
    public function deleteReservations($id)
    {
        $reservation = $this->resevationServices->deleteReservations($id);
        return response()->json(['message' => 'reservation deleted successfully!', 'reservation' => $reservation], 200);
    }
    public function reserverProfesseur()
    {
        $reservation = $this->resevationServices->reserverProfesseur();
        return response()->json(['message' => 'reservation ajoute successfully!', 'reservation' => $reservation], 200);
       
    }
    public function historiqueReservations()
    {
        return response()->json([]);
    }
    public function ajouterPreferences(array $preferences)
    {
        return response()->json([]);
    }
    public function suiviEtNotifications()
    {
        return response()->json([]);
    }
}
