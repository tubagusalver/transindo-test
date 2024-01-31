<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\RentController;
use App\Http\Controllers\DataRefController;
use App\Http\Controllers\ProfileController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [LoginController::class, 'Login'])->name('Login');
Route::get('PostLogin', [LoginController::class, 'PostLogin'])->name('PostLogin');
Route::get('logout', [LoginController::class, 'logout'])->name('logout');

Route::get('Dashboard', [DashboardController::class, 'Dashboard']);

// Sewa Mobil
Route::get('RentList', [RentController::class, 'index']);
Route::post('AddRent', [RentController::class, 'add']);
Route::post('UpdateRent', [RentController::class, 'update']);
Route::get('DeleteRent', [RentController::class, 'delete']);
Route::get('ReturnRentDetail', [RentController::class, 'return_detail']);
Route::post('ReturnRent', [RentController::class, 'return']);
Route::post('TakeRent', [RentController::class, 'take']);

// Data referensi Mobil
Route::get('DataRef', [DataRefController::class, 'index']);
Route::post('AddDataRef', [DataRefController::class, 'add']);
Route::post('UpdateDataRef', [DataRefController::class, 'update']);
Route::get('DeleteDataRef', [DataRefController::class, 'delete']);

// Data Pribadi Pengguna
Route::get('Profile', [ProfileController::class, 'Profile']);
