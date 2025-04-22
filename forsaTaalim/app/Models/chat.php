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
        'sender_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

   
    public function receiver()
    {
        return $this->belongsTo(User::class);
    }

 
    public function receiverSellerProfile()
    {
        return $this->belongsTo(User::class, 'receiver_id', 'id')->select(['id', 'name', 'email', 'role']);
    }

  
    public function senderSellerProfile()
    {
        return $this->belongsTo(User::class, 'sender_id', 'id')->select(['id', 'name', 'email', 'role']);
    }

}
