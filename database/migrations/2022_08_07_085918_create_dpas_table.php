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
        Schema::create('dpas', function (Blueprint $table) {
            $table->id();
            $table->year('tahun');
            $table->string('tahapan')->default('M');
            $table->integer('status')->default(0);
            $table->string('no_dpa');
            $table->string('type');
            $table->float('total',15,2)->default(0.00);
            $table->float('total_after',15,2)->default(0.00);
            $table->boolean('aktif')->default(false);
            $table->string('kegiatan')->nullable(true);
            $table->string('kode_kegiatan')->nullable(true);
            $table->string('subkegiatan')->nullable(true);
            $table->string('kode_subkegiatan')->nullable(true);
            $table->string('kode_rekening')->nullable(true);
            $table->foreignId('subunit_id')->constrained('subunits','id');
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
        Schema::dropIfExists('dpas');
    }
};
