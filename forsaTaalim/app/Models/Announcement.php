<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Announcement extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'image',
        'description',
        'subjects',
        'levels',
        'price',
        'location',
        'date',
        'is_active',
        'professeur_id'
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
