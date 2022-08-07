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
            $table->string('tahapan');
            $table->integer('status')->default(0);
            $table->string('no_dpa');
            $table->string('type');
            $table->float('total',10,2)->default(0.00);
            $table->float('total_after',10,2)->default(0.00);
            $table->boolean('aktif')->default(false);
            $table->foreignId('subunit_id')->constrained('subunits','id');
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
