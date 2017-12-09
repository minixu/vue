<template>
  <div id="app">
    <img src="./assets/logo.png">
    <!--v-for指令-->
    <ul class="a">
      <li v-for="(item,index) in list" :key="index">{{item.name}}--{{item.price}}--{{index}}</li>
    </ul>
    <!--引入组件，组件自定义属性的时候不允许出现大写,给组件传参时，key不能作为参数传递，但是这里最好写一下，名字也一定要叫key，不然F12会报出一个警告-->
    <hello @my-event="myev" v-for="(item,index) in list" :key="index" :index="index" :item="item"></hello>
    <!--v-bind指令，可以简写为:href,属性值是动态的，且可以在组件中传递,绑定的class不和原有冲突，在原有基础上添加,一个标签里不可以同时使用两次:class=""-->
    <!--:class几种用法,:class='[classA,classB,{'red-font':hasError}]',data选项中变量 classA:'class1', classB:'class2', hasError:true-->
    <button :class="className" v-bind:href="link" v-on:click="addItem">addItem</button>
    <!--v-text和v-html的指令-->
    <p v-text="hello"></p>
    <p v-html="hello"></p>
    <!--v-on指令，可以简写为@click-->
    <button :class="className" v-on:click="console" @keydown.enter="console">console</button>
    <!--v-model指令，常用的三种属性.trim .number .lazy-->
    <input type="text" v-model.trim="myval">
    {{myval}}
    <!--多选的实现-->
    <input type="checkbox" id="a" value="apple" v-model="myvals">
    <label for="a">apple</label>
    <input type="checkbox" id="b" value="banana" v-model="myvals">
    <label for="b">banana</label>
    <input type="checkbox" id="o" value="orange" v-model="myvals">
    <label for="o">orange</label>
    {{myvals}}
    <!--单选的实现-->
    <input type="radio" id="aa" value="apple" v-model="myvalss">
    <label for="aa">apple</label>
    <input type="radio" id="bb" value="banana" v-model="myvalss">
    <label for="bb">banana</label>
    <input type="radio" id="oo" value="orange" v-model="myvalss">
    <label for="oo">orange</label>
    {{myvalss}}
    <!--select的实现-->
    <select v-model="myvalsss">
      <option value="0">apple</option>
      <option value="1">banana</option>
      <option value="2">orange</option>
    </select>
    {{myvalsss}}
    <!--等同于-->
    <select v-model="myvalssss">
      <option v-for="(item,index) in options" v-bind:value="item.value">{{item.name}}</option>
    </select>
    {{myvalssss}}
    <br>
    <!--计算属性-->
    <input type="text" v-model="myinputval">
    {{myValueWithoutNum}}<!--computed选项的使用-->
    {{getmyValueWithoutNum()}}<!--普通method的使用-->
    <!--数据监听-->
    <input type="text" v-model="mywatchval">
    {{mywatchval}}
    <!--is属性动态引入组件,keep-alive标签使组件切换时能缓存组件，提高加载速度-->
    <keep-alive>
      <p :is="autocomponents"></p>
    </keep-alive>
    <button type="text" @click="changecomponents">changecomponents</button>
    <!--组件间通信,自定义属性或事件不支持驼峰写法-->
    <div>
      <aa :fatherval="fatherval" @myevent="getMyevent">
        <!--该模板会插入到子组件的slot标签里-->
        <div slot="header"><span>sdsads</span>123123</div>
        <div slot="footer">mn</div>
      </aa>
      <input type="text" v-model="fatherval">
    </div>
    <!--css过渡动画，适用场景：动态组件、v-show、v-if,mode属性控制多元素切换时进场和出场的顺序，多元素切换如标签名一样，要赋予标签不同的key，否则动画无效果-->
    <!--v-if  v-show v-hide使用方法和ng类似，控制其的变量定义在data选项里，可以用methods进行控制。 v-else紧跟在v-if后面，意思就是字面意思-->
    <transition name="fade" mode="out-in">
      <!--<p v-show="show">i am show</p>-->
      <p v-if="show" key="1">v-if</p>
      <p v-else key="2">v-else</p>
    </transition>
    <button v-on:click="show=!show"></button>
    <!--自定义指令-->
    <p v-css="{color:'red','font-size':'24px'}">hwllo word</p>
    <input v-focus>
  </div>
