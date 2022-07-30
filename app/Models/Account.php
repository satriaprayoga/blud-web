<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
    use HasFactory;

    protected $fillable = [
        'kode', 'name','root','report','type','group','parent_id'
    ];

    public function children(){
        return $this->hasMany(Account::class,'parent_id','id');
    }

    public function parent(){
        return $this->belongsTo(Account::class,'parent_id','id');
    }
}
