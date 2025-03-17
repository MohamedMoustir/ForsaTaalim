<?php

namespace App\Http\Controllers;

use App\Models\CategorieMatiere;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
class CategorieMatiereController extends Controller
{
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
    public function createCategorieMatiere(request $request)
    {

        $validated = $request->validate([
            'nom' => 'required|string|max:255',
        ]);

        $CategorieMatiere = CategorieMatiere::create($validated);

        return response()->json(['message' => 'Category created successfully!', 'CategorieMatiere' => $CategorieMatiere], 201);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function showcategorieMatiere()
    {
        $categorieMatiere = CategorieMatiere::all();
        return response()->json(['message' => 'All CategorieMatiere', 'AllCategorieMatiere' => $categorieMatiere]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit()
    {

    }

    /**
     * Update the specified resource in storage.
     */
    public function updateCategorieMatiere(Request $request, $id)
    {
        $validated = $request->validate([
            'nom' => 'nullable|string|max:255',
        ]);

        $categorieMatiere = categorieMatiere::findorFail($id);
        $categorieMatiere->nom = $validated['nom'];
        $categorieMatiere->update();
        return response()->json(['message' => 'Category updated successfully!', 'CategorieMatiere' => $categorieMatiere], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroycategorieMatiere($id)
    {
        $categorieMatiere = CategorieMatiere::findOrFail($id);
        $categorieMatiere->delete();
        return response()->json(['message' => 'Category deleted successfully!', 'CategorieMatiere' => $categorieMatiere], 200);
    }

}
