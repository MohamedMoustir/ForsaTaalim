<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthEtudiantRequist;
use App\Http\Requests\authRejecterRequist;
use App\Services\EtudiantServices;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EtudiantController extends Controller
{
    protected $etudiantServices;
    public function __construct(EtudiantServices $etudiantServices)
    {
        $this->etudiantServices = $etudiantServices;
    }
    public function create(AuthEtudiantRequist $request)
    {
        $validateData = $request->validated();
        $Etudiant = $this->etudiantServices->create($validateData);
        return response()->json(['message' => 'Etudiant created successfully!', 'Etudiant' => $Etudiant], 201);
    }

    public function getById()
    {

        $showProfile = $this->etudiantServices->getById(Auth::id());
        return response()->json(['message' => 'showProfile', 'Profile' => $showProfile]);

    }
    public function getAll()
    {
        $AllEtudiant = $this->etudiantServices->getAll();
        return response()->json(['message' => 'get les Etudiants ', 'All Etudiant' => $AllEtudiant]);

    }
    public function update(AuthEtudiantRequist $request, $id)
    {
        $validate = $request->validated();
        $profile = $this->etudiantServices->update($id, $validate);
        return response()->json(['message' => 'Etudiant update successfully!', 'Etudiant' => $profile], 200);

    }
    public function destroy($id)
    {
        $etudiantServices = $this->etudiantServices->delete($id);
        return response()->json(['message' => 'Etudiant deleted successfully!', 'Etudiant' => $etudiantServices], 200);
    }
    public function mesCours()
    {
        return response()->json([]);
    }

    public function Myfavorites()
    {
        $serch = $this->etudiantServices->favorites(Auth::id());
        return response()->json(['message' => 'favorites ajoute successfully!', 'favorites' => $serch]);
    }
}
