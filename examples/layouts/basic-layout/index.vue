<template>
  <pro-layout
    :title="title"
    :menu="menu"
    :setting="setting"
    :collapsed="collapsed"
    :settings="settings"
    :i18nRender="t => $t(t)"
    @setting-change="settingChange"
    @collapsed-change="collapsedChange"
  >
    <template slot="app-bar-right">
      <default-settings-toggle />

      <v-divider class="mx-2 my-auto" inset vertical style="max-height: 16px;" v-show="!$vuetify.breakpoint.xsOnly" />

      <default-language-menu />
    </template>
    <router-view />
  </pro-layout>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from '@vue/composition-api'

import { RouteConfig } from '@/interface'
import { constantRouterMap } from '@/config/router.config'

import useInstall from '@/hooks/use-install'
import { useApp } from '@/store/hooks'

import { ProLayout } from 'vuetify-pro-layout'
import DefaultSettingsToggle from './components/SettingsToggle/index.vue'
import DefaultLanguageMenu from './components/LanguageMenu/index.vue'

export default defineComponent({
  name: 'BasicLayout',
  components: {
    ProLayout,
    DefaultSettingsToggle,
    DefaultLanguageMenu
  },
  setup(prop, ctx) {
    const { setting, dark, mixed, system, rtl, layout, contentWidth, multiTab, primary, progress, collapsed } = useApp()
    const { title, canInstall, updateAvailable, promptInstaller, refreshContent } = useInstall()
    const menu = computed(() => {
      let menus: RouteConfig[] = []
      const routes = constantRouterMap.find((item: RouteConfig) => item.path === '/')
      menus = (routes && routes.children) || []

      return menus
    })

    const settings = reactive({
      dark: dark,
      mixed: mixed,
      system: system,
      rtl: rtl,
      layout: layout,
      contentWidth: contentWidth,
      multiTab: multiTab,
      primary: primary,
      progress: progress,
      canInstall: canInstall,
      updateAvailable: updateAvailable
    })

    function collapsedChange(val: boolean) {
      collapsed.value = val
    }

    function settingChange({ type, value }: { type: string; value: string | boolean }) {
      if (type === 'layout') layout.value = value as 'side' | 'top'

      if (type === 'rtl') rtl.value = value as boolean

      if (type === 'contentWidth') contentWidth.value = value as 'fluid' | 'fixed'

      if (type === 'multiTab') multiTab.value = value as boolean

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
      collapsedChange,
      settingChange
    }
  }
})
</script>
