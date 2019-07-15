import Layout from '@/layout'

// 商品路由
const authorityRouter = {
  path: '/authority',
  component: Layout,
  redirect: 'noRedirect',
  name: 'authority',
  meta: {
    title: '权限管理',
    icon: 'international'
  },
  children: [
    {
      path: 'menu1',
      name: 'menu1',
      component: () => import('@/views/charts/mix-chart'),
      meta: { title: 'menu1', noCache: true }
    },
    {
      path: 'menu2',
      name: 'menu2',
      component: () => import('@/views/charts/keyboard'),
      meta: { title: 'menu2', noCache: true }
    },
    {
      path: 'menu3',
      name: 'menu3',
      component: () => import('@/views/charts/line'),
      meta: { title: 'menu3', noCache: true }
    }
  ]
}

export default authorityRouter
