<?php

namespace App\Services;

use App\Models\CategorieMatiere;
use App\Models\Chat_user;
use App\Models\Chat;

use App\Models\Reservation;
use App\Repositories\CategorieMatiereRepository;
use App\Interface\CrudInterface;
use App\Repositories\AuthRepository;
use App\Repositories\ChatRepositories;
use Auth;
use Spatie\ErrorSolutions\Solutions\Laravel\GenerateAppKeySolution;


class ChatService
{
    protected $chatRepositories;
    protected int $id_chat = 1;

    public function __construct(ChatRepositories $chatRepositories)
    {
        $this->chatRepositories = $chatRepositories;
    }
    public function create(array $data, $sender_id, $id)
    {

        $chekifreser = Reservation::where('etudiant_id', '=', Auth::id())
            ->Where('professeur_id', '=', $id)
            ->count();

        if ($chekifreser > 0) {

            $chat_user = Chat_user::where(function ($query) use ($sender_id, $id) {
                $query->where('user_id1', $sender_id)
                    ->where('user_id2', $id);
            })
                ->orWhere(function ($query) use ($sender_id, $id) {
                    $query->where('user_id1', $id)
                        ->where('user_id2', $sender_id);
                })
                ->first();

            if (!$chat_user) {
                $chat_user = Chat_user::create([
                    'user_id1' => $sender_id,
                    'user_id2' => $id,
                ]);
            }

            $chat_user_id = $chat_user->id;

            $chat_count = Chat::where('chat_user_id', $chat_user_id)->count();

            if ($chat_count > 0) {
                $chats = Chat::where('chat_user_id', $chat_user_id)->first();
                $data['chat_user_id'] = $chats->chat_user_id;
                $data['sender_id'] = $sender_id;
            } else {
                $data['chat_user_id'] = $chat_user_id;
                $data['sender_id'] = $sender_id;
            }
            return $this->chatRepositories->create($data);
        } else {

            return [];

        }
    }
}