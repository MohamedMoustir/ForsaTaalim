<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Professeur extends Model
{
    use HasFactory;

    protected $fillable = ['categorieMatiere_id','diplomes', 'experiences', 'tarifHoraire', 'disponible', 'location', 'biographie', 'video'];
}
