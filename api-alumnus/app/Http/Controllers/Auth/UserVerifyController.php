<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\UserVerify; 
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class UserVerifyController extends Controller
{
    // 提交认证信息
    public function store(Request $request)
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

        $request->validate([
            'enrollment_status' => 'required|string|max:50',
            'school' => 'required|string|max:100',
            'faculty' => 'required|string|max:100',
            'student_id' => 'required|string|max:50',
            'major' => 'required|string|max:100',
            'class' => 'required|string|max:50',
            'identity_image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // 验证图片
        ]);

        // 处理上传的图片
        if ($request->hasFile('identity_image')) {
            $imagePath = $request->file('identity_image')->store('picture', 'public');
        } else {
            return response()->json(['error' => 'Image upload failed'], 400);
        }

        // 存储用户认证信息
        $verify = new UserVerify([
            'user_id' => $user ->user_id,// 获取当前用户的 ID
            'enrollment_status' => $request->input('enrollment_status'),
            'school' => $request->input('school'),
            'faculty' => $request->input('faculty'),
            'student_id' => $request->input('student_id'),
            'major' => $request->input('major'),
            'class' => $request->input('class'),
            'identity_image_path' => $imagePath,
            'status' => 0,
        ]);

        $verify->save();

        return response()->json(['message' => 'Verification submitted successfully'], 200);
    }

    // 获取认证状态（如果需要）
    public function getVerifyList(Request $request)
    {
        // 使用 Eloquent 关联查询 user_verify 表和 user_info 表的数据
        $verifications = UserVerify::with('userInfo')->get();

        // 格式化返回数据
        $data = $verifications->map(function ($verification) {
            return [
                'user_id' => $verification->user_id,
                'name' => $verification->userInfo->name,  // 从 user_info 表中获取用户姓名
                'gender' => $verification->userInfo->gender,  // 从 user_info 表中获取性别
                'education_level' => $verification->enrollment_status,  // 学历
                'school' => $verification->school,  // 学校
                'faculty' => $verification->faculty,  // 学院
                'student_id' => $verification->student_id,  // 学号
                'major' => $verification->major,  // 专业
                'class' => $verification->class,  // 班级
                'apply_time' => $verification->created_at,  // 申请时间
                'identity_image_path' => $verification->identity_image_path,  // 证明图片路径
                'status' => $verification->status,  // 审核状态
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $data,
        ]);
    }
    public function updateVerifyStatus(Request $request)
    {
        $request->validate([
            'user_id' => 'required|string|max:50',
            'status' => 'required|integer',
        ]);

        $verify = UserVerify::where('user_id', $request->input('user_id'))->first();

        if (!$verify) {
            return response()->json(['error' => 'Verification not found'], 404);
        }

        $verify->status = $request->input('status');
        $verify->save();

        return response()->json(['message' => 'Verification status updated successfully'], 200);
    }
}
