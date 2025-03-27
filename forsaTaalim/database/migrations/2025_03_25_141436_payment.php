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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->string('payment_id')->unique();
            $table->string('payer_id');
            $table->string('payer_email');
            $table->decimal('amount',10 ,2);
            $table->string('currencym');
            $table->enum('payment_status', ['pending', 'declined', 'approved', 'refunded'])->default('pending');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('reservation_id')->constrained()->onDelete('cascade');
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
