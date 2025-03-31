<?php
namespace App\Repositories;

use App\Models\Announcement;
use App\Models\CategorieMatiere;
use App\Models\Comment;
use App\Models\User;
use DB;
use Illuminate\Console\Command;
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
    public function suspended($id)
    {
        $update = $this->model->findOrFail($id)->update(['isActive' => 0]);
        return $update;
    }
    public function TotalUser()
    {
        return $this->model->where('role','=','etudiant')->count();
    }
    public function TotalAnnonce()
    {
        return Announcement::count();
    }
    public function TotalUserActive()
    {
        return DB::table('users')
            ->select(DB::raw('COUNT(*) as total_sold'))
            ->where('isActive', '=', 1)
            ->get();

    }
    public function TotalUsersuspended()
    {
        return DB::table('users')
            ->select(DB::raw('COUNT(*) as total_sold'))
            ->where('isActive', '=', 0)
            ->get();

    }
    public function generateActivityReport(){
        $totalUsers = User::count();
        $totalAnnouncement = Announcement::count();
        $totalReviews = Comment::count();

        return response()->json([
            'totalUsers' => $totalUsers,
            'totalBookings' => $totalAnnouncement,
            'totalReviews' => $totalReviews,
        ]);
    }

    public function generatePerformanceReport(){
        return  DB::table('users u')
        ->join('comments c','c.tuteur_id','=','u.id')
        ->select(DB::AVG('c.rating'))
        ->get();
    }
    
}