import Layout from '@/layout'

// 商品路由
const evaluationRouter = {
  path: '/evaluation',
  component: Layout,
  redirect: 'noRedirect',
  name: 'evaluation',
  meta: {
    title: '评价管理',
    icon: 'message'
  },
  children: [
    {
      path: 'menu1',
      name: 'evaluation-menu1',
      component: () => import('@/views/charts/mix-chart'),
      meta: { title: 'menu1', noCache: true }
    },
    {
      path: 'menu2',
      name: 'evaluation-menu2',
      component: () => import('@/views/charts/keyboard'),
      meta: { title: 'menu2', noCache: true }
    },
    {
      path: 'menu3',
      name: 'evaluation-menu3',
      component: () => import('@/views/charts/line'),
      meta: { title: 'menu3', noCache: true }
    }
  ]
}

export default evaluationRouter
