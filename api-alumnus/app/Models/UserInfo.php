<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserInfo extends Model
{
    use HasFactory;

    // 表名
    protected $table = 'alumnus.user_info';

    // 主键
    protected $primaryKey = 'id';

    // 时间戳
    public $timestamps = true;

    // 可填充字段
    protected $fillable = [
        'user_id',
        'name',
        'gender',
        'created_at',
        'updated_at',
    ];

    public function verify()
    {
        return $this->hasOne(UserVerify::class, 'user_id', 'user_id');
    }

    // 不可填充字段（如果有的话）
    // protected $guarded = [];
}
