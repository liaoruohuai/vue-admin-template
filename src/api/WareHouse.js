import request from '@/utils/request'

export function getWareHouseList(params) {
  return request({
    url: '/service/GetWareHouse',
    method: 'get',
    params
  })
}
