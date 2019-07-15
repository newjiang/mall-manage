import Layout from '@/layout'

// 商品路由
const merchantRouter = {
  path: '/merchant',
  component: Layout,
  redirect: 'noRedirect',
  name: 'merchant',
  meta: {
    title: '商家管理',
    icon: 'chart'
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

export default merchantRouter
