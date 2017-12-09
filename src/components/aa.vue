<template>
  <div class="aaa">
    <div>aa component!</div>
    <div @click="myev">{{fatherval}}</div>
    <!--插槽功能，父组件向子组件插入模板-->
    <slot name="header">no header</slot>
    <p>分割分割</p>
    <slot name="footer">no footer</slot>
  </div>
</template>
<script>
  export default {
    name: 'aa',
    data: function () {
      return {
        hello: 'www'
      }
    },
    props: {
      'fatherval': [Number, String]
    },
    methods: {
      // $emit触发自定义事件，后面的是传入的参数
      myev: function () {
        this.$emit('myevent', this.fatherval, this.hello)
      }
    }
  }
</script>
