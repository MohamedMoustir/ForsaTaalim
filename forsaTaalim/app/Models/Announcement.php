<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Announcement extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'subjects',
        'levels',
        'price',
        'location',
        'date',
        'is_active',
        'professeur_id'
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
