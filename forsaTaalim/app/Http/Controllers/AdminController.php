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
    public function update(request $request, $id)
    {
        $validateData = $request->validate([
            'role' => 'required|string',
        ]);
        $upadetrole = $this->adminServices->Update($id, $validateData);
        return response()->json(['message' => 'role updated successfully!', 'role' => $upadetrole], 200);
    }
    public function sospande($id)
    {
        $sospande = $this->adminServices->sospande($id);
        return response()->json(['message' => 'sospande updated successfully!', 'sospande' => $sospande], 200);
    }
    public function TotalUser()
    {
        $topUser = $this->adminServices->TotalUser();

        if ($topUser->isEmpty()) {
            return response()->json([
                "message" => "Aucun User vendu trouvé"
            ], 404);
        }

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
    public function TotalUserSospande()
    {
        $topUser = $this->adminServices->TotalUserSospande();
        return response()->json([
            "message" => "TotalUserSospande les plus vendus",
            "TotalUserSospande" => $topUser
        ], 200);
    }
    //   Gestion Annonuce
    public function TotalAnnonce()
    {
        $Announce = $this->adminServices->TotalAnnonce();
        return response()->json([
            "message" => "Announce les plus vendus",
            "top_sold_User" => $Announce
        ], 200);
    }

}
