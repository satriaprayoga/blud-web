<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Unit extends Model
{
    use HasFactory;

    protected $fillable=['name','kode','singkatan','lokasi','nama_kepala','nip_kepala','jabatan_kepala'];
    
    public function subunits(){
        return $this->hasMany(Subunit::class,'unit_id','id');
    }
}
