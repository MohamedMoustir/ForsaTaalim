<?php
namespace App\Repositories;

use App\Models\Tag;
use DB;
use Notification;

class NotificationRepositories
{

    protected $model;
    public function __construct(\App\Models\Notification $model)
    {
        $this->model = $model;
    }
    public function create($data)
    {
        return $this->model->create($data);
    }
    public function delete($id)
    {
      return  $this->model->findOrFail($id)->delete();

    }
    public function getById($id)
    {
        return DB::table('notifications as not')
            ->join('users as u1', 'not.receiver_id', '=', 'u1.id')
            ->join('users as u2', 'not.sender_id', '=', 'u2.id')
            ->where(function($query) use ($id) {
                $query->where('not.receiver_id', '=', $id)
                      ->orWhere('not.sender_id', '=', $id);
            })
            ->select('not.*', 'u2.prenom as sender', 'u2.photo')
            ->get();
    }
    
}