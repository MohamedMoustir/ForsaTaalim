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

        $chats = Chat::where(function ($query) use ($id) {
            $query->where('sender_id', Auth::user()->id)->where('receiver_id', $id);
        })->orWhere(function ($query) use ($id) {
            $query->where('sender_id', $id)->where('receiver_id', Auth::user()->id);
        })->orderBy('created_at', 'asc')->get();

        $conversation = $chats->map(function ($chat) {
            return [
                'message' => $chat->message,
                'sender' => $chat->sender_id == Auth::id() ? Auth::user()->role : 'etudiant'
            ];
        });

        return response()->json([
            'message' => $conversation,
            'sender' => $chats
        ]);

    }
}