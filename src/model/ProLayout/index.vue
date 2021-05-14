<template>
  <v-app>
    <default-app-bar @collapsed-change="collapsedChange">
      <template #right>
        <slot name="app-bar-right"></slot>
      </template>
    </default-app-bar>

    <default-drawer v-if="settings.layout !== 'top'" @collapsed-change="collapsedChange" />

    <default-settings :i18n-render="i18nRender" :title="title" :setting="setting" :settings="settings" @setting-change="settingChange" />

    <v-main :class="[settings.dark ? '' : 'grey lighten-5']">
      <v-container :fluid="settings.contentWidth === 'fluid'" class="pa-0" style="height: calc(100% - 8px);">
        <slot></slot>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'
import { VApp, VMain, VContainer } from 'vuetify/lib'

import { logoDefault } from 'vuetify-pro-layout/assets/icon'

import DefaultAppBar from '../AppBar/index.vue'
import DefaultDrawer from '../Drawer/index.vue'
import DefaultSettings from '../Settings/index.vue'

import { Settings, Logo } from 'vuetify-pro-layout/index.interface'

import { useProvide } from 'vuetify-pro-layout/hooks'

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
      type: Object as PropType<Settings>,
      require: true
    },
    logoRender: {
      type: Object as PropType<Logo>,
      default: () => {
        return {
          image: logoDefault,
          text: 'vuetify'
        }
      }
    },
    i18nRender: {
      type: Function,
      default: t => t
    }
  },
  setup(prop, ctx) {
    useProvide(prop)
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
