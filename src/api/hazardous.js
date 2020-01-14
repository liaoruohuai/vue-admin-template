import request from '@/utils/request'

export function getHwList(params) {
  return request({
    url: '/service/GetWebHazardous',
    method: 'get',
    params
  })
}
