import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/admin/repairList',
    method: 'get',
    params
  })
}

export function getRepairmanList(params) {
  return request({
    url: '/admin/repairmanList',
    method: 'get',
    params
  })
}
