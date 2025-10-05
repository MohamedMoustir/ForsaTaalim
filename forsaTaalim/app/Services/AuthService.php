<?php

namespace App\Services;

use App\Repositories\AuthRepository;
use App\Repositories\Interfaces\UserRepositoryInterface;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use App\Repositories\UserRepository;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Log;
class AuthService
{
    protected $AuthRepository;

    public function __construct(AuthRepository $AuthRepository)
    {
        $this->AuthRepository = $AuthRepository;
    }
    public function register(array $data)
    { 
        $data['photo'] = $data['photo']->store('images', 'public');
        return $this->AuthRepository->create($data);
    }
    public function login(array $credentials)
    {
        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = JWTAuth::fromUser($user);

            return [
                'user' => $user,
                'token' => $token
            ];
        }

        return 'message Invalid credentials';

    }
    public function logout()
    {
        
        if (Auth::check()) {
            Auth::user()->tokens->each(function ($token) {
                $token->delete();
            });
    
    
            return response()->json([
                'message' => 'Successfully logged out',
            ], 200);
        }
    
        return response()->json([
            'message' => 'No user logged in',
        ], 401);
    }
    public function refresh()
    {
        try {

            if (!JWTAuth::getToken()) {
                return response()->json(['message' => 'Token non fourni'], 401);
            }
            $newToken = JWTAuth::refresh();
            return response()->json([
                'token' => $newToken
            ]);

        } catch (\Exception $e) {
            return null;
        }
    }
    public function resetpassword($token, $password)
    {
        try {
            $user = JWTAuth::toUser($token);

            if (!$user) {
                return response()->json(['message' => 'Invalid token'], 400);
            }
            $user->password = Hash::make($password);
            $user->save();
            return response()->json(['message' => 'Password has been reset successfully']);

        } catch (\Exception $e) {

            return response()->json(['message' => 'Unable to reset password'], 400);
        }
    }
}


