<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;
    protected $fillable = ['etudiant_id', 'professeur_id','time_reservation','dura','date_reservation', 'status','session_link'];

}
