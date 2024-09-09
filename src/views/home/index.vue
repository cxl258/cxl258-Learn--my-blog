<template>
  <div class="bg"></div>
  <div class="img">
    <p class="title">{{ str }}</p>
  </div>
  <div class="cont">
    <div class="api">
      <div class="api_2">
        <p>GROWTH ABILITY</p>
      </div>
      <div class="api_1" @click="Tip()">
        <div class="api_1_1">
          <img src="https://www.amour-wjx.top:3000/photo/leishen.jpg" alt="" />
          <text>壁纸</text>
        </div>
        <div class="api_1_1">
          <img src="https://www.amour-wjx.top:3000/photo/leishen.jpg" alt="" />
          <text>新闻</text>
        </div>
      </div>
    </div>
  </div>
  <div class="cont1">
    <div class="api">
      <div class="api_2">
        <p>GROWTH JOURNEY</p>
      </div>
      <div class="api_3">
        <!-- 时间轴 -->
        <ul class="timeline">
          <li class="line" v-for="i in list" :key="i.id">
            <div class="line_1">{{ i.date}}</div>
            <div class="line_2">{{ i.title }}</div>
            <div class="line_3">{{ i.description }}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <Bottom />
</template>

<script lang="ts" setup>
import { ref } from "vue";
import axios  from "axios";
import Bottom from "@/components/bottom.vue";
import { yiyan } from "@/api/index";
import { message } from "ant-design-vue";
let str = ref<string>("");
const getYiyan = async () => {
  let {
    data: { data },
  } = await yiyan();
  str.value = data[0].text;
};
getYiyan();
const Tip = () => {
  message.error("This interface is temporarily unavailable");
};
let list = ref<Object>([])
axios.get('./record.json').then(res=>{
  console.log(res);
  list.value = res.data.data
}).catch((err)=>{
  console.log(err);

})
</script>
<style scoped>
.bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(https://www.amour-wjx.top:3000/bg.png);
  background-size: cover;
  z-index: -1;
}
.img {
  width: 100%;
  position: relative;
  height: 100vh;
}
.title {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 20px;
  font-weight: 800;
  color: #fff;
}
.cont {
  width: 100%;
  background-color: rgb(234, 235, 234, 0.8);
  padding-bottom: 50px;
}
.cont1 {
  width: 100%;
  background: #fff;
}
.api {
  width: 1000px;
  margin: auto;
  padding-top: 50px;
}
.api_1 {
  margin-top: 50px;
  /* margin-bottom: 50px; */
  display: flex;
  justify-content: space-evenly;
}
.api_1_1 {
  width: 468px;
  height: 300px;
  /* background-color: red; */
  border: 1px solid #ccc;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
}
.api_1_1 text {
  position: absolute;
  bottom: 0;
  left: 0;
  display: inline-block;
  width: 100%;
  height: 50px;
  background-color: rgba(36, 36, 36, 0.6);
  color: rgba(255, 255, 255, 0.7);
  font-size: 30px;
  text-align: center;
  transition: height 0.8s ease;
}
.api_1_1 img {
  width: 100%;
}
.api_1_1:hover text {
  height: 300px;
  color: #fff;
  line-height: 300px;
  background-color: rgba(36, 36, 36, 0.6);
}
.api_2 {
  width: 1000px;
  text-align: center;
  font-size: 30px;
  font-weight: 800;
  margin: 30px 0;
}
.api_3 {
  width: 1000px;
  padding-bottom: 50px;
}
/*  */
.timeline {
  width: 1000px;
  overflow-x: auto;
  display: -webkit-box;
  -webkit-overflow-scrolling: touch;
}
/* .timeline::-webkit-scrollbar {
  display: none;
} */
li {
  list-style: none;
}
.line {
  width: 200px;
  margin-right: 20px;
  padding-bottom: 20px;
}
.line_1 {
  font-size: 20px;
  font-weight: 800;
  /* margin-top: 20px; */
}
.line_2 {
  font-size: 16px;
  margin-top: 5px;
}
.line_3 {
  font-size: 14px;
  color: darkgray;
  margin-top: 5px;
}
</style>
