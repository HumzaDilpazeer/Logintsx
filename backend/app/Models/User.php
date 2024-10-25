<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use Notifiable, HasApiTokens;

    protected $fillable = ['name', 'email', 'password', 'avatar'];

    protected $hidden = ['password', 'remember_token'];

    // Relationship with SocialLogin model
    public function socialLogins()
    {
        return $this->hasMany(SocialLogin::class);
    }

    // Cast attributes
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}
