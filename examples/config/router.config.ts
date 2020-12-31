/*
 * @Author: yikoyu
 * @Date: 2020-11-30 14:52:24
 * @Last Modified by: yikoyu
 * @Last Modified time: 2020-12-30 14:29:45
 */
import { BasicLayout, RouteView } from '@/layouts'
import { RouteConfig } from '@/interface'

/**
 * 异步路由
 * 通过addRoutes API加载，目前未加载本地，而是加载远程路由表
 * @type { RouteConfig[] }
 */
export const asyncRouterMap: RouteConfig[] = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '主页' },
    redirect: '/dashboard/workplace',
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/workplace',
        component: RouteView,
        meta: { title: '仪表盘', keepAlive: true, icon: '$mdiScriptTextOutline:$mdiScriptText', permission: 'dashboard' },
        children: [
          {
            path: '/dashboard/workplace',
            name: 'workplace',
            component: () => import('@/views/dashboard/workplace/index.vue'),
            meta: { title: '工作台', keepAlive: true, permission: 'workplace' }
          }
        ]
      },

      {
        path: '/menu-1',
        name: 'menu-1',
        component: RouteView,
        redirect: '',
        meta: { title: '菜单 1', icon: '$mdiScriptTextOutline:$mdiScriptText', permission: 'dashboard' },
        children: [
          {
            path: '/menu-1/menu-1-1',
            name: 'menu-1-1',
            component: RouteView,
            meta: { title: '菜单 1-1', keepAlive: true, permission: 'dashboard' },
            children: [
              {
                path: '/menu-1/menu-1-1/menu-1-1-1',
                name: 'menu-1-1-1',
                component: () => import('@/views/dashboard/workplace/index.vue'),
                meta: { title: '菜单 1-1-1', keepAlive: true, permission: 'dashboard' }
              }
            ]
          },
          {
            path: '/menu-1/menu-1-2',
            name: 'menu-1-2',
            component: () => import('@/views/dashboard/workplace/index.vue'),
            meta: { title: '菜单 1-2', keepAlive: true, permission: 'dashboard' }
          }
        ]
      },
      {
        path: '/menu-2',
        name: 'menu-2',
        component: RouteView,
        redirect: '',
        meta: { title: '菜单 2', icon: '$mdiScriptTextOutline:$mdiScriptText', permission: 'dashboard' },
        children: [
          {
            path: '/menu-2/menu-2-1',
            name: 'menu-2-1',
            component: () => import('@/views/dashboard/workplace/index.vue'),
            meta: { title: '菜单 2-1', keepAlive: false, permission: 'dashboard' }
          }
        ]
      },
      {
        path: 'https://www.baidu.com/',
        name: 'Monitor',
        children: [],
        meta: { title: '百度', icon: '$mdiScriptTextOutline:$mdiScriptText', target: '_blank' }
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { RouteConfig[] }
 */

export const constantRouterMap: RouteConfig[] = [
  ...asyncRouterMap,
  {
    path: '/404',
    component: () => import('@/views/exception/404.vue'),
    meta: { title: '404' }
  }
]
