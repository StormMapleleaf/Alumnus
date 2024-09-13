<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Models\UserInfo;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

class UserInfoController extends Controller
{
    public function getUserInfo(Request $request)
    {
        // 从请求中获取 token
        $token = $request->header('Authorization');
        
        if (!$token) {
            return response()->json(['error' => 'No token provided'], 401);
        }
    
        // 移除 Bearer 前缀
        $token = str_replace('Bearer ', '', $token);
    
        // 查找用户
        $user = User::where('user_id', $token)->first(); 
    
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }
    
        $userInfo = UserInfo::where('user_id', $user->user_id)->first();
    
        // 如果用户信息不存在，可以返回一个空数组或其他默认值
        if (!$userInfo) {
            $userInfo = [
                'name' => '',
                'gender' => '',
            ];
        } else {
            $userInfo = $userInfo->toArray();
        }
    
        return response()->json($userInfo);
    }
    

    // 创建或更新个人资料
    public function update(Request $request)
    {
        // 从请求中获取 token
        $token = $request->header('Authorization');
        
        if (!$token) {
            return response()->json(['error' => 'No token provided'], 401);
        }
    
        // 移除 Bearer 前缀
        $token = str_replace('Bearer ', '', $token);
    
        // 查找用户
        $user = User::where('user_id', $token)->first();
    
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }
    
        // 验证请求数据
        $request->validate([
            'name' => 'required|string|max:100',
            'gender' => 'nullable|string|in:0,1',
        ]);
    
        // 获取请求数据
        $data = $request->only(['name', 'gender']);
        $data['user_id'] = $user->user_id;
    
        // 转换性别值
        if (isset($data['gender'])) {
            $data['gender'] = $data['gender'] === '女' ? '0' : '1';
        }
    
        // 使用 updateOrCreate 方法，若记录存在则更新，否则创建
        UserInfo::updateOrCreate(
            ['user_id' => $user->user_id], // 匹配条件
            $data // 更新的数据
        );
    
        return response()->json(['message' => 'Profile updated successfully.']);
    }
    
    
}
