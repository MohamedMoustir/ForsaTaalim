<?php
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Disponibilite extends Model
{
    use HasFactory;
    protected $fillable = ['tuteur_id','available_from','available_to','is_walkin'];

}