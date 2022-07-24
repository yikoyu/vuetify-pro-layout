# Vuetify Pro Layout

easy use `Vuetify` layout

[![download](http://img.shields.io/npm/dm/vuetify-pro-layout.svg)](https://npmcharts.com/compare/vuetify-pro-layout?minimal=true)
[![version](https://img.shields.io/npm/v/vuetify-pro-layout.svg)](https://www.npmjs.org/package/vuetify-pro-layout)
[![gzip](http://img.badgesize.io/https://unpkg.com/vuetify-pro-layout/lib/vuetify-pro-layout.mjs?compression=gzip&label=gzip)](http://img.badgesize.io/https://unpkg.com/vuetify-pro-layout/lib/vuetify-pro-layout.mjs?compression=gzip&label=gzip)
[![Test](https://github.com/yikoyu/vuetify-pro-layout/actions/workflows/test.yml/badge.svg?branch=master)](https://github.com/yikoyu/vuetify-pro-layout/actions/workflows/test.yml)
![LICENSE](https://img.shields.io/badge/License-MIT-yellow.svg)
[![semantic-release: vue](https://img.shields.io/badge/semantic--release-vue-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)

English | [中文](./README.zh-CN.md)

## Demo
👉[https://yikoyu.github.io/vuetify-pro-layout/](https://yikoyu.github.io/vuetify-pro-layout/)

## Features
- Use [vuetify](https://github.com/vuetifyjs/vuetify) components
- TypeScript support
- I18n support(`en`, `zhHans`)
- Vuetify 2.x and Vue 2.x support

## Installation
### NPM
```shell
pnpm add vuetify-pro-layout
# or
yarn add vuetify-pro-layout
# or
npm i vuetify-pro-layout -S
```
To make `vuetify-pro-layout` work for Vue 2 (<2.7.0), you need to have `@vue/composition-api` installed:
```shell
pnpm add @vue/composition-api
```

### Install plugin

<details>
<summary>Vue 2.6.x</summary>

```TypeScript
import Vue from 'vue'
import VCA from '@vue/composition-api'

import Vuetify from 'vuetify/lib'

import { createVuetifyProLayout, PageHeaderWrapper } from 'vuetify-pro-layout'
import 'vuetify-pro-layout/style.css'

import App from './App.vue'

Vue.use(VCA)
Vue.use(Vuetify)

const vuetify = new Vuetify()

const VuetifyProLayoutPlugin = createVuetifyProLayout({
  lang: 'zhHans',
  components: {
    PageHeaderWrapper
  }
})

Vue.use(VuetifyProLayoutPlugin)

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
```

</details>

<details>
<summary>Vue 2.7.x</summary>

```TypeScript
import Vue from 'vue'

import Vuetify from 'vuetify/lib'

import { createVuetifyProLayout, PageHeaderWrapper } from 'vuetify-pro-layout'
import 'vuetify-pro-layout/style.css'

import App from './App.vue'

Vue.use(Vuetify)

const vuetify = new Vuetify()

const VuetifyProLayoutPlugin = createVuetifyProLayout({
  lang: 'zhHans',
  components: {
    PageHeaderWrapper
  }
})

Vue.use(VuetifyProLayoutPlugin)

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
```

</details>

## Global Settings
```TypeScript
import { createVuetifyProLayout, PageHeaderWrapper } from 'vuetify-pro-layout'
import 'vuetify-pro-layout/style.css'

const VuetifyProLayoutPlugin = createVuetifyProLayout({
  lang: 'zhHans',
  // Global components
  components: {
    PageHeaderWrapper
  }
})

Vue.use(VuetifyProLayoutPlugin)
```

## I18n

### Setting language
You can declare when you install the plugin.
```TypeScript
import { createVuetifyProLayout } from 'vuetify-pro-layout'

const VuetifyProLayoutPlugin = createVuetifyProLayout({
  lang: 'zhHans'
})

Vue.use(VuetifyProLayoutPlugin)
```

Or use `setLang` dynamic change
```TypeScript
import { locale } from 'vuetify-pro-layout'

locale.setLang('en')
```
Available languages:
- en (默认)
- en-US
- zhHans
- zh-CN

### Use unavailable language
Loading unavailable language, use `setMessage` for Settings
```TypeScript
import { locale } from 'vuetify-pro-layout'

locale.setMessage('zhHant', {
  // i18n text
})
locale.setLang('zhHant')
```

### Rewrite i18n function
```vue
<template>
  <provide-context :value="context"></provide-context>
</template>

<script lang="ts">
import { createContext, lang } from 'vuetify-pro-layout'

const ProvideContext = createContext()

export default defineComponent({
  components: {
    ProvideContext
  },
  setup() {
    const context = reactive({
      ...
      i18nRender: (key: string) => {
        // your i18n function
      }
    }) as ContextInstance

    return {
      context
    }
  }
})
</script>
```

## Usage
```vue
<script lang="ts">
import { computed, defineComponent, reactive } from '@vue/composition-api'
import type { RouteConfig } from 'vue-router'
import { constantRouterMap } from '#/router/config'

import { ProLayout, createContext } from 'vuetify-pro-layout'
import type { ContextInstance } from 'vuetify-pro-layout'

import logoDefault from '#/assets/icon/logo.svg'

const ProvideContext = createContext()

export default defineComponent({
  name: 'BasicLayout',
  components: {
    ProLayout,
    ProvideContext
  },
  setup() {
    const menu = computed(() => {
      let menus: RouteConfig[] = []
      const routes = constantRouterMap.find((item: RouteConfig) => item.path === '/')
      menus = (routes && routes.children) || []

      return menus
    })

    const settings: ContextInstance['settings'] = reactive({
      dark: false,
      mixed: false,
      system: false,
      rtl: false,
      layout: 'side',
      contentWidth: 'fluid',
      multiTab: false,
      primarycolor: '#1976D2',
      progress: false,
      canInstall: false,
      updateAvailable: false
    })

    const context = reactive({
      title: `<span style="font-weight: bold">Vuetify Pro Layout</span>`,
      logo: logoDefault,
      menu,
      collapsed: false,
      setting: false,
      settings
      // i18nRender: (key: string) => lang?.['zh-CN']?.[key] || key
    }) as ContextInstance

    function collapsedChange(val: boolean) {
      context.collapsed = val
    }

    function settingChange({ type, value }: { type: string; value: unknown }) {
      if (type === 'layout') settings.layout = value as 'side' | 'top'
      if (type === 'rtl') settings.rtl = value as boolean
      if (type === 'contentWidth') settings.contentWidth = value as 'fluid' | 'fixed'
      if (type === 'multiTab') settings.multiTab = value as boolean
      if (type === 'primarycolor') settings.primarycolor = value as string
      if (type === 'dark') settings.dark = value as boolean
      if (type === 'mixed') settings.mixed = value as boolean
      if (type === 'system') settings.system = value as boolean
      // if (type === 'install') promptInstaller()
      // if (type === 'refresh') refreshContent()
      if (type === 'setting') context.setting = value as boolean
    }

    return {
      context,
      collapsedChange,
      settingChange
    }
  }
})
</script>

<template>
  <provide-context :value="context">
    <pro-layout show-setting-btn @setting-change="settingChange" @collapsed-change="collapsedChange">
      <router-view />
    </pro-layout>
  </provide-context>
</template>
```

## Props

### ProvideContext

| Name | Type | Default | Description |
| --------- | -------------------- | ------- | ------ |
| title     | Title                 | String  | -      |
| menu      | Menu                 | Array   | []     |
| setting   | The Setting drawer value | Boolean | Required   |
| collapsed | The Menu value          | Boolean | Required   |
| settings  | Setting drawer object         | Object  | Required   |
| settings@dark          | Enable dark theme | Boolean | Required |
| settings@mixed          | Enable mixed theme (unsupport) | Boolean | Required |
| settings@system          | Follow system theme | Boolean | Required |
| settings@rtl          | Enable RTL mode | Boolean | Required |
| settings@layout          | menu mode | ‘side’ \| ‘top’ | Required |
| settings@contentWidth          | content width mode | ‘fluid’ \| ‘fixed’ | Required |
| settings@multiTab          | Enable multiTab | Boolean | Required |
| settings@primary          | primary color | String | Required |
| settings@progress          | Show progress bar | Boolean | Required |
| settings@canInstall          | Pwa able install | Boolean | Required |
| settings@updateAvailable          | Pwa able update | Boolean | Required |
| logo | logo | SVG | string | svg or string |
| i18n-render | Local i18n render | Function (key: string) => string \| undefined | undefined |


### ProLayout

| Name | Type | Default | Description |
| --------- | -------------------- | ------- | ------ |
| showSettingBtn | Enable setting button | boolean | false |
| app-bar-right | VApp right slot | v-slot | |
| @setting-change | Setting drawer change event  | ({ type, value }: { type: string, value: any }) => void |        |
| @collapsed-change | Menu change event | (value: boolean) => void |        |

### PageHeaderWrapper

| Name | Type | Default | Description |
| ---------------------- | ------------------- | ---------------- | ------ |
| content                | content area              | String \| v-slot | -      |
| extra-content          | extra content area       | String \| v-slot | -      |
| toolbar                | toolbar area                | v-slot           | -      |
| tab-list               | Tabs list           | string[] \| object[]         | []     |
| tab-active-key         | The Tab value     | Number           | 0      |
| @tab-change            | Tab change event        | (e: object) => void    | -      |
| @update:tab-active-key | tab-active-key.sync |                  | -      |
