import { VuetifyProLayoutComponent, ISettings, ILogo } from './component'

export declare class VuetifyProLayout extends VuetifyProLayoutComponent {
  title?: string

  menu?: any[]

  setting: boolean

  collapsed: boolean

  settings: ISettings

  logoRender?: ILogo

  i18nRender?: (t: string) => string

  'setting-change': ({ type, value }: { type: string; value: string | boolean }) => void

  'collapsed-change': (collapsed: boolean) => void
}