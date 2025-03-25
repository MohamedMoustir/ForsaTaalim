<?php

namespace App\Http\Controllers;

use App\Services\EtudiantServices;
use Illuminate\Http\Request;

class EtudiantController extends Controller
{
    protected $etudiantServices;
    public function __construct(EtudiantServices $etudiantServices)
    {
        $this->etudiantServices = $etudiantServices;
    }
}
