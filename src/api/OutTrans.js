import request from '@/utils/request'

export function getOutTransList(params) {
  return request({
    url: '/service/GetWebOutTrans',
    method: 'get',
    params
  })
}

export function getBdGeo(params) {
  return request({
    url: '/service/TranGps2Bd',
    method: 'post',
    data: params
  })
}
