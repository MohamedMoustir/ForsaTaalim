<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use App\Models\user;
use Str;
use Tymon\JWTAuth\Facades\JWTAuth;
use function PHPUnit\Framework\returnArgument;
use Illuminate\Support\Facades\Hash;

class SocialiteController extends Controller
{
    public function redirectToGoogle()
    {
        try {
            return Socialite::driver('google')->redirect();
        } catch (\Exception $e) {
            \Log::error('Error during redirect: ' . $e->getMessage());
            return response()->json(['error' => 'There was an error: ' . $e->getMessage()]);
        }
    }
    public function googleAuthentication()
    {
        try {
            $googleUser = Socialite::driver('google')->stateless()->user();
            $user = User::where('email', $googleUser->email)->first();

            if ($user) {

                $user->update(['google_id' => $googleUser->id]);

            } else {
                
                $user = User::create([
                    'name' => $googleUser->name,
                    'email' => $googleUser->email,
                    'password' => Hash::make(Str::random(16)),
                    'google_id' => $googleUser->id,
                    'role' => 'etudiant'
                ]);
            }

            Auth::login($user);

            $token = JWTAuth::fromUser($user);

            return redirect()->away("http://localhost:3000/login?token=$token&user=$user");

        } catch (\Exception $e) {
            return redirect()->back()->withErrors([
                'google' => 'Une erreur est survenue lors de la connexion avec Google.',
                'details' => $e->getMessage()
            ]);
        }
    }


}

