<template>
  <div class="hello" style="border: 1px solid blue">
    <h1>{{msg}}</h1>
    <button @click="addOne">add one banana</button>
    <button @click="minusOne">minus one banana</button>
  </div>
</template>

<script>
  export default {
    name: '',
    data: function () {
      return {
        msg: 'i am banana',
        price: 2
      }
    },
    methods: {
      addOne: function () {
        this.$store.commit('increment', this.price)
      },
      minusOne: function () {
        this.$store.commit('decrement', this.price)
      }
    }
  }
</script>

<style scoped>

</style>
