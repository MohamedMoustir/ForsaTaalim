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
        Schema::create('announcements', function (Blueprint $table) {
            $table->id();
            $table->uuid('announcement_id')->unique();
            $table->string('title');
            $table->text('description');
            $table->json('subjects'); 
            $table->json('levels'); 
            $table->decimal('price', 8, 2);
            $table->string('location');
            $table->timestamp('created_at')->useCurrent();
            $table->boolean('is_active')->default(true);
            $table->foreignId('professeur_id')->constrained('users')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('announcements');
    }
};
