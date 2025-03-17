<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompetenceProfesseur extends Model
{
    use HasFactory;

    protected $fillable = ['professeur_id', 'competence_id'];
}
