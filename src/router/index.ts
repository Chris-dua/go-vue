import {createRouter, createWebHistory, type RouteMeta} from 'vue-router'
import {useStore} from "@/stores";
import {Message} from "@arco-design/web-vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'web',
      component: () => import('../views/web/web.vue'),
      children:[
        {
          path:"",
          name:"index",
          component: () => import('../views/web/index.vue'),
        }
      ]
    },
    {
      path:"/login",
      name:"login",
      component: () => import('../views/login/index.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/index.vue'),
      meta:{
        title: '首页',
        isLogin: true,
      },

      children:[
        {
          path:"",
          name:"home",
          meta:{
            title: 'home',
          },
          component: () => import('../views/admin/home/index.vue'),
        },
        {
          path: "user_center",
          name: "user_center",
          meta:{
            title: '个人中心',
          },
          children:[
            {
              path: "user_info",
              name: "user_info",
              meta:{
                title: '我的信息',
              },
              component: () => import('../views/admin/user_center/user_info.vue'),
            }
          ]
        },
        {
          path: "article",
          name: "article",
          meta:{
            title: '文章管理',
            isAdmin: true,
            isTourist: true,
          },
          children: [
            {
              path: "article_list",
              name: "article_list",
              meta:{
                title: '文章列表',
              },

              component: () => import('../views/admin/article/article_list.vue'),
            },
            {
              path: "image_list",
              name: "image_list",
              meta:{
                title: '图片列表',
              },

              component: () => import('../views/admin/article/image_list.vue'),
            }
          ]
        },
        {
          path: "users",
          name: "users",
          meta:{
            title: '用户管理',
            isAdmin: true,
            isTourist: true,
          },
          children: [
            {
              path: "user_list",
              name: "user_list",
              meta:{
                title: '用户列表',
              },
              component: () => import('../views/admin/users/user_list.vue'),
            }
          ]
        },
        {
          path: "chat_group",
          name: "chat_group",
          meta:{
            title: '群聊管理',
            isAdmin: true,
            isTourist: false,
          },
          children: [
            {
              path: "chat_list",
              name: "chat_list",
              meta:{
                title: '聊天记录',
              },
              component: () => import('../views/admin/chat_group/chat_list.vue'),
            }
          ]
        },
        {
          path: "system",
          name: "system",
          meta:{
            title: '系统管理',
            isAdmin: true,
            isTourist: false,
          },
          children: [
            {
              path: "menu_list",
              name: "menu_list",
              meta:{
                title: '菜单列表',
              },
              component: () => import('../views/admin/system/menu_list.vue'),
            },
            {
              path: "log_list",
              name: "log_list",
              meta:{
                title: '系统日志',
              },
              component: () => import('../views/admin/system/log_list.vue'),
            },
            {
              path: "system",
              name: "system_system",
              meta:{
                title: '系统配置',
              },
              redirect:"/admin/system/system/site",
              component: () => import('../views/admin/system/system.vue'),
              children: [
                {
                  path: "site",
                  name: "site_config",
                  meta: {
                    title: "网站设置"
                  },
                  component: () => import('../views/admin/system/config/site_config.vue'),
                },
                {
                  path: "email",
                  name: "email_config",
                  meta: {
                    title: "邮箱设置"
                  },
                  component: () => import('../views/admin/system/config/email_config.vue'),
                },
                {
                  path: "qiniu",
                  name: "qiniu_config",
                  meta: {
                    title: "七牛设置"
                  },
                  component: () => import('../views/admin/system/config/qiniu_config.vue'),
                },
                {
                  path: "qq",
                  name: "qq_config",
                  meta: {
                    title: "QQ设置"
                  },
                  component: () => import('../views/admin/system/config/qq_config.vue'),
                },
                {
                  path: "jwt",
                  name: "jwt_config",
                  meta: {
                    title: "jwt设置"
                  },
                  component: () => import('../views/admin/system/config/jwt_config.vue'),
                }
              ]
            },

          ]
        },
      ]
    }
  ]
})

export default router

router.beforeEach((to, from, next) => {
  const store = useStore();
  const meta = to.meta
  if(meta.isLogin && !store.isLogin){
    Message.warning("需要登陆")
    router.push({name: from.name as string})
    return
  }

  if(store.userInfo.role === 2 && (meta.isAdmin ||  meta.isTourist)){
    Message.warning("权限不足")
    router.push({name: from.name as string})
    return
  }

  if(store.isTourist && meta.isTourist === false){
    Message.warning("权限不足")
    router.push({name: from.name as string})
    return
  }
  next()
})
