<template>
	<div class="panel" >
		<div class="commentHeader">
			添加回复
		</div>
		<div class="comment">
			<textarea v-model='replyContent' @keyup.enter = 'submitReply()'></textarea>
			<div class="countInfo">

			</div>
			<button @click='submitReply()'>提交</button>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				replyContent: '',
			}
		},
		props:['id'],
		computed:{
			token(){
				return this.$store.getters.getToken
			},
		},
		methods: {
			submitReply(){
				if(this.replyContent){
					this.replyContent += `
有点自豪地采用 [cnode-vue](https://github.com/allenliu6/cnode-vue/) (:逃`

					this.$store.dispatch('fetch_reply', {token:this.token, content: this.replyContent, id:this.id})
						.catch( (e) => console.log(e))
					this.replyContent = ''
				}
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