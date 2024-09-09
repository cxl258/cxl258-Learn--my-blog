<template>
    <!-- <h2>关于</h2> -->
    <div class="about">
        <div class="conter">
            <h1>About</h1>
            <img src="https://www.amour-wjx.top:3000/photo/leishen.jpg" alt="">
            <h3 class="h3">Me</h3>
            <p >目前在北京工作,在{{company}}任职前端工程师</p>
            <h3 class="h3">关于Blog</h3>
            <p>这个项目写写停停，写了好久,最初是有HTML,CSS,JS编写比较简单而且丑陋,这个算是第二版吧,后续还是需要更改的,做成我满意的样子</p>
            <h3 class="h3">Content</h3>
            <p>Email:cxl200825@163.com</p>
            <p class="p">WX:alovejx825</p>
        </div>

    </div>
    <Bottom />
</template>

<script lang='ts' setup>
import Bottom from "@/components/bottom.vue";
import { ref ,toRefs} from "vue";
let company = ref("")
import { userStore } from "@/store/user";
let { userInfo } = toRefs(userStore());
company.value = userInfo.value.company
</script>
<style scoped>
.about{
    width: 100%;
    height: 85vh;
    overflow-y: scroll;
    margin-top: 60px;
}
.about::-webkit-scrollbar {
  display: none;
}
.conter{
    width: 50%;
    margin: auto;
}
.conter img{ 
    margin-top: 30px;
    width: 100%;
    height: 500px;
    border-radius: 15px;
    object-fit: cover;
}
.h3{
    margin: 20px 0;
}
.p{
    margin: 20px 0;
}
</style>