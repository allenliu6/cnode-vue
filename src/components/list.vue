<template>
			<div class="include">
				<div v-for='item in items' class="topic">
					<router-link :to='{name: "user", params:{user: item.author.loginname}}'>
						<img :src="item.author.avatar_url" class="topicImg">
					</router-link>
					<span class="topicNum">
						<span class="replyCount">{{item.reply_count}}</span>
						<span>/</span>
						<span>{{item.visit_count}}</span>
					</span>

					<span class="topicTime">{{ item.last_reply_at | timeToNow }}</span>

					<div class="topicContent">
						<router-link :to="{name: 'article', params: {id: item.id}}" :title="item.title">
							<span>
								<span class="topicSign shine" v-if='item.top'>
									置顶
								</span>
								<span class="topicSign shine" v-else-if='item.good'>
									精华
								</span>
								<span class="topicSign normal" v-else>
									{{ item.tab | transTab }}
								</span>
							</span>
							{{item.title}}
						</router-link>	
					</div>
				</div>
			</div>	
</template>

<script>
	export default{
		props: {
			items: Array
		}
	}
</script>

<style scoped lang='scss'>
	.include{
			
			.topic{
				height: 30px;
				line-height: 30px;
				padding: 10px;
				&:hover{
					background-color: rgb(225, 225, 225);
				}
				
				.topicImg{
					height: 30px;
					width: 30px;
					cursor: pointer;
					float: left;
				}

				.topicNum{
					width: 80px;
					padding: 0 2px;
					float: left;
					font-size: 10px;
					text-align: center;
				}

				.topicContent{
					width: 100%;
					
					a{
						display: block;
						color: #333;
						text-overflow: ellipsis;
						white-space: nowrap;
						overflow: hidden;
					}
				}

				.topicTime{
					float: right;
					color: #ccc;
					font-size: 12px;
					width: 60px;
					text-align: right;
				}

				.replyCount{
					color: #9e78c0;
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
				.normal{
					background-color: #e5e5e5;
					color: #999;
				}
			}
		}
</style>