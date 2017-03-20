<template>
	<div class="topic">
		<router-link class="button" :to='{name: "tab", params: {tab: tab, page: page-1 } }' v-if='page !== 1'>上一页</router-link>
		<router-link class="button nextPage" :to='{name: "tab", params: {tab: tab, page: page+1 } }'>下一页</router-link>
	</div>
</template>	


<script>
	export default{
		props: ['page', 'tab'],
	}
</script>		


<style scoped lang='scss'>
	.topic{
				background-color: #fff;
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
			}
</style>
				