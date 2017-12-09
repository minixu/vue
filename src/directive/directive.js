import Vue from 'vue'

const directiveCss = Vue.directive('css', {
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
export {directiveCss}
