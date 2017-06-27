<template>
	<div class="main">
		<div class="main-left">
			<div class="navlist">
				<router-link v-for='tab in tabs' :class='tab === tab ? "navSelect" : "navNormal"' :to='{name: "tab", params: {tab}}'>
					{{tab | transTab}}
				</router-link>
			</div>
			
			<hint v-if='hint.show' :hint='hint'></hint>
				
			<div v-else>
				<list :items='items'></list>
			</div>
		</div>

		<div class="main-right">
			<sideBar :author = 'user' :judge = 'user.name'></sideBar>
		</div>
	</div>
</template>

<script>
	import sideBar from '../components/sideBar'
	import hint from '../components/hint'
	import list from '../components/list'
	import {mapGetters} from 'vuex'
	
	export default {
		data(){
			return {
				tabs: ['all', 'good', 'share', 'ask', 'job'],
				timer: false,
				lastPage: 0
			}
		},
		components: {
			sideBar,
			hint,
			list,
		},
		computed: {
			tab(){
				return this.$route.params.tab || 'all'
			},
			currentPage(){
				return this.lastPage = this.$store.getters.getCurrentPage
			},
			...mapGetters({
				items: 'getTopicList',
				user: 'getLoginUser',
				hint: 'getHint',
				currentTab: 'getCurrentTab'
			})
		},
		created(){
			if(this.currentPage <= 0 || this.tab !== this.currentTab){
				this.getListInfo(1)
				document.addEventListener('scroll', this.scrollListen)
			}
		},
		watch:{
			$route(newval, oldval){
				if(newval.params.tab && oldval.params.tab !== newval.params.tab){
					this.getListInfo(1)
				}
			}
		},
		methods:{
			getListInfo(page){
				this.$store.dispatch('hintInit')
				this.$store.dispatch("fetch_list", {tab: this.tab, page} )
						.catch( (e) => console.log(e))
			},
			scrollListen(){
				if(!this.timer){
					this.timer = true
					let top = document.body.scrollTop,
						height = document.body.scrollHeight,
						that = this

					top = top + document.documentElement.clientHeight
					
					if(top > height * 0.8 && this.lastPage === this.currentPage){
						this.lastPage++
						this.$store.dispatch("fetch_list", {tab: this.tab, page: this.currentPage + 1} )
								.then(() => {
									//加强节流   
									setTimeout(function(){
										that.timer = false
										that.scrollListen()
									}, 1000)
								})
								
								.catch( (e) => console.log(e))
						
						return 
					}

					//普通节流
					setTimeout(function(){
						that.timer = false
						that.scrollListen()
					}, 300)
					
				}
			}
		}
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

</style>

