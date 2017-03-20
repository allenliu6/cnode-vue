<!-- question  -->

<template>
    <div class="main">
        <div class="main-left">
            <div class="include addHeight">
                <div class="header">
                    <span class="colorGreen">发布话题</span>
                </div>
                <hint v-if='hint.show' :hint = 'hint'></hint>
                <div class="addPadding">
                    <div class="selectType">
                        选择板块：
                        <select v-model='type'>
                            <option value="share">分享</option>
                            <option value="ask">问答</option>
                            <option value="job">招聘</option>
                        </select>
                    </div>
                    <input class="title" type="text" placeholder="标题字数10字以上" v-model='title'>
                    <div class="comment">
						<textarea v-model='content'></textarea>
						<div class="countInfo">

						</div>
						<button @click='submitReply'>提交</button>
					</div>
                </div>
            </div>
        </div>
        <div class="main-right">
            <sideBar :author='loginUser' :judge='loginUser.name'></sideBar>
        </div>
    </div>
</template>

<script>
    import sideBar from '../components/sideBar'
    import hint from '../components/hint'
    import {transTab} from '../filter'

	export default {
		data(){
			return {
                type:'share',
                title:'',
                content:'',
			}
		},
        computed:{
            loginUser(){
                return this.$store.getters.getLoginUser
            },
            token(){
                return this.$store.getters.getToken
            },
            hint(){
                return this.$store.getters.getHint
            }
        },
        components:{
            sideBar,
            hint
        },
		methods: {
			submitReply(){
                this.$store.dispatch('hintInit')
                this.$store.dispatch('fetch_publish', {accesstoken:this.token, content: this.content, title: this.title, tab: this.type })
                    //是否应该取消回调  统一数据来源  来源于getter
                    .then( json => {
                        if(json.success && typeof json.success === 'boolean'){
                            this.$router.push({ name: 'article', params: {id: json.topic_id}})
                        }
                    })
                    .catch( e => console.log(e) )
            }
		},
        //若未登录或退出，则转回首页
        watch:{
            loginUser(val){
                if((typeof loginUser !== "object" || Object.keys(loginUser).length === 0)){
                    this.$router.push({ name: 'index'})
                }
            }
        }
		
	}
</script>


<style scoped lang = 'scss'>
	.header{
            background-color: #f6f6f6;
            height:30px;
            line-height:30px;
            padding: 5px 10px;
        }

     .addHeight{
        min-height:400px;
    }

    .addPadding{
        padding: 10px;
    }

    .selectType{
        height: 50px;
        line-height: 50px;

        select{
            width: 200px;
            height: 30px;
            font-size:14px;
        }
    }

    .title{
        width: 99%;
        height: 30px;
        font-size: 14px;
        border-radius: 10px;
        border: 1px solid #ccc;
        outline: none;
    }

    .comment{
			padding: 10px;

			textarea{
				width: 95%;
				border: 1px solid #ccc;
                border-radius: 10px;
				padding: 10px;
				font-size: 18px;
                outline: none;
                resize:none;
				height: 200px;
			}

			 button{
				background-color: #5bc0de;
				color: #fff;
				border: 0;
				padding: 6px;
				border-radius: 4px;
				font-size: 16px;
				cursor: pointer;
				margin-top: 20px;
			}
		}
</style>