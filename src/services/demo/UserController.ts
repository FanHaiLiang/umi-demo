import request from '@/utils/http';

export async function queryUserList(
  params: {
    // query
    /** keyword */
    keyword?: string;
    /** current */
    current?: number;
    /** pageSize */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.Result_PageInfo_UserInfo__>('/api/v1/queryUserList', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

// 测试接口
export async function getDriveVeryfy(params: any, options: any) {
  return request('/api/v1/queryUserList', {
    method: 'GET',
    params,
    ...(options || {}),
    // mock: true
  })
}