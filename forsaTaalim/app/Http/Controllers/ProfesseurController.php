<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfesseurRequests;
use App\Models\CompetenceProfesseur;
use App\Models\Professeur;
use App\Models\User;
use Illuminate\Auth\Authenticatable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Services\professeurService;
class ProfesseurController extends Controller
{
    protected $professeurService;
    public function __construct(professeurService $professeurService)
    {
        $this->professeurService = $professeurService;
    }


    /**
     * Display a listing of the resource.
     */

    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(ProfesseurRequests $request)
    {
        $validated = $request->validated();
        $professeur = $this->professeurService->create($validated);
        return response()->json(['message' => 'Professeur created successfully!', 'Professeur' => $professeur], 201);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function AddCompetence(Request $request)
    {

        $validateData = $request->validate([
            'competence_id' => 'required'
        ]);

        $competence = CompetenceProfesseur::create([
            'professeur_id' => Auth::id(),
            'competence_id' => $request->competence_id,
        ]);
        return response()->json(['message' => 'Competence created successfully!', 'Competence' => $competence], 201);

    }

    /**
     * Display the specified resource.
     */
    public function getById($id)
    {
        
       $showProfile= $this->professeurService->getById($id);
        return response()->json(['message' => 'showProfile', 'Profile' => $showProfile]);

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Professeur $professeur)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProfesseurRequests $request, $id)
    {
        $validate = $request->validated();
        $profile=$this->professeurService->update($id,$validate );
        return response()->json(['message' => 'Professeur created successfully!', 'Professeur' => $profile], 200);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $professeurService = $this->professeurService->delete($id);
        return response()->json(['message' => 'professeur deleted successfully!', 'CategorieMatiere' => $professeurService], 200);
    }
}
