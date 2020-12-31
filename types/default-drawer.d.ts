import { VuetifyProLayoutComponent, ISettings } from './component'

export declare class VuetifyDefaultDrawer extends VuetifyProLayoutComponent {
  logo: object

  menu?: any[]

  collapsed: boolean

  settings: ISettings

  'collapsed-change': (collapsed: boolean) => void
}