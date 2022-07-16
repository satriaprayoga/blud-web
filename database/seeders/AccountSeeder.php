<?php

namespace Database\Seeders;

use App\Models\Account;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AccountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Account::insert([
            'kode'=>'4',
            'name'=>'PENDAPATAN',
            'root'=>true,
            'report'=>'LRA',
            'type'=>'pendapatan',
            'group'=>'induk',
            'nilai'=>0.00
        ]);
        Account::insert([
            'kode'=>'5',
            'name'=>'BELANJA',
            'root'=>false,
            'report'=>'LRA',
            'type'=>'belanja',
            'group'=>'induk',
            'nilai'=>0.00

        ]);
        Account::insert([
            'kode'=>'51',
            'name'=>'BELANJA OPERASIONAL',
            'root'=>false,
            'report'=>'LRA',
            'type'=>'belanja',
            'group'=>'kelompok',
            'nilai'=>0.00,
            'parent_id'=>2

        ]);
        Account::insert([
            'kode'=>'511',
            'name'=>'BELANJA PEGAWAI',
            'root'=>false,
            'report'=>'LRA',
            'type'=>'belanja',
            'group'=>'jenis',
            'nilai'=>0.00,
            'parent_id'=>3

        ]);
        Account::insert([
            'kode'=>'512',
            'name'=>'BELANJA BARANG DAN JASA',
            'root'=>false,
            'report'=>'LRA',
            'type'=>'belanja',
            'group'=>'jenis',
            'nilai'=>0.00,
            'parent_id'=>3

        ]);
       
    }
}
