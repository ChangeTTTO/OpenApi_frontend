<script setup lang="js">
import router from "@/router/index.ts";
request.get(`interfaceInfo/test`)
    .then(status => {
      console.log(status.code);
    })
    .catch(error => {
      router.push('/login');
    });
import 'highlight.js/styles/github.css'
import {onMounted, ref} from "vue";
import request from "@/Axios.ts";
import {useRoute} from 'vue-router';
let route = useRoute();
let interfaceInfo=ref('')
import 'highlight.js/styles/stackoverflow-light.css'
import 'highlight.js/lib/common';
import hljsVuePlugin from "@highlightjs/vue-plugin";
import {Bottom, DocumentCopy, Search} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";
let response2=ref('')
const code = ref('')
let interfaceDetail = ref([])
let user = ref('')
user = localStorage.getItem('loginUser')
if(user==null){
  router.push('/login');
}
onMounted(async () => {
  try {
    const result = await request.get(`/interfaceInfo/${route.params.id}`)
    interfaceInfo.value = result.data;
    console.log(interfaceInfo.value)
    // 处理响应数据
  } catch (error) {
    // 处理请求错误
    console.error(error);
  }
  try {
    const res = await request.get(`/ParamsDetails/getAll?id=${interfaceInfo.value.id}`);
    interfaceDetail.value=res.data;
    console.log(interfaceDetail.value)
  } catch (e){
      alert("出错")
  }

})

//调用方法;
async function invoke() {

// 设置请求标头
  const headers = {
    'Content-Type': 'application/json',
    'OpenApi-Public-Key': localStorage.getItem('OpenApi-Public-Key'),
    'OpenApi-Signature': localStorage.getItem('OpenApi-Signature')
  };

  try {
    // 发送 POST 请求
    const vipResponse = await request.get(`${interfaceInfo.value.requestExample}`, { headers });
    code.value = JSON.stringify(vipResponse,null,2);
    // 处理结果
  } catch (error) {
    // 处理错误
  }

}
//复制功能
const copyInterfaceUrl = () => {
  const url = interfaceInfo.value.url;
  navigator.clipboard.writeText(url)
      .then(() => {
        console.log('接口地址已复制到剪贴板');
        ElMessage.success("已复制到剪贴板")
      })
      .catch((error) => {
        console.error('复制接口地址失败', error);
      });
};
let activeIndex = ref('1')
const handleSelect = (index) => {
  activeIndex.value = index;
  // 这里可以根据 index 来更新当前选中的菜单项
};
</script>

<template>
  <div class="container">
    <el-card class="card">
      <template #header >

        <strong >{{interfaceInfo.description}}</strong>

      </template>
      <span class="interfaceName">
        接口描述:
      </span>
      {{interfaceInfo.description}}
      &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
      <span class="interfaceName" @click="copyInterfaceUrl" style="cursor: pointer"> 接口地址: </span>
      {{interfaceInfo.url}}
      &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
      <span class="interfaceName"> 请求方法: <span class="method" >{{interfaceInfo.method}}</span></span>
    </el-card>

    <div class="specific-card-container">
      <el-card class="card">
        <template #header>
          <div class="menu">
            <el-menu
                mode="horizontal"
                @select="handleSelect"
                :router="true"
                style="background-color: #F8F8F8"
                default-active="1"
            >
              <el-menu-item index="1">
                  在线调试工具
              </el-menu-item>

              <el-menu-item index="API文档">
                API文档
              </el-menu-item>

              <el-menu-item index="示例代码">
              示例代码
              </el-menu-item>

            </el-menu>
          </div>
        </template>
        <div v-if="activeIndex == '1'" >
          <div class="highlighted-line" >
            请求参数说明
          </div>
          <el-table :data="interfaceDetail"  stripe border style="width: 70% ;margin-top: 10px ;">
            <el-table-column prop="paramsName" label="参数名称"  width="100" />
            <el-table-column prop="type" label="类型" width="100" />
            <el-table-column prop="isRequest" label="必填" width="100"/>
            <el-table-column prop="description" label="说明"  />
          </el-table>
          <div class="highlighted-line"  style="margin-top: 10px">
            请求示例
          </div>
          <el-input  class="invoke" size="large" v-model="interfaceInfo.requestExample" style="width: 700px; border-radius: 0; margin-top: 10px">
            <template #prepend> {{interfaceInfo.method}}</template>
            <template #append>
              <span style="cursor: pointer;" @click="invoke">发起请求</span></template>
          </el-input>
          <el-card class="card" style="margin-top: 10px" >
           <span class="highlighted-line" >
          返回结果
          </span>
            <div v-if="code">
              <hljsVuePlugin.component :code="code" />
            </div>
          </el-card>
        </div>
        <div v-if="activeIndex == 'API文档'" >
todo

        </div>

        <div v-if="activeIndex == '示例代码'">
          todo
        </div>
      </el-card>
    </div>


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
  color: cadetblue;
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

.specific-card-container .el-card ::v-deep .el-card__header {
  padding: 0;
  margin: 0;
}

.method {
  color: #0665D0;
}

</style>