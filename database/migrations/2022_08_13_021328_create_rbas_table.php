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
        Schema::create('rbas', function (Blueprint $table) {
            $table->id();
            $table->string('type');
            $table->string('tahapan')->default('M');
            $table->float('total',15,2)->default(0.00);
            $table->float('total_after',15,2)->default(0.00);
            $table->foreignId('dpa_id')->constrained('dpas','id');
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
        Schema::dropIfExists('rbas');
    }
};
