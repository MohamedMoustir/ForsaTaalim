<?php
namespace App\Repositories;

use App\Models\Announcement;
use App\Models\CategorieMatiere;
use App\Models\Comment;
use App\Models\Reservation;
use App\Models\User;
use App\Models\Visit;
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
        $user = User::findOrFail($id);

        $user->isActive = !$user->isActive;
        $user->save();

        return response()->json([
            'success' => true,
            'message' => $user->isActive ? 'Utilisateur activé' : 'Utilisateur suspendu',
            'isActive' => $user->isActive,
        ]);
    }
    public function TotalUser()
    {
        return $this->model->where('role', '=', 'etudiant')->count();
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
    public function generateActivityReport()
    {
        $totaletudiant = User::where('role', '=', 'etudiant')->count();
        $totaltuteur = User::where('role', '=', 'tuteur')->count();
        $totalAnnouncement = Announcement::count();
        $totalReviews = Comment::count();

        return response()->json([
            'totaletudiant' => $totaletudiant,
            'totaltuteur' => $totaltuteur,
            'totalBookings' => $totalAnnouncement,
            'totalReviews' => $totalReviews,
        ]);
    }

    public function Activitehebdomadaire()
    {
        $visits = Visit::selectRaw('DATE(created_at) as day, COUNT(*) as total')->count();
        $inscriptions = User::selectRaw('DATE(created_at) as day')->count();
        $cours = Reservation::selectRaw('DATE(created_at) as day')->count();

        return response()->json(['visits' => $visits, 'inscriptions' => $inscriptions, 'cours' => $cours]);
    }

}




