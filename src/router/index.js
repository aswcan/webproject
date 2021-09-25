import Vue from 'vue'
import VueRouter from 'vue-router'
import suggest from '@/views/suggest.vue'
import songlist from '@/views/songlist.vue'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/'
    },
    {
      path: '/suggest',
      component: suggest
    },
    {
      path: '/songlist',
      component: songlist
    }
  ]
})

export default router
