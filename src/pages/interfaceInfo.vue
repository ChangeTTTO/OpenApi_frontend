<template>
  <div class="main">
    <el-row>
      <el-col>
        <el-card>
        <template #header>接口信息</template>
        <el-card class="box-card" shadow="never">
          <div class="margin">接口名:{{response.name}}</div>
          <div class="margin">描述:{{response.description}}</div>
<!--          <div class="margin"> 请求地址:{{response.url}}</div>-->
          <div class="margin">请求方法:{{response.method}}</div>
          <div class="margin">请求参数:{{response.requestParams}}</div>
          <div class="margin" v-if="response.status===0">接口状态: 开启</div>
          <div class="margin" v-else>接口状态: 关闭</div>
        </el-card >
        <br>
        <el-card class="card-bar" shadow="never">
          <template #header>
            在线测试
          </template>
          请求参数
          <el-form>
            <el-form-item>
              <el-input
                  v-model="textarea"
                  type="textarea"
                  :placeholder="response.requestParams"
                  style="margin-top: 10px;"
              />
            </el-form-item>

            <el-form-item>
              <el-button type="primary" style="margin-top: 5px" @click="invoke(textarea)">调用</el-button>
            </el-form-item>
          </el-form>

        </el-card>
          <div style="margin-top: 10px;margin-left: 5px">调用结果</div>
          <div v-if="response2">
            <hljsVuePlugin.component :code="response2" />
          </div>
        </el-card>
      </el-col>
    </el-row>










  </div>









</template>
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
//调用方法;
async function invoke(textarea: string) {
  let Params;
  // 检查 textarea 是否为空，如果不为空，则解析为 JSON，否则将 requestParams 设为 null 或者忽略该属性
  if (textarea) {
    Params = JSON.parse(textarea);
  } else {
    Params = null; // 或者直接忽略该属性
  }
  console.log(localStorage.getItem('OpenApi-Public-Key'))
  console.log(localStorage.getItem('OpenApi-Signature'))

  // 设置请求体
  const requestBody = {
    interfaceName: response.value.name,
    userId: localStorage.getItem('loginUserId'),
    interfaceId: response.value.id,
    requestParams:Params
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
<style scoped >

.main {
  width: 1150px;
  margin-left: 65px;
}
.margin{
  margin-top: 5px;
}
.card-header{
  background-color: #F8F9FC;
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

</style>

