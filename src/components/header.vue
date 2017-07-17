<template>
	<header class="tops">
		<div class="logo">
			<img src="./cnode.svg" >
		</div>
		<ul class="list">
			<li>
				<router-link :to='{name: "index"}'>首页</router-link>
			</li>
			<li v-if='user.id'>
				<router-link :to='{name: "message"}'>未读消息</router-link>
			</li>
			<li v-if='!user.id'>
				<router-link :to='{name: "login"}'>登录</router-link>
			</li>
			<li v-else>
				<a @click='quit()'>退出</a>
			</li>
		</ul>
	</header>
</template>

<script> 
	export default{
		computed:{
			user(){
				return this.$store.getters.getLoginUser
			}
		},
		methods:{
			quit(){
				if(this.user.id){
					this.$store.dispatch('fetch_quit')
					this.isLogin()
				}
			},
			autoLogin(){
				let arr = document.cookie.split(';'),
					token = '';
				for(let i of arr){
					i = i.trim()
					if(i.startsWith('token=') && i.length === 42){
						token = i.split('=')[1]
					}
				}
				
				if(token.length === 36){
					this.$store.dispatch('fetch_token', {accesstoken: token})
						.catch( (e) => {throw new Error(e.name + ": " + e.message)})
				}
			},
			isLogin(){
				var path = this.$route.fullPath;
				if(path.startsWith('/create') || path.startsWith('/message')){
					if(!this.user.id){
						this.$router.push({ name: 'index'})
					}
				}
			}
		},
		created(){
			this.autoLogin()
			this.isLogin()
		},
		watch: {
			$route(){
				this.isLogin()
			}
		}
	}
</script>

<style scoped lang='scss'>
	.tops{
		background-color: #444;
		height:50px;
		margin-bottom:30px;
		
		
		.logo{
			width:25%;
			vertical-align:middle;
			margin-left:5%;
			display:inline-block;

			img{
				width: 200px;
				max-height: 40px;
			}
		}


		.list {
			display:inline-block;
			width:65%;
			text-align:right;
			margin-top: 15px;
			font-size: 14px;
			li{
				text-decoration:none;
				display:inline-block;
				width:10%;
				text-align:center;

				a{
					color:#ccc;
					text-decoration: none;
					cursor: pointer;
				}
			}
			
		}
	}
	
	
</style>



