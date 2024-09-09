<template>
  <div style="border: 1px solid #ccc;margin-top: 30px; ">
    <toolbar :editor="editorRef" :defaultConfig="toolbarConfig" style="border-bottom: 1px solid #ccc" />
    <editor v-model="valueHtml" :defaultConfig="editorConfig" style="height: 500px; overflow-y: hidden;" @onCreated="handleCreated" />
  </div>
  <a-space wrap style="margin-top: 30px;">
    <a-button type="primary" danger @click="clearHtml">重置</a-button>
    <a-button type="primary" @click="submit">提交</a-button>
  </a-space>
</template>

<script setup>
import { onBeforeUnmount, ref, shallowRef, onMounted } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import "@wangeditor/editor/dist/css/style.css";

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

// 内容 HTML
const valueHtml = ref("<p>hello</p>");

// 模拟 ajax 异步获取内容
// onMounted(() => {
//   setTimeout(() => {
//     valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
//   }, 1500)
// })

const toolbarConfig = {};
const editorConfig = { placeholder: "请输入内容..." };

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = (editor) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};
// 重置
const clearHtml = () => {
  valueHtml.value = "";
}
// 提交
const submit = () => {
  console.log(valueHtml.value);
}
</script>
