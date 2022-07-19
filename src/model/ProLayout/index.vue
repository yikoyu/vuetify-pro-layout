<template>
  <v-app>
    <default-app-bar @collapsed-change="collapsedChange">
      <template #right>
        <slot name="app-bar-right"></slot>
      </template>
    </default-app-bar>

    <default-drawer v-if="settings.layout !== 'top'" @collapsed-change="collapsedChange" />

    <default-settings @setting-change="settingChange" />

    <v-main :style="{ backgroundColor: settings.dark ? undefined : '#F2F4FA' }">
      <v-container :fluid="settings.contentWidth === 'fluid'" class="pa-sm-4 pa-2" style="height: calc(100% - 8px)">
        <slot></slot>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import DefaultAppBar from '../AppBar/index.vue'
import DefaultDrawer from '../Drawer/index.vue'
import DefaultSettings from '../Settings/index.vue'

import { injectContext } from '@/hooks'

export default defineComponent({
  name: 'ProLayout',
  components: {
    DefaultAppBar,
    DefaultDrawer,
    DefaultSettings
  },
  setup(props, { emit }) {
    const { settings } = injectContext()

    function settingChange({ type, value }: { type: string; value: string | boolean }) {
      emit('setting-change', { type, value })
    }

    function collapsedChange(val: boolean) {
      emit('collapsed-change', val)
    }

    return {
      settings,
      settingChange,
      collapsedChange
    }
  }
})
</script>
