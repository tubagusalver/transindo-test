<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Referensi extends Model
{
    protected $connection = 'mysql';
	public $timestamps = false;
	public $incrementing = false;
	protected $primaryKey = 'ref_id';
    protected $table = 'dataref';
}
