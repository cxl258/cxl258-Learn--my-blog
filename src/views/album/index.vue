<template>
  <div class="album">
    <div class="list">
      <div class="list_top">
        <div>
          <span class="title">{{ "title" }}</span>
          <span class="city">{{ "city address" }}</span> {{ "date" }}
        </div>
        <div>上传人:{{ "author" }}</div>
      </div>
      <div class="list_img">
        <div class="img_item" v-for="item in list" :key="item.filename">
          <img :src="item.filename" alt="" />
        </div>
      </div>
    </div>
  </div>
  <Bottom />
</template>

<script lang="ts" setup>
import Bottom from "@/components/bottom.vue";
import { ref, toRefs } from "vue";
import { userStore } from "@/store/user";
import { getImg } from "@/api/index";
interface ImageItem {
  filename: string;
}
let list = ref<ImageItem[]>([]);
let { userInfo } = toRefs(userStore());
// console.log(userInfo.value.xlid, list);
const getImgList = async () => {
  const res = await getImg({
    xlid: userInfo.value.xlid,
  });
  let data = res.data.fileList;
  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    element.filename = "https://www.amour-wjx.top:3000/" + element.filename;
  }
  list.value = data;
  // console.log(list.value);
};
getImgList();
</script>
<style scoped>
.album {
  width: 100%;
  height: 85vh;
  margin-top: 60px;
  overflow-y: scroll;
  padding: 20px 0;
  box-sizing: border-box;
}
.album::-webkit-scrollbar {
  display: none;
}
.list {
  width: 75%;
  margin: auto;
}
.list_top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}
.title {
  font-size: 24px;
  font-weight: 700;
  margin-right: 10px;
}
.city {
  display: inline-block;
  background-color: #f3bed0;
  border-radius: 10px;
  font-size: 14px;
  /* width: 100px; */
  padding: 0 10px;
  margin-right: 10px;
}
.list_img {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 30px;
  /* justify-content: space-between; */
  border-bottom: 1px solid #b1aeb0;
}
.img_item {
  width: 30%;
  height: 300px;
  margin-top: 20px;
  margin-right: 30px;
}
.list_img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
