import request from '@/utils/request'

export function getOutTransList(params) {
  return request({
    url: '/service/GetWebOutTrans',
    method: 'get',
    params
  })
}
