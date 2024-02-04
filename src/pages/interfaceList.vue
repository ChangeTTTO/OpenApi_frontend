<template>
  <el-row>
    <el-col :span="24" v-for="(item, index) in response" :key="index">
      <el-card class="box-card" shadow="hover">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>{{ item.description }}</div>
          <el-button type="primary">
            <RouterLink :to="`/interfaceInfo/${item.id}`"  style="color: black;">
            查看
          </RouterLink></el-button>
        </div>
      </el-card>
    </el-col>
    <el-pagination background layout="prev, pager, next" :total="1000" />
  </el-row>

</template>


<script lang="ts" setup>
let response=ref([])
import request from "@/Axios.ts";
import {onMounted, ref} from 'vue';

onMounted(async () => {
  try {
      const result = await request.get('/interfaceInfo/all', {
      params:{
        currentPage: 1,
          pageSize: 9
      }
    });
    response.value = result.data;
    // 处理响应数据
    console.log(result.data[0].description)
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
.box-card:hover {
  background-color: #D8E0F0; /* 鼠标悬停时的背景颜色 */
}
a{
  text-decoration: none;
  color:#555d65;
}
</style>
