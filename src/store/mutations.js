export default {
	FETCH_LIST_SUCCESS( state, {data, tab, page} ){
		state.topicList = data;
		state.currentPage = page;
		state.currentTab = tab;
		state.hint= {
			show:false,
			info: '',
			status: 'loading'
		}
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
		state.hint= {
			show:false,
			info: '',
			status: 'loading'
		}
	},
	FETCH_ARTICLE_FAILURE( state, data ){
		state.hint.status = 'error'
		state.hint.info = '无法获取文章'
	},
	FETCH_AUTHOR_SUCCESS( state, score ){
		state.author = {...state.author, score}
	},
	FETCH_USER_SUCCESS( state, data ){
		state.user = data
	},
	FETCH_TOKEN_SUCCESS( state, {data, token} ){
		state.loginUser = {name: data.loginname, avatar: data.avatar_url, id:data.id}
		state.token = token
	},
	FETCH_LOGIN_SUCCESS( state, {score}){
		state.loginUser = {...state.loginUser, score}
	},
	FETCH_QUIT_SUCCESS( state ){
		state.loginUser = ''
	},
	FETCH_MESSAGE_SUCCESS( state, {data} ){
		state.messages = data
	}
}