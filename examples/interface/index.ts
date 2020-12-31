import { AsyncComponent, Component } from 'vue'

/**
 * 路由接口
 * @export
 * @interface RouteConfig
 */
export interface RouteConfig {
  path: string
  name?: string
  hidden?: boolean
  hideChildrenInMenu?: boolean
  children?: RouteConfig[]
  redirect?: string
  alias?: string | string[]
  component?: Component | AsyncComponent
  meta?: {
    title: string
    icon?: string
    keepAlive?: boolean
    permission?: string
    target?: string
    show?: boolean
    component?: string
  }
}

/**
 * 安装pwa事件接口
 * @see   https://stackoverflow.com/a/51847335
 * @see   https://developer.mozilla.org/en-US/docs/Web/API/BeforeInstallPromptEvent
 */
export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}