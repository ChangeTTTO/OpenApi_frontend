<script setup lang="js">
import {RouterView,RouterLink} from 'vue-router'
import {onMounted} from 'vue'
import {ref} from "vue";
import {ArrowDown, UserFilled} from "@element-plus/icons-vue";
import request from "@/Axios";
import router from "@/router";

const isDivActive = ref(false);
const isDivHuiYuan = ref(false);
let user = ref('')
onMounted(()=>{
  user=localStorage.getItem('loginUser')
})
const activeIndex = ref('1')
const handleSelect = (key, keyPath) => {
  console.log(key, keyPath)
}
async function logout() {
  try {
    // 发送 POST 请求
    const result = await request.get(`user/logout`);
    if (result.code===1){
      localStorage.removeItem('loginUser');
      localStorage.removeItem('loginUserId');
      localStorage.removeItem('OpenApi-Public-Key');
      localStorage.removeItem('OpenApi-Signature');
      await router.push('/login');
    }else {
      alert("发生了异常，请重试")
    }
    // 处理结果
  } catch (error) {
    // 处理错误
  }

}
</script>

<template>
  <div class="container">
    <el-container >

      <el-header class="header" >     <!--头部-->
        <div class="logo">
            <img src="@/assets/logo.png" alt="Logo" width="30px" style="display: inline">
           <strong> OpenApi  </strong>
        </div>
          <div class="menu">
            <el-menu
                mode="horizontal"
                @select="handleSelect"
                :router="true"
            >
              <el-menu-item index="/welcome">
                欢迎
              </el-menu-item>

              <el-menu-item index="/interfaceList">
                免费接口
              </el-menu-item>

              <el-menu-item index="/vip">
                会员服务
              </el-menu-item>
              <el-menu-item index="/vipInterfaceList">
                会员接口
              </el-menu-item>
            </el-menu>
          </div>




        <div class="user">
          <el-dropdown trigger="click">
            <el-button class="el-button">
              <el-icon style="margin:0 5px 2px 0 ;font-size: 17px"><UserFilled /></el-icon>

              {{user}}

            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
<!--                <el-dropdown-item><el-icon style="font-size: 18px"><User /></el-icon>个人中心</el-dropdown-item>-->
                <div  @click="logout">
                  <el-dropdown-item><el-icon style="font-size: 18px"><Remove /></el-icon>登出</el-dropdown-item>
                </div>

              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>

      </el-header>
      <el-main class="main" >
        <div >
          <router-view/>
        </div>

      </el-main>
    </el-container>
  </div>
</template>


<style scoped>
.header{
  background-color: white;
  position: sticky; top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
}
el-main{
  padding: 0;
  margin: 0;
}
.footer{
  background-color:#F8F8F8;
}
.main{
  background-color:#F8F8F8;
  padding-left: 150px;
  margin: 0;
  z-index: 100;
}
.user{
  position:relative;
  left: 450px;
}
.logo{
  position:absolute;
  left: 0;
  margin-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.menu{
  position: relative;
  right: 250px;
  width: 450px;
}
a{
  text-decoration: none;
  color: inherit;
}
</style>