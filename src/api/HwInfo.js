import request from '@/utils/request'

export function getHwList(params) {
  return request({
    url: '/service/HwInfo',
    method: 'get',
    params
  })
}
