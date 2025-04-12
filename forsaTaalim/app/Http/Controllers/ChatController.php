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
        $this->chatService->create($validatedata, auth::user()->id, $id);
        event(new Message($request->input('username'), $request->input('message'), $id));
        return [];
    }
    public function getMessage($id)
    {
        $authId = Auth::id();

        $chats = DB::table('chat_users as cha_u')
            ->join('users as senders', 'cha_u.user_id1', '=', 'senders.id')
            ->join('users as receivers', 'cha_u.user_id2', '=', 'receivers.id')
            ->join('chats as ch', 'ch.chat_user_id', '=', 'cha_u.id')
            ->select(
                'ch.message',
                'ch.created_at',
                'senders.name as sender_name',
                'senders.role as sender_role',
                'receivers.name as receiver_name',
                'receivers.role as receiver_role'
            )
            ->where(function ($query) use ($authId, $id) {
                $query->where('cha_u.user_id1', $authId)
                      ->where('cha_u.user_id2', $id);
            })
            ->orWhere(function ($query) use ($authId, $id) {
                $query->where('cha_u.user_id1', $id)
                      ->where('cha_u.user_id2', $authId);
            })
            ->orderBy('ch.created_at', 'asc')
            ->get();
    
        if ($chats->isEmpty()) {
            return response()->json([
                'error' => 'Aucune conversation trouvée.',
            ], 404);
        }
    

        $conversation = $chats->map(function ($chat) {
            return [
                'message' => $chat->message,
                'sender' => $chat->sender_role,
                'receiver' => $chat->receiver_role,
            ];
        });


        return response()->json([
            'message' => $conversation,
            'sender' => $chats,
        ]);

    }
}

