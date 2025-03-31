<?php


// app/Http/Controllers/Api/DisponibiliteController.php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\DisponibilitesRequest;
use App\Models\Disponibilite;
use App\Services\DisponibiliteServices;
use Illuminate\Http\Request;

class DisponibiliteController extends Controller
{
    protected $disponibiliteServices;
    public function __construct(DisponibiliteServices $disponibiliteServices)
    {
        $this->disponibiliteServices = $disponibiliteServices;

    }
    public function index()
    {
       $disponibilites= $this->disponibiliteServices->index();
        return response()->json($disponibilites);
    }

    public function store(DisponibilitesRequest $request)
    {
        $validated = $request->validated();
       $disponibilite = $this->disponibiliteServices->store($validated);
        return response()->json($disponibilite, 201);
    }
    public function update($id,DisponibilitesRequest $request){

        $validated = $request->validated();
        $Disponibilite = $this->disponibiliteServices->update($id,$validated);
        return response()->json(['message' => 'Disponibilite update successfully!', 'Competence' => $Disponibilite], 200);

    }
    public function delete($id){
        $Disponibilite = $this->disponibiliteServices->delete($id);
        return response()->json(['message' => 'Disponibilite delete successfully!'],200);
    }
    
}
