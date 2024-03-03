<template>
  <el-card class="card"  >
    <h1>
      选择最适合您的计划
    </h1>

    <div class="card-container">
      <div  class="InnerCard" @click="getVip">
        <img src="https://rxbby.oss-cn-guangzhou.aliyuncs.com/OpenApi/%E4%BC%9A%E5%91%98%E8%B4%AD%E4%B9%B0.png" alt="Image" style="width: 100%;" >
        <div>
          <h3 style="color: red">{{ price }}</h3>
          <p> 有效期: <b>{{validity}}</b></p>
          <p> 专属会员接口</p>
        </div>
      </div>
    </div>

  </el-card>


</template>

<script setup lang="js">
import { useRouter } from 'vue-router';
import request from "@/Axios.ts";
import router from "@/router/index.ts";
import {ElMessage} from "element-plus";
import {ref} from "vue";
let user = ref('')
user = localStorage.getItem('loginUser')
if(user==null){
  router.push('/login');
}
request.get(`interfaceInfo/test`)
    .then(status => {
      console.log(status.code);
    })
    .catch(error => {
      router.push('/login');
    });
const price = '¥0.01'; // 价格
const validity = '无限期'; // 会员有效期

async function getVip() {
  try {
    // 发送 POST 请求
    const vipResponse = await request.post(`/user/vip`,{
      email:localStorage.getItem("loginUser")
    });
    if (vipResponse.code === 1) {
      ElMessage.success("获取会员成功")
      await router.push('/vipInterfaceList')
    }else {
      alert("发生异常")
    }
    // 处理结果
  } catch (error) {
    // 处理错误
  }
}
</script>

<style scoped>

.card{
  margin: 0;
  padding: 0;
  width: 80vw;
  box-shadow: none;
  height: 90vh;
}
.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start; /* 水平间距均匀分布 */
  width: 80vw;
}

.InnerCard{
  width: 200px; /* 缩小卡片宽度为父容器的六分之一减去一定的间距 */
  margin: 10px 0 10px 22px ; /* 设置卡片的外边距，即卡片与卡片之间的间隔 */
  padding: 10px; /* 缩小卡片内边距 */
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}


.InnerCard:hover {
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}
</style>
