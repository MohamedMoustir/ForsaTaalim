<?php

namespace App\Http\Controllers;

use App\Mail\PaymentStatusMail;
use App\Mail\SendCustomEmail;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class PaymentMail extends Controller
{
    public function SendEmail(request $request)
    {
        $validte = $request->validate([
            'status' => 'required',
            'email' => 'required',
            'id' => 'required',
        ]);

       $session_link = Reservation::findOrFail($request->id);
       $session =$session_link->session_link ;
       
        Mail::to($request->email)->send(new PaymentStatusMail( $request->status ,$session));
        return response()->json(['message' => 'Email sent successfully']);
    }
}
