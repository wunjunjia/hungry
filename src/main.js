import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import { formatDate } from './uitls'
import './assets/style/icon.scss'
import './reset.css'

// 注册过滤器
Vue.filter('formatDate', function (time, fmt) {
  if (!time) return ''
  return formatDate(new Date(time), fmt)
})

// 注册过渡组件
Vue.component('confirm-transition', {
  functional: true,
  render: function (createElement, context) {
    var data = {
      props: {
        name: 'confirm-transition',
      },
      on: {
        beforeEnter: function (el) {
          el.style.opacity = 0
          el.style.transition = 'opacity .2s ease'
          const confirm = el.firstChild
          confirm.style.transform = 'scale(0, 0)'
          confirm.style.transition = 'transform .2s ease'
        },
        enter: function (el, done) {
          /* eslint-disable-next-line */
          var rf = el.offsetHeight
          el.style.opacity = 1
          const confirm = el.firstChild
          confirm.style.transform = 'scale(1.1, 1.1)'
          const timer = setTimeout(() => {
            done()
            clearTimeout(timer)
          }, 200)
        },
        afterEnter(el) {
          const confirm = el.firstChild
          confirm.style.transform = 'scale(1, 1)'
        },
        leave(el, done) {
          el.style.opacity = 0
          const confirm = el.firstChild
          confirm.style.transform = 'scale(0, 0)'
          const timer = setTimeout(() => {
            done()
            clearTimeout(timer)
          }, 200)
        },
      }
    }
    return createElement('transition', data, context.children)
  }
})

Vue.use(VueRouter)
Vue.config.productionTip = false

const routes = [
  { path: '/', redirect: '/goods' },
  { path: '/goods', component: () => import('@/pages/Goods') },
  { path: '/ratings', component: () => import('@/pages/Ratings') },
  { path: '/seller', component: () => import('@/pages/Seller') }
]

const router = new VueRouter({
  mode: 'history',
  // linkActiveClass: 'active',
  routes
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
