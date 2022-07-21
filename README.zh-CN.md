# Vuetify Pro Layout

易于使用的 `Vuetify` 布局

[![download](http://img.shields.io/npm/dm/vuetify-pro-layout.svg)](https://npmcharts.com/compare/vuetify-pro-layout?minimal=true)
[![version](https://img.shields.io/npm/v/vuetify-pro-layout.svg)](https://www.npmjs.org/package/vuetify-pro-layout)
[![gzip](http://img.badgesize.io/https://unpkg.com/vuetify-pro-layout/lib/vuetify-pro-layout.mjs?compression=gzip&label=gzip)](http://img.badgesize.io/https://unpkg.com/vuetify-pro-layout/lib/vuetify-pro-layout.mjs?compression=gzip&label=gzip)
[![Test](https://github.com/yikoyu/vuetify-pro-layout/actions/workflows/test.yml/badge.svg?branch=master)](https://github.com/yikoyu/vuetify-pro-layout/actions/workflows/test.yml)
![LICENSE](https://img.shields.io/badge/License-MIT-yellow.svg)
[![semantic-release: vue](https://img.shields.io/badge/semantic--release-vue-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)

[English](./README.md) | 中文

## Demo
👉[https://yikoyu.github.io/vuetify-pro-layout/](https://yikoyu.github.io/vuetify-pro-layout/)

## 特色
- 使用 [vuetify](https://github.com/vuetifyjs/vuetify) 组件
- TypeScript 支持
- 支持 i18n
- Vuetify 2.x 和 Vue 2.x 支持

## 安装
### NPM安装
```shell
pnpm add vuetify-pro-tiptap
# 或者
yarn add vuetify-pro-tiptap
# 或者
npm i vuetify-pro-tiptap -S
```

## 全局设置
```TypeScript
import { createVuetifyProLayout, PageHeaderWrapper } from 'vuetify-pro-layout'
import 'vuetify-pro-layout/style.css'

const VuetifyProLayoutPlugin = createVuetifyProLayout({
  lang: 'zhHans',
  // 全局注册组件
  components: {
    PageHeaderWrapper
  }
})

Vue.use(VuetifyProLayoutPlugin)
```

## 国际化

### 设置语言
你可以在安装插件的时候声明
```TypeScript
import { createVuetifyProLayout } from 'vuetify-pro-layout'

const VuetifyProLayoutPlugin = createVuetifyProLayout({
  lang: 'zhHans'
})

Vue.use(VuetifyProLayoutPlugin)
```

或者调用方法动态修改
```TypeScript
import { locale } from 'vuetify-pro-layout'

locale.setLang('en')
```
可用的语言:
- en (默认)
- en-US
- zhHans
- zh-CN

### 加载新语言
当前语言暂未提供时，可以使用 `setMessage` 进行设置
```TypeScript
import { locale } from 'vuetify-pro-layout'

locale.setMessage('zhHant', {
  // 国际化文本
})
locale.setLang('zhHant')
```

### 重写国际化方法
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
        // 你的国际化函数
      }
    }) as ContextInstance

    return {
      context
    }
  }
})
</script>
```

## 用法
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

| 属性      | 描述                 | 类型    | 默认值 |
| --------- | -------------------- | ------- | ------ |
| title     | 标题                 | String  | -      |
| menu      | 菜单                 | Array   | []     |
| setting   | 控制设置抽屉是否显示 | Boolean | 必填   |
| collapsed | 控制菜单收缩         | Boolean | 必填   |
| settings  | 设置抽屉对象         | Object  | 必填   |
| settings@dark          | 是否开启深色模式 | Boolean | 必填 |
| settings@mixed          | 是否开启mixe模式（暂时不可以） | Boolean | 必填 |
| settings@system          | 是否跟随系统 | Boolean | 必填 |
| settings@rtl          | 是否开启RTL模式 | Boolean | 必填 |
| settings@layout          | 菜单模式 | ‘side’ \| ‘top’ | 必填 |
| settings@contentWidth          | 内容模式 | ‘fluid’ \| ‘fixed’ | 必填 |
| settings@multiTab          | 标签模式 | Boolean | 必填 |
| settings@primary          | 主题色 | String | 必填 |
| settings@progress          | 进度条是否加载 | Boolean | 必填 |
| settings@canInstall          | pwa是否可以安装 | Boolean | 必填 |
| settings@updateAvailable          | pwa是否可以更新 | Boolean | 必填 |
| logo | logo | SVG | string | svg or string |
| i18n-render | 本地国际化渲染函数 | Function (key: string) => string \| false | (t) => t |

### ProLayout

| 属性      | 描述                 | 类型    | 默认值 |
| --------- | -------------------- | ------- | ------ |
| showSettingBtn | 显示打开设置面板按钮 | boolean | false |
| app-bar-right | VApp右侧插槽 | v-slot | |
| @setting-change | 设置更新事件 | ({ type, value }: { type: string, value: any }) => void |        |
| @collapsed-change | collapsed更新事件 | (value: boolean) => void |        |

### PageHeaderWrapper

| 属性                   | 描述                | 类型             | 默认值 |
| ---------------------- | ------------------- | ---------------- | ------ |
| content                | 内容区              | String \| v-slot | -      |
| extra-content          | 扩展内容区          | String \| v-slot | -      |
| toolbar                | 底栏                | v-slot           | -      |
| tab-list               | Tabs 导航           | string[] \| object[]         | []     |
| tab-active-key         | 当前 Tab 选中项     | Number           | 0      |
| @tab-change            | Tab 改变事件        | (e: object) => void    | -      |
| @update:tab-active-key | tab-active-key.sync |                  | -      |
