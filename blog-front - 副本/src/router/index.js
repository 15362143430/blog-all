import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/Login.vue'
import register from '../components/Register.vue'
import notfound from '../components/404.vue'
import index from '../components/index.vue'
import home from '../components/home.vue'
import all from '../components/allArticle.vue'
import html from '../components/htmlArticle.vue'
import css from '../components/cssArticle.vue'
import javascript from '../components/javascriptArticle.vue'
import vue from '../components/vueArticle.vue'
import nodejs from '../components/nodejsArticle.vue'
import life from '../components/lifeArticle.vue'
import book from '../components/bookArticle.vue'
import edit from '../components/edit.vue'

Vue.use(Router)

let router = new Router({
  routes: [{
      path: '*',
      component: notfound
    },
    {
      path: '/',
      component: login
    },
    {
      path: '/register',
      component: register
    },
    {
      path: '/index',
      component: index,
      children: [{
          path: '',
          component: home
        },
        {
          path: 'all',
          component: all
        },
        {
          path: 'html',
          component: html
        },
        {
          path: 'css',
          component: css
        },
        {
          path: 'javascript',
          component: javascript
        },
        {
          path: 'vue',
          component: vue
        },
        {
          path: 'nodejs',
          component: nodejs
        },
        {
          path: 'life',
          component: life
        },
        {
          path: 'book',
          component: book
        },
        {
          path: 'edit/:id',
          component: edit
        }
      ]
    }
  ]
})


//路由守卫
// 导航钩子有3个参数：

//   1、to:即将要进入的目标路由对象；

//   2、from:当前导航即将要离开的路由对象；

//   3、next ：调用该方法后，才能进入下一个钩子函数（afterEach）。

// next()直接进to 所指路由
// next(false) 中断当前路由
// next('route') 跳转指定路由
// next('error') 跳转错误路由
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.eleToken ? true : false;
  if (to.path == "/" || to.path == "/register") {
    localStorage.removeItem("eleToken");
    next();
  } else {
    isLogin ? next() : next("/")
  }

})

export default router;
