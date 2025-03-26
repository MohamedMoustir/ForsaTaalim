<?php
namespace App\Repositories;

use App\Models\CategorieMatiere;
use App\Models\Chat;
use App\Models\Competence;
use App\Models\Professeur;
use App\Models\User;
use Auth;
use DB;
use Hash;
use Pusher\Pusher;
use Session;
use Tymon\JWTAuth\Facades\JWTAuth;
use function PHPUnit\Framework\returnArgument;

class ChatRepositories
{

    protected $model;
    public function __construct(Chat $model)
    {
        $this->model = $model;
    }

    public function create($data)
    {
        // Create the Pusher instance
        $pusher = new Pusher(
            env('PUSHER_APP_KEY'),
            env('PUSHER_APP_SECRET'),
            env('PUSHER_APP_ID'),
            [
                'cluster' => env('PUSHER_APP_CLUSTER'),
                'useTLS' => true
            ]
        );

        // Trigger the Pusher event with current timestamp
        $pusher->trigger('forsaTaalm-development', 'message', [
            'message' => $data['message'],
            'sender' => Auth::user()->role,
            'timestamp' => now()->format('h:i A'),
        ]);

        return $this->model->create($data);
    }

}