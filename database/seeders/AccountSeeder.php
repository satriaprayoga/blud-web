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
            'kode'=>'511',
            'name'=>'BELANJA PEGAWAI',
            'root'=>false,
            'report'=>'LRA',
            'type'=>'belanja',
            'group'=>'jenis',
            'nilai'=>0.00,
            'parent_kode'=>'51'

        ]);
        Account::insert([
            'kode'=>'512',
            'name'=>'BELANJA BARANG DAN JASA',
            'root'=>false,
            'report'=>'LRA',
            'type'=>'belanja',
            'group'=>'jenis',
            'nilai'=>0.00,
            'parent_kode'=>'51'

        ]);
       
    }
}
