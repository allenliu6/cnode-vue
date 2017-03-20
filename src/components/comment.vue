<template>
	<div class="panel" >
		<div class="commentHeader">
			添加回复
		</div>
		<div class="comment">
			<!-- <hint></hint> -->
			<textarea v-model='replyContent'></textarea>
			<div class="countInfo">

			</div>
			<button @click='submitReply'>提交</button>
		</div>
	</div>
</template>

<script>
	export default{
		computed:{
			token(){
				return this.$store.getters.getToken
			},
		},
		props:['id'],
		methods: {
			submitReply(){
                this.$store.dispatch('fetch_reply', {token:this.token, content: this.replyContent, id:this.id})
                    .catch( (e) => console.log(e))
                this.replyContent = ''
            }
		},
		data(){
			return {
				replyContent:'',
			}
		},
	}
</script>

<style scoped lang='scss'>
	.commentHeader{
			background-color: #f6f6f6;
			padding: 10px;

		}

		.comment{
			padding: 10px;

			textarea{
				width: 95%;
				border-color: #e1e1e1;
				border-left: none;
				border-right: none;
				padding: 10px;
				font-size: 18px;
				height: 200px;
			}

			 button{
				background-color: #5bc0de;
				color: #fff;
				border: 0;
				padding: 6px;
				border-radius: 4px;
				font-size: 16px;
				cursor: pointer;
				margin-top: 20px;
			}
		}
</style>