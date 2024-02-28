<script setup lang="ts">
import 'highlight.js/styles/github.css'
import {onMounted, ref} from "vue";
import request from "@/Axios";
import {useRoute} from 'vue-router';
let route = useRoute();
let response=ref('')
import 'highlight.js/styles/stackoverflow-light.css'
import 'highlight.js/lib/common';
import hljsVuePlugin from "@highlightjs/vue-plugin";
import {Bottom, Search} from "@element-plus/icons-vue";
let response2=ref('')
const code = ref(`let hello = 'Hello World!';
console.log(hello);`)
const textarea = ref('')
onMounted(async () => {
  console.log(route)
  try {
    const result = await request.get(`/interfaceInfo/${route.params.id}`)
    response.value = result.data;
    // 处理响应数据
  } catch (error) {
    // 处理请求错误
    console.error(error);
  }
})
//获取调用次数
async function getCount(){
  try {
    // 发送 POST 请求
    const result = await request.post("/userInterfaceInfo/getCount",{
      interfaceId: response.value.id,
      userId: localStorage.getItem("loginUserId")
    })
    console.log(result)
    // 处理结果
    if (result.code==0){
      alert("不可重复获取")
    }else {
      alert("获取成功")
    }
  } catch (error) {
    // 处理错误
  }
}
//调用方法;
async function invoke(textarea: string) {

  console.log(localStorage.getItem('OpenApi-Public-Key'))
  console.log(localStorage.getItem('OpenApi-Signature'))

  // 设置请求体
  const requestBody = {
    interfaceName: response.value.name,
    userId: localStorage.getItem('loginUserId'),
    interfaceId: response.value.id,
    requestParams:null
  };

// 设置请求标头
  const headers = {
    'Content-Type': 'application/json',
    'OpenApi-Public-Key': localStorage.getItem('OpenApi-Public-Key'),
    'OpenApi-Signature': localStorage.getItem('OpenApi-Signature')
  };

  try {
    // 发送 POST 请求
    const response = await request.post("http://localhost:9999/interfaceInfo/invoke", requestBody, { headers });
    response2.value = JSON.stringify(response,null,2);
    console.log(response)
    // 处理结果
  } catch (error) {
    // 处理错误
  }

}
</script>

<template>
  <div class="container">
    <el-card class="card">
      <template #header >

          <strong >{{response.description}}</strong>

      </template>
      <span class="interfaceName">
        接口描述:
      </span>
      {{response.description}}
      &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
      <span class="interfaceName">
        接口状态:
      </span>

      <span v-if="response.status===1" >启用</span>
      <span v-else>关闭</span>
    </el-card>
    <el-card class="card">
         <span class="highlighted-line button" @click="getCount">
        <b >
        点击此处获取20次免费次数
        </b>
      </span>

      <el-button  style="position: relative;left: 910px;" @click="invoke" >
        发起请求
      </el-button>

    </el-card>
    <el-card class="card" style="margin-top: 20px" >
    <span class="highlighted-line" >
      返回结果
    </span>
      <div v-if="response2">
        <hljsVuePlugin.component :code="response2" />
      </div>
    </el-card>
  </div>
</template>


<style scoped>

.container{
  padding:0;
  margin: 0;

}
.card{
  margin: 0;
  padding: 0;
  width: 80vw;
  box-shadow: none
}

.breathing {
  width: 100px;
  height: 100px;
  background-color: #00f;
  animation: breathingAnimation 2s infinite alternate;
}
.breathing-dot {
  width: 20px;
  height: 20px;
  background-color: #ff0000; /* 设置圆点的颜色 */
  border-radius: 50%; /* 将圆点样式设置为圆形 */
}
@keyframes breathingAnimation {
  0% { opacity: 0.5; }
  100% { opacity: 1; }
}
.interfaceName{
  opacity: 0.8;
}
.highlighted-line {
  position: relative;
  padding-left: 10px; color: #555555;font-size: 14px ;cursor: pointer;
  font-weight: bold;
}
.highlighted-line::before {
  content: "";
  width: 4px; /* 设置竖线宽度 */
  height: 100%; /* 设置竖线高度 */
  background-color: #ffcc00; /* 设置竖线颜色 */
  position: absolute;
  left: 0;
  top: 0;
}
/* 修改代码块的样式 */
pre {
  font-family: 'Arial', sans-serif; /* 修改字体 */
  font-size: 14px; /* 修改字体大小 */
  line-height: 1.5; /* 修改行高 */

  overflow-x: auto; /* 横向滚动条自动显示 */
  color: #333; /* 修改文字颜色 */
  background-color: #f8f8f8; /* 修改背景颜色 */
}

/* 修改代码行号的样式 */
pre code {
  font-family: 'Arial', sans-serif; /* 修改字体 */
  font-size: 14px; /* 修改字体大小 */
  line-height: 1.5; /* 修改行高 */
  color: #333; /* 修改文字颜色 */
}

/* 如果需要修改行号的样式 */
pre code .hljs-ln {
  display: block; /* 使行号显示为块级元素 */
  padding-right: 10px; /* 添加右内边距 */
  color: #999; /* 修改行号颜色 */
  user-select: none; /* 禁止用户选择行号 */
}

.el-card ::v-deep .el-card__header {

}
</style>