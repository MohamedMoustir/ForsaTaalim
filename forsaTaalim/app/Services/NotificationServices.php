<?php

namespace App\Services;

use App\Models\CategorieMatiere;
use App\Models\Notification;
use App\Models\Tag;
use App\Repositories\NotificationRepositories;
use App\Interface\CrudInterface;
use App\Repositories\AuthRepository;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use NotificationSent;
use Termwind\Components\Dd;

class NotificationServices implements CrudInterface
{
    protected $notificationRepositories;

    public function __construct(NotificationRepositories $notificationRepositories)
    {
        $this->notificationRepositories = $notificationRepositories;
    }
    public function create(array $data)
    {
      
        $data['sender_id'] = Auth::id();
        return $this->notificationRepositories->create($data);
    }
    public function getAll(){}
    public function getById($id)
    {
        return $this->notificationRepositories->getById($id); 
    }
    public function update($id, array $data){}
    public function delete($id)
    {
        return $this->notificationRepositories->delete($id);
    }
}
