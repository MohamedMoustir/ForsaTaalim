<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use PharIo\Manifest\Email;
// error
class NewPasswordController extends Controller
{
    public function store(Request $request)
    {
      
            $request->validate([
                'current_password' => 'required|string',
                'password' => 'required|string',
                'email' => 'required',

            ]);
        
            $user = User::where('email',$request->email)->first();
        
           
            if (!Hash::check($request->current_password, $user->password)) {
                return response()->json(['message' => 'Please enter the correct current password.'], 400);
            }
        
        
            $user->password = Hash::make($request->password);
            $user->save();
        
            return response()->json(['message' => 'Password has been successfully changed.'], 200);
        }
        
}
