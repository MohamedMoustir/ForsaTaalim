<?php

namespace App\Http\Controllers;

use App\Events\Message;
use App\Models\Chat_user;
use Illuminate\Http\Request;
use App\Models\Chat;
use Illuminate\Support\Facades\Auth;
class ChatController extends Controller
{
    public function message(Request $request,$id)
    {
        dd(auth::id());

        $validatedata = $request->validate([
            'receiver_id'  => 'required|integer',
            'message'      => 'required|string|max:1000',
        ]);
         $chat_user = Chat_user::create([
            'user_id1'=>auth::id(),
            'user_id2'=>$id,
         ]);
         $chat_user->save();
         $chat_user_id = $chat_user->id;
      
        event(new Message($request->input('username'), $request->input('message'), $request->input('receive_id')));

        return [];
    }


    public function getMessage($id)
    {
        $chats = Chat::where(function ($query) use ($id) {
            $query->where('sender_id', Auth::id() ? 11 : 11)->where('receiver_id', $id);
        })->orWhere(function ($query) use ($id) {
            $query->where('sender_id', $id)->where('receiver_id', Auth::id() ? 10 : 10);
        })->orderBy('created_at', 'asc')->get();

        $conversation = $chats->map(function ($chat) {
            return [
                'message' => $chat->message,
                'sender' => $chat->sender_id == Auth::id() ? 'etudiant' : 'tuteur',
            ];
        });

        return response()->json([
            'message' => $conversation,
            'sender' => $chats
        ]);
      
    }
}