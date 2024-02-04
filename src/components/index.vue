<template>
  <div style="height: 100vh">
    <el-container> <!--包裹着整个浏览器的大边框-->

      <el-aside style="width: 250px; min-height: 100vh ;">   <!--侧边栏-->
        <div style="height: 50px ; background-color: #4F6AA3;margin: 0;
                   color: #D3DAE8;font-size: 20px;display: flex;align-items: center;justify-content: center;">
          <!--设置文本行高line-height:60px-->
          OpenApi
        </div>
        <el-row >
          <!--   ！！！！ 如果 isDivActive 的值为 true，则将会为包含这个:class绑定的HTML元素添加 active 类-->
          <div class="highlight-div" @click="handleDivClick" :class="{ 'active': isDivActive }">
            <el-icon style="font-size: 20px;"><List /></el-icon>
            <span style="position: relative; left: 10px"><RouterLink to="/interface">接口列表</RouterLink></span>
          </div>

        </el-row>
        <el-row>
          <!--   ！！！！ 如果 isDivActive 的值为 true，则将会为包含这个:class绑定的HTML元素添加 active 类-->
          <div class="highlight-div" @click="jump" :class="{ 'HuiYuan': isDivHuiYuan }">
            <el-icon style="font-size: 20px;"><Reading /></el-icon><!--图标 font-size可以设置图标的大小-->
            <span style="position: relative; left: 10px">使用文档</span></div>
        </el-row>

      </el-aside>

      <el-container  > <!--侧边栏右边的大框架-->

        <el-header class="head" style="background-color: #3B5998;height:50px "> <!--右边大框架的头部-->

<!--          <el-dropdown>

           <span class="email">
           Change125800@Gmail.com
           </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item><el-icon style="font-size: 18px"><User /></el-icon>个人中心</el-dropdown-item>

                <el-dropdown-item><el-icon style="font-size: 18px"><Remove /></el-icon>登出</el-dropdown-item>
              </el-dropdown-menu>
            </template>

          </el-dropdown>-->
            <el-button class="email">

             <div>
               <el-icon style="padding-top: 5px"><UserFilled /></el-icon> Change125800@Gmail.com
           </div>
          </el-button>


        </el-header>

          <el-main style="padding: 0;background-color: white; " >  <!--右边大框架的主体-->
            <div style="margin-top: 30px;">
              <RouterView/>
            </div>
          </el-main>

      </el-container>
    </el-container>
  </div>

</template>
<script setup lang="ts">
import {RouterView,RouterLink} from 'vue-router'
import {ref} from "vue";
import {ArrowDown} from "@element-plus/icons-vue";
const isDivActive = ref(false);
const isDivHuiYuan = ref(false);
function handleDivClick() {      /*  this代表当前组件的数据属性，而不是来自其他的*/
  isDivHuiYuan.value = false; /*关闭使用文档的背景颜色*/
  isDivActive.value = true; // 点击后激活背景颜色
}
function jump() {
  isDivActive.value = false; // 关闭仪表盘的背景颜色
  isDivHuiYuan.value = true; // 点击后激活背景颜色
}
</script>


<style scoped>
a{
  text-decoration: none;
  color:#555d65;
}
.email{
  background-color:#3B5998;
  font-weight: bold;
  color: white;
  cursor: pointer;
  margin: 9px 0 0 970px;
  border-width: 0px;

}
.email:hover {
  background-color: rgba(0, 0, 0, 0.2); /* 0.5 是透明度，可以根据需要进行调整 */

}

/*仪表盘的样式*/
.highlight-div {
  width: 220px;
  left: 15px;
  margin: 20px 0 0 0;
  background-color: white;
  position: relative;
  display: flex;
  padding: 0.5rem 0.625rem; /*通过内边距压缩文字的位置*/
  min-height: 2.25rem;
  font-size: .875rem;  /*表示字体大小为根元素字体大小的0.875倍。因为根元素默认字体大小是16px，所以 .875rem 等于 14px（0.875 * 16px）*/
  font-weight: 500;
  line-height: 1.25rem;
  letter-spacing: .0125em;
  color: #555d65;
  align-items: center;  /*垂直居中其内部的子元素*/
  border-radius: 0.2rem;
  box-sizing: border-box;
  transition: background-color 0.3s ease; /* 添加过渡效果，使颜色变化平滑 */
  user-select: none; /* 禁止文本被选中  拒绝高亮效果*/
}

/*它用于选择具有两个类名的HTML元素*/
.highlight-div.active {
  background-color: #D8E0F0; /* 点击后的背景颜色 */
}
.highlight-div.HuiYuan {
  background-color: #D8E0F0; /* 点击后的背景颜色 */
}

.highlight-div:hover { /*绝招，鼠标移动上去会有效果*/
  cursor: pointer; /* 将鼠标光标变为手形以指示可点击 */

  background-color: #D8E0F0; /* 鼠标悬停时的背景颜色 */
}
/*当屏幕铺不满时使用*/
:root{
  margin: 0;
  padding: 0;
  height: 100vh;
  width:100%;
  overflow: hidden;
}/*隐藏溢出内容*/

</style>