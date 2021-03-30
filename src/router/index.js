import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 开发环境不使用懒加载, 因为懒加载页面太多的话会造成webpack热更新太慢, 所以只有生产环境使用懒加载
const _import = require('./import-' + process.env.NODE_ENV)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: _import(/* webpackChunkName: "Home" */ 'Home')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: _import(/* webpackChunkName: "about" */ 'About')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
