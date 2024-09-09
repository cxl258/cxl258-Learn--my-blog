<template>
  <div class="editor">
    <Editor />
  </div>
  <Bottom />
</template>

<script lang="ts" setup>
import Bottom from "../../components/bottom.vue";
import Editor from "@/components/Editor.vue";
</script>
<style scoped>
.editor {
  width: 80%;
  margin: auto;
  margin-top: 60px;
  padding-top: 20px;
  box-sizing: border-box;
  height: 85vh;
}
</style>
