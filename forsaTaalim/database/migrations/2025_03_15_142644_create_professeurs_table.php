<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('professeurs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('categorieMatiere_id');
            $table->unsignedBigInteger('user_id');
            $table->string('diplomes');
            $table->string('experiences');
            $table->string('tarifHoraire');
            // $table->boolean('disponible')->default(true);
            $table->string('location');
            $table->text('biographie');
            $table->string('video')->nullable();
            $table->foreign('categorieMatiere_id')->references('id')->on('categorie_matieres');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

   

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::table('professeurs', function (Blueprint $table) {
            $table->dropForeign(['categorieMatiere_id']);
            $table->dropForeign(['user_id']);
        });
        
        Schema::dropIfExists('professeurs');
    }
};
