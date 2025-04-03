<?php
namespace App\Repositories;

use App\Models\Tag;
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
}