import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/login.vue')
    },
    {
      path: '/',
      redirect: 'home',
      name: 'index',
      component: () => import('../views/menu/index.vue'),
      children:[
        {
          path: '/home',
          name: 'home',
          meta: {
            title: "首页"
          },
          component: () => import('../views/home/home.vue')
        },
      ]
    },
    {
      path: '/system',
      name: 'system',
      meta: {
        title: "多级菜单"
      },
      component: () => import('../views/menu/index.vue'),
      children: [
        {
          path: '/system1',
          name: 'system1',
          meta: {
            title: "父级1"
          },
          component: () => import('../views/system/system1/system1.vue'),
          children:[
            {
              path: '/sys',
              name: 'sys',
              meta: {
                title: "子级1"
              },
              component: () => import('../views/system/system1/sys/sys.vue')
            }
          ]
        },{
          path: '/system2',
          name: 'system2',
          meta: {
            title: "父级2"
          },
          component: () => import('../views/system/system2/system2.vue')
        }
      ]
    },
    {
      path: '/table',
      name: 'table',
      meta: {
        title: "系统管理"
      },
      component: () => import('../views/menu/index.vue'),
      children: [
        {
          path: '/tableUser',
          name: 'tableUser',
          meta: {
            title: "用户管理"
          },
          component: () => import('../views/table/tableUser/tableUser.vue'),
        }
      ]
    },
    {
      path: '/link',
      name: 'link',
      meta: {
        title: "站内链接"
      },
      component: () => import('../views/menu/index.vue'),
      children: [
        {
          path: '/iframe/:src(.*)',
          name: 'iframe',
          meta: [
            { name: '高德地图', url: 'https://www.amap.com/' },
            { name: 'vue3', url: 'https://vue3js.cn/' },
          ],
          component: () => import('../views/iframe/index.vue'),
        },
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
