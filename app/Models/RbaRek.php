<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RbaRek extends Model
{
    use HasFactory;

    public function rba(){
        return $this->belongsTo(Rba::class,'rba_id');
    }
}
