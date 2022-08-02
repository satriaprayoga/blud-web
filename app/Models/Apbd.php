<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Apbd extends Model
{
    protected $fillable=[
        'tahun',
        'tahapan',
        'perda',
        'perkada',
        'status',
        'aktif'
    ];
    use HasFactory;
}
