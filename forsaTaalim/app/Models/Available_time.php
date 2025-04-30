<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Available_time extends Model
{
    use HasFactory;

    protected $table = 'available_times';

    protected $fillable = [
        'available_times',
        'prof_id',

    ];

  
}
