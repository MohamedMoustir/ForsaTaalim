<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('available_times', function (Blueprint $table) {
            $table->id();
            $table->json('available_times')->nullable(); 
            $table->unsignedBigInteger('prof_id');  
            $table->foreign('prof_id')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('available_times');
    }
};
