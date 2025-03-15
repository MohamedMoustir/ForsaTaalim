<?php

namespace App\Http\Controllers;

use App\Http\Requests\authRejecterRequist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\HasApiTokens;

class AuthController extends Controller
{
    use HasApiTokens;
    public function register(request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'photo' => 'required',
            'age' => 'required|integer|min:1',
            'telephone' => 'required|string|required|digits_between:10,15',
            'role' => 'required|in:tuteur,etudiant,parent,admin'
        ]);

        // if ($request->hasFile('photo')) {
        //     $photo = $request->file('photo')->store('images', 'public');
        // } else {
        //     return response()->json(['error' => 'Photo upload failed'], 400);
        // }
        // $photo = $request->file('photo')->store('images', 'public');
     
            if ($request->age < 19) {
                return response()->json(['message' => 'Vous devez avoir au moins 19 ans.'], 403);
            }
            
        $user = User::create([
            'name' => $validated['name'],
            'prenom' => $validated['prenom'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'photo' => $validated['photo'],
            'age' => $validated['age'],
            'telephone' => $validated['telephone'],
            'role' => $validated['role'],
            'isVerifie' => false,
        ]);

        Auth::login($user);
        return response()->json(['message' => 'Utilisateur inscrit avec succès', 'user' => $user], 201);
    }



    public function login(request $request)
    {
        $data = $request->validate([
            'email' => 'required',
            'password' => 'required',
        ]);
        if (Auth::attempt($request->only('email', 'password'))) {
            $user = auth::User();
            $token = $user->createToken('auth_token')->plainTextToken;
            $request->session()->regenerate();
            return response()->json(['message' => 'Connexion réussie', 'user' => Auth::user(), 'token' => $token]);
        }
        return response()->json(['message' => 'Identifiants incorrects'], 401);
    }

    public function logout(request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->json(['message' => 'Déconnexion réussie']);
    }
}
