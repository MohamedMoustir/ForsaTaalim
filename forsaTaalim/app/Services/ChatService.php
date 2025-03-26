<?php

namespace App\Services;

use App\Models\CategorieMatiere;
use App\Models\Chat_user;
use App\Repositories\CategorieMatiereRepository;
use App\Interface\CrudInterface;
use App\Repositories\AuthRepository;
use App\Repositories\ChatRepositories;
use Auth;


class ChatService 
{
    protected $chatRepositories;

    public function __construct(ChatRepositories $chatRepositories)
    {
        $this->chatRepositories = $chatRepositories;
    }


    public function create(array $data , $sender_id ,$id)
    {
        $chat_user = Chat_user::create([
            'user_id1' => $sender_id,
            'user_id2' => $id,
        ]);

        $chat_user_id = $chat_user->id;
        $data['chat_user_id'] = $chat_user_id;
        $data['sender_id'] = $sender_id;

        return $this->chatRepositories->create($data);
    }
}