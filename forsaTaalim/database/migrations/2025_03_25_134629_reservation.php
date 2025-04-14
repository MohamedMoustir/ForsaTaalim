<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reservations', function (Blueprint $table) {

            $table->id();
            $table->unsignedBigInteger('etudiant_id');
            $table->unsignedBigInteger('professeur_id');
            $table->date('date_reservation');
            $table->time('time_reservation');
            $table->enum('status',['pending','approved','refuser'])->default('pending');
            $table->foreign('etudiant_id')->on('users')->references('id')->onDelete('cascade');
            $table->foreign('professeur_id')->on('users')->references('id')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
