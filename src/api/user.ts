import request from '@/utils/request'
import { AxiosPromise } from 'axios'

export interface UserParams {
  mobile: string
  code: string
}

export interface UserData {
  token: string
  refresh_token: string
}

export const login = (
  data: UserParams
): AxiosPromise<ResponseData<UserData>> => {
  return request({
    url: '/app/v1_0/authorizations',
    method: 'POST',
    data,
  })
}

export const getCode = (
  mobile: string
): AxiosPromise<ResponseData<{ mobile: string }>> => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`,
  })
}
