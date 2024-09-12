<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\UserLogin;

class LoginController extends Controller
{
    /**
     * Handle a login request to the application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        // 验证输入
        $request->validate([
            'phone_number' => 'required|string|max:15', // 手机号字段
            'password' => 'required|string|min:6',      // 密码字段
        ]);

        // 使用手机号查找用户
        $user = UserLogin::where('phone_number', $request->phone_number)->first();

        // 检查用户是否存在，并验证密码
        if ($user && Hash::check($request->password, $user->password)) {
            // 登录用户并生成 token 或会话
            // Auth::login($user);

            // 返回成功响应
            return response()->json([
                'message' => 'Login successful',
                'user' => $user,
                'token' => 'token',
            ]);
        }

        // 返回失败响应
        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    /**
     * Handle user logout.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        Auth::logout();

        return response()->json(['message' => 'Successfully logged out']);
    }
}
