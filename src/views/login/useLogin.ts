import { getCode, login, UserParams } from '@/api/user'
import type { GlobState } from '@/store'
import { Toast } from 'vant'
import store from '@/store'
import { nextTick, reactive, ref, toRef, unref } from 'vue'
import { useRouter } from 'vue-router'
export function useLogin() {
  const formData = reactive({
    mobile: '13922222222',
    code: '246810',
  })
  const mobileRef = ref<HTMLInputElement>()
  const codeRef = ref<HTMLInputElement>()
  const countDownRef = ref<HTMLElement>()
  const isSending = ref(false)
  const router = useRouter()
  async function onLogin(user: UserParams) {
    if (!checkMobile() || !checkCode()) return
    Toast.loading({
      forbidClick: true,
      message: '登录中',
      duration: 0,
    })
    try {
      const { data } = await login(user)
      console.log(data.data)
      // store.state.user.token = data.data.token
      Toast.success({
        message: '登录成功',
      })
      console.log(store.state.user)
      router.push((router.currentRoute.value.query.redirect as string) || '/')
    } catch (err) {
      console.log(err)
      Toast.fail('登录失败')
    }
  }

  function checkMobile() {
    const mobile = toRef(formData, 'mobile')
    if (!mobile.value) {
      Toast({
        message: '手机号不能为空',
        position: 'top',
      })
      mobileRef.value?.focus()
      return false
    }

    if (!/^1[3578]\d{9}$/.test(mobile.value)) {
      Toast({
        message: '手机格式错误',
        position: 'top',
      })
      mobileRef.value?.focus()
      return false
    }

    return true
  }

  function checkCode() {
    const code = unref(formData.code)
    if (!code) {
      Toast({
        message: '验证码不能为空',
        position: 'top',
      })
      codeRef.value?.focus()
      return false
    }
    if (!/^\d{6}$/.test(code)) {
      Toast({
        message: '验证码格式不正确',
        position: 'top',
      })
      codeRef.value?.focus()
      return false
    }
    return true
  }

  async function sendCode() {
    const mobile = unref(formData.mobile)
    if (!checkMobile()) return
    isSending.value = true
    nextTick(() => {
      ;(countDownRef.value as any).start()
      codeRef.value?.focus()
    })
    try {
      await getCode(mobile)
    } catch (err) {
      let message = '发送失败，请稍后重试'
      if (err?.response?.status === 429) {
        message = '1分钟内只能发送1次，请稍后重试'
      }
      Toast({
        message,
        position: 'top',
      })
    } finally {
      isSending.value = false
    }
  }
  return {
    onLogin,
    formData,
    mobileRef,
    countDownRef,
    codeRef,
    checkMobile,
    checkCode,
    sendCode,
    isSending,
  }
}
