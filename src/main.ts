
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css'; // 导入样式
// 全局的路由守卫
router.beforeEach((to, from, next) => {
    // 获取用户登录信息
    let userEmail = localStorage.getItem("loginUser");
    // 如果用户未登录且目标路由不是登录页面，则重定向到登录页面
    if (!userEmail && to.path !== '/login') {
        next('/login');
    } else {
        next(); // 放行
    }
});
const app = createApp(App)
//高亮插件
app.directive('highlight', {
    mounted(el) {
        hljs.highlightBlock(el);
    }
});

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.mount('#app')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

