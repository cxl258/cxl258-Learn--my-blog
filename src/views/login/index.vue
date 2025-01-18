<template>
  <div class="login-container">
    <div class="login-left">
      <h1>欢迎登录</h1>

    </div>

    <div class="login-right">
      <h2>{{ isLogin ? "登录" : "注册" }}</h2>

      <a-tabs v-model:activeKey="activeKey" centered>
        <a-tab-pane key="account" tab="账号密码">
          <a-form
            :model="formState"
            name="basic"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 16 }"
            autocomplete="off"
            @finish="onFinish"
            @finishFailed="onFinishFailed"
          >
            <template v-if="!isLogin">
              <a-form-item
                label="昵称"
                name="username"
                :rules="[{ required: true, message: '请输入昵称！' }]"
              >
                <a-input v-model:value="formState.username" />
              </a-form-item>
            </template>

            <a-form-item
              label="账号"
              name="account"
              :rules="[{ required: true, message: '请输入账号！' }]"
            >
              <a-input v-model:value="formState.account" />
            </a-form-item>

            <a-form-item
              label="密码"
              name="password"
              :rules="[
                { required: true, message: '请输入密码！' },
                { min: 6, message: '密码至少6位！' },
              ]"
            >
              <a-input-password v-model:value="formState.password" />
            </a-form-item>

            <template v-if="!isLogin">
              <a-form-item
                label="确认密码"
                name="confirmPassword"
                :rules="[
                  { required: true, message: '请确认密码！' },
                  { validator: validateConfirmPassword },
                ]"
              >
                <a-input-password v-model:value="formState.confirmPassword" />
              </a-form-item>
            </template>

            <template v-if="isLogin">
              <a-form-item
                name="remember"
                :wrapper-col="{ offset: 8, span: 16 }"
              >
                <a-checkbox v-model:checked="formState.remember"
                  >记住我</a-checkbox
                >
              </a-form-item>
            </template>

            <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
              <a-button type="primary" html-type="submit" :loading="loading">
                {{ isLogin ? "登录" : "注册" }}
              </a-button>
            </a-form-item>
          </a-form>
        </a-tab-pane>

        <a-tab-pane key="email" tab="邮箱登录">
          <a-form
            :model="emailForm"
            name="emailForm"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 16 }"
            @finish="onEmailFinish"
          >
            <a-form-item
              label="邮箱"
              name="email"
              :rules="[
                { required: true, message: '请输入邮箱！' },
                { type: 'email', message: '请输入正确的邮箱格式！' },
              ]"
            >
              <a-input v-model:value="emailForm.email">
                <template #suffix v-if="!isLogin">
                  <a-button
                    type="link"
                    size="small"
                    :disabled="!!countdown"
                    @click="sendVerificationCode"
                  >
                    {{ countdown ? `${countdown}s后重试` : "获取验证码" }}
                  </a-button>
                </template>
              </a-input>
            </a-form-item>

            <template v-if="!isLogin">
              <a-form-item
                label="验证码"
                name="code"
                :rules="[{ required: true, message: '请输入验证码！' }]"
              >
                <a-input v-model:value="emailForm.code" />
              </a-form-item>
            </template>

            <template v-if="isLogin">
              <a-form-item
                label="密码"
                name="password"
                :rules="[{ required: true, message: '请输入密码！' }]"
              >
                <a-input-password v-model:value="emailForm.password" />
              </a-form-item>
            </template>

            <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
              <a-button type="primary" html-type="submit" :loading="loading">
                {{ isLogin ? "登录" : "注册" }}
              </a-button>
            </a-form-item>
          </a-form>
        </a-tab-pane>
      </a-tabs>

      <div class="form-footer">
        <a @click="toggleLoginState">
          {{ isLogin ? "没有账号？立即注册" : "已有账号？立即登录" }}
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { login, register } from "@/api/index";
import { userStore } from "@/store/user";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
import { setData } from "@/utils/local";

const user = userStore();
const router = useRouter();
const loading = ref(false);
const isLogin = ref(true);
const activeKey = ref("account");
const countdown = ref(0);

interface FormState {
  username: string;
  account: string;
  password: string;
  confirmPassword?: string;
  remember: boolean;
}

interface EmailFormState {
  email: string;
  password: string;
  code?: string;
}

const formState = reactive<FormState>({
  username: "",
  account: "",
  password: "",
  confirmPassword: "",
  remember: true,
});

const emailForm = reactive<EmailFormState>({
  email: "",
  password: "",
  code: "",
});

const validateConfirmPassword = async (_rule: any, value: string) => {
  if (value !== formState.password) {
    throw new Error("两次输入的密码不一致！");
  }
};

const toggleLoginState = () => {
  isLogin.value = !isLogin.value;
  formState.username = "";
  formState.account = "";
  formState.password = "";
  formState.confirmPassword = "";
  emailForm.email = "";
  emailForm.password = "";
  emailForm.code = "";
};

const startCountdown = () => {
  countdown.value = 60;
  const timer = setInterval(() => {
    countdown.value--;
    if (countdown.value <= 0) {
      clearInterval(timer);
    }
  }, 1000);
};

