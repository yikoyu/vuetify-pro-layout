/*
 * @Author: yikoyu
 * @Date: 2020-11-30 14:52:24
 * @Last Modified by: yikoyu
 * @Last Modified time: 2021-12-23 15:09:03
 */
import { BasicLayout, RouteView } from '#/layouts'
import { RouteConfig } from 'vue-router'
// import { RouteConfig } from '@/interface'

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
            component: () => import('#/views/dashboard/workplace/index.vue'),
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
                component: () => import('#/views/dashboard/workplace/index.vue'),
                meta: { title: '菜单 1-1-1', keepAlive: true, permission: 'dashboard' }
              }
            ]
          },
          {
            path: '/menu-1/menu-1-2',
            name: 'menu-1-2',
            component: () => import('#/views/dashboard/workplace/index.vue'),
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
            component: () => import('#/views/dashboard/workplace/index.vue'),
            meta: { title: '菜单 2-1', keepAlive: false, permission: 'dashboard' }
          },
          {
            path: '/menu-2/menu-2-2',
            name: 'menu-2-2',
            component: () => import('#/views/dashboard/workplace/index.vue'),
            meta: { title: '菜单 2-2', keepAlive: false, permission: 'dashboard' }
          },
          {
            path: '/menu-2/menu-2-3',
            name: 'menu-2-3',
            component: () => import('#/views/dashboard/workplace/index.vue'),
            meta: { title: '菜单 2-3', keepAlive: false, permission: 'dashboard' }
          },
          {
            path: '/menu-2/menu-2-4',
            name: 'menu-2-4',
            component: () => import('#/views/dashboard/workplace/index.vue'),
            meta: { title: '菜单 2-4', keepAlive: false, permission: 'dashboard' }
          },
          {
            path: '/menu-2/menu-2-5',
            name: 'menu-2-5',
            component: () => import('#/views/dashboard/workplace/index.vue'),
            meta: { title: '菜单 2-5', keepAlive: false, permission: 'dashboard' }
          },
          {
            path: '/menu-2/menu-2-6',
            name: 'menu-2-6',
            component: () => import('#/views/dashboard/workplace/index.vue'),
            meta: { title: '菜单 2-6', keepAlive: false, permission: 'dashboard' }
          },
          {
            path: '/menu-2/menu-2-7',
            name: 'menu-2-7',
            component: () => import('#/views/dashboard/workplace/index.vue'),
            meta: { title: '菜单 2-7', keepAlive: false, permission: 'dashboard' }
          },
          {
            path: '/menu-2/menu-2-8',
            name: 'menu-2-8',
            component: () => import('#/views/dashboard/workplace/index.vue'),
            meta: { title: '菜单 2-8', keepAlive: false, permission: 'dashboard' }
          },
          {
            path: '/menu-2/menu-2-9',
            name: 'menu-2-9',
            component: () => import('#/views/dashboard/workplace/index.vue'),
            meta: { title: '菜单 2-9', keepAlive: false, permission: 'dashboard' }
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
  }
]

/**
 * 基础路由
 * @type { RouteConfig[] }
 */

export const constantRouterMap = [...asyncRouterMap]
