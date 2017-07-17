<template>
	<div class="sidebar">
			<div v-if='personInfo && personInfo.avatar' class="topic">个人信息</div>
			<div v-else  class="topic">CNode：Node.js专业中文社区</div>
			
			<div v-if='personInfo && personInfo.avatar' class="content">
				<router-link :to='{name:"user", params:{ user:personInfo.name}}'>
					<img :src="personInfo.avatar">
				</router-link>
				<router-link :to='{name:"user", params:{ user:personInfo.name}}'>
					{{personInfo.name}}
				</router-link>
				<strong>积分：{{personInfo.score}}</strong>
			</div>
			<div v-else class="content">
				<p>您可以通过accessToken登入</p>
				<button class="functionBtn" @click='checkToken'>通过token登入</button>
			</div>
			
			<div class="content addMargin" v-if="isLogin">
				<router-link class="functionBtn" :to='{name: "publish"}'>发布话题</router-link>
			</div>
	</div>

</template>

<script>
	export default{
		props:{
			personInfo: Object,
			isLogin: Boolean
		},
		methods:{
			checkToken(){ //从cookie中获取未过期token
				let arr = document.cookie.split(';'),
					accesstoken = '';
				for(let i of arr){
					i = i.trim()
					if(i.startsWith('token=') && i.length === 42){
						accesstoken = i.split('=')[1]
					}
				}
				if(accesstoken.length === 36){
					this.$store.dispatch('fetch_token', {accesstoken})
						.catch( (e) => {throw new Error(e.name + ": " + e.message)})
				}
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

			.functionBtn{
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

