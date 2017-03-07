import Vuex from 'vuex'
import mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'
import Vue from 'vue'

Vue.use(Vuex)
const state = {
	topicList: [],
	currentPage: '',
	currentTab: '',
	article: {},
	author: {
		name: '',
		avatar: '',
		score: ''
	},//article data

	user: {},//user data

	loginUser:'',
	// {
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