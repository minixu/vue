<template>
  <div class="hello" @click="emitMyEvent">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <div>{{item.price}}--{{index}}</div>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    // data选项采用这种写法可以使组件被多次引用时，数据的作用域独立，如果直接 dara：{msg:'xxx'}，这样就多次被引用时，互相之间使用同一个数据域
    data: function () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    // 接收父组件引用子组件时，传给子组件的属性参数
    props: ['index', 'item'],
    // 申明组件要调用的一些方法
    methods: {
      // $emit触发自定义事件，this.msg是触发时传入的参数
      emitMyEvent: function () {
        this.$emit('my-event', this.msg)
      }
    }
  }
</script>
