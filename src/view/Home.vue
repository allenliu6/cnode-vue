<template>
<div class="main">
	<div class="main-left">
		<div class="navlist">
			<router-link v-for='tab in tabs' :class='currentTab === tab.ename ? "navSelect" : "navNormal"' :to='{name: "tab", params: {tab: tab.ename, page: 1 }}'>
				{{tab.name}}
			</router-link>
		</div>
		
		<hint v-if='hint.show' :hint='hint'></hint>
			
		<div v-else>
			<list :items='items'></list>
			<pagination :page='currentPage' :tab='currentTab'></pagination>
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
	import pagination from '../components/pagination'
	
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
			hint,
			list,
			pagination
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
			},
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

</style>

