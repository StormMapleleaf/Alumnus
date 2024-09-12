<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\User;
use App\Models\UserLogin;

class RegisterController extends Controller
{
    /**
     * Handle a registration request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        // 验证输入
        $request->validate([
            'phone_number' => 'required|string|max:15|unique:alumnus.user_login',  // 验证手机号唯一
            'password' => 'required|string|min:6',                // 验证密码并要求确认
        ]);

        // 创建用户 ID（18位）
        $userId = Str::random(18);

        // 插入用户信息到 users 表
        $user = User::create([
            'user_id' => $userId,
        ]);

        // 插入登录信息到 user_login 表
        UserLogin::create([
            'user_id' => $user->user_id,
            'phone_number' => $request->phone_number,
            'password' => Hash::make($request->password),  // 使用 bcrypt 加密密码
        ]);

        return response()->json(['message' => 'User registered successfully'], 201);
    }
}
