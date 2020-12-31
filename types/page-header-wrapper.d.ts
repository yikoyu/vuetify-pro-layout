import { VuetifyProLayoutComponent } from './component'

export declare class VuetifyPageHeaderWrapper extends VuetifyProLayoutComponent {
  content?: string

  extraContent?: string

  tabList?: string[]

  tabActiveKey?: number

  'tab-change': (index: number) => void
}