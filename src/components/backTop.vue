<template>
	<div class="backTop" @click='backTop' v-if='show'>
		返回顶部
	</div>
</template>

<style scoped lang = 'scss'>
	.backTop{
		position: fixed;
		right: 0;
		bottom: 100px;
		width: 25px;
		height: 60px;
		padding: 10px 0;
		line-height: 15px;
		border-top-left-radius: 10px;
		border-bottom-left-radius: 10px;
		text-align: center; 
		color: #ccc;
		background-color: #fff;
		font-size: 14px;
		cursor: pointer;
	}
</style>

<script>
	export default {
		data(){
			return {
				show:false
			}
		},
		methods: {
			backTop(){
				document.body.scrollTop = 0;
			},
		},
		created(){
			window.onscroll = () => {
				const height = document.body.scrollTop
				if (height > 500) {
					this.show = true;
				}else{
					this.show = false;
				}
			}
		}
		
	}
</script>


