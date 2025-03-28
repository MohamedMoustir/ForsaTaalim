<?php
namespace App\Repositories;

use App\Models\Announcement;
use App\Models\CategorieMatiere;
use App\Models\User;
use DB;
use Mail;


class AdminRepositories
{
    protected $model;
    public function __construct(User $model)
    {
        $this->model = $model;
    }
    public function update($id, $data)
    {
        return $this->model->findOrFail($id)->update(['role' => $data['role']]);
    }
    public function delete($id)
    {
        return $this->model->findOrFail($id)->delete();
    }
    public function sospande($id)
    {
        $update = $this->model->findOrFail($id)->update(['isActive' => 0]);
        $users = User::all();

        foreach ($users as $user) {
            if ($user->isActive = 0) {

                Mail::to('itsmoustir@gmail.com')->send(new WelcomeEmailNotification($user));
            }
        }
        return $update;
    }
    public function TotalUser()
    {
        return $this->model->count();
    }
    public function TotalAnnonce()
    {
        return Announcement::count();
    }
    public function TotalUserActive()
    {
        return DB::table('users ')
            ->select(DB::raw('COUNT(*) as total_sold'))
            ->where('isActive', '=', 1)
            ->get();

    }
    public function TotalUserSospande()
    {
        return DB::table('users ')
            ->select(DB::raw('COUNT(*) as total_sold'))
            ->where('isActive', '=', 0)
            ->get();

    }
}