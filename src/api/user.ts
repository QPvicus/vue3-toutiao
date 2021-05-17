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

export const login = (data: UserParams): AxiosPromise<UserData> => {
  return request({
    url: '/app/v1_0/authorizations',
    method: 'POST',
    data,
  })
}
