<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dpa extends Model
{
    use HasFactory;

    protected $fillable=[
        'tahun',
        'tahapan',
        'status',
        'no_dpa',
        'type',
        'total',
        'total_after',
        'aktif',
        'subunit_id'
    ];

    public function subunit(){
        $this->belongsTo(Subunit::class,'subunit_id');
    }
}
