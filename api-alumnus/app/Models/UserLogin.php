<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserLogin extends Model
{
    use HasFactory;

    protected $table = 'alumnus.user_login';

    protected $fillable = [
        'user_id',
        'phone_number',
        'password',
    ];

    public $timestamps = false;
}
