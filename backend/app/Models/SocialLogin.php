<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SocialLogin extends Model
{
    protected $fillable = ['provider', 'provider_id', 'user_id'];

    // Relationship to User
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
