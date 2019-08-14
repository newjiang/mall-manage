import Layout from '@/layout'

// 商品路由
const commodityRouter = {
  path: '/commodity',
  component: Layout,
  redirect: 'noRedirect',
  name: 'commodity',
  meta: {
    title: '商品管理',
    icon: 'shopping'
  },
  children: [
    {
      path: 'sort',
      name: 'sort',
      component: () => import('@/views/commodity/sort/index'),
      meta: { title: '分类管理', noCache: true }
    },
    {
      path: 'spu',
      name: 'spu',
      component: () => import('@/views/commodity/spu/index'),
      meta: { title: '标准产品单位', noCache: true }
    },
    {
      path: 'sku',
      name: 'sku',
      component: () => import('@/views/charts/line'),
      meta: { title: '库存量单位', noCache: true }
    }
  ]
}

export default commodityRouter
