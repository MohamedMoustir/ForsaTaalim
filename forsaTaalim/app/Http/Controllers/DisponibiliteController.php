<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\DisponibilitesRequest;
use App\Models\Disponibilite;
use App\Services\DisponibiliteServices;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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

    public function getById($id)
    {

        $disponibilites = $this->disponibiliteServices->getById($id);
        return response()->json($disponibilites);

    }
    
}
