<?php

namespace App\Http\Controllers;

use App\Http\Requests\AnnouncementRequests;
use App\Models\Announcement;
use App\Repositories\AnnouncementRepositories;
use App\Services\AnnouncementService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AnnouncementController extends Controller
{

    protected $announcementService;
    public function __construct(AnnouncementService $announcementService)
    {
        $this->announcementService = $announcementService;
    }
    public function create(AnnouncementRequests $request)
    {
        $validateData = $request->validated();
        $validateData['professeur_id'] = auth::id();
        $announcement = $this->announcementService->create($validateData );
        return response()->json(['message' => 'Annonce créée avec succès', 'Announcment' => $announcement]);
    }
    public function Show()
    {
        $announcement = $this->announcementService->getAll();
        return response()->json(['message' => 'All Announcement', 'Allannouncement' => $announcement]);

    }
    public function getById($id)
    {
        $announcement = $this->announcementService->getById($id);
        return response()->json(['message' => 'Announcement', 'announcement' => $announcement]);
    }
    public function update(request $request, $id)
    {
        $validateData = $request->validate([
            'title' => 'nullable|string|max:255',
            'image'=>'nullable',
            'description' => 'nullable|string',
            'subjects' => 'nullable|string',
            'levels' => 'nullable|string',
            'price' => 'nullable|numeric',
            'location' => 'nullable|string|max:255',
            'date' => 'nullable|date',
            'is_active' => 'nullable|boolean',
        ]);
        $announcement = $this->announcementService->Update($id, $validateData);
        return response()->json(['message' => 'announcement updated successfully!', 'announcement' => $announcement], 200);
    }
    public function delete($id)
    {
        $announcement = $this->announcementService->delete($id);
        return response()->json(['message' => 'announcement deleted successfully!'], 200);
    }
    
    public function getByIdAnnonce($id)
    {
        $announcement = $this->announcementService->getByIdAnnonce($id);
        return response()->json(['message' => 'Announcement', 'announcement' => $announcement]);
    }
}
