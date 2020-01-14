import request from '@/utils/request'

export function getCompanyList(params) {
  return request({
    url: '/service/GetCompany',
    method: 'get',
    params
  })
}
