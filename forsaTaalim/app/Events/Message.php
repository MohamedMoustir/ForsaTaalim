<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use App\Models\Chat;
use Illuminate\Support\Facades\Auth;

class Message implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public function __construct(
        public string $username,
        public string $message,
        public int $receive_id
    )
    {
        $newMessage = new chat();
        $newMessage->sender_id = Auth::id();
        $newMessage->receiver_id = $receive_id;
        $newMessage->message = $message ;
        $newMessage->seen = 0 ;
        $newMessage->save();
    }

   
    public function broadcastOn()
    {
        return [
            'forsaTaalm-development',
        ];
    }

    public function broadcastAs()
    {
        return 'message';
    }
}
