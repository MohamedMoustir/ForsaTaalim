<?php

namespace App\Http\Controllers;

use App\Events\Message;
use App\Http\Requests\ChatRequests;
use App\Models\Chat_user;
use App\Services\ChatService;
use DB;
use Illuminate\Http\Request;
use App\Models\Chat;
use Illuminate\Support\Facades\Auth;
use Pusher\Pusher;
class ChatController extends Controller
{
    protected $chatService;
    public function __construct(ChatService $chatService)
    {
        $this->chatService = $chatService;
    }
    public function message(ChatRequests $request, $id)
    {
        $validatedata = $request->validated();

        $this->chatService->create($validatedata,  auth::user()->id,$id);
        event(new Message($request->input('username'), $request->input('message'), $id));
        return [];
    }
    public function getMessage($id)
    {
        $chats = DB::table('chats')
        ->join('users as senders', 'chats.sender_id', '=', 'senders.id')
        ->join('users as receivers', 'chats.receiver_id', '=', 'receivers.id')
        ->select(
            'chats.message',
            'chats.created_at',
            'senders.name as sender_name',
            'senders.role as sender_role',
            'receivers.name as receiver_name',
            'receivers.role as receiver_role'
        )
        // ->where('chats.sender_id', '=', Auth::id())
        // ->where('chats.receiver_id', '=', $id)
        ->orderBy('chats.created_at', 'asc')
        ->get();
    
        $conversation = $chats->map(function ($chat) {
            return [
                'message' => $chat->message,
                'sender' => $chat->sender_role,
                'receiver' => $chat->receiver_role,
            ];
        });
        

        return response()->json([
            'message' => $conversation,
            'sender' => $chats
        ]);

    }
}