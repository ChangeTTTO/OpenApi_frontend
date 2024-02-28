<template>
<div style="height: 100vh">


  <div class="card-container">

      <div class="card" v-for="(item, index) in response" :key="index">
        <RouterLink :to="`/interfaceInfo/${item.id}`">
        <img :src="item.requestParams" alt="Image" style="width: 100%;">
        <div>
          <h3>{{ item.description }}</h3>
          <h5 style="color: #41B883">{{item.detail}}</h5>
        </div>
        </RouterLink>
      </div>

  </div>
</div>
</template>


<script lang="js" setup>
import {Search} from "@element-plus/icons-vue";

let response=ref([])
import request from "@/Axios.ts";
import {onMounted, ref} from 'vue';

onMounted(async () => {
  try {
      const result = await request.get('/interfaceInfo/all', {
      params:{
        currentPage: 0,
          pageSize: 7
      }
    });
    response.value = result.data;
    // 处理响应数据
  } catch (error) {
    // 处理请求错误
    console.error(error);
  }
});


</script>

<style scoped>

a{
  text-decoration: none;
  color:#555d65;
}
.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start; /* 水平间距均匀分布 */
  width: 80vw;
}
.card {
  width: 200px; /* 缩小卡片宽度为父容器的六分之一减去一定的间距 */
  margin: 10px 0 10px 22px ; /* 设置卡片的外边距，即卡片与卡片之间的间隔 */
  padding: 10px; /* 缩小卡片内边距 */
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}


.card:hover {
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

</style>
