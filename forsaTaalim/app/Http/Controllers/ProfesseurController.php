<?php

namespace App\Http\Controllers;

use App\Models\CompetenceProfesseur;
use App\Models\Professeur;
use App\Models\User;
use Illuminate\Auth\Authenticatable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

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
    public function createProfile(request $request)
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
        $lastInsertUser = User::latest()->first();
        $professeur = Professeur::create([
            'categorieMatiere_id' => $request->input('categorieMatiere_id'),
            'user_id' => $lastInsertUser->id,
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
    public function AddCompetence(Request $request)
    {

        $validateData = $request->validate([
            'competence_id' => 'required'
        ]);

        $competence = CompetenceProfesseur::create([
            'professeur_id' => Auth::id(),
            'competence_id' => $request->competence_id,
        ]);
        return response()->json(['message' => 'Competence created successfully!', 'Competence' => $competence], 201);

    }

    /**
     * Display the specified resource.
     */
    public function showProfile($id)
    {
        $showProfile = DB::table('professeurs as p')
            ->join('users as u', 'p.user_id', '=', 'u.id')
            ->join('categorie_matieres as c', 'p.categorieMatiere_id', '=', 'c.id')
            ->leftjoin('competence_professeurs as cp', 'u.id', '=', 'cp.professeur_id')
            ->leftjoin('competences as com', 'cp.competence_id', '=', 'com.id')
            ->select(
                'p.*',
                'u.prenom',
                'u.email',
                'u.photo',
                'u.age',
                'u.telephone',
                'u.role',
                'u.email_verified_at',
                'u.password',
                'u.remember_token',
                'c.nom as nom_matiere',
                'com.name'
            )
            ->where('u.id', '=', $id)
            ->get();
        // $showProfile = Professeur::findOrFail($id);
        return response()->json(['message' => 'showProfile', 'Profile' => $showProfile]);

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
    public function updateProfile(Request $request, $id)
    {
        $validate = $request->validate([
            'diplomes' => 'nullable|string|max:255',
            'experiences' => 'nullable|string|max:255',
            'tarifHoraire' => 'nullable|string|max:255',
            'disponible' => 'nullable|boolean',
            'location' => 'nullable|string|max:255',
            'biographie' => 'nullable|string',
            'video' => 'nullable|file',
        ]);

        $profile = Professeur::findOrFail($id);
        $profile->update($validate);

        if ($request->hasFile('video')) {
            $video = $request->file('video');
            $videoPath = time() . '_' . $video->getClientOriginalName();
            $video->move(public_path('videos'), $videoPath);
            $profile->update(['video' => $videoPath]);
        }
        return response()->json(['message' => 'Professeur created successfully!', 'Professeur' => $profile], 200);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Professeur $professeur)
    {
        //
    }
}
