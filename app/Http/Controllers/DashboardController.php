<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
Use DB;

class DashboardController extends Controller
{
	public function Dashboard()
    {
        return view('dashboard');
    }

}
