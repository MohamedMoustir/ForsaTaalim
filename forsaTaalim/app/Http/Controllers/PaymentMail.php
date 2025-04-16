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
        $status = $request->status; 
        $message = $status === 'accepted'
            ? ' Your payment was accepted successfully.'
            : ' Your payment was refused. Please try again.';

        Mail::to($request->email)->send(new PaymentStatusMail($message));
    }
}
