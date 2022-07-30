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
        Account::truncate();

        $csvFile = fopen(base_path("database/data/akun_induk.csv"), "r");

        $firstLine = true;
        while (($data = fgetcsv($csvFile, 2000, ",")) !== FALSE) {
            if (!$firstLine) {
                Account::create(
                    [
                        'kode' => $data[0],
                        'name' => $data[1],
                        'root' => $data[2],
                        'report' => $data[3],
                        'type' => $data[4],
                        'group' => $data[5]
                    ]
                );
            }
            $firstLine = false;
        }

        
    }
}
