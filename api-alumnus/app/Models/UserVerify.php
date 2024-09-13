<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserVerify extends Model
{
    use HasFactory;

    protected $table = 'alumnus.user_verify';

    protected $fillable = [
        'user_id',
        'enrollment_status',
        'school',
        'faculty',
        'student_id',
        'major',
        'class',
        'identity_image_path',
    ];

    public $timestamps = true; // 自动维护 `created_at` 和 `updated_at`
}
