import Home from './view/Home'
import Article from './view/Article'
import User from './view/User'
import Login from './view/Login'
import Message from './view/Message'
import Publish from './view/Publish'
import NotFound from './view/404'


export default [
	{	
		name: 'index',
		path: `/`,
		component: Home
	},
	{
		name: 'tab',
		path: `/tab/:tab/`,
		component: Home
	},
	{
		name: 'article',
		path: `/post/:id`,
		component: Article
	},
	{
		name: 'user',
		path: `/user/:user`,
		component: User
	},
	{
		name: 'login',
		path: `/login`,
		component: Login
	},
	{
		name: 'message',
		path: `/message`,
		component: Message
	},
	{
		name: 'publish',
		path: `/create`,
		component: Publish
	},
	{ 	
		name: '404',
		path: `*`, 
		component: NotFound 
	},
]

