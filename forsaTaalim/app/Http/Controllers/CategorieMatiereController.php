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
    public function store(CategorieMatiereRequests $request)
    {
        $validated = $request->validated();
        $CategorieMatiere = $this->categorieMatiereService->create($validated);
        return response()->json(['message' => 'Category created successfully!', 'CategorieMatiere' => $CategorieMatiere], 201);
    }
    public function show()
    {
        $categorieMatiere = $this->categorieMatiereService->getAll();
        return response()->json(['AllCategorieMatiere' => $categorieMatiere]);
    }
    public function getAllCategorieMatiere()
    {
        $categorieMatiere = $this->categorieMatiereService->getAllCategorieMatiere();
        return response()->json(['AllCategorieMatiere' => $categorieMatiere]);
    }
    public function update(CategorieMatiereRequests $request, $id)
    {
        $validated = $request->validated();
        $categorieMatiere = $this->categorieMatiereService->update($id, $validated);
        return response()->json(['message' => 'Category updated successfully!'], 200);
    }
    public function destroy($id)
    {
        $categorieMatiere = $this->categorieMatiereService->delete($id);
        return response()->json(['message' => 'Category deleted successfully!', 'CategorieMatiere' => $categorieMatiere], 200);
    }

}
