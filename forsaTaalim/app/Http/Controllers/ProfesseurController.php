<?php

namespace App\Http\Controllers;

use App\Models\Professeur;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
class ProfesseurController extends Controller
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
    public function createProfesseur(request $request)
    {
        $request->validate([
            'diplomes' => 'required|string|max:255',
            'experiences' => 'required|string|max:255',
            'tarifHoraire' => 'required|string|max:255',
            'disponible' => 'required|boolean',
            'location' => 'required|string|max:255',
            'biographie' => 'required|string',
            'video' => 'file',
        ]);

        if ($request->hasFile('video')) {
            $video = $request->file('video');
            $videoPath = time() . '_' . $video->getClientOriginalName();
            $video->move(public_path('videos'), $videoPath);

        }
        $lastInsertId = Session::get('lastInsertId');
        $professeur = Professeur::create([
            'categorieMatiere_id' => intval($lastInsertId),
            'diplomes' => $request->input('diplomes'),
            'experiences' => $request->input('experiences'),
            'tarifHoraire' => $request->input('tarifHoraire'),
            'disponible' => $request->input('disponible'),
            'location' => $request->input('location'),
            'biographie' => $request->input('biographie'),
            'video' => $videoPath,
        ]);

        return response()->json(['message' => 'Professeur created successfully!', 'Professeur' => $professeur], 201);

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
    public function show(Professeur $professeur)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Professeur $professeur)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Professeur $professeur)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Professeur $professeur)
    {
        //
    }
}
