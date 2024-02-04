<template>
  <el-form>
    <el-form-item label="账号" prop="pass">
      <el-input  type="text" v-model="user.userAccount" autocomplete="off" />
    </el-form-item>

    <el-form-item label="密码" prop="checkPass">
      <el-input type="password" v-model="user.password" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="login">登录</el-button>
    </el-form-item>

  </el-form>
</template>

<script lang="ts" setup>
 import {ref} from "vue";
import request from "@/Axios";
 let user=ref({
   userAccount:'',
    password:''
 })
 async function login() {

   try {
     const response = await request.post('/user/login', {
       userAccount: user.value.userAccount,
       password: user.value.password,
       headers: {
         'Content-Type': 'application/json'
       }
     });

     // 处理响应数据
      if (response.code===1){
          alert("登陆成功")
      }
   } catch (error) {
     // 处理请求错误
     console.error(error);
   }
 }
</script>