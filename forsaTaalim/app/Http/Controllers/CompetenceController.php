<?php

namespace App\Http\Controllers;

use App\Http\Requests\CompetenceRequests;
use App\Models\Competence;
use App\Services\CompetenceService;
use Illuminate\Http\Request;

class CompetenceController extends Controller
{
    protected $competenceServises;
    public function __construct(CompetenceService  $competenceServises){
        $this->competenceServises = $competenceServises;
    }
    public function create(CompetenceRequests $request)
    {
        $validated = $request->validated();
        $Competence = $this->competenceServises->create($validated);
        return response()->json(['message' => 'Competence created successfully!', 'Competence' => $Competence], 201);
    }

    public function update(CompetenceRequests $request,$id){

        $validated = $request->validated();
        $Competence = $this->competenceServises->update($id,$validated);
        return response()->json(['message' => 'Competence update successfully!', 'Competence' => $Competence], 200);

    }

    public function show()
    {
       $Competence = $this->competenceServises->getAll();
        return response()->json(['message' => 'All Competence', 'AllCompetence' => $Competence]);
    }
    public function getById($id)
    {
       $Competence = $this->competenceServises->getById($id);
        return response()->json(['message' => ' Competence', 'Competence' => $Competence]);
    }

    public function delete($id){
        $Competence = $this->competenceServises->delete($id);
        return response()->json(['message' => 'Competence delete successfully!'],200);
    }
}
