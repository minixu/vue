// 引入全局Vue变量、组件、路由
import Vue from 'vue'
import App from './App'
import router from './router'

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
  render: function (h) {
    return h(App)
  }
})
// 注册vue
Vue.use({
  vue
})
// //和上文实例化等同
// new Vue({
//   el: '#app',
//   template: '<App/>',
//   components: {App}
// })
