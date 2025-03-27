<?php
namespace App\Repositories;

use App\Models\User;
use Auth;
use Hash;
use Session;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthRepository
{

    protected $model;
    public function __construct(User $model)
    {
        $this->model = $model;
    }
    public function create(array $data)
    {
        $user = $this->model->create($data);
        Session::put('lastInsertId', $user->id);
        Auth::login($user);
        return $user;
    }

}