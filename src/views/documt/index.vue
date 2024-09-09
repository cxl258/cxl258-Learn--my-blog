<template>
    <div class="doc">
        <h2>文档api</h2>
        <p>暂定api文档,待补全</p>
    </div>
    <Bottom />
</template>

<script lang='ts' setup>
import Bottom from "@/components/bottom.vue";
</script>
<style scoped>
.doc{
    width: 100%;
    height: 85vh;
    margin-top: 60px;
    overflow-y: scroll;
    text-align: center;
}
.doc::-webkit-scrollbar {
  display: none;
}
</style>