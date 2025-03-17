<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AnnouncementController extends Controller
{
    protected $fillable = [
        'announcement_id',
        'title',
        'description',
        'subjects',
        'levels',
        'price',
        'location',
        'created_at',
        'is_active'
    ];
    protected $casts = [
        'subjects' => 'array',
        'levels' => 'array',
        'is_active' => 'boolean',
        'created_at' => 'datetime',
    ];

    public function updateAnnouncement(array $data): void
    {
        $this->update($data);
    }
    public function deactivateAnnouncement(): void
    {
        $this->update(['is_active' => false]);
    }
    public function promoteAnnouncement(): void
    {
        $this->update(['is_active' => true]);
    }
}
