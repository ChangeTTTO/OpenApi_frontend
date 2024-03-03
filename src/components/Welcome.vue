<template>
  <div style="height: 100vh;">
    <el-card class="card" style="line-height: 30px">


    <h2>
      欢迎光临🎉
    </h2>
      <h3>
        OpenApi是一个提供全面API接口调用服务的平台🛠
      </h3>
      <h4>
        🤵 作为普通用户可浏览免费接口并在线进行调试，作为会员可直接复制接口地址，添加参数根据自己的需求灵活调用。<br>
        💣本人显示器1080p,屏幕125%缩放,当你的配置与我不符时，可能会出现意料之外的情况。
        💻 项目为java后端项目，前端只做了一些核心功能，非必要功能就没用去做了。点击查看后端
        <a href="http://localhost:1111/doc.html" target="_blank">已实现的接口</a>
      </h4>
    </el-card>
  </div>
</template>
<style scoped>
.card{
  margin: 0;
  padding: 0;
  width: 80vw;
  box-shadow: none
}
a,
a:visited {
  text-decoration: none;
  color: #79bbff; /* 继承父元素的颜色 */
}
</style>
<script setup lang="js">
import request from "@/Axios.ts";
import router from "@/router/index.ts";
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

</script>