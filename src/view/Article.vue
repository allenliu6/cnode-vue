<template>
<!-- 显示回复错误信息 -->
	<div class="main">
		<div class="main-left" >
			<hint v-if='hint.show' :hint='hint'></hint>

			<div v-else class="include">
				<artcontent :article='article'></artcontent>
				<div v-if='token'>
					<div class="cut"></div>
					<comment :id='article.id'></comment>
				</div>
			</div>
		</div>
		
		<div class="main-right">
			<sideBar :person-info = "author" :is-login = "!!author.avatar"></sideBar>
		</div>
	</div>
</template>

<script>
	import sideBar from '../components/sideBar'
	import hint from '../components/hint'
	import artcontent from '../components/content'
	import comment from '../components/comment'
	import {mapGetters} from 'vuex'

	export default {
		components: {
			sideBar,
			hint,
			artcontent,
			comment
		},
		computed: {
			...mapGetters({
				article: 'getArticle',
				author: 'getAuthor',
				token: 'getToken',
				hint: 'getHint'
			})
		},
		created(){
			if(this.$route.params.id !== this.article.id){
				this.$store.dispatch('hintInit')
				this.$store.dispatch( 'fetch_article', {id: this.$route.params.id} )
					.catch( (e) => {throw new Error(e.name + ": " + e.message)})
			}
		}
	}
</script>


<style scoped lang = 'scss'>
  @import '../assets/lib/github-markdown.css';

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

	}

</style>

