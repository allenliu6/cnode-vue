<template>
  <div id="app">
    <top></top>
<<<<<<< HEAD

    <div>
        <router-view></router-view>
    </div>

=======
    
    <div>
        <router-view></router-view>
    </div>
    
>>>>>>> 856f1f213b6beac8937ffbe5138c09d158d69cc8
    <backtop></backtop>
    <bottom></bottom>
  </div>
</template>

<script>
import top from './components/Header'
import bottom from './components/footer'
import store from './store/index'
import backtop from './components/backTop'

export default {
  components: {
    top,
    bottom,
    backtop
  },
  store,
}
</script>

<style lang='scss'>
  body{
    margin:0;
    background-color: rgb(225, 225, 225);
    font: 16px "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
  }

    .main{
      display: flex;
      justify-content: center;
      min-height: 700px;
    }
    .main-left{
<<<<<<< HEAD
          width: 55%;
          height: auto;

          .include{
            background-color: #fff;
            box-shadow: 0 0 5px #ccc;

=======
          width: 65%;
          height: auto;

          .include{
            background-color: #fff;   
            box-shadow: 0 0 5px #ccc;
            
>>>>>>> 856f1f213b6beac8937ffbe5138c09d158d69cc8
          }
        }

        .main-right{
          width: 22%;
          margin-left: 3%;
          height: 0px;
        }
<<<<<<< HEAD

=======
    
>>>>>>> 856f1f213b6beac8937ffbe5138c09d158d69cc8

    ul {
      margin: 0;
      padding: 0;
    }

    li {
      list-style: none;
    }

    a {
      color: #CCC;
      text-decoration: none;
    }

    img {
      vertical-align: middle;
      max-width: 100%;
    }
<<<<<<< HEAD


=======
    
  
>>>>>>> 856f1f213b6beac8937ffbe5138c09d158d69cc8
</style>