</template>
<script>
  import hello from './components/HelloWorld'
  import aa from './components/aa'
  import bb from './components/bb'
  import cc from './components/cc'

  export default {
    name: 'app',
    components: {
      hello, bb, aa, cc
    },
    data: function () {
      return {
        hello: '<span>weqweqwe</span>',
        show: true,
        fatherval: '',
        autocomponents: 'bb',
        myvalssss: 0,
        myvalsss: 0,
        options: [
          {
            name: 'apple',
            value: 0
          },
          {
            name: 'banana',
            value: 1
          },
          {
            name: 'orange',
            value: 1
          }
        ],
        myvalss: '',
        myvals: [],
        myval: '',
        name: 'Welcome to Your Vue.js App',
        link: 'www.baidu.com',
        classstr: 'ssss',
        className: {
          'red-font': true,
          'bule-font': true
        },
        list: [{name: 'www', price: 1}, {name: 'www2', price: 2}, {name: 'www3', price: 3}],
        myinputval: '',
        mywatchval: ''
      }
    },
    // 计算属性，根据data里的变量去计算，其绑定的变量变化一次，该方法调用一次，如果未绑定变量，则只在页面渲染初期调用一次
    computed: {
      myValueWithoutNum: function () {
        // return Date.now()
        return this.myinputval.replace(/\d/g, '')
      }
    },
    methods: {
      // 区别于computed中的方法，该方法调用不受限制
      getmyValueWithoutNum: function () {
        // return Date.now()
        return this.myinputval.replace(/\d/g, '')
      },
      addItem: function () {
//         会触发列表更新：push、pop、shift、unshift、reverse、splice、sort
//         不会触发列表更新：filter、contact、slice、直接为某项赋值、改变数组长度
//         不会触发列表更新的方法可以采取以下方式更新列表：
//         Vue.set(this.list,1,{name:'aaa',price:256})    第一个参数传要更改的数组，第二个参数传要修改项的index，第三个传修改后的值
//         要调用Vue的全局api必须要引入 import Vue from 'vue'
        this.list.push({
          name: 'www5',
          price: 5
        })
      },
      console: function () {
        console.log(111)
      },
      // 自定义事件被触发时触发的方法，该方法可以接收自定义事件传来的参数
      myev: function (h) {
        console.log(h)
      },
      getMyevent: function (h1, h2) {
        console.log(h1, h2)
      },
      changecomponents: function () {
        if (this.autocomponents === 'cc') {
          this.autocomponents = 'bb'
        } else {
          this.autocomponents = 'cc'
        }
      }
    },
    // 监听某个变量，并执行某个方法
    watch: {
      mywatchval: function (val, oldval) {
        console.log(val, oldval)
        this.console()
      }
    },
    // 这样定义指令使用范围仅限该组件
    directives: {
      // css: {
      //   inserted: function (el, binding) {
      //     let styleObj = binding.value
      //     let arr = []
      //     for (let key in styleObj) {
      //       arr.push(key + ':' + styleObj[key])
      //     }
      //     arr = arr.join(';')
      //     el.style.cssText = arr
      //   }
      // },
      focus: {
        inserted: function (el, binding) {
          el.focus()
        }
      }
    }
  }
</script>
<!--引入scss,scoped使该样式只能作用于当前组件，不会泄露给引用该组件的父组件等-->
<style lang='scss' rel="stylesheet/scss" scoped>
  .a {
    font-size: 16px;

  }

  /*css过渡动画 进入初始v-enter  进入完成v-enter-active  离开初始v-leave  离开完成v-leave-active*/
  .fade-enter-active, .fade-leave-active {
    transition: all .5s;
  }

  .fade-enter, .fade-leave-active {
    opacity: 0;
  }
</style>
