<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategorieMatiereRequests;
use App\Models\CategorieMatiere;
use App\Services\CategorieMatiereService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
class CategorieMatiereController extends Controller
{
    protected $categorieMatiereService;
    public function __construct(CategorieMatiereService $categorieMatiereService)
    {
        $this->categorieMatiereService = $categorieMatiereService;
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
    public function create(CategorieMatiereRequests $request)
    {

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CategorieMatiereRequests $request)
    {
        $validated = $request->validated();
        $CategorieMatiere = $this->categorieMatiereService->create($validated);
        return response()->json(['message' => 'Category created successfully!', 'CategorieMatiere' => $CategorieMatiere], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show()
    {
        $categorieMatiere = $this->categorieMatiereService->getAll();
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
    public function update(CategorieMatiereRequests $request, $id)
    {
        $validated = $request->validated();
        $categorieMatiere = $this->categorieMatiereService->update($id, $validated);
        return response()->json(['message' => 'Category updated successfully!'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $categorieMatiere = $this->categorieMatiereService->delete($id);
        return response()->json(['message' => 'Category deleted successfully!', 'CategorieMatiere' => $categorieMatiere], 200);
    }

}
