import { VuetifyProLayoutComponent } from './component'

export declare class VuetifyAppNestMenu extends VuetifyProLayoutComponent {
  menuItems: object

  dense?: boolean
  isOffsetX?: boolean

  isOffsetY?: boolean

  isOpenOnHover?: boolean

  isSubMenu?: boolean

  transition?: string

  'menu-click': (item: any) => void
}