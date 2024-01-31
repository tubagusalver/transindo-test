<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use DB;
use Session;


class LoginController extends Controller
{

	public function Login()
	{
		return view('login');
	}

	public function PostLogin(Request $request)
	{
		$username 	= $request['mem_email'];
		$password	= $request['mem_password'];
        $checklogin = DB::table('user')->where('username_user', $username)
								 	   		->where('password_user', $password)
									   		->get();

		if(empty($checklogin[0]->username_user)){
			return redirect()->back()->with('alert', 'Oops! You are not registered in This Application. Please register new account');
		}else{
		    Session()->put('id_user', $checklogin[0]->id_user);
			Session()->put('nama_user', $checklogin[0]->nama_user);
			Session()->put('nomor_telepon_user', $checklogin[0]->nomor_telepon_user);
			Session()->put('nomor_sim_user', $checklogin[0]->nomor_sim_user);

			return redirect('/Dashboard');
		}	

	}

	public function logout()
	{
		Session::flush();

	 	return redirect('/');
	}

	public function register()
	{
		return view('register');
	}

	public function registerasi_account(Request $request)
	{
		$user = new User;
		$user->username_user		= $request->registrasi_email;
		$user->password_user		= $request->registrasi_password;
		$user->nama_user			= $request->registrasi_nama;
		$user->alamat_user			= $request->registrasi_alamat;
		$user->nomor_telepon_user	= $request->registrasi_nomortelepon;
		$user->nomor_sim_user		= $request->registrasi_nomorsim;
		$user->save();

		return redirect('/');
	}
}