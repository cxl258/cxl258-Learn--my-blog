<template>
    <div class="bottom-container">
        <div class="bottom">
       <!-- 关于我   建议  反馈等等-->
       <!-- 备案信息 -->
       <a  class="p1" target="_blank" href="https://beian.miit.gov.cn">冀ICP备2023018480号</a>
        <img src='../assets/tu.png' style="float:left;"/>
        <a  class="p1"  target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=13012102000115">冀公网安备 13012102000115号</a>
      
     </div>
    </div>
    
</template>

<script lang='ts' setup>
// import { ref } from 'vue'
// let src = ref<string>('')
</script>
<style scoped>
.bottom-container{
    position: fixed;
    bottom: 0%;
    left: 0%;
    width: 100%;
    height: 80px;
    background-color: #FFF0F5;
}
.bottom{
    position: fixed;
    width: auto;
    margin: auto;
    bottom: 2%;
    left: 50%;
    transform: translate(-50%);
    font-size: 16px;
    
}
.p1{
    float:left;
    height:20px;
    line-height:20px;
    margin: 0px 0px 0px 5px;
     color:#939393;
}
.a1{
    display:inline-block;
    text-decoration:none;
    height:20px;
    line-height:20px;
}
</style>