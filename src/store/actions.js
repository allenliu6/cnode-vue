//封装fetch读改数据时的状态?    是否必要   
//为pormise添加catch     已搞定
//state未能管理全部状态要包括单个页面的状态   回顾全部页面逻辑代码分类迁移  已搞定
//
//slot分发内容实现多态  sidebar内容不定，无法分发    keep-live不行，需动态渲染  将sidebar状态判断改到父组件中判断 已搞定不过有个bug，sideBar刷新延迟会出现上次view的内容
//动画   检错机制


//http方法失败不会导致fetch方法返回rejected值
//封装post方法  参数为post请求的url即文件类别   请求的具体内容
//返回值为请求内容的json   或拒绝状态的promise
const _post = (url, params) => {
	return fetch(`https://cnodejs.org/api/v1/${url}`, {
		method: 'POST',
		headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		},
		body: JSON.stringify(params),
	})
	.then( res => {
		if (res.status >= 200 && res.status< 300) {
			return res.json();
		}
		return Promise.reject(new Error(res.status));
	})
}

/*
	封装get方法
	参数为请求url
	返回值为请求内容的json   
*/
const _get = query => {
	return fetch(`https://cnodejs.org/api/v1/${query}`)
		.then( response => {
			if(response.status >=200 && response.status <300){
					return response.json()
			}
			return Promise.reject(new Error(response))
		})
}
/*
	get方法获取topics
	自动解构commit  tab种类，page页数
	返回promise  resolved或rejected+error
*/
export const fetch_list  = ( {commit}, {tab, page} ) => {
	return _get(`topics?tab=${ tab }&page=${ page }`)
		.then( json => {
			if (json.success) {
				return commit( 'FETCH_LIST_SUCCESS', {data: json.data, tab, page} );
			}
			return Promise.reject(new Error('get list failure'))
		})
		.catch( error =>{
			commit( 'FETCH_LIST_FAILURE', tab, page)
			return Promise.reject(error)
		})

}


export const fetch_article = ( {dispatch,commit}, {id} ) => {
	return _get(`topic/${id}`)
		.then( json => {
			if (json.success) {
				commit( 'FETCH_ARTICLE_SUCCESS', json.data );
				return dispatch( 'fetch_author', {name:json.data.author.loginname})
			}
			return Promise.reject(new Error('get article failure'))
		})
		.catch( error => {
			commit( 'FETCH_ARTICLE_FAILURE' )
			return Promise.reject(error)
		})
}

export const fetch_author = ( {commit}, {name}) => {
	return _get(`user/${name}`)
		.then( json => {
			if (json.success) {
				return commit( 'FETCH_AUTHOR_SUCCESS', json.data.score )
			}
			return Promise.reject(new Error("get article's author failure"))
		})
		.catch( error => {
			return Promise.reject(error)
		})
}


export const fetch_user = ( {commit}, {user}) => {
	return _get(`user/${user}`)
		.then( json => {
			if (json.success) {
				return commit( 'FETCH_USER_SUCCESS', json.data)
			}
			return Promise.reject(new Error('get user failure'))
		})
		.catch( error => {
			commit( 'FETCH_USER_FAILURE' )
			return Promise.reject(error)
		})
}

export const fetch_loginMes = ({commit}, {name}) => {
	return _get(`user/${name}`)
		.then( json => {
			if (json.success) {
				return commit( 'FETCH_LOGIN_SUCCESS', {score: json.data.score})
			}
			return Promise.reject(new Error("get loginUser's messages failure"))
		})
		.catch( error => {
			commit( 'FETCH_LOGIN_FAILURE' )
			return Promise.reject(error)
		})
}

export const fetch_token = ({commit,dispatch}, {accesstoken}) => {
	return _post('accesstoken', {accesstoken})
		.then( json => {
			if(json.success) {
				//直接进行另一个dispatch，根据hint进行报错
				dispatch( 'fetch_loginMes', {name:json.loginname})
				return commit( 'FETCH_TOKEN_SUCCESS', {data: json, token: accesstoken})
			}
			return Promise.reject(new Error('login failure by token'))
		})
		.catch( error => {
			return Promise.reject(error)
		})
}

export const check_token = ({commit}, bool) =>{
	commit( 'CHECK_TOKEN', bool )
}

/*
	退出操作
	自动解构commit
	无返回值
*/
export const fetch_quit = ({commit}) => {
	commit( 'FETCH_QUIT_SUCCESS')
}

/*
	获取信息
	自动解构commit
	返回错误 或 成功promise
*/
export const fetch_messages = ({commit}, {token}) => {
	return _get(`messages?accesstoken=${token}`)
		.then( json => {
			if (json.success) {
				return commit( 'FETCH_MESSAGE_SUCCESS', {data:json.data})
			}
			return Promise.reject(new Error('get messages failure'))
		})
		.catch( error => {
			commit( 'FETCH_MESSAGE_FAILURE' )
			return Promise.reject(error)
		})
}

export const fetch_reply = ({commit, dispatch},{token, content, id}) => {
	return _post(`topic/${id}/replies`, {content, accesstoken:token})
		.then( json => {
			if (json.success) {
				return dispatch( 'fetch_article', {id})
			}
			return Promise.reject(new Error('reply failure'))
		})
		.catch( error => {
			//commit()   等待article view中建立显示错误信息机制
		})
}

export const fetch_publish = ({commit}, {accesstoken, content, title, tab}) => {
	return _post(`topics`, {accesstoken, title,  tab, content})
		.then( json => {
			if(json.success){
				return Promise.resolve(json)
			}
			return Promise.reject(new Error( 'publish failure' ))
		})
		.catch( error => {
			commit( 'FETCH_PUBLISH_FAILURE' )
			return Promise.reject(error)
		})
}

export const hintInit = ( {commit} ) => {
	commit( 'HINT_INIT' )
}
