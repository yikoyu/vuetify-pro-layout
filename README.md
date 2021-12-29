# Vuetify Pro Layout

`Vuetify`的基础布局，开箱即用

## [查看演示](https://yikoyu.github.io/vuetify-pro-layout/)

<p align="center">
  <a href="https://npmcharts.com/compare/vuetify-pro-layout?minimal=true">
    <img src="http://img.shields.io/npm/dm/vuetify-pro-layout.svg">
  </a>
  <a href="https://www.npmjs.org/package/vuetify-pro-layout">
    <img src="https://img.shields.io/npm/v/vuetify-pro-layout.svg">
  </a>
  <a href="http://img.badgesize.io/https://unpkg.com/vuetify-pro-layout/lib/vuetify-pro-layout.es.js?compression=gzip&label=gzip">
    <img src="http://img.badgesize.io/https://unpkg.com/vuetify-pro-layout/lib/vuetify-pro-layout.es.js?compression=gzip&label=gzip">
  </a>
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-yellow.svg">
  </a>
</p>

## 安装
### 安装依赖
- [![Vue-Badge][Vue-Badge]][Vue-Link]
- [![Vuetify-Badge][Vuetify-Badge]][Vuetify-Link]

```shell
# npm
npm i vuetify-pro-layout -S
# yarn
yarn add vuetify-pro-layout
# pnpm
pnpm add vuetify-pro-layout
```

## 使用
```vue
<template>
  <provide-context :value="context">
    <pro-layout @setting-change="settingChange" @collapsed-change="collapsedChange">
      <template #app-bar-right>
        <!-- 这里是右侧内容 -->
      </template>
      <router-view />
    </pro-layout>
  </provide-context>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from '@vue/composition-api'
import { RouteConfig } from 'vue-router'
import { constantRouterMap } from '#/router/config'

import { useApp } from '#/store/hooks/use-app'

import { ProLayout, createContext, lang } from 'vuetify-pro-layout'
import type { ContextInstance } from 'vuetify-pro-layout'

import logoDefault from '#/assets/icon/logo.svg'

const ProvideContext = createContext()

export default defineComponent({
  name: 'BasicLayout',
  components: {
    ProLayout,
    ProvideContext,
    DefaultSettingsToggle
  },
  setup() {
    const { setting, dark, mixed, system, rtl, layout, contentWidth, multiTab, primarycolor, progress, collapsed } = useApp()
    const menu = computed(() => {
      let menus: RouteConfig[] = []
      const routes = constantRouterMap.find((item: RouteConfig) => item.path === '/')
      menus = (routes && routes.children) || []

      return menus
    })

    const settings: ContextInstance['settings'] = reactive({
      dark,
      mixed,
      system,
      rtl,
      layout,
      contentWidth,
      multiTab,
      primarycolor,
      progress,
      canInstall: false, // 判断 PWA 安装
      updateAvailable: false // 判断 PWA 更新
    })

    const context = reactive({
      title: `<span style="font-weight: bold">我是标题</span>`,
      logo: logoDefault,
      menu,
      collapsed,
      setting,
      settings,
      i18nRender: (key: string) => lang?.['zh-CN']?.[key] || key
    }) as ContextInstance

    function collapsedChange(val: boolean) {
      collapsed.value = val
    }

    function settingChange({ type, value }: { type: string; value: unknown }) {
      if (type === 'layout') layout.value = value as 'side' | 'top'
      if (type === 'rtl') rtl.value = value as boolean
      if (type === 'contentWidth') contentWidth.value = value as 'fluid' | 'fixed'
      if (type === 'multiTab') multiTab.value = value as boolean
      if (type === 'primarycolor') primarycolor.value = value as string
      if (type === 'dark') dark.value = value as boolean
      if (type === 'mixed') mixed.value = value as boolean
      if (type === 'system') system.value = value as boolean
      if (type === 'install') {
        // PWA 安装
      }
      if (type === 'refresh') {
        // PWA 更新
      }
      if (type === 'setting') setting.value = value as boolean
    }

    return {
      context,
      collapsedChange,
      settingChange
    }
  }
})
</script>
```

## 国际化

## API
```ts
import { lang } from 'vuetify-pro-layout'

// 将 语言包导入vue-i18n中
const zhCN = lang['zh-CN'] // 中文
const enUS = lang['en-US'] // 英文
```

不使用国际化:
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
      i18nRender: (key: string) => lang?.['zh-CN']?.[key] || key
    }) as ContextInstance

    return {
      context
    }
  }
})
</script>
```

### ProvideContext
```vue
<template>
  <provide-context :value="context">
    <pro-layout></pro-layout>
  </provide-context>
</template>

<script lang="ts">
import { createContext } from 'vuetify-pro-layout'

const ProvideContext = createContext()

export default defineComponent({
  components: {
    ProvideContext,
  }
})
</script>
```

value参数如下：

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
| logo-render | logo | Object | { dark: SVG, light: SVG, default: SVG } |
| logo-render@image | logo | SVG | SVG |
| logo-render@text | logo文本 | SVG | SVG |
| i18n-render | 本地化渲染函数 (this.$t) | Function (key: string) => string \| false | (t) => t |


### ProLayout

| 属性      | 描述                 | 类型    | 默认值 |
| --------- | -------------------- | ------- | ------ |
| app-bar-right | v-app右侧插槽 | v-slot | |
| @setting-change | 设置更新事件 | ({ type, value }: { type: string, value: any }) => void |        |
| @collapsed-change | collapsed更新事件 | (value: boolean) => void |        |

### PageHeaderWrapper

| 属性                   | 描述                | 类型             | 默认值 |
| ---------------------- | ------------------- | ---------------- | ------ |
| content                | 内容区              | String \| v-slot | -      |
| extra-content          | 扩展内容区          | String \| v-slot | -      |
| toolbar                | 底栏                | v-slot           | -      |
| tab-list               | Tabs 导航           | string[]         | []     |
| tab-active-key         | 当前 Tab 选中项     | Number           | 0      |
| @tab-change            | Tab 改变事件        | (key) => void    | -      |
| @update:tab-active-key | tab-active-key.sync |                  | -      |

[Vue-Badge]: https://img.shields.io/badge/-Vue_>=_2.6.14-4FC08D?logo=vue.js&logoColor=white "Vue"
[Vue-Link]: https://cn.vuejs.org/ "Vue-Link"
[Vuetify-Badge]: https://img.shields.io/badge/-Vuetify_%3E=_2.6.0-1867C0?logo=vuetify&logoColor=white "Vuetify"
[Vuetify-Link]: https://vuetifyjs.com/zh-Hans/ "Vuetify-Link"