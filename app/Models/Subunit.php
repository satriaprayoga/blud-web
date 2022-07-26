<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subunit extends Model
{
    use HasFactory;

    protected $fillable=['nama',
    'kode',
    'singkatan',
    'nama_bend',
    'nip_bend',
    'jabatan_bend',
    'nama_sptjm',
    'nip_sptjm',
    'nama_sp2b',
    'nip_sp2b',
    'jabatan_sp2b',
    'unit_id'];

    public function unit(){
        return $this->belongsTo(Unit::class);
    }
}
