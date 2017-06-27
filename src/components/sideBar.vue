<template>
	<div class="sidebar">
		<div v-if='!judge'>
			<div class="topic">CNode：Node.js专业中文社区</div>
			<div class="content">
				<p>您可以通过accessToken登入</p>
				<button @click='checkToken'>通过token登入</button>
			</div>
		</div>
		
		<div v-else>
			<div>
				<div class="topic">个人信息</div>
				<div class="content">
					<div>
						<router-link :to='{name:"user", params:{ user:author.name}}'>
							<img :src="author.avatar">
						</router-link>
						<router-link :to='{name:"user", params:{ user:author.name}}'>
							{{author.name}}
						</router-link>
					</div>
					<strong>积分：{{author.score}}</strong>
				</div>
			</div>
			<div class="content addMargin" v-if='loginUser.name'>
				<button>
					<router-link :to='{name: "publish"}'>发布话题</router-link>
				</button>
			</div>
		</div>

	</div>

</template>

<script>
	export default{
		props:['author','judge'],
		computed: {
			token(){
				return this.$store.getters.getToken
			},
			loginUser(){
				return this.$store.getters.getLoginUser
			}
		},
		methods:{
			checkToken(){//从cookie中获取未过期token
				const arr = document.cookie.split(';');
				let token = '';
				for(let i of arr){
					i = i.trim()
					if(i.startsWith('token=')){
						token = i.split('=')[1]
					}
				}
				
				this.$store.dispatch('fetch_token', {accesstoken: token})
						.catch( e => console.log(e))
			}
		}
	}

</script>

<style scoped lang='scss'>
	.addMargin{
		margin-top: 20px;
	}
	.sidebar{
		box-shadow: 0 0 5px #ccc;

		.topic{
			background-color: #f6f6f6;
			padding: 10px;
		}

		.content{
			padding: 10px;
			text-align: center;
			background-color: #fff;
			
			p{
				text-align: left;
			}

			button{
				background-color: #5bc0de;
				color: #fff;
				border: 0;
				padding: 6px;
				border-radius: 4px;
				font-size: 16px;
				cursor: pointer;
			}
			img{
				width: 40px;
				height: 40px;
			}
			strong{
				display: block;
				margin-top: 20px;
			}

			button a{
				color: #fff;
			}
		}
		
	}
</style>

