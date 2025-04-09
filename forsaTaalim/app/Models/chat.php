<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Chat extends Model
{
    use HasFactory;
    protected $fillable = [
        'chat_user_id',
        'message',
        'seen',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relation entre le chat et l'utilisateur destinataire.
     */
    public function receiver()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relation pour récupérer le profil du vendeur destinataire.
     */
    public function receiverSellerProfile()
    {
        return $this->belongsTo(User::class, 'receiver_id', 'id')->select(['id', 'name', 'email', 'role']);
    }

    /**
     * Relation pour récupérer le profil du vendeur expéditeur.
     */
    public function senderSellerProfile()
    {
        return $this->belongsTo(User::class, 'sender_id', 'id')->select(['id', 'name', 'email', 'role']);
    }

}
