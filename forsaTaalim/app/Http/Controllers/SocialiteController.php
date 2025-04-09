<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use App\Models\user;
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
            $Googleuser = Socialite::driver('google')->stateless()->user();
            $users = User::where('google_id', $Googleuser->id)->first();

            if ($users) {
                Auth::login($users);
            } else {

                $existingUser = User::where('email', $Googleuser->email)->first();
                if ($existingUser) {
                   
                    $existingUser['google_id'] = $Googleuser->id;
                    $existingUser->save();
                    Auth::login($existingUser);

                    if ($existingUser->role == 'tuteur') {
                        return redirect("http://localhost:3000");
                    } else {
                        return redirect("http://localhost:3000/login");
                    }

                } else {
                    $UserData = User::create([
                        'name' => $Googleuser->name,
                        'email' => $Googleuser->email,
                        'password' => Hash::make('password@123'),
                        'google_id' => $Googleuser->id,
                    ]);

                    Auth::login($UserData);
                }
            }

            return redirect("http://localhost:3000/login?user=" . urlencode(json_encode([
                'name' => $Googleuser->name,
                'email' => $Googleuser->email,
            ])));

        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['google' => 'Une erreur est survenue lors de la connexion avec Google.']);
        }
    }

}
