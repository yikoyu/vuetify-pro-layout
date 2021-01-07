import Vue from 'vue'

export declare class VuetifyProLayoutComponent extends Vue {
  static install (vue: typeof Vue): void
}

export interface ISettings {
  dark: boolean
  mixed: boolean
  system: boolean
  rtl: boolean
  layout: string
  contentWidth: string
  multiTab: boolean
  primary: string
  canInstall: boolean
  updateAvailable: boolean
}

export interface ILogo {
  dark: any
  light: any
  default: any
}