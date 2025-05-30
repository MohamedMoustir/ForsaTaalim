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
    public function index()
    {
        //
    }
    public function create(ProfesseurRequests $request)
    {
   
        $validated = $request->validated();  
        $professeur = $this->professeurService->create($validated);
        return response()->json(['message' => 'Professeur created successfully!', 'Professeur' => $professeur], 201);
    }
    public function AddCompetence(Request $request)
    {

        $validateData = $request->validate([
            'competence_id' => 'required'
        ]);

        $competence = CompetenceProfesseur::create([
            'professeur_id' => Auth::id(),
            'competence_id' => $request->competence_id
        ]);
        return response()->json(['message' => 'Competence created successfully!'], 201);

    }
    public function getById($id)
    {

        $showProfile = $this->professeurService->getById($id);
        return response()->json(['message' => 'showProfile', 'Profile' => $showProfile]);

    }
    public function getAll()
    {
        
            $AllProfileProfesseur = $this->professeurService->getAll();
            return response()->json(['message' => 'ProfileProfesseur', 'AllProfile' => $AllProfileProfesseur]);
        
    }

    public function update(request $request, $id)   
    {
        $validate = $request->validate([
            'diplomes' => 'nullable|string|max:255',
            'experiences' => 'nullable|string|max:255',
            'tarifHoraire' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'biographie' => 'nullable|string',
            'video' => 'nullable|file',
        ]);
        $profile = $this->professeurService->update($id, $validate);
        return response()->json(['message' => 'Professeur created successfully!', 'Professeur' => $profile], 200);

    }
    public function destroy($id)
    {
        $professeurService = $this->professeurService->delete($id);
        return response()->json(['message' => 'professeur deleted successfully!', 'CategorieMatiere' => $professeurService], 200);
    }
    public function filter($filter)
    {
        $filter = $this->professeurService->filter($filter);
        return response()->json(['message' => 'filter ajoute successfully!', 'filter' => $filter], 200);
    }
    public function generateActivityReport()
    {
      return  $generate = $this->professeurService->generateActivityReport();

       
    }
}
