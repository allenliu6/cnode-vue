<template>
    <div class="main">
        <div class="main-left">
            <div class="include addHeight">
                <div class="header">
                    主页\<span class="colorGreen">登录</span>
                </div>
                <div class="warning">
                    <hint v-if = 'hint.show' :hint = 'hint'></hint>
                </div>
                <div class="login">
                        accessToken:
                        <input @keyup.enter = 'checkToken()' @change='tokenLength()' v-model='tokenInput' class="loginText" type="text" placeholder="请输入accessToken">
                        <div>
                            <input @click='checkToken()' type="button" value="登入" class="loginBtn">
                        </div> 
                </div>
            </div>
        </div>
        <div class="main-right">
            <sideBar :is-login='!!loginMes.id'></sideBar>
        </div>
    </div>
</template>

<script>
    import sideBar from '../components/sideBar'
    import hint from '../components/hint'

    export default {
        components: {
            sideBar,
            hint
        },
        data(){
            return {
                tokenInput: ''
            }
        },
        computed:{
            hint(){
                return this.$store.getters.getHint
            },
            loginMes(){
                let user = this.$store.getters.getLoginUser
                if(user.id){
                    let date = new Date()
                    date.setDate(date.getDate() + 7)
                    document.cookie = `token=${this.tokenInput};expires=${date};`
                    this.$router.push({name: 'index'})
                }
                return user
            }
        },
        methods:{
            tokenLength(){
                this.$store.dispatch( 'check_token', this.tokenInput.length === 36 )
            },
            checkToken(){
                this.$store.dispatch('hintInit')
                if(this.tokenInput.length !== 36){
                    this.$store.dispatch( 'check_token', false )
                    return 
                }else{
                    this.$store.dispatch( 'check_token', true )
                }
                this.$store.dispatch('fetch_token', {accesstoken: this.tokenInput})
                    .catch( e => {throw new Error(e.name + ": " + e.message)})
            }
        }
    }
</script>

<style scoped lang="scss">
    .addHeight{
        height:300px;
    }
    .colorGreen{
        color: #baf186;
    }
    .bcolorGreen{
        background-color: #baf186;
    }
    .colorRed{
        background-color: #f2dede;
    }
    .include{
        .header{
            background-color: #f6f6f6;
            height:30px;
            line-height:30px;
            padding: 5px 10px;
        }

        .warning{
            height: 50px;
        }

        .login{
            margin: 80px auto;
            height: 50px;
            text-align: center;
            font-size: 18px;

            .loginText{
                height:20px;
                border-radius: 5px;
                padding: 5px;
                width: 200px;
                border: 1px solid #ccc;
                outline: none;
                font:inherit;
                margin-left:20px;
            }

            .loginBtn{
                display: inline-block;
                background-color: #5bc0de;
                border: 0;
                padding: 6px;
                border-radius: 4px;
                color: #fff;
                font-size: 16px;
                margin-top: 30px;
                padding: 6px 15px;
                cursor: pointer;
            }
        }

        
    }
</style>