<template>
  <div>
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
            <i class="el-icon-odometer" style="font-size: 20px;"></i>  <!--图标 font-size可以设置图标的大小-->
            <span style="position: relative; left: 10px">接口列表</span></div>
        </el-row>
        <el-row>
          <!--   ！！！！ 如果 isDivActive 的值为 true，则将会为包含这个:class绑定的HTML元素添加 active 类-->
          <div class="highlight-div" @click="jump" :class="{ 'HuiYuan': isDivHuiYuan }">
            <i class="el-icon-odometer" style="font-size: 20px;"></i>  <!--图标 font-size可以设置图标的大小-->
            <span style="position: relative; left: 10px">使用文档</span></div>
        </el-row>


      </el-aside>

      <el-container  > <!--侧边栏右边的大框架-->

        <el-header class="head" style="background-color: #3B5998;padding: 0 20px 0 0;
                              color: white" height="50px"> <!--右边大框架的头部-->
          <div style="display: flex; align-items: center; justify-content: flex-end;height: 100%">
            <el-dropdown placement="bottom">
              <div style="display: flex; align-items: center;">
                <img src="@/assets/头像.jpg" style="width: 40px; height: 40px;">
              </div>
              <el-dropdown-menu>
                <el-dropdown-item><i class="el-icon-user" style="font-size: 20px;"></i>
                  <span style="position: relative; top: -3px">个人中心</span></el-dropdown-item>
                <el-dropdown-item><i class="el-icon-remove-outline" style="font-size: 20px;"></i>
                  <span style="position: relative; top: -3px">登出</span></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>
        <div  style="overflow-y: auto;height: calc(100vh - 50px);overflow-x: hidden !important;"> <!--无限滚动框-->
          <el-main style="padding: 0;background-color: #F0F3F8;}" >  <!--右边大框架的主体-->

            <router-view/>
          </el-main>
        </div>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
function handleDivClick() {      /*  this代表当前组件的数据属性，而不是来自其他的*/
  // 处理点击事件的逻辑
  // 使用this.$router.push切换到另一个页面
  // 检查当前路由是否与目标路由相同
  this.isDivHuiYuan = false; /*关闭使用文档的背景颜色*/
  this.isDivActive = true; // 点击后激活背景颜色
  if (this.$route.path !== '/Test') {    /*当前访问的文档路径$route*/
    // 只有在当前路由与目标路由不同的情况下才进行导航
    this.$router.push('/Test'); // 将用户导航到新界面
  }
}
function jump() {
  this.isDivActive = false; // 关闭仪表盘的背景颜色
  this.isDivHuiYuan = true; // 点击后激活背景颜色
  if (this.$route.path !== '/element') {
    // 只有在当前路由与目标路由不同的情况下才进行导航
    this.$router.push('/element'); // '/other' 是目标页面的路径
  }
}
</script>


<style scoped>
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
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
}/*隐藏溢出内容*/
</style>