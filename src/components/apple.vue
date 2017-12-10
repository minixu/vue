<template>
  <div class="hello" style="border: 1px solid red">
    <h1>{{msg}}</h1>
    <button @click="addOne">add one apple</button>
    <button @click="minusOne">minus one apple</button>
  </div>
</template>

<script>
  export default {
    name: '',
    data: function () {
      return {
        msg: 'i am apple',
        price: 5
      }
    },
    methods: {
      addOne: function () {
        // 调用actions里的方法，第一个参数是调用的方法，第二个参数是给这个方法传的参数
        this.$store.dispatch('increase', this.price)
      },
      minusOne: function () {
        this.$store.commit('decrement', this.price)
      }
    }
  }
</script>

<style scoped>

</style>
