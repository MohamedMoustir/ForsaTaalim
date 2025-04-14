<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Disponibilite extends Model
{
    use HasFactory;
    protected $fillable = ['tuteur_id','date','titleEvant','colorEvant','is_walkin'];

}