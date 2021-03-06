import Layout from '@/layout'

// 商品路由
const activityRouter = {
  path: '/activity',
  component: Layout,
  redirect: 'noRedirect',
  name: 'activity',
  meta: {
    title: '活动管理',
    icon: 'chart'
  },
  children: [
    {
      path: 'menu1',
      name: 'activity-menu1',
      component: () => import('@/views/charts/mix-chart'),
      meta: { title: 'menu1', noCache: true }
    },
    {
      path: 'menu2',
      name: 'activity-menu2',
      component: () => import('@/views/charts/keyboard'),
      meta: { title: 'menu2', noCache: true }
    },
    {
      path: 'menu3',
      name: 'activity-menu3',
      component: () => import('@/views/charts/line'),
      meta: { title: 'menu3', noCache: true }
    }
  ]
}

export default activityRouter
