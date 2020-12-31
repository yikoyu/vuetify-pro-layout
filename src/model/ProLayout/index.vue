<template>
  <v-app>
    <default-app-bar :logo="logoRender" :menu="menu" :settings="settings" :collapsed="collapsed" @collapsed-change="collapsedChange">
      <template #right>
        <slot name="app-bar-right"></slot>
      </template>
    </default-app-bar>

    <default-drawer
      v-if="settings.layout !== 'top'"
      :logo="logoRender"
      :menu="menu"
      :settings="settings"
      :collapsed="collapsed"
      @collapsed-change="collapsedChange"
    />

    <default-settings :i18n-render="i18nRender" :title="title" :setting="setting" :settings="settings" @setting-change="settingChange" />

    <v-main>
      <v-container :fluid="settings.contentWidth === 'fluid'" class="pa-0" style="height: 100%;">
        <slot></slot>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'
import { VApp, VMain, VContainer } from 'vuetify/lib'

import DefaultAppBar from '../AppBar/index.vue'
import DefaultDrawer from '../Drawer/index.vue'
import DefaultSettings from '../Settings/index.vue'

import { ISettings, ILogo } from '../../index.interface'

export default defineComponent({
  name: 'ProLayout',
  components: {
    VApp,
    VMain,
    VContainer,
    DefaultAppBar,
    DefaultDrawer,
    DefaultSettings
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    menu: {
      type: Array,
      default: []
    },
    setting: {
      type: Boolean,
      require: true
    },
    collapsed: {
      type: Boolean,
      require: true
    },
    settings: {
      type: Object as PropType<ISettings>,
      require: true
    },
    logoRender: {
      type: Object as PropType<ILogo>,
      require: true
    },
    i18nRender: {
      type: Function,
      default: t => t
    }
  },
  setup(prop, ctx) {
    function settingChange({ type, value }: { type: string; value: string | boolean }) {
      ctx.emit('setting-change', { type, value })
    }

    function collapsedChange(val: boolean) {
      ctx.emit('collapsed-change', val)
    }

    return {
      settingChange,
      collapsedChange
    }
  }
})
</script>
