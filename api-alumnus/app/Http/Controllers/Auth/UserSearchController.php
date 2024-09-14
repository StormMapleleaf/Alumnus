<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\UserInfo;
use App\Models\UserVerify;

class UserSearchController extends Controller
{
    public function search(Request $request)
    {
        // 验证请求，确保 'query' 参数存在
        $request->validate([
            'query' => 'required|string|max:255',
        ]);
    
        // 获取搜索关键词
        $searchTerm = $request->input('query');
    
        // 第一步：根据姓名搜索用户并获取所有符合条件的 user_id
        $userIds = UserInfo::where('name', 'like', '%' . $searchTerm . '%')
                        ->orWhere('user_id', 'like', '%' . $searchTerm . '%')
                        ->whereHas('verify', function ($query) {
                            $query->where('status', 1); // 仅查找已通过认证的用户
                        })
                        ->pluck('user_id'); // 只取出 user_id 列表
    
        // 第二步：使用获取的 user_id 查找 user_verify 表中所有相关记录
        $verifications = UserVerify::whereIn('user_id', $userIds)
                                    ->where('status', 1) // 仅查找已通过认证的用户
                                    ->get();
    
        // 返回JSON响应
        return response()->json([
            'data' => $verifications->map(function ($verify) {
                return [
                    'user_id' => $verify->user_id,
                    'name' => $verify->userInfo->name, // 假设你已经在 UserVerify 模型中定义了与 UserInfo 的关系
                    'gender' => $verify->userInfo->gender,
                    'school' => $verify->school,
                    'enrollment_status' => $verify->enrollment_status,
                    'faculty' => $verify->faculty,
                    'major' => $verify->major,
                    'class' => $verify->class,
                ];
            })
        ]);
    }
    
}
