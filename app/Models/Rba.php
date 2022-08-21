<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rba extends Model
{
    use HasFactory;

    public function dpa(){
        return $this->belongsTo(Dpa::class,'dpa_id');
    }

    public function rbaReks(){
        return $this->hasMany(RbaRek::class,'rba_id','id');
    }
}
