import Layout from '@/layout'

// 系统路由
const systemRouter = {
  path: '/system',
  component: Layout,
  redirect: 'noRedirect',
  name: 'system',
  meta: {
    title: '系统管理',
    icon: 'table'
  },
  children: [
    {
      path: 'system-code',
      name: '代码管理',
      component: () => import('@/views/system/code/index.vue'),
      meta: {title: '代码管理', noCache: true}
    },
    {
      path: 'system-task',
      name: '任务管理',
      component: () => import('@/views/charts/keyboard'),
      meta: {title: '任务管理', noCache: true}
    }
  ]
}

export default systemRouter
