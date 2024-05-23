<template>
  <div class="login">
    <h2>登录</h2>
    <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        label="昵称"
        name="username"
        :rules="[{ required: true, message: 'Please input your username!' }]"
      >
        <a-input v-model:value="formState.username" />
      </a-form-item>
      <a-form-item
        label="账号"
        name="account"
        :rules="[{ required: true, message: 'Please input your username!' }]"
      >
        <a-input v-model:value="formState.account" />
      </a-form-item>
      <a-form-item
        label="密码"
        name="password"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-input-password v-model:value="formState.password" />
      </a-form-item>

      <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
        <a-checkbox v-model:checked="formState.remember"
          >Remember me</a-checkbox
        >
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit">Submit</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import { login } from '@/api/index'
import { userStore } from '@/store/user'
import {  useRouter } from "vue-router"
 let user = userStore()
 let router = useRouter()
interface FormState {
  username: string;
  account: string;
  password: string;
  remember: boolean;
}

const formState = reactive<FormState>({
  username: "wjx",
  account: "12345678",
  password: "12345678",
  remember: true,
});
const  onFinish = async (values: any) => {
  // console.log("Success:", values);
 
  let data  ={
    username:values.username,
    password:values.password,
    account:values.account
  }
  let {data:{token,role}} = await login(data)
  // console.log(token);
  user.save(token,role)
  // router.push({path:'/home'})
  router.back()
  
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};
</script>
<style>
.login {
    width:400px;
    margin:auto;
    margin-top:100px;
    
}
h2{
    text-align:center;
}
</style>
