<?php

namespace App\Http\Controllers;

use App\Http\Requests\AvisRequests;
use App\Models\driveer;
use App\Services\AvisServices;
use Illuminate\Http\Request;
use App\Models\Comment;
use Illuminate\Support\Facades\Auth;

class AvisController extends Controller
{
    protected $avisServices;
    public function __construct(AvisServices $avisServices)
    {
        $this->avisServices = $avisServices;
    }
    public function poster(AvisRequests $request)
    {
        $valadetaData = $request->validated();
        $this->avisServices->create($valadetaData);
        return response()->JSON(['success', 'Post ajouté avec succès']);
    }
    public function delete($id)
    {
        $this->avisServices->delete($id);
        return response()->json(['message' => 'comment deleted successfully!'], 200);
    }
    public function edit(Request $request, $id)
    {
        $commentsedite = $this->avisServices->update($id , $request->all());
        return response()->json(['message' => 'comment updated successfully!', 'role' => $commentsedite], 200);
    }
    public function getById($id){
        $comments = $this->avisServices->getById($id);
        return response()->json(['message' => 'comment Ajoute successfully!', 'comments' => $comments], 200);
    }
    public function getTopAvies(){
        $comments = $this->avisServices->getTopAvies();
        return response()->json(['message' => 'comment Ajoute successfully!', 'comments' => $comments], 200);
    }
}
