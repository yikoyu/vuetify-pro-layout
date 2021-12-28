import type { RouteConfig } from 'vue-router'

export interface Settings {
  dark: boolean
  mixed: boolean
  system: boolean
  rtl: boolean
  progress: boolean
  layout: string
  contentWidth: string
  multiTab: boolean
  primarycolor: string
  canInstall?: boolean
  updateAvailable?: boolean
}

export interface Logo {
  image: any
  text?: string
}

export interface ContextInstance {
  readonly title: string
  readonly logo: Logo
  readonly menu: RouteConfig[]
  readonly collapsed: boolean
  readonly setting: boolean
  readonly settings: Settings
  readonly i18nRender: (t: string) => string
}
