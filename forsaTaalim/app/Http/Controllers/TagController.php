<?php

namespace App\Http\Controllers;

use App\Http\Requests\TagRequests;
use App\Services\TagServices;
use Illuminate\Http\Request;

class TagController extends Controller
{
    
    protected $tagServices;
    public function __construct(TagServices $tagServices)
    {
        $this->tagServices = $tagServices;
    }
    public function store(TagRequests $request)
    {
        $validated = $request->validated();
        $CategorieMatiere = $this->tagServices->create($validated);
        return response()->json(['message' => 'Tags created successfully!', 'Tags' => $CategorieMatiere], 201);
    }
    public function show()
    {
        $categorieMatiere = $this->tagServices->getAll();
        return response()->json(['message' => 'All Tags', 'Tags' => $categorieMatiere]);
    }
    public function update(TagRequests $request, $id)
    {
        $validated = $request->validated();
        $categorieMatiere = $this->tagServices->update($id, $validated);
        return response()->json(['message' => 'Tags updated successfully!'], 200);
    }
    public function destroy($id)
    {
        $categorieMatiere = $this->tagServices->delete($id);
        return response()->json(['message' => 'Tags deleted successfully!', 'Tags' => $categorieMatiere], 200);
    }
}
