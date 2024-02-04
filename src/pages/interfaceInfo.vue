<template>
  <el-row>
    <el-col :span="24">
      <el-card class="box-card" shadow="never">
        <div class="margin">描述:{{response.description}}</div>
        <div class="margin"> 请求地址:{{response.url}}</div>
        <div class="margin">请求方法:{{response.method}}</div>
        <div class="margin">请求参数:{{response.requestParams}}</div>
        <div class="margin">请求头:{{response.requestHeader}}</div>
        <div class="margin">响应头:{{response.responseHeader}}</div>
        <div class="margin" v-if="response.status===0">接口状态: 开启</div>
        <div class="margin" v-else>接口状态: 关闭</div>
      </el-card >
      <br>
    </el-col>
  </el-row>
  <el-row>
    <el-col>
      <el-card class="box-card" shadow="never">
      在线测试
      </el-card>
      <el-card class="box-card" shadow="never">
       请求参数
        <el-form>
          <el-form-item>
            <el-input
                v-model="textarea"
                :rows="2"
                type="textarea"
                placeholder="Please input"
                style="margin-top: 10px"
            />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" style="margin-top: 5px" @click="invoke">调用</el-button>
          </el-form-item>
        </el-form>

      </el-card>
    </el-col>
  </el-row>
</template>
<script setup lang="ts">
import {onMounted, ref} from "vue";
import request from "@/Axios";
import {useRoute} from 'vue-router';
let route = useRoute();
let response=ref([])
const textarea = ref('')
onMounted(async () => {
  console.log(route)
  try {
    const result = await request.get(`/interfaceInfo/${route.params.id}`)
    response.value = result.data;
    // 处理响应数据
    // 处理响应数据
    console.log('Response data:', result.data);
  } catch (error) {
    // 处理请求错误
    console.error(error);
  }
});
</script>
<style scoped>
.box-card {
  width: 1150px;
  margin-left: 65px;
}
.margin{
  margin-top: 5px;
}
</style>