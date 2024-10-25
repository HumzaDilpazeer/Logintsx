<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email', 191)->unique('users_email_unique')->index()->collation('utf8mb4_bin');
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password')->nullable(); // Nullable for social logins
            $table->string('avatar')->nullable(); // Avatar URL from social accounts
            $table->boolean('is_verified')->default(false);
            $table->boolean('is_active')->default(true);
            $table->rememberToken();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
