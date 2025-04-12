<?php
// app/Http/Controllers/FavoriteController.php
namespace App\Http\Controllers;

use App\Models\Favorite;
use App\Models\Item;
use App\Services\professeurService;
use DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use PhpParser\Node\Stmt\Return_;

class FavoritesController extends Controller
{
    public function store(request $request)
    {
        $request->validate([
            'user_id2' => 'required'
        ]);
        $userId = $request->input('user_id2');
        $user = Auth::user();
        $existingFavorite = Favorite::where('user_id1', $user->id)
            ->where('user_id2', $userId)
            ->first();

        if (!$existingFavorite) {
            Favorite::create([
                'user_id1' => $user->id,
                'user_id2' => $userId,
            ]);
        }

        return response()->json(['message' => 'Added to favorites']);
    }

    public function destroy($id)
    {
        $user = Auth::user();

        $favorite = Favorite::where('user_id1', $user->id)
            ->where('user_id2', $id)
            ->first();

        if ($favorite) {
            $favorite->delete();
        }

        return response()->json(['message' => 'Removed from favorites']);
    }

    public function index()
    {
        $user = Auth::id();
        $favorites = DB::table('favorites')
            ->join('users', 'favorites.user_id2', '=', 'users.id')  
            ->join('professeurs as p', 'users.id', '=', 'p.id') 
            ->leftJoin('comments as comme1', 'users.id', '=', 'comme1.tuteur_id') 
            ->where('favorites.user_id1', '=', $user)  
            ->select(
                'favorites.id as favorite_id',
                'favorites.user_id1',
                'favorites.user_id2',
                'users.id as user_id',
                'users.name as user_name',
                'users.email as user_email',
                'users.photo as user_photo',
                'p.id as prof_id',
                'p.tarifHoraire',
                DB::raw('COUNT(comme1.rating) as total_ratings')  
            )
            ->groupBy('favorites.id', 'favorites.user_id1', 'favorites.user_id2', 'users.id', 'users.name', 'users.email', 'users.photo', 'p.id')  
            ->get();
        
        return response()->json($favorites);
            } 
}
