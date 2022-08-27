<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Operasional extends Model
{
    use HasFactory;

    protected $fillable=[
        'name',
        'kode',
        'type',
        'pendapatan',
        'subunit_id'
    ];
}
