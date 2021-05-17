import { login, UserParams } from '@/api/user'

export function useLogin() {
  async function onLogin(user: UserParams) {
    try {
      const { data } = await login(user)
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }
  return {
    onLogin,
  }
}
