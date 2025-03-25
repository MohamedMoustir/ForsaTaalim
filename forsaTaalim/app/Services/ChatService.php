<?php

namespace App\Services;

use App\Models\CategorieMatiere;
use App\Repositories\CategorieMatiereRepository;
use App\Interface\CrudInterface;
use App\Repositories\AuthRepository;
use App\Repositories\ChatRepositories;


class ChatService 
{
    protected $chatRepositories;

    public function __construct(ChatRepositories $chatRepositories)
    {
        $this->chatRepositories = $chatRepositories;
    }


    public function create(array $data , $id,$sender_id)
    {
        $data['chat_user_id'] = $id;
        $data['sender_id'] = $sender_id;

        return $this->chatRepositories->create($data);
    }
}