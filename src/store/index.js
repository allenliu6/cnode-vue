import Vuex from 'vuex'
import mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'
import Vue from 'vue'

Vue.use(Vuex)
const state = {
	topicList: [],//列表数组
	currentPage: 0,
	currentTab: '',
	article: {},//文章、评论内容
	author: {
		name: '',
		avatar: '',
		score: ''
	},//article data

	user: {},//user data
	/*
	avatar_url:
	create_at:"2014-08-29T15:42:20.010Z"
	githubUsername:
	loginname:
	recent_replies:Array[4]
	recent_topics:Array[15]
	score:
	 */

	loginUser:{},
	// {登录用户
	// 	id:'',
	// 	name:'',
	// 	avatar:'',
	// 	score:'',
	// }, login data
	token:'',
	messages:{},
	hint:{
		show:true,
		status:'loading',
		info:''
	}
}


const store = new Vuex.Store({
	state,
	getters,
	mutations,
	actions,
	strict:true,
})

export default store