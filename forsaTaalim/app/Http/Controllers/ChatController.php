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
        $data = $this->chatService->create($validatedata, auth::user()->id, $id);
        event(new Message($request->input('username'), $request->input('message'), $id));
        return $data;
    }

    public function getMessage($id, $chat_user_id)
    {
       

        $chats = DB::table('chat_users as cha_u')
            ->join('chats as ch', 'ch.chat_user_id', '=', 'cha_u.id')
            ->join('users as sender', 'ch.sender_id', '=', 'sender.id')
            ->select('ch.message', 'sender.name as sender_name', 'sender.id as sender_id', 'sender.role as sender', 'ch.created_at')
            ->where('ch.chat_user_id', '=', $chat_user_id)
            ->get();
        $conversation = $chats->map(function ($chat) {
            return [
                'message' => $chat->message,
                'sender' => $chat->sender,
                'sender_id'=> $chat->sender_id,
                'timestamp' => now()->format('h:i A')
            ];
        });

        return response()->json([
            'messages' => $conversation,
        ]);
    }


    public function getContacts()
    {
        $authId = Auth::id();
        $contacts = DB::table('chat_users as cu')
            ->join('chats as ch', 'cu.id','=','ch.chat_user_id')
            ->where('user_id1', $authId)
            ->orWhere('user_id2', $authId)
            ->select('cu.id as chat_user_id', 'cu.user_id1', 'cu.user_id2', DB::raw('MIN(ch.message) as last_message'))
            ->groupBy('cu.id', 'cu.user_id1', 'cu.user_id2')
            ->orderByDesc(DB::raw('MAX(ch.created_at)'))
            ->get();

        $users = $contacts->map(function ($chat) use ($authId) {
            $otherUserId = $chat->user_id1 == $authId ? $chat->user_id2 : $chat->user_id1;

            $user = DB::table('users')->where('id', $otherUserId)->first();

            return [
                'id' => $user->id,
                'name' => $user->name,
                'role' => $user->role,
                'chat_user_id' => $chat->chat_user_id,
                'image' => $user->photo,
                'message'=>$chat->last_message,
                'created_at'=>now()->format('h:i A')
                
            ];
        });

        return response()->json([
            'contacts' => $users,
        ]);
    }


}

