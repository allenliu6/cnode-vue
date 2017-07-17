<template>
	<div>
		<div class="panel">
			<div class="artHeader addPadding">
				<h2>
					<span class="topicSign shine" v-if="article.top">置顶</span>
					<span class="topicSign shine" v-else-if="article.good">精华</span>
					{{article.title}}
				</h2>
				<div class='info'>
					<span>发布于:{{article.create_at | timeToNow}}之前</span>
					<span>作者:
						<router-link :to='{name:"user", params:{ user:article.author.loginname}}'>
							{{article.author.loginname}}
						</router-link>
					</span>
					<span>浏览{{article.visit_count}}</span>
					<span>来自{{article.tab | transTab}}</span>
				</div>
			</div>
			<div class="markdown-body addPadding" v-html='article.content'></div>
		</div>

		<div class="cut"></div>

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
						<router-link :to='{name:"user", params:{ user:reply.author.loginname}}'>
							<span>{{reply.author.loginname}}</span>
						</router-link>
						<span class="blueColor">{{index+1}}楼</span>
						<span class="blueColor">{{reply.create_at | timeToNow}}</span>
					</div>
				</div>	
				<div class="addPadding" v-html='reply.content'></div>
			</div>
		</div> 	
	</div>
</template>

<script>
	export default{
		props:{
			article: Object
		}
	}
</script>

<style scoped lang='scss'>
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
		  margin-bottom: 10px;
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
}
</style>