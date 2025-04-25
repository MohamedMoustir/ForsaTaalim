<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthloginRequests;
use App\Http\Requests\authRejecterRequist;
use App\Services\AuthService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Session;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    protected $authServices;
    public function __construct(AuthService $authServices)
    {
         $this->authServices = $authServices;
    }


    use HasApiTokens;
    public function register(authRejecterRequist $request)
    {
        $validate = $request->validated();
        if ($request->age < 19) {
            return response()->json(['message' => 'Vous devez avoir au moins 19 ans.'], 403);
        }
        $user = $this->authServices->register(
            $validate
        );

        return response()->json(['message' => 'Utilisateur inscrit avec succès', 'user' => $user], 201);
    }

    public function login(AuthloginRequests $request)
    {
  
       
        $data = $request->validated();

        $result = $this->authServices->login($data);
    
        if (!$result) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }
        
        return response()->json([
            'message' => 'Login successful',
            'user' => $result['user'],
            'token' => $result['token']
        ]);
        
    }

    public function logout(request $request)
    {
       
        $this->authServices->logout();
        
        return response()->json([
            'message' => 'Logged out successfully'
        ]);
    }

    public function refresh()
    {
      
        return  $this->authServices->refresh();
    }
    // public function forgotPassword(request $request)
    // {
    //     return  $this->authServices->forgotPassword($request->email);

    // }
    public function resetpassword(request $request)
    {
        return redirect()->away("http://localhost:3000/reset-password");
    }
}
