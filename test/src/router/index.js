import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index'
import Loan from '@/views/loan/index'
import Data from '@/views/data/index'
import About from '@/views/about/index'
Vue.use(Router)
const routes = [
  { path: '/', component: Index },
  { path: '/index', name: '首页', component: Index},
  { path: '/loan', name: '商贷', component: Loan},
  { path: '/data', name: '行业大数据', component: Data },
  { path: '/about', name: '关于我们', component: About }

]
export default new Router({
  routes
})
