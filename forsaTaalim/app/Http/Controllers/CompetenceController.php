<?php

namespace App\Http\Controllers;

use App\Models\Competence;
use Illuminate\Http\Request;

class CompetenceController extends Controller
{
    public function createCompetence(request $request)
    {

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'niveau' => 'required|string|in:Débutant, Intermédiaire, Avancé',
        ]);

        $Competence = Competence::create($validated);

        return response()->json(['message' => 'Competence created successfully!', 'Competence' => $Competence], 201);
    }

    public function updateCompetence(request $request,$id){
        $validated = $request->validate([
            'name' => 'nullable|string|max:255',
            'niveau' => 'nullable|string|in:Débutant, Intermédiaire, Avancé',
        ]);
        $Competence = Competence::findOrFail($id);
        $Competence->update($validated);
        return response()->json(['message' => 'Competence update successfully!', 'Competence' => $Competence], 200);

    }

    public function showCompetence()
    {
        $Competence = Competence::all();
        return response()->json(['message' => 'All Competence', 'AllCompetence' => $Competence]);
    }

    public function deleteCompetence($id){
        $Competence = Competence::findOrFail($id);
        $Competence->delete();
        return response()->json(['message' => 'Competence delete successfully!'],200);
    }
}
