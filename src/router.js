import Home from './view/Home'
import Article from './view/Article'
import User from './view/User'
import Login from './view/Login'
import Message from './view/Message'
import Publish from './view/Publish'
import NotFound from './view/404'

let domain = ''

export default [
	{	
		name: 'index',
		path: `${domain}/`,
		component: Home
	},
	{
		name: 'tab',
		path: `${domain}/tab/:tab/`,
		component: Home
	},
	{
		name: 'article',
		path: `${domain}/post/:id`,
		component: Article
	},
	{
		name: 'user',
		path: `${domain}/user/:user`,
		component: User
	},
	{
		name: 'login',
		path: `${domain}/login`,
		component: Login
	},
	{
		name: 'message',
		path: `${domain}message`,
		component: Message
	},
	{
		name: 'publish',
		path: `${domain}create`,
		component: Publish
	},
	{ 	
		name: '404',
		path: `${domain}*`, 
		component: NotFound 
	},
]

