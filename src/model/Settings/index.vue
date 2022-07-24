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

    <v-divider :class="settings.dark ? undefined : 'grey lighten-5'"></v-divider>

    <v-container>
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

      <default-settings-color-picker :i18nRender="i18nRender" :primarycolor="settings.primarycolor" @setting-change="settingChange" />
    </v-container>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { computed, defineComponent, unref } from 'vue-demi'

import {
  DefaultSettingsDrawerPrepend,
  DefaultSettingsTheme,
  DefaultSettingsLayout,
  DefaultSettingsContentWidth,
  DefaultSettingsMultiTab,
  DefaultSettingsRtl,
  DefaultSettingsColorPicker
} from './model'

import { mdiPlusCircle, mdiRefreshCircle } from '@/vuetify/icons'

import { injectContext } from '@/hooks'

export default defineComponent({
  name: 'DefaultSettings',
  components: {
    DefaultSettingsDrawerPrepend,
    DefaultSettingsTheme,
    DefaultSettingsLayout,
    DefaultSettingsContentWidth,
    DefaultSettingsMultiTab,
    DefaultSettingsRtl,
    DefaultSettingsColorPicker
  },
  setup(props, { emit }) {
    const { title, setting, settings, i18nRender } = injectContext()

    const settingValue = computed({
      get: () => unref(setting),
      set: val => {
        emit('setting-change', { type: 'setting', value: val })
      }
    })

    function settingChange({ type, value }: { type: string; value?: unknown }) {
      emit('setting-change', { type, value })
    }

    return {
      title,
      setting,
      settings,
      i18nRender,
      mdiPlusCircle,
      mdiRefreshCircle,

      settingValue,
      settingChange
    }
  }
})
</script>
