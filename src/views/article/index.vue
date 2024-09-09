<template>
  <div class="article">
    <div class="article_1">
      <div class="article_left">
        <div class="article_list" v-for="i in 4" :key="i" ><!-- :id="i" @click="toDetail(e)" -->
          <p class="article_list_title">{{ "JS时间循环机制" }}</p>
          <p class="article_list_desc">{{ "JS时间循环机制" }}</p>
          <div class="article_list_bottom">
            <div>
              <span>{{ "前端" }} | {{ "JavaScript" }} {{ "2021-08-02" }}</span>
              <span>
                <span><img src="@/assets/watch.svg" alt="" /> {{ "0" }}</span>
                <span><HeartOutlined /> {{ "0" }}</span>
              </span>
            </div>
            <div>
              {{ "Cxl" }}
            </div>
          </div>
        </div>
      </div>
      <div class="article_right">
        <div class="input">
            <a-input-search
          v-model:value="value"
          placeholder="搜索文章"
          style="width: 200px"
          @search="onSearch"
        />
        </div>
        <a-button type="primary" @click="submitArt()">我要发布</a-button>
        <router-link to="/article/editor">我要发布</router-link>
      </div>
    </div>
  </div>

  <Bottom />
</template>

<script lang="ts" setup>
import Bottom from "@/components/bottom.vue";
import { HeartOutlined } from "@ant-design/icons-vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const value = ref<string>('');

const onSearch = (searchValue: string) => {
  console.log('use value', searchValue);
};
// const toDetail=(e)=>{
//   console.log(e);
// }
const submitArt=()=>{
  console.log('submit');
  router.push({
    path: '/article/editor'
  })
}
</script>
<style scoped>
.article {
  width: 100%;
  height: 85vh;
  margin-top: 60px;
}
.article_1 {
  width: 1400px;
  margin: auto;
  display: flex;
}
.article_left {
  width: 80%;
  height: 85vh;
  overflow-y: scroll;
}
.article_left::-webkit-scrollbar {
  display: none;
}
.article_right {
  width: 20%;
  height: 100%;
}
.article_list {
  width: 700px;
  margin: auto;
  /* height: 100%; */
  padding: 20px 0;
  box-sizing: border-box;
  border-bottom: 1px solid #eaeaea;
}
.article_list_title {
  font-size: 24px;
  font-weight: 800;
}
.article_list_desc {
  margin-top: 20px;
  font-size: 16px;
  height: 100px;
  color: #656464;
}
.article_list_bottom {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #656464;
}
.article_list_bottom img {
  width: 20px;
  height: 20px;
  line-height: 1;
  vertical-align: bottom;
}
.article_list_bottom span {
  margin-right: 10px;
}
.input{
    margin: auto;
    margin-top: 40px;
}
</style>
