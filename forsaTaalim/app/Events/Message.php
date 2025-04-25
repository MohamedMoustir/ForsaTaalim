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
    protected $username;
    protected $message;
    protected $receive_id;

    public function __construct($username, $message, $receive_id)
    {
        $this->username = $username;
        $this->message = $message;
        $this->receive_id = $receive_id;

    }

    public function create()
    {

        $newMessage = new chat();
        $newMessage->sender_id = Auth::id();
        $newMessage->receiver_id = $this->receive_id;
        $newMessage->message = $this->message;
        $newMessage->seen = 0;
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
