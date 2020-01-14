import request from '@/utils/request'

export function getOperatorList(params) {
  return request({
    url: '/service/GetOperator',
    method: 'get',
    params
  })
}
