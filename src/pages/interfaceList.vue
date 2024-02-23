<template>

<!--            <el-button type="primary">-->
<!--              <RouterLink :to="`/interfaceInfo/${item.id}`"  style="color: black;">-->
<!--                查看-->
<!--              </RouterLink></el-button>-->
  <div class="card-container">

      <div class="card" v-for="(item, index) in response" :key="index">
        <RouterLink :to="`/interfaceInfo/${item.id}`">
        <img src="@/assets/托腮.jpg" alt="Image" style="width: 100%;">
        <div>
          <h3>{{ item.description }}</h3>
          <p>Description goes here...</p>
        </div>
        </RouterLink>
      </div>


  </div>

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

function require(id: string) {

}

// 获取 @/assets/ 文件夹中的所有图片路径
const images = [
  '@/assets/头像.jpg',
  '@/assets/托腮.jpg',
  '@/assets/红帽.jpg'
];


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
.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start; /* 水平间距均匀分布 */
}

.card {
  width: calc(16.666% - 20px); /* 缩小卡片宽度为父容器的六分之一减去一定的间距 */
  margin: 10px; /* 设置卡片的外边距，即卡片与卡片之间的间隔 */
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
