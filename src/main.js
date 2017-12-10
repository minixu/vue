// 引入全局Vue变量、Vuex组件状态管理、组件、路由
import Vue from 'vue'
import App from './App'
import VRouter from 'vue-router'
import Vuex from 'vuex'
import bb from './components/bb'
import cc from './components/cc'
import dd from './components/dd'
import ee from './components/ee'
import bbChild from './components/bbChild'

// 注册Vuex（组件状态管理）
Vue.use(Vuex)
// 注册路由
Vue.use(VRouter)
// 组件管理实例
let store = new Vuex.Store({
  state: {
    totalPrice: 0
  },
  getters: {
    // 可以认为是store的计算属性
    getTotal: function (state) {
      return state.totalPrice
    }
  },
  mutations: {
    // mutations只能进行同步操作，第一个参数默认是sta te
    increment: function (state, price) {
      state.totalPrice += price
    },
    decrement: function (state, price) {
      state.totalPrice -= price
    }
  },
  actions: {
    // action可以进行异步操作，后端的接口放action里，第一个参数默认是这个store
    increase: function (context, price) {
      context.commit('increment', price)
    }
  }
})
// 由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。
// 为了解决以上问题，Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割：
//
// const moduleA = {
//   state: { ... },
//   mutations: { ... },
//   actions: { ... },
//   getters: { ... }
// }
//
// const moduleB = {
//   state: { ... },
//   mutations: { ... },
//   actions: { ... }
// }
//
// const store = new Vuex.Store({
//   modules: {
//     a: moduleA,
//     b: moduleB
//   }
// })
//
// store.state.a // -> moduleA 的状态
// store.state.b // -> moduleB 的状态
// 实例化router
let router = new VRouter({
  mode: 'history',
  routes: [
    // {
    //   // 路由重定向
    //   path: '/',
    //   redirect: '/namespace'
    // },
    {
      // 路由可以使用正则来匹配
      // 有时候，同一个路径可以匹配多个路由，此时，匹配的优先级就按照路由的定义顺序：谁先定义的，谁的优先级就最高。
      path: '/bb',
      component: bb,
      // 子路由
      children: [
        {
          path: '/child',
          component: bbChild
        },
        {
          // 没有可以匹配的子路由时该路由匹配全部
          path: '',
          component: bbChild
        }
      ]
    },
    {
      // :后面是路由的参数，如果路径里不带参数，无法直接访问该路由
      // 传参实现组件复用，但是这样生命钩子不会再被调用。复用组件时，想对路由参数的变化作出响应的话，你可以简单地 watch（监测变化） $route 对象
      path: '/cc/:color',
      component: cc,
      name: 'cc'
    },
    {
      // 命名视图
      path: '/namespace',
      components: {
        dd: dd,
        ee: ee
      }
    }
  ]
})
// 编程式导航，应用场景:可以配合router.beforeEach()方法做登录判断，未登录则跳转到登录页
// 路由详解：https://router.vuejs.org/zh-cn/essentials/navigation.html
// router.push({ name: 'user', params: { userId }})
Vue.config.productionTip = false
// 全局指令，不能写在new Vue后面
Vue.directive('css', {
  inserted: function (el, binding) {
    let styleObj = binding.value
    let arr = []
    for (let key in styleObj) {
      arr.push(key + ':' + styleObj[key])
    }
    arr = arr.join(';')
    el.style.cssText = arr
  }
})
// 创建vue实例，一个项目就创建一次，render,h方法相当于createElement，render把节点注射到实例中
let vue = new Vue({
  el: '#app',
  router,
  store,
  render: function (h) {
    return h(App)
  }
})
// //和上文实例化等同
// new Vue({
//   el: '#app',
//   template: '<App/>',
//   components: {App}
// })

// 注册vue
Vue.use({
  vue
})
