<script setup lang="ts">
import { computed, reactive } from 'vue'
import { RouteConfig } from 'vue-router'
import { constantRouterMap } from '#/router/config'

import { useApp } from '#/store/hooks/use-app'

import { ProLayout, createContext } from 'vuetify-pro-layout'
import type { ContextInstance } from 'vuetify-pro-layout'

import logoDefault from '#/assets/icon/logo.svg'

const ProvideContext = createContext()

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
  canInstall: false,
  updateAvailable: false
})

const context = reactive({
  title: `<span style="font-weight: bold">我是标题</span>`,
  logo: logoDefault,
  menu,
  collapsed,
  setting,
  settings
  // i18nRender: (key: string) => lang?.['zh-CN']?.[key] || key
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
  // if (type === 'install') promptInstaller()
  // if (type === 'refresh') refreshContent()
  if (type === 'setting') setting.value = value as boolean
}
</script>

<template>
  <provide-context :value="context">
    <pro-layout show-setting-btn @setting-change="settingChange" @collapsed-change="collapsedChange">
      <router-view />
    </pro-layout>
  </provide-context>
</template>
