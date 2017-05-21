<template>
    <div class="main">
        <div class="main-left">
           <div class="error">
           		<span>页面错误，{{time}}秒后将返回首页</span> 
           </div>
        </div>
    </div>
</template>

<script>

	export default {
		data(){
			return {
                time: 3,
			}
		},
		methods: {
			timeCount(){
				setTimeout(() => {
        		if (this.time === 0) {
	        			this.$router.push({name:'index'})
	        		}
	        		this.time--
	        		this.timeCount()
	        	},1000)
			}
		},
        created(){
        	this.timeCount()
        }
	}
</script>


<style scoped lang = 'scss'>
	.main-left{
		text-align: center;
	}
	.error{
		height: 100px;
		line-height: 100px;
		color: red;
		background-color: #fff;
	}
</style>