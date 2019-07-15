import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import authorityRouter from './model/authority'
import activityRouter from './model/activity'
import commodityRouter from './model/commodity'
import evaluationRouter from './model/evaluation'
import merchantRouter from './model/merchant'
import orderRouter from './model/order'

/**
  * 注意:子菜单只在路由子菜单时出现。长度> = 1
  * 详情见:https://panjiachen.github.io/vue-element-admin-site/guide/essentials/route -and-nav.html
  *
  * hidden:true         如果设置为true，项目将不会显示在侧栏中(默认为false)
  * alwaysShow: true    如果设置为true，将始终显示根菜单
  *                     如果不总是设置show，当项目有多个子路由时，
  *                     它将成为嵌套模式，否则不显示根菜单
  *redirect:            如果设置noRedirect，则在面包屑中不会重定向
  * name:'router-name'  这个名称由(必须设置!!)
  * meta: {
      roles:['admin'，'editor']     控制页面角色(可以设置多个角色)
      title: 'title'                侧边栏和面包屑中显示的名称(推荐集)
      icon:'svg-name'               图标显示在侧边栏中
      noCache: true                 如果设置为true，页面将不会被缓存(默认为false)
      affix:true                    如果设置为true，则标记将附加在标记视图中
      breadcrumb:false，            则该项将隐藏在breadcrumb中(默认为true)
      activeMenu: '/example/list'   如果设置了路径，侧边栏将突出显示您设置的路径
}
 */

/**
* constantRoutes
* 没有权限要求的基本页
* 所有角色都可以访问
*/
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/dashboard/index'),
        name: 'index',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/documentation',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/documentation/index'),
        name: 'Documentation',
        meta: { title: '文档', icon: 'documentation' }
      }
    ]
  },
  {
    path: '/guide',
    component: Layout,
    redirect: '/guide/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/guide/index'),
        name: 'Guide',
        meta: { title: 'Guide', icon: 'guide', noCache: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * 需要根据用户角色动态加载的路由
 */
export const asyncRoutes = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    hidden: true,
    name: 'Permission',
    meta: {
      title: 'Permission',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'Page Permission',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'Directive Permission'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: 'Role Permission',
          roles: ['admin']
        }
      }
    ]
  },

  {
    path: '/icon',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/icons/index'),
        name: 'Icons',
        meta: { title: '图标', icon: 'icon', noCache: true }
      }
    ]
  },
  commodityRouter,
  orderRouter,
  activityRouter,
  authorityRouter,
  evaluationRouter,
  merchantRouter,
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