const sendVerificationCode = async () => {
  if (!emailForm.email) {
    message.error("请先输入邮箱地址！");
    return;
  }
  try {
    // await sendCode({ email: emailForm.email });
    message.success("验证码已发送，请查收邮箱！");
    startCountdown();
  } catch (error) {
    message.error("验证码发送失败，请稍后重试！");
  }
};

const onFinish = async (values: any) => {
  try {
    loading.value = true;
    const data = {
      username: values.username,
      password: values.password,
      account: values.account,
    };

    if (isLogin.value) {
      const {
        data: { info },
      } = await login(data);
      user.save(info.token, info.role);
      setData("token", info);
      message.success("登录成功！");
      router.back();
    } else {
      await register(data);
      message.success("注册成功！请登录");
      isLogin.value = true;
    }
  } catch (error: any) {
    message.error(error.message || "操作失败，请重试！");
  } finally {
    loading.value = false;
  }
};

const onEmailFinish = async (values: any) => {
  try {
    loading.value = true;
    if (isLogin.value) {
      const {
        data: { info },
      } = await login({
        email: values.email,
        password: values.password,
      });
      user.save(info.token, info.role);
      setData("token", info);
      message.success("登录成功！");
      router.back();
    } else {
      await register({
        email: values.email,
        code: values.code,
      });
      message.success("注册成功！请登录");
      isLogin.value = true;
    }
  } catch (error: any) {
    message.error(error.message || "操作失败，请重试！");
  } finally {
    loading.value = false;
  }
};

const onFinishFailed = (errorInfo: any) => {
  console.error("表单验证失败:", errorInfo);
};
</script>

<style scoped>
.login-container {
  width: 900px;
  min-height: 500px;
  margin: 0 auto;
  display: flex;
  border-radius: 20px;
  background: #ffffff;
  box-shadow: 0 10px 50px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}

.login-left {
  flex: 1;
  background: linear-gradient(135deg, #1890ff, #69c0ff);
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  position: relative;
}

.login-left::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("@/assets/images/5g-pattern.svg");
  background-size: cover;
  opacity: 0.1;
}

.login-left h1 {
  font-size: 36px;
  font-weight: 600;
  margin-bottom: 20px;
  position: relative;
  z-index: 1;
}

.login-left p {
  font-size: 16px;
  opacity: 0.9;
  text-align: center;
  line-height: 1.6;
  position: relative;
  z-index: 1;
}

.login-right {
  width: 480px;
  padding: 40px 50px;
  background: #fff;
}

.login-right h2 {
  text-align: center;
  margin-bottom: 36px;
  color: #1890ff;
  font-size: 28px;
  font-weight: 600;
}

/* 表单样式 */
:deep(.ant-tabs-nav) {
  margin-bottom: 30px;
}

:deep(.ant-tabs-tab) {
  padding: 12px 24px;
  font-size: 16px;
  transition: all 0.3s ease;
}

:deep(.ant-tabs-tab-active) {
  color: #1890ff !important;
}

:deep(.ant-tabs-ink-bar) {
  background: #1890ff;
}

:deep(.ant-form-item) {
  margin-bottom: 24px;
}

:deep(.ant-form-item-label > label) {
  color: #333;
  font-weight: 500;
}

:deep(.ant-input),
:deep(.ant-input-password) {
  height: 42px;
  padding: 0 16px;
  border-radius: 8px;
  border: 1px solid #e8e8e8;
  transition: all 0.3s ease;
  overflow: hidden;
}

:deep(.ant-input:hover),
:deep(.ant-input-password:hover) {
  border-color: #1890ff;
}

:deep(.ant-input:focus),
:deep(.ant-input-password-focused) {
  border-color: #1890ff;
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.1);
}

/* 按钮样式 */
:deep(.ant-btn) {
  height: 42px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  width: 100%;
  transition: all 0.3s ease;
}

:deep(.ant-btn-primary) {
  background: #1890ff;
  border: none;
  box-shadow: 0 4px 12px rgba(24, 144, 255, 0.15);
}

:deep(.ant-btn-primary:hover) {
  background: #40a9ff;
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(24, 144, 255, 0.25);
}

:deep(.ant-btn-link) {
  height: auto;
  color: #1890ff;
}

/* 复选框样式 */
:deep(.ant-checkbox-wrapper) {
  color: #666;
}

:deep(.ant-checkbox-checked .ant-checkbox-inner) {
  background-color: #1890ff;
  border-color: #1890ff;
}

/* 底部链接 */
.form-footer {
  text-align: center;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
}

.form-footer a {
  color: #1890ff;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.form-footer a:hover {
  color: #40a9ff;
}

/* 验证码按钮 */
:deep(.ant-input-group-addon .ant-btn) {
  border-radius: 6px;
  height: 32px;
  padding: 0 12px;
  font-size: 14px;
  background: #1890ff;
  color: white;
}

:deep(.ant-input-group-addon .ant-btn:disabled) {
  background: #d9d9d9;
}

/* 响应式调整 */
@media screen and (max-width: 992px) {
  .login-container {
    width: 100%;
    margin: 0;
    border-radius: 0;
    flex-direction: column;
  }

  .login-left {
    padding: 40px 20px;
  }

  .login-right {
    width: 100%;
    padding: 30px 20px;
  }
}

/* 添加动画效果 */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.login-right {
  animation: slideIn 0.6s ease-out;
}
</style>
