import Vue from 'vue'
import VueRouter from 'vue-router'
import suggest from '@/views/suggest.vue'
import songlist from '@/views/list/songlist.vue'
import diantai from '@/views/diantai.vue'
import radiolist from '@/views/list/radiolist.vue'
import mvs from '@/views/mvs.vue'
import musicclub from '@/views/musicclub.vue'
import mv from '@/views/list/mv.vue'
import searchlist from '@/views/list/searchlist.vue'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/suggest'
    },
    {
      path: '/suggest',
      component: suggest
    },
    {
      path: '/songlist',
      component: songlist
    },
    {
      path: '/diantai',
      component: diantai
    },
    {
      path: '/mvs',
      component: mvs
    },
    {
      path: '/radiolist',
      component: radiolist
    },
    {
      path: '/musicclub',
      component: musicclub
    },
    {
      path: '/mv',
      component: mv
    },
    {
      path: '/searchlist',
      component: searchlist
    }
  ],
  linkActiveClass: 'active'
})

export default router
