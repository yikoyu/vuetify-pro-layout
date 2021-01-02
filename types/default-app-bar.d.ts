import { VuetifyProLayoutComponent, ISettings, ILogo } from './component'

export declare class VuetifyDefaultAppBar extends VuetifyProLayoutComponent {
  logo?: ILogo
  
  menu?: any[]

  collapsed: boolean

  settings: ISettings

  'collapsed-change': (collapsed: boolean) => void
}