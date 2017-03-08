export default {
	FETCH_LIST_SUCCESS( state, {data, tab, page} ){
		state.topicList = data;
		state.currentPage = page;
		state.currentTab = tab;
		state.hint.show = false
		//console.log(data, tab, page)
	},
	FETCH_LIST_FAILURE(state, tab, page){
		state.hint.status = 'error'
		state.hint.info = '无法获取文章列表'
		state.currentPage = page;
		state.currentTab = tab;
	},

	FETCH_ARTICLE_SUCCESS( state, data ){
		state.article = data;
		state.author = {name: data.author.loginname, avatar: data.author.avatar_url}
		state.hint.show = false
	},
	FETCH_ARTICLE_FAILURE( state ){
		state.hint.status = 'error'
		state.hint.info = '无法获取文章'
	},

	FETCH_AUTHOR_SUCCESS( state, score ){
		state.author = {...state.author, score}
	},

	FETCH_USER_SUCCESS( state, data ){
		state.user = data
		state.hint.show = false
	},
	FETCH_USER_FAILURE( state ){
		state.hint= {
			show:true,
			info: '获取用户信息失败',
			status: 'error'
		}
	},

	FETCH_TOKEN_SUCCESS( state, {data, token} ){
		state.loginUser = {name: data.loginname, avatar: data.avatar_url, id:data.id}
		state.token = token
	},
	CHECK_TOKEN( state, bool ){
		state.hint = {
			show: !bool,
			info: '请输入合法有效token',
			status: 'error'
		}
	},

	FETCH_LOGIN_SUCCESS( state, {score}){
		state.loginUser = {...state.loginUser, score}
		state.hint.show = false
	},
	FETCH_LOGIN_FAILURE( state ){
		state.hint = {
			show:true,
			info: '获取用户信息失败',
			status: 'error'
		}
	},

	FETCH_QUIT_SUCCESS( state ){
		state.loginUser = {}
	},

	FETCH_MESSAGE_SUCCESS( state, {data} ){
		state.messages = data
		state.hint.show = false
	},
	FETCH_MESSAGE_FAILURE( state ){
		state.hint = {
			status:'error',
			info: '获取消息失败',
			show: true
		}
	},

	FETCH_PUBLISH_FAILURE( state ){
		state.hint = {
			status:'error',
			info: '发布失败',
			show: true
		}
	},

	HINT_INIT( state ){
		state.hint = {
			status:'loading',
			info: '',
			show: true
		}
	}
}