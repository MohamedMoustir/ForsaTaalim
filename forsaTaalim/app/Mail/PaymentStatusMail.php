<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PaymentStatusMail extends Mailable
{
    use Queueable, SerializesModels;

    public $texte;
    public $session;


    /**
     * Create a new message instance.
     */
    public function __construct(string $status, string $session)
    {
        $this->texte = $status === 'approved'
            ? 'Your payment was accepted successfully.'
            : 'Your payment was refused. Please try again.';
        $this->session = $session;
    }

    /**
     * Build the message.
     */
    public function build()
    {
   
        return $this->subject('Payment Status')
            ->view('emails.payment-status')
            ->with([
                'texte' => $this->texte,
                'session' => $this->session,
            ]);
    }
}
