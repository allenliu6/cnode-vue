<template>
<div class="main">
	<div class="main-left">
		<div class="navlist">
			<router-link v-for='tab in tabs' :class='currentTab === tab.ename ? "navSelect" : "navNormal"' :to='{name: "tab", params: {tab: tab.ename, page: 1 }}'>
				{{tab.name}}
			</router-link>
		</div>
		<content>
			<hint v-if='hint.show' :hint='hint'></hint>
			
			<div v-else class="include">
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

				<div class="topic">
					<router-link class="button" :to='{name: "tab", params: {tab: currentTab, page: currentPage-1 } }' v-if='currentPage !== 1'>上一页</router-link>
					<router-link class="button nextPage" :to='{name: "tab", params: {tab: currentTab, page: currentPage+1 } }'>下一页</router-link>
				</div>
			</div>
			
		</content>
	</div>

      <div class="main-right">
        <sideBar :author = 'user'></sideBar>
      </div>
</div>

</template>

<script>
	import sideBar from '../components/sideBar'
	import hint from '../components/hint'
	
	export default {
		data(){
			return {
				tabs: [{
				    name: '全部',
				    ename: 'all',
				  }, {
				    name: '精华',
				    ename: 'good',
				  }, {
				    name: '分享',
				    ename: 'share',
				  }, {
				    name: '问答',
				    ename: 'ask',
				  }, {
				    name: '招聘',
				    ename: 'job',
				  }],
			}
		},
		components: {
			sideBar,
			hint
		},
		computed: {
			items(){
				return this.$store.getters.getTopicList
			},
			currentPage(){
				return parseInt(this.$route.params.page) || 1
			},
			currentTab(){
				return this.$route.params.tab || 'all'
			},
			user(){
				return this.$store.getters.getLoginUser
			},
			hint(){
				return this.$store.getters.getHint
			}
		},
		created(){
			this.changeStatus( this.currentTab, this.currentPage )
		},
		methods:{
			changeStatus( tab, page ){
				document.body.scrollTop = 0;
				this.$store.dispatch('hintInit')
				this.$store.dispatch("fetch_list", {tab, page} )
					.catch( (e) => console.log(e))
			},
		},
		//观察路由变化 随之改变数据
		watch: {
			$route : function(val){
				this.changeStatus(val.params.tab, val.params.page )
			}
		},
	}

</script>

<style scoped lang='scss'>
		.navlist{
			background-color: #f6f6f6;
			height: 20px;
			margin:0;
			padding:8px 0;

			a{
				height: 20px;
				line-height:20px;
				list-style: none;
				float: left;
				margin-left: 30px;
				color: #80bd01;
				cursor: pointer;
				padding: 2px;
				border-radius: 4px;
			}

			.navNormal{
				color: #80bd01;
				&:hover{
					color:#5bc0de;
				}
			}

			.navSelect{
				color: #fff;
				background-color: #80bd01;
			}
		}

		.include{
			
			.topic{
				height: 30px;
				line-height: 30px;
				padding: 10px;
				&:hover{
					background-color: rgb(225, 225, 225);
					.button{
						border-color: rgb(225, 225, 225);
					}
				}

				.button{
					border: solid 1px #fff;
					border-radius: 5px;
					color: #80bd01;
					cursor: pointer;
					height: 22px;
					line-height: 22px;

					&:hover{
						border-color: #fff;
					}
				}

				.nextPage{
					float: right;
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

