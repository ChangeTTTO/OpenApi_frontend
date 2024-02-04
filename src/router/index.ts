import { createRouter, createWebHistory } from 'vue-router'
import showInterface from '@/pages/interfaceList.vue'
import login from '@/pages/login.vue'
import interfaceInfo from '@/pages/interfaceInfo.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name:'接口列表',
      path:'/interface',
      component:showInterface
    },
    {
      name:'登录界面',
      path:'/login',
      component:login
    },
    {
      name:'接口信息界面',
      path:'/interfaceInfo/:id',
      component:interfaceInfo,
      props:true
    },
  ]
})

export default router
