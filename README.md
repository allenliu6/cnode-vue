# cnodejs

> cnodejs vue版,使用vue+vuex+vue-router+vue-cli开发，webpack模块打包
## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

    
 > 本项目是基于已有的[cnode中文社区](https://cnodejs.org "cnode中文社区主页")而写

    --build(配置webpack基本配置、开发环境配置、生产环境配置等)
    --config(配置路径端口值等)  
    --node_modules(依赖的模块)
    --index.html(HTML框架)
    --package.json(webpack配置文件)
    --src(主文件目录)
    ----APP.vue(单页应用的view和components集合)
    ----filter.js(封装过滤函数)
    ----router.js(路由配置信息)
    ----main.js(主逻辑代码，注册根组件、子组件以及集合单页应用配置信息)
    ----assets(外部导入文件)
    ----components(公共组件)
    -------backTop.vue(回到顶部组件)
    -------footer.vue(脚部组件)
    -------header.vue(头部组件，封装token自动登录功能以及退出功能)
    -------hint.vue(提示消息组件)
    -------sideBar.vue(侧边栏，包含登录以及作者用户信息显示)
    ----views(页面视图)
    -------Article.vue(帖子内容以及评论和评论发布)
    -------Home.vue(帖子列表、分类列表)
    -------404.vue(错误路由提示并跳转首页)
    -------Login.vue(登录)
    -------Message.vue(登录后才有权限查看的页面)
    -------Publish.vue(发布页面)
    -------User.vue(用户页面，包括用户信息和用户发布话题参与话题)
    ----store(vuex的全部逻辑)
    ------actions(触发状态变更的函数，封装状态变更的其他行为)
    ------getters(状态的对外接口)
    ------index(状态初始化，以及状态管理store实例初始化)
    ------mutations(状态变更提交的方法，真正改变状态的函数)

> template和sass写得乱的一比(:逃

    最后感谢cnode社区的[API](https://cnodejs.org/api "cnode中文社区API页面")
    
