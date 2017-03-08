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

    
    本项目是基于已有的[cnode中文社区](https://cnodejs.org "cnode中文社区主页")而写

    --build(配置webpack基本配置、开发环境配置、生产环境配置等)
    --config(配置路径端口值等)
    --node_modules(依赖的模块)
    --index.html(HTML框架)
    --package.json(webpack配置文件)
    --src(主文件目录)
      --APP.vue(单页应用的view和components集合)
      --filter.js(封装过滤函数)
      --router.js(路由配置信息)
      --main.js(主逻辑代码，注册根组件、子组件以及集合单页应用配置信息)
      --assets(外部导入文件)
      --components(公共组件)
        --
      --views(页面视图)
        --
      --store(vuex的全部逻辑)
        --
   
    最后感谢cnode社区的[API](https://cnodejs.org/api "cnode中文社区API页面")
    
