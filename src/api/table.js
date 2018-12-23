import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/admin/repairList',
    method: 'get',
    params
  })
}
