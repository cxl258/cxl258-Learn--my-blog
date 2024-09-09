<template>
  <div class="bottom-container">
    <div class="bottom">
      <a class="p1" target="_blank" href="https://beian.miit.gov.cn"
        >冀ICP备2023018480号</a
      >
      <img src="../assets/tu.png" style="float: left" />
      <a
        class="p1"
        target="_blank"
        href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=13012102000115"
        >冀公网安备 13012102000115号</a
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
</script>
<style scoped>
.bottom-container {
  position: relative;
  width: 100%;
  height: 80px;
  background-color: #fff0f5;
}
.bottom {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: auto;
  text-align: center;
  font-size: 16px;
}
.p1 {
  float: left;
  height: 20px;
  line-height: 20px;
  margin: 0px 0px 0px 5px;
  color: #939393;
}
.a1 {
  display: inline-block;
  text-decoration: none;
  height: 20px;
  line-height: 20px;
}
</style>
