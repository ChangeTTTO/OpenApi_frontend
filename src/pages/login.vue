<template>
  <div class="body">
    <div class="login">
      <el-form>
        <div style="text-align: center;margin-bottom: 50px;font-size: 30px">OpenApi</div>

        <el-form-item  prop="pass">
          <el-input  type="text" v-model="user.email" placeholder="邮箱" class="login-item input"/>
        </el-form-item>

        <el-form-item  prop="checkPass" >
          <el-input type="password" v-model="user.password" class="login-item input"  placeholder="密码"/>
        </el-form-item>

        <el-form-item >
          <el-button style="background-color: #0665D0;color: white" @click="login" class="login-item">登录</el-button>
        </el-form-item>

      </el-form>
    </div>
  </div>


</template>

<script lang="ts" setup>
 import {ref} from "vue";
import request from "@/Axios";
 let user=ref({
   email:'',
    password:''
 })
 async function login() {

   try {
     const response = await request.post('/user/login', {
       email: user.value.email,
       password: user.value.password,
       headers: {
         'Content-Type': 'application/json'
       }
     });

     // 处理响应数据
      if (response.code===1){
          alert("登陆成功")
      }
      //存入登录用户的邮箱
     localStorage.setItem('loginUser',response.data.email)
   } catch (error) {
     // 处理请求错误
     console.error(error);
   }
 }

</script>
<style>
.body{
  background-color: #E8EAF2;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.login{
  background-color: white;
  width: 450px;
  height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-item{
  width: 400px;
  height: 40px;
}
input::placeholder {
  text-indent: 10px; /* 根据需要调整缩进的距离 */
}
/* 使用 text-indent 来调整光标位置 */
input {
  text-indent: 10px; /* 根据需要调整缩进的距离 */
}
</style>