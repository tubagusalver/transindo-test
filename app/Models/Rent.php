<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rent extends Model
{
    protected $connection = 'mysql';
	public $timestamps = false;
	public $incrementing = false;
	protected $primaryKey = 'rent_id';
    protected $table = 'rent_request';
}

