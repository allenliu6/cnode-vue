<template>
    <div class="main">
	    <div class="main-left">
            <div class="loading" v-if='loading'>
				<div>数据加载中...</div>
			</div>

			<div class="error" v-if='error'>
				<div>数据错误</div>
			</div>
            <div v-if='post'>
                <div class="include" >
                    <div class="header">
                        新消息
                    </div>
                    <div v-if='messages.hasnot_read_messages.length' class="content">
                        <div v-for='item in messages.hasnot_read_messages'>
                            <router-link :to='{name:"user", params:{user: item.author.loginname}}'>
                                {{item.author.loginname}}
                            </router-link>
                                回复了你的话题
                            <router-link :to='{name:"article", params:{id: item.topic.id}}'>
                                {{item.topic.title}}
                            </router-link>
                        </div>
                    </div>
                   
                    <div class="content" v-else>
                        无新消息
                    </div>
                </div>

                    <div class="cut">
                    </div>

                <div class="include">
                    <div class="header">
                        过往消息
                    </div>
                    <div v-if='messages.has_read_messages.length' class="content">
                         <div v-for='item in messages.has_read_messages'>
                            <router-link :to='{name:"user", params:{user: item.author.loginname}}'>
                                {{item.author.loginname}}
                            </router-link>
                                回复了你的话题
                            <router-link :to='{name:"article", params:{id: item.topic.id}}'>
                                {{item.topic.title}}
                            </router-link>
                        </div>
                    </div>
                    <div class="content" v-else>
                        无过往消息
                    </div>
                </div>
            </div>
	    </div>
        <div class="main-right">
            <sideBar :author='user'></sideBar>
        </div>
    </div>
</template>

<script>
    import sideBar from '../components/sideBar'
    export default {
        components:{
            sideBar
        },
        computed:{
            user(){
				return this.$store.getters.getLoginUser
			},
            token(){
                return this.$store.getters.getToken
            },
            messages(){
                return this.$store.getters.getMessages
            }
        },
        data(){
            return {
                post:'',
                loading:true,
                error:'',
            }
        },
        mounted(){
            const token = document.cookie.split('=')[1]

            this.$store.dispatch('fetch_messages', {token})
                .then( (bool) => {
						if (bool && typeof bool ==='boolean') {
							this.loading = false;
							this.post = true;
						}else{
							this.loading = false;
							this.error = true;
						}
					})
        }
    }
</script>

<style lang="scss">
    .header{
		background-color: #f6f6f6;
		padding: 5px 10px;
	}

	.content{
		padding: 10px;

        a{
            color:#08c;
        }
	}

    .cut{
		height: 40px;
		background-color: #e1e1e1;
	}
</style>