<template>
  <div>
    <div class="loading" v-if='hint.status === "loading"'>
        <div>数据加载中...</div>
      </div>

      <div class="error" v-if='hint.status === "error"'>
        <div>{{hint.info}}</div>
      </div>
  </div>
    	
</template>
<script>
    export default {
      props:{
        hint: Object
      }  // 数据本地化
    }
</script>

<style scoped lang='scss'>
    .loading,.error{
            background-color: #e1e1e1;

            div{
              height: 40px;
              background-color: #c3e67a;
              text-align: center;
              line-height: 40px;
              color: #80bd01;
            }
          }

          .error div{
            background-color: rgba(255, 224, 0, 0.61);
            color: red;
          }
</style>