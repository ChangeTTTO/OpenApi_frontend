
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css'; // 导入样式
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