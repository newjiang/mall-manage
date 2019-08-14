import Layout from '@/layout'

// 商品路由
const userRouter = {
  path: '/user',
  component: Layout,
  redirect: 'noRedirect',
  name: 'user',
  meta: {
    title: '用户管理',
    icon: 'peoples'
  },
  children: [
    {
      path: 'menu1',
      name: 'user-menu1',
      component: () => import('@/views/charts/mix-chart'),
      meta: { title: 'menu1', noCache: true }
    },
    {
      path: 'menu2',
      name: 'user-menu2',
      component: () => import('@/views/charts/keyboard'),
      meta: { title: 'menu2', noCache: true }
    },
    {
      path: 'menu3',
      name: 'user-menu3',
      component: () => import('@/views/charts/line'),
      meta: { title: 'menu3', noCache: true }
    }
  ]
}

export default userRouter
