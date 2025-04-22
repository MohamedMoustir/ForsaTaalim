<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PaymentStatusMail extends Mailable
{
    use Queueable, SerializesModels;

    public $texte;

    /**
     * Create a new message instance.
     */
    public function __construct(string $status)
    {
        $this->texte = $status === 'approved'
            ? 'Your payment was accepted successfully.'
            : 'Your payment was refused. Please try again.';
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
                    ]);
    }
}
