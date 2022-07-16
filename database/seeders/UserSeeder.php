<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name'=>'Ngadimin S.E',
            'username'=>'ngadimin',
            'email'=>'ngadimin@gmail.com',
            'nip'=>'1982929182911',
            'unit'=>'-',
            'password'=>Hash::make('asdqwe123'),
            'role_id'=>1
        ]);
    }
}
