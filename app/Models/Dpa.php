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
        'kegiatan',
        'kode_kegiatan',
        'subkegiatan',
        'kode_subkegiatan',
        'kode_rekening',
        'subunit_id'
    ];

    public function subunit(){
        return $this->belongsTo(Subunit::class,'subunit_id');
    }

    public function rbas(){
        return $this->hasOne(Rba::class,'dpa_id','id');
    }
}
