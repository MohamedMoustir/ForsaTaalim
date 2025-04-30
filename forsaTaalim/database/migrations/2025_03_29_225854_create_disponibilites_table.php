<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('disponibilites', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('tuteur_id');
            $table->timestamp('date');
            $table->string('titleEvant');
            $table->enum('colorEvant',['red','blue','green'])->default('red');
            $table->json('available_times')->nullable();
            $table->boolean('is_walkin')->default(true);
            $table->foreign('tuteur_id')->references('id')->on('users');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('disponibilites');
    }
};
