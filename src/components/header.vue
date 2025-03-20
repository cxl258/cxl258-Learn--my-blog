<template>
  <div :class="{ header: isHeight, header1: !isHeight }">
    <router-link class="alink" to="/home">首页</router-link>
    <router-link class="alink" to="/article">文章</router-link>
    <router-link class="alink" to="/album">相册</router-link>
    <router-link class="alink" to="/documt">文档</router-link>
    <router-link class="alink" to="/about">关于</router-link>
    <router-link v-if="role == 'admin'" class="alink" to="/admin">管理</router-link>
    <div class="right">
      <router-link to="/login" v-if="role == '' || role == undefined">登录</router-link>
      <a-dropdown v-else>
        <a class="ant-dropdown-link" @click.prevent>
          <a-space :size="24">
            <a-badge :count="count">
              <a-avatar shape="square" :src="src"></a-avatar>
            </a-badge>
          </a-space>
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item v-if="role !== ''">
              <a href="javascript:;">设置</a>
            </a-menu-item>
            <a-menu-item v-if="role !== ''">
              <a-badge :count="count">
                <a href="javascript:;">任务</a>
              </a-badge>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">退出</a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { userStore } from "@/store/user";
import { toRefs, ref, watch } from "vue";
import { useRoute } from "vue-router";
let { role, } = toRefs(userStore()); //pinia 响应式处理
// user_pic
let count = ref(0);
let src = ref<string>("");
src.value = "https://diarylodgex.cn/images/leishen.jpg";
let isHeight = ref(true);
let scrollTop = 0;
let route = useRoute();
// console.log(route.path);

const handleScroll = () => {
  scrollTop = document.documentElement.scrollTop;
  if (route.path == "/" || route.path == "/home") {
    if (scrollTop > 100) {
      isHeight.value = true;
    } else {
      isHeight.value = false;
    }
  } else {
    isHeight.value = true;
  }
};
window.addEventListener("scroll", handleScroll);
watch(
  () => route.path,
  () => {
    // console.log('route.path');
    handleScroll();
  }
);

</script>
<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  text-align: center;
  background-color: #fff0f5;
  height: 60px;
  line-height: 60px;
  font-size: 20px;
  font-weight: bold;
  border-bottom: 1px solid #e5e5e5;
  z-index: 9;
}

.header1 {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  text-align: center;
  height: 60px;
  line-height: 60px;
  font-size: 20px;
  font-weight: bold;
  z-index: 9;
}

.alink {
  margin-right: 20px;
  color: #000;
}

.header1 .alink {
  color: #ffffff !important;
}

.right {
  float: right;
  margin-right: 20px;
}
</style>
