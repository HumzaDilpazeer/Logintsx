<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('social_logins', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // References users table
            $table->string('provider'); // e.g., Google, GitHub
            $table->string('provider_id'); // Social Provider ID
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('social_logins');
    }
};
