import Vue from 'vue'

import { VuetifyProLayout } from './pro-layout'
import { VuetifyDefaultAppBar } from './default-app-bar'
import { VuetifyDefaultDrawer } from './default-drawer'
import { VuetifyPageHeaderWrapper } from './page-header-wrapper'
import { VuetifyDefaultSettings } from './default-settings'
import { VuetifyAppMenu } from './app-menu'
import { VuetifyAppNestMenu } from './app-nest-menu'
import { VuetifyAppSheet } from './app-sheet'
import { VuetifyAppTooltipBtn } from './app-tooltip-btn'

interface DefaultIcons {
  [x: string]: string
}

export function install (vue: typeof Vue, options: any): void

export declare const defaultIcons: DefaultIcons

export class ProLayout extends VuetifyProLayout {}

export class DefaultAppBar extends VuetifyDefaultAppBar {}

export class DefaultDrawer extends VuetifyDefaultDrawer {}

export class PageHeaderWrapper extends VuetifyPageHeaderWrapper {}

export class DefaultSettings extends VuetifyDefaultSettings {}

export class AppMenu extends VuetifyAppMenu {}

export class AppNestMenu extends VuetifyAppNestMenu {}

export class AppSheet extends VuetifyAppSheet {}

export class AppTooltipBtn extends VuetifyAppTooltipBtn {}
