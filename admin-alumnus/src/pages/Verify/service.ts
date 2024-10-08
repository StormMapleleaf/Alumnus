import { request } from 'umi';

// 更新身份验证的状态
export async function updateVerificationStatus(id: number, user_id: string, status: number) {
  return request(`http://localhost:8000/api/user/verify/update`, {
    method: 'POST',
    data: { id, user_id, status },
  });
}

export async function getVerifyList() {
    return request('http://localhost:8000/api/user/verify/list', {
        method: 'POST',
    });
}