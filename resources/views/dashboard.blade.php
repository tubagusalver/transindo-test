@extends('layouts.layout')
@section('main_container')
	<div class="row">
		<h1>Dashboard, coming soon !!!</h1>
		{{Session::get('id_user')}}
		<br>
		{{Session::get('nama_user')}}
		<br>
		{{Session::get('nomor_telepon_user')}}
		<br>
		{{Session::get('nomor_sim_user')}}
		<br>
	</div>

@endsection





