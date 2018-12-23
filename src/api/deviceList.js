import request from '@/utils/request'

export function getDeviceList(params) {
  return request({
    url: '/admin/deviceList',
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
