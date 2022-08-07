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
        Schema::create('subunits', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('kode');
            $table->string('singkatan');
            $table->string('nama_bend');
            $table->string('nip_bend');
            $table->string('jabatan_bend');
            $table->string('nama_sptjm');
            $table->string('nip_sptjm');
            $table->string('jabatan_sptjm');
            $table->string('nama_sp2b');
            $table->string('nip_sp2b');
            $table->string('jabatan_sp2b');
            $table->foreignId('unit_id')->constrained()->onDelete('cascade')->onUpdate('cascade');
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
        Schema::dropIfExists('subunits');
    }
};
