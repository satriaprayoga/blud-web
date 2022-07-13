<?php

namespace Database\Seeders;

use App\Models\Unit;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UnitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Unit::create([
            'name'=>'RUMAH SAKIT UMUM DAERAH CIBINONG',
            'kode'=>'1.02.0.00.0.00.01.0006',
            'singkatan'=>'RSUD Cibinong',
            'lokasi'=>'Cibinong',
            'nama_kepala'=>'dr. Wahyu Eko Widiharso, Sp. OT, MARS',
            'nip_kepala'=>'196402111990011001',
            'jabatan_kepala'=>'Direktur'
        ]);
    }
}
