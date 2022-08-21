<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('rba_reks', function (Blueprint $table) {
            $table->id();
            $table->string('kode');
            $table->string('name');
            $table->string('kode_induk');
            $table->string('name_induk');
            $table->string('kode_kelompok');
            $table->string('name_kelompok');
            $table->string('kode_jenis');
            $table->string('nama_jenis');
            $table->string('kode_objek');
            $table->string('nama_objek');
            $table->float('total',15,2)->default(0.00);
            $table->float('total_after',15,2)->default(0.00);
            $table->string('tahapan')->default('M');
            $table->foreignId('rba_id')->constrained('rbas','id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('rba_reks');
    }
};
