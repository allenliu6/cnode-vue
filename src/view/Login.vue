<template>
    <div class="main">
        <div class="main-left">
            <div class="include addHeight">
                <div class="header">
                    主页\<span class="colorGreen">登录</span>
                </div>
        
                <div class="warning" :class='{ colorRed : warning, bcolorGreen : waiting }'>
                    <span v-if='warning'>请输入合法token值</span>
                    <span v-if='waiting'>请等待回到主页</span>
                </div>
                <div class="login">
                        accessToken:<input @keyup.enter = 'checkToken()' @change='tokenLength()' v-model='tokenIn' class="loginText" type="text" placeholder="请输入accessToken">
                       <div><input @click='checkToken()' type="button" value="登入" class="loginBtn"></div> 
                </div>
            </div>
        </div>
        <div class="main-right">
            <sideBar></sideBar>
        </div>
    </div>
</template>

<script>
    import sideBar from '../components/sideBar'
    export default {
        data(){
            return {
                warning:false,
                waiting:false,
                tokenIn:'',
            }
        },
        components: {
            sideBar
        },
        computed:{
            loginMes(){
                return this.$store.getters.getLoginUser
            },
           
        },
        methods:{
            tokenLength(){
                if(this.tokenIn.length !== 36){
                    this.warning = true;
                }
            },
            checkToken(){
                if(this.tokenIn.length !== 36){
                    this.warning = true;
                    return
                }
               this.$store.dispatch('fetch_token', {accesstoken: this.tokenIn})
                .then((bool) => {
                    if (bool && typeof bool ==='boolean') {
                        let date = new Date()
                        date.setDate(date.getDate() + 7)
                        document.cookie = `token=${this.tokenIn};expires=${date};`
                        //`token=${this.tokenIn};expires=${date};secure path domain`
                        this.waiting = true
                        }
                })
            },

        },
        watch:{
            loginMes(val){
                if(val.name){
                    this.$router.push('/')
                }
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
            color: #b94a48;
            height: 50px;
            line-height: 50px;
            text-align: center;
            margin-top: 20px;
        }

        .login{
            margin: 30px auto;
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