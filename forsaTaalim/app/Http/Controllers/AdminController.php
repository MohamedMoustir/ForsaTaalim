<?php

namespace App\Http\Controllers;

use App\Services\AdminServices;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class AdminController extends Controller
{
    protected $adminServices;
    public function __construct(AdminServices $adminServices)
    {
        $this->adminServices = $adminServices;
    }

    // Gestion user
    public function deleteUser($id)
    {
        $this->adminServices->delete($id);
        return response()->json(['message' => 'announcement deleted successfully!'], 200);
    }
    public function getstudent()
    {
        $Students = $this->adminServices->getstudent();
        return response()->json(['message' => 'Student affiche successfully!', 'student' => $Students], 200);
    }
    public function getTuteur()
    {
        $Tuteur = $this->adminServices->getTuteur();
        return response()->json(['message' => 'Tuteur affiche successfully!', 'Tuteur' => $Tuteur], 200);
    }
    public function update(request $request, $id)
    {
        $validateData = $request->validate([
            'role' => 'required|string',
        ]);
        $upadetrole = $this->adminServices->Update($id, $validateData);
        return response()->json(['message' => 'role updated successfully!', 'role' => $upadetrole], 200);
    }
    public function Suspendre($id)
    {
        $suspended = $this->adminServices->suspended($id);
        return response()->json(['message' => 'suspended updated successfully!', 'suspended' => $suspended], 200);
    }
    public function TotalUser()
    {
        $topUser = $this->adminServices->TotalUser();
        return response()->json([
            "message" => "User les plus vendus",
            "top_sold_User" => $topUser
        ], 200);
    }
    public function TotalUserActive()
    {
        $topUser = $this->adminServices->TotalUserActive();
        return response()->json([
            "message" => "TotalActive les plus vendus",
            "TotalActive" => $topUser
        ], 200);
    }
    public function TotalUsersuspended()
    {
        $topUser = $this->adminServices->TotalUsersuspended();
        return response()->json([
            "message" => "TotalUsersuspended les plus vendus",
            "TotalUsersuspended" => $topUser
        ], 200);
    }

    public function TotalAnnonce()
    {
        $Announce = $this->adminServices->TotalAnnonce();
        return response()->json([
            "message" => "Announce les plus vendus",
            "top_sold_User" => $Announce
        ], 200);
    }
    public function generateActivityReport()
    {
        return $generate = $this->adminServices->generateActivityReport();

    }

    public function Activitehebdomadaire()
    {
        return $averageRating = $this->adminServices->Activitehebdomadaire();

    }


}



