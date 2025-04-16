<?php
namespace App\Mail;

use Illuminate\Mail\Mailable;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use League\OAuth1\Client\Server\User;
class PaymentStatusMail extends Mailable
{
    use Queueable, SerializesModels;

    public $status;

    public function __construct( string $status)
    {
        $this->status = $status;
    }

    public function build()
    {
   
        $message = $this->status === 'approved'
        ? ' Your payment was accepted successfully.'
        : ' Your payment was refused. Please try again.';

        return $this->subject('Payment Status')
                    ->view('emails.payment-status')
                    ->with(['message' => $message]);
    }
}

