export {}

declare module 'vue-router' {
  interface RouteMeta extends Record<string | number | symbol, any> {
    title: string
    hidden?: boolean
    icon?: string
    keepAlive?: boolean
    permission?: string
    target?: string
    show?: boolean
    component?: string
  }
}
