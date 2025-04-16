<?php

namespace App\Http\Controllers;

use App\Mail\PaymentStatusMail;
use App\Mail\SendCustomEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class PaymentMail extends Controller
{
    public function SendEmail(request $request)
    {
        $validte = $request->validate([
            'status' => 'required',
            'email' => 'required',
        ]);

     

        Mail::to($request->email)->send(new PaymentStatusMail( $request->status));
        return response()->json(['message' => 'Email sent successfully']);
    }
}
