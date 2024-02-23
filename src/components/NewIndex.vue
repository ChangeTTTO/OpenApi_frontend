<script setup lang="ts">

</script>

<template>
  <div class="common-layout">
    <el-container >
      <el-header class="header" >Header</el-header>
      <el-main   class="main" >Main</el-main>
      <el-footer class="footer">Footer</el-footer>
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
}
.footer{

}
.main{
  background-color:#F8F8F8;
  height: 85vh
}
.card-container{


}
</style>