import { VuetifyProLayoutComponent, ISettings, ILogo } from './component'

export declare class VuetifyDefaultSettings extends VuetifyProLayoutComponent {
  title?: string

  setting: boolean

  settings: ISettings

  i18nRender?: (t: string) => string

  'setting-change': ({ type, value }: { type: string; value: string | boolean }) => void
}