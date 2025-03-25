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

        $chat_user = Chat_user::create([
            'user_id1' => auth::user()->id,
            'user_id2' => $id,
        ]);  

        $chat_user_id = $chat_user->id;
        $this->chatService->create($validatedata ,$chat_user_id,auth::user()->id);
        event(new Message($request->input('username'), $request->input('message'), $id));

        return [];
    }


    public function getMessage($id)
    {

        // $chats = DB::table('chat_users as chu')
        // ->join('chats as ch', 'chu.user_id1', '=', 'ch.sender_id')
        // ->where('chu.user_id1', '=', Auth::user()->id)
        // ->where('chu.user_id2', '=', $id)
        // ->select('chu.*', 'ch.*')
        // ->orderBy('ch.created_at', 'asc') 
        // ->get();
    
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