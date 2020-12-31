<h1 align="center">Vuetify Pro Layout</h1>

## 安装
```shell
# yarn
yarn add vuetify-pro-layout
# npm
npm i vuetify-pro-layout -S
```


```typescript
import { defaultIcons } from 'vuetify-pro-layout'
import 'vuetify-pro-layout/dist/vuetify-pro-layout.min.css' // 引入vuetify-pro-layout的css

export default return new Vuetify({
  icons: {
    iconfont: 'mdiSvg',
    values: {
      // 引入使用的图标
      ...defaultIcons
    }
  }
})
```

## 使用

```vue
<template>
  <pro-layout
    :title="title"
    :menu="menu"
    :setting="setting"
    :collapsed="collapsed"
    :settings="settings"
    :logoRender="logoRender"
    :i18nRender="t => $t(t)"
    @setting-change="settingChange"
    @collapsed-change="collapsedChange"
  >
    <template slot="app-bar-right">
      <default-settings-toggle />

      <default-avatar-dropdown />

      <v-divider class="mx-2 my-auto" inset vertical style="max-height: 16px;" v-show="!$vuetify.breakpoint.xsOnly" />

      <default-language-menu />
    </template>
    <router-view />
  </pro-layout>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api'
import { logoDarkText, logoLightText, logoDefault } from '@/core/icons'

import useInstall from '@/hooks/use-install'
import { useApp, usePermission } from '@/store/hooks'

import ProLayout from '@/pro-layout'
import DefaultSettingsToggle from './components/SettingsToggle/index.vue'
import DefaultLanguageMenu from './components/LanguageMenu/index.vue'
import DefaultAvatarDropdown from './components/AvatarDropdown/index.vue'

export default defineComponent({
  name: 'BasicLayout',
  components: {
    ProLayout,
    DefaultSettingsToggle,
    DefaultLanguageMenu,
    DefaultAvatarDropdown
  },
  setup(prop, ctx) {
    const { setting, dark, mixed, system, rtl, layout, contentWidth, primary, progress, collapsed } = useApp()
    const { title, canInstall, updateAvailable, promptInstaller, refreshContent } = useInstall()
    const { menu } = usePermission()

    const settings = reactive({
      dark: dark,
      mixed: mixed,
      system: system,
      rtl: rtl,
      layout: layout,
      contentWidth: contentWidth,
      primary: primary,
      progress: progress,
      canInstall: canInstall,
      updateAvailable: updateAvailable
    })

    const logoRender = reactive({
      dark: logoDarkText,
      light: logoLightText,
      default: logoDefault
    })

    function collapsedChange(val: boolean) {
      collapsed.value = val
    }

    function settingChange({ type, value }: { type: string; value: string | boolean }) {
      if (type === 'layout') layout.value = value as 'side' | 'top'

      if (type === 'rtl') rtl.value = value as boolean

      if (type === 'contentWidth') contentWidth.value = value as 'fluid' | 'fixed'

      if (type === 'primarycolor') primary.value = value as string

      if (type === 'dark') dark.value = value as boolean

      if (type === 'mixed') mixed.value = value as boolean

      if (type === 'system') system.value = value as boolean

      if (type === 'install') promptInstaller()

      if (type === 'refresh') refreshContent()

      if (type === 'setting') setting.value = value as boolean
    }

    return {
      title,
      setting,
      progress,
      collapsed,
      menu,
      settings,
      logoRender,
      collapsedChange,
      settingChange
    }
  }
})
</script>
```

## API

### ProLayout

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
| settings@primary          | 主题色 | String | 必填 |
| settings@progress          | 进度条是否加载 | Boolean | 必填 |
| settings@canInstall          | pwa是否可以安装 | Boolean | 必填 |
| settings@updateAvailable          | pwa是否可以更新 | Boolean | 必填 |
| logo-render | logo | Object | 必填 |
| logo-render@dark | 深色模式logo | VNode | 必填 |
| logo-render@light | 浅色模式logo | VNode | 必填 |
| logo-render@default | 菜单收缩时的logo | VNode | 必填 |
| i18n-render | 本地化渲染函数 (this.$t) | Function (key: string) => string \| false | (t) => t |
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

