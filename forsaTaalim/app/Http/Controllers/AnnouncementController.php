<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AnnouncementController extends Controller
{

    public function createAnnouncment(request $request)
    {

        $validateData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'subjects' => 'required|array',
            'subjects.*' => 'string',
            'levels' => 'required|array',
            'levels.*' => 'string',
            'price' => 'required|numeric',
            'location' => 'required|string|max:255',
            'date' => 'required|date',
            'is_active' => 'required|boolean',
        ]);

        $announcement = new Announcement();
        $announcement->title = $request->title;
        $announcement->description = $request->description;
        $announcement->subjects = $request->subjects;
        $announcement->levels = $request->levels;
        $announcement->price = $request->price;
        $announcement->location = $request->location;
        $announcement->date = $request->date;
        $announcement->is_active = $request->is_active;
        $announcement->professeur_id = Auth::id();
        $announcement->save();

        return response()->json(['message' => 'Annonce créée avec succès', 'Announcment' => $announcement]);
    }

    public function ShowAnnouncment(){
        $announcement = Announcement::all();
        return response()->json(['message' => 'All Announcement', 'Allannouncement' => $announcement]);

    }
    public function ShowAnnouncmentById($id){
        $announcement = Announcement::findOrFail($id);
        return response()->json(['message' => 'Announcement', 'announcement' => $announcement]);
    }
    public function updatesAnnouncment(request $request, $id)
    {
        $data = $request->validate([
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'subjects' => 'nullable|array',
            'subjects.*' => 'string',
            'levels' => 'nullable|array',
            'levels.*' => 'string',
            'price' => 'nullable|numeric',
            'location' => 'nullable|string|max:255',
            'date' => 'nullable|date',
            'is_active' => 'nullable|boolean',
        ]);

        $announcement = Announcement::findOrFail($id);
        $announcement->updateAnnouncement($data);
        return response()->json(['message' => 'announcement updated successfully!', 'announcement' => $announcement], 200);



    }
    public function deleteAnnouncment($id){
        $announcement = Announcement::findOrFail($id);
        $announcement->delete();
        return response()->json(['message' => 'announcement deleted successfully!'], 200);
    }
}
