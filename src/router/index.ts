import { createRouter, createWebHistory } from 'vue-router'
import showInterface from '@/pages/interfaceList.vue'
import login from '@/pages/login.vue'
import interfaceInfo from '@/pages/interfaceInfo.vue'
import index from '@/components/index.vue'
import NewIndex from "@/components/NewIndex.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: NewIndex,
      children: [
        {
          name:'接口列表',
          path:'/interfaceList',
          component:showInterface
        },
        {
          name:'接口信息界面',
          path:'/interfaceInfo/:id',
          component:interfaceInfo,
          props:true
        },
      ]
    },

    {
      path: '/login',
      component: login
    }
  ]
})

export default router
