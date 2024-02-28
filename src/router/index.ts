import { createRouter, createWebHistory } from 'vue-router'
import vip from '@/components/vip.vue'
import login from '@/components/login.vue'
import vipInterfaceList from '@/components/vipInterfaceList.vue'
import NewIndex from "@/components/NewIndex.vue";
import NewInterfaceInfo from "@/components/NewInterfaceInfo.vue";
import interfaceList from "@/components/interfaceList.vue";
import Welcome from "@/components/Welcome.vue";
import vipInterfaceInfo from "@/components/vipInterfaceInfo.vue";
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
          component:interfaceList
        },
        {
          name:'接口信息界面',
          path:'/interfaceInfo/:id',
          component:NewInterfaceInfo,
          props:true
        },
        {
          name:'vip接口信息界面',
          path:'/vipInterfaceInfo/:id',
          component:vipInterfaceInfo,
          props:true
        },
        {
          name:"欢迎页",
          path:'/welcome',
          component:Welcome
        },
        {
          name:"vip充值界面",
          path:'/vip',
          component:vip
        },
        {
          name:"vip接口列表",
          path:'/vipInterfaceList',
          component:vipInterfaceList
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
