<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class VisitController extends Controller
{
    public function index()
{
    $visits = VisitController::orderBy('created_at', 'desc')->paginate(20);
    return response()->json(['visits'=>$visits]);
}

}
