<template>
  <div class="body">
    <div class="login">
      <el-form>
        <div style="text-align: center;margin-bottom: 50px;font-size: 30px">OpenApi</div>

        <el-form-item  prop="pass">
          <el-input  type="text" v-model="user.email" placeholder="admin" class="login-item input"/>
        </el-form-item>

        <el-form-item  prop="checkPass" >
          <el-input type="password" v-model="user.password" class="login-item input"  placeholder="admin"/>
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
 import {useRouter} from "vue-router";
 const router = useRouter()
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
      console.log(response.data.id)
     // 登陆成功后的逻辑
      if (response.data.id){
        await router.push('/welcome');
      }else {
        alert("请核实邮箱或密码")
      }
     localStorage.setItem('loginUser',response.data.email)
     localStorage.setItem('loginUserId',response.data.id)
     localStorage.setItem('OpenApi-Public-Key',response.data.publicKey)
     localStorage.setItem('OpenApi-Signature',response.data.sign)
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
  padding: 0;
  text-indent: 10px; /* 根据需要调整缩进的距离 */
}
</style>