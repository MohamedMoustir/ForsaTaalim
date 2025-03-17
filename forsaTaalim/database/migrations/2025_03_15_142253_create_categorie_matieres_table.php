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
        Schema::create('categorie_matieres', function (Blueprint $table) {
            $table->id();
            $table->string('nom'); 
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
        });
    
        Schema::dropIfExists('categorie_matieres');
    }
};
