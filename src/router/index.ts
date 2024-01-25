import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
      path: '/login',
      name: 'login',
      component: () => import('../views/Login/login.vue')
    },{
      path: '/',
      redirect: 'home',
      name: 'index',
      component: () => import('../views/Menu/index.vue'),
      children:[
        {
          path: '/home',
          name: 'home',
          meta: {
            title: "首页"
          },
          component: () => import('../views/Home/home.vue')
        },
      ]
    },
    {
      path: '/system',
      name: 'system',
      meta: {
        title: "多级菜单"
      },
      component: () => import('../views/Menu/index.vue'),
      children: [
        {
          path: '/system1',
          name: 'system1',
          meta: {
            title: "父级1"
          },
          component: () => import('../views/System/system1/system1.vue'),
          children:[
            {
              path: '/sys',
              name: 'sys',
              meta: {
                title: "子级1"
              },
              component: () => import('../views/System/system1/sys/sys.vue')
            }
          ]
        },{
          path: '/system2',
          name: 'system2',
          meta: {
            title: "父级2"
          },
          component: () => import('../views/System/system2/system2.vue')
        }
      ]
    },
  ]
})

//挂载路由导航守卫,控制页面访问权限
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next();
  //获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
