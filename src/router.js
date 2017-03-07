import Home from './view/Home'
import Article from './view/Article'
import User from './view/User'
import Login from './view/Login'
import Message from './view/Message'
import Publish from './view/Publish'

export default [
	{	
		name: 'index',
		path: '/',
		component: Home
	},
	{
		name: 'tab',
		path: '/tab/:tab/page/:page',
		component: Home
	},
	{
		name: 'article',
		path: '/post/:id',
		component: Article
	},
	{
		name: 'user',
		path: '/user/:user',
		component: User
	},
	{
		name: 'login',
		path: '/login',
		component: Login
	},
	{
		name: 'message',
		path: '/message',
		component: Message
	},
	{
		name: 'publish',
		path: '/create',
		component: Publish
	}
]