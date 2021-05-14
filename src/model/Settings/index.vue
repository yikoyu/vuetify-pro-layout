<template>
  <v-navigation-drawer
    id="settings-drawer"
    v-model="settingValue"
    :color="settings.dark ? '#272727' : undefined"
    :right="!settings.rtl"
    fixed
    hide-overlay
    temporary
    width="300"
  >
    <default-settings-drawer-prepend :i18nRender="i18nRender" :setting="setting" @setting-change="settingChange" />

    <v-divider />

    <v-container>
      <template>
        <v-btn v-if="settings.canInstall" depressed block color="primary" @click="settingChange({ type: 'install' })">
          <span>{{ i18nRender('install') + ' ' + title }}</span>
          <v-icon right>{{ mdiPlusCircle }}</v-icon>
        </v-btn>

        <v-btn v-if="!settings.canInstall && settings.updateAvailable" depressed block color="primary" @click="settingChange({ type: 'refresh' })">
          <span>{{ i18nRender('refresh') + ' ' + title }}</span>
          <v-icon right>{{ mdiRefreshCircle }}</v-icon>
        </v-btn>

        <div v-if="settings.canInstall || settings.updateAvailable" class="mt-4 mb-3 mx-n3">
          <v-divider />
        </div>
      </template>

      <default-settings-theme
        :i18nRender="i18nRender"
        :dark="settings.dark"
        :mixed="settings.mixed"
        :system="settings.system"
        @setting-change="settingChange"
      />

      <div class="mt-4 mb-3 mx-n3">
        <v-divider />
      </div>

      <default-settings-layout :i18nRender="i18nRender" :layout="settings.layout" @setting-change="settingChange" />

      <div class="mt-4 mb-3 mx-n3">
        <v-divider />
      </div>

      <default-settings-content-width
        :i18nRender="i18nRender"
        :layout="settings.layout"
        :content-width="settings.contentWidth"
        @setting-change="settingChange"
      />

      <div class="mt-4 mb-3 mx-n3">
        <v-divider />
      </div>

      <default-settings-multi-tab :i18nRender="i18nRender" :multi-tab="settings.multiTab" @setting-change="settingChange" />

      <div class="mt-4 mb-3 mx-n3">
        <v-divider />
      </div>

      <default-settings-rtl :i18nRender="i18nRender" :rtl="settings.rtl" @setting-change="settingChange" />

      <div class="mt-4 mb-3 mx-n3">
        <v-divider />
      </div>

      <default-settings-color-picker :i18nRender="i18nRender" :primarycolor="settings.primary" @setting-change="settingChange" />
    </v-container>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@vue/composition-api'
import { VNavigationDrawer, VDivider, VContainer, VBtn, VIcon } from 'vuetify/lib'

import {
  DefaultSettingsDrawerPrepend,
  DefaultSettingsTheme,
  DefaultSettingsLayout,
  DefaultSettingsContentWidth,
  DefaultSettingsMultiTab,
  DefaultSettingsRtl,
  DefaultSettingsColorPicker
} from './model'

import { Settings } from 'vuetify-pro-layout/index.interface'

import { mdiPlusCircle, mdiRefreshCircle } from 'vuetify-pro-layout/vuetify/icons'

export default defineComponent({
  name: 'DefaultSettings',
  components: {
    VNavigationDrawer,
    VDivider,
    VContainer,
    VBtn,
    VIcon,
    DefaultSettingsDrawerPrepend,
    DefaultSettingsTheme,
    DefaultSettingsLayout,
    DefaultSettingsContentWidth,
    DefaultSettingsMultiTab,
    DefaultSettingsRtl,
    DefaultSettingsColorPicker
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    setting: {
      type: Boolean,
      require: true
    },
    settings: {
      type: Object as PropType<Settings>,
      require: true
    },
    i18nRender: {
      type: Function,
      default: t => t
    }
  },
  setup(prop, ctx) {
    const settingValue = computed({
      get: () => prop.setting,
      set: val => {
        ctx.emit('setting-change', { type: 'setting', value: val })
      }
    })

    function settingChange({ type, value }: { type: string; value: string | boolean }) {
      ctx.emit('setting-change', { type, value })
    }

    return {
      mdiPlusCircle,
      mdiRefreshCircle,

      settingValue,
      settingChange
    }
  }
})
</script>
