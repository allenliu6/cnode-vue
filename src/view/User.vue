<template>
	<div class="main">
		<div class="main-left">
			<hint v-if='hint.show' :hint='hint'></hint>
			<div class="include" v-else>
				<div class="panel">
					<div class="header">
						主页
					</div>
					<div class="content">
						<div>
							<img :src="author.avatar_url">
							<span>{{author.loginname}}</span>
						</div>
						<div>积分：{{author.score}}</div>
						<div class="github">
							
						</div>
						<div>注册于{{author.create_at | timeToNow}}前</div>
					</div>
				</div>

				<div class="cut">
				</div>

				<div class="panel">
					<div class="header">
						最近创建的话题
					</div>
					<div v-if='author.recent_topics.length'>
						<div v-for='item in author.recent_topics' class="content">
							<div class="topicImg">
								<router-link :to="{name: 'user', params: {user: item.author.loginname}}" :title="item.title">
									<img :src="item.author.avatar_url" >
								</router-link>
							</div>
							<router-link :to="{name: 'article', params: {id: item.id}}" :title="item.title" class='link'>
								{{item.title}}
							</router-link>	
							<span class="topicTime">{{ item.last_reply_at | timeToNow }}</span>
						</div>
					</div>
					
					<div v-else class="content">无话题</div>
				</div>

				<div class="cut">
				</div>

				<div class="panel">
					<div class="header">
						最近参与的话题
					</div>

					<div v-if='author.recent_replies.length' >
						<div v-for='item in author.recent_replies' class="content">
							<div class="topicImg">
								<router-link :to="{name: 'user', params: {user: item.author.loginname}}" :title="item.title">
									<img :src="item.author.avatar_url" >
								</router-link>
							</div>
							<router-link :to="{name: 'article', params: {id: item.id}}" :title="item.title" class='link'>
								{{item.title}}
							</router-link>
							<span class="topicTime">{{ item.last_reply_at | timeToNow }}</span>
						</div>
					</div>
					
					<div v-else class="content">无话题</div>
				</div>
			</div>
				
		</div>
		<div class="main-right">
			<sideBar :author='{"name":author.loginname,"avatar":author.avatar_url,"score":author.score}'></sideBar>
		</div>
	</div>
</template>

<script>
	import sideBar from '../components/sideBar'
	import hint from '../components/hint'

	export default{
		components: {
			sideBar,
			hint,
		},
		computed:{
			author(){
				return this.$store.getters.getUser
			},
			hint(){
                return this.$store.getters.getHint
            }
		},
		methods:{
			getData(user){
				 this.$store.dispatch('fetch_user', {user})
					.catch( e => console.log(e) )
			}
		},
		created(){
			this.$store.dispatch('hintInit')
			this.getData(this.$route.params.user);
		},
		watch: {
			$route : function(val){
				this.getData(val.params.user)
			}
		},
		
	}
</script>

<style scoped lang='scss'>
	.cut{
		height: 40px;
		background-color: #e1e1e1;
	}
	img{
		width: 40px;
		height: 40px;
	}
	.header{
		background-color: #f6f6f6;
		padding: 5px 10px;
	}

	.content{
		padding: 10px;
	}
	.link{	
		display: inline-block;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		color: #333;
		width: 70%;
	}
	.topicTime{
		width: 10%;
	}
	.topicImg{
		width: 10%;
		display: inline-block;
	}

</style>

