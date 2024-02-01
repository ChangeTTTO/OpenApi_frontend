<style>
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
  overflow: hidden;  /*隐藏溢出内容*/
}
</style>
<script>
import MyDiv from './MyDiv.vue';

export default {
  components: {
    MyDiv,
  },
  // ... 其他组件配置
}
</script>
