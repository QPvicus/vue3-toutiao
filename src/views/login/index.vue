<template>
  <div class="login-container">
    <van-nav-bar title="登录" left-arrow @click-left="router.back()" />
    <van-form>
      <van-cell-group>
        <van-field
          icon-prefix="toutiao"
          left-icon="shouji"
          v-model="formData.mobile"
          name="mobile"
          placeholder="请输入手机号"
          maxlength="11"
          clearable
          ref="mobileRef"
        />
        <van-field
          left-icon="eye-o"
          v-model="formData.code"
          name="code"
          placeholder="请输入验证码"
          ref="codeRef"
        >
          <template #button>
            <van-button
              class="sms-button"
              round
              :type="isSending ? 'default' : 'primary'"
              size="mini"
              @click.prevent="sendCode"
            >
              <van-count-down
                v-if="isSending"
                ref="countDownRef"
                :time="60 * 1000"
                format="ss s"
                :auto-start="false"
                @finish="isSending = false"
              />
              <span v-else>获取验证码</span>
            </van-button>
          </template>
        </van-field>
        <div class="login-btn-wrap">
          <van-button class="login-btn" type="primary" block @click="onLogin"
            >登录</van-button
          >
        </div>
      </van-cell-group>
    </van-form>
  </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'
import { defineComponent } from 'vue'
import { useLogin } from './useLogin'
export default defineComponent({
  setup() {
    const router = useRouter()
    const {
      onLogin,
      formData,
      mobileRef,
      countDownRef,
      codeRef,
      checkMobile,
      checkCode,
      sendCode,
      isSending,
    } = useLogin()

    return {
      formData,
      router,
      isSending,
      sendCode,
      checkCode,
      checkMobile,
      codeRef,
      countDownRef,
      mobileRef,
      onLogin,
    }
  },
})
</script>

<style lang="less" scoped>
.van-nav-bar {
  background-color: #3296fa;

  :deep(&__title) {
    color: #fff;
  }

  :deep(.van-icon) {
    color: #fff;
  }
}
:deep(.van-field__control) {
  padding-left: 10px;
}
.sms-button {
  color: #666666;
  background-color: #ededed;
}
.login-btn-wrap {
  padding: 26px 14px;
  .login-btn {
    background-color: #6db4fb;
    border: none;
    .van-button__text {
      font-size: 15px;
    }
  }
}
</style>
