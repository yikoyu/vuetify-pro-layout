import { VuetifyProLayoutComponent } from './component'

export declare class VuetifyAppContextMenu extends VuetifyProLayoutComponent {
  menuList?: { title: string; disabled: boolean; function: () => void }[]

  openMenu: (e: MouseEvent, el: Element) => void

  closeMenu: () => void
}