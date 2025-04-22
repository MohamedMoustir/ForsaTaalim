<?php
namespace App\Events;
use Illuminate\Broadcasting\Channel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Queue\SerializesModels;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;

class NotificationSent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $title;
    public $content;
    public $receiverId;

    public function __construct($title, $content, $receiverId)
    {
        $this->title = $title;
        $this->content = $content;
        $this->receiverId = $receiverId;
    

    }

    public function broadcastOn()
    {
        return ['forsaTaalm-notifications'];
    }

    public function broadcastAs()
    {
        return 'notification';
    }
}
