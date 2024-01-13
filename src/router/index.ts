import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: 'home'
    },{
      path: '/home',
      name: 'home',
      component: () => import('../views/Home/home.vue')
    },{
      path: '/login',
      name: 'login',
      component: () => import('../views/Login/login.vue')
    }
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
