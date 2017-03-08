<template>
<!-- 显示回复错误信息 -->
<div class="main">
	<div class="main-left" >
		<hint v-if='hint.show' :hint='hint'></hint>

		<div class="include" v-else>
			<div class="panel">
				<div class="artHeader addPadding">
					<h2>
						<span class="topicSign shine" v-if="article.top">置顶</span>
						<span class="topicSign shine" v-else-if="article.good">精华</span>
						{{article.title}}
					</h2>
					<div class='info'>
						<span>发布于{{article.create_at | timeToNow}}之前</span>
						<!-- <span>作者{{article.author.loginname}}</span> -->
		 				<span>浏览{{article.visit_count}}</span>
						<span>来自{{article.tab | transTab}}</span>
					</div>
				</div>
				<div class="markdown-body addPadding" v-html='article.content'></div>
			</div>

			<div class="cut">
				
			</div>

			<div class="panel">
				<div class="commentHeader">
					{{article.reply_count}}条评论
				</div>
				<div class="addLine" v-for='(reply, index) in article.replies'>
					<div class="replyHeader">
						<div class="headerLeft">
							<router-link :to='{name:"user", params:{ user:reply.author.loginname}}'>
								<img :src="reply.author.avatar_url" alt="">
							</router-link>
							<span>{{reply.author.loginname}}</span>
							<span class="blueColor">{{index+1}}楼</span>
							<span class="blueColor">{{reply.create_at | timeToNow}}</span>
						</div>
					</div>	
					<div class="addPadding" v-html='reply.content'></div>
				</div>
			</div> 
			<div v-if='loginUser'>
				<div class="cut">
					
				</div>

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
			</div>
		</div>
	</div>
	<div class="main-right">
		<sideBar :author='author'></sideBar>
	</div>
</div>

</template>

<script>
	import sideBar from '../components/sideBar'
	import hint from '../components/hint'

	export default {
		components: {
			sideBar,
			hint
		},
		data(){
			return {
				replyContent:'',
			}
		},
		
		computed: {
			article(){
				return this.$store.getters.getArticle
			},
			author(){
				return this.$store.getters.getAuthor
			},
			loginUser(){
				return this.$store.getters.getLoginUser
			},
			token(){
				return this.$store.getters.getToken
			},
			hint(){
				return this.$store.getters.getHint
			}
		},
		methods: {
			submitReply(){
                this.$store.dispatch('fetch_reply', {token:this.token, content: this.replyContent, id:this.article.id})
                    .catch( (e) => console.log(e))
            }
		},
		created(){
			this.$store.dispatch('hintInit')
			this.$store.dispatch( 'fetch_article', {id: this.$route.params.id} )
				.catch( (e) => console.log(e))
		}
	}
</script>


<style scoped lang = 'scss'>
  @import '../assets/lib/github-markdown.css';
	.cut{
			background-color: #e1e1e1;
			height: 40px;
		}

	.panel{
		overflow: scroll;
		
		.addPadding{
			padding: 0px 30px;
		}
		.addLine{
			border-bottom: 1px solid #f0f0f0;
		}
		.blueColor{
			color: #08c;
		}
		
		.topicSign{
			border-radius: 5px;
			padding: 3px;
			text-align: center;
			width: 30px;
			height: 15px;
			font-size: 10px;
			margin-right: 4px;
		}
		.shine{
			color: #fff;
			background-color: #80bd01;
		}

		.info {
		  color: #838383;
		  font-size: 12px;
		  span {
		    &:before {
		      content: '•';
		    }
		    
		  }
		}

		.commentHeader{
			background-color: #f6f6f6;
			padding: 10px;

		}
		.replyHeader{
			img{
				width: 30px;
				height: 30px;
			}
			.headerLeft{
				font-size: 12px;
				padding: 10px 5px;
			}
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

	}

</style>

