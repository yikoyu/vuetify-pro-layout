<template>
  <v-app-bar v-bind="{ [`clipped-${settings.rtl ? 'left' : 'right'}`]: true }" id="default-app-bar" app dense :color="settings.dark ? undefined : 'white'">
    <v-app-bar-nav-icon v-if="settings.layout !== 'top'" @click="collapsedChange"></v-app-bar-nav-icon>
    <v-app-bar-nav-icon v-if="settings.layout === 'top'" @click="$router.push({ name: 'index' })">
      <v-avatar tile :size="32">
        <v-img :src="logo" contain :max-height="32" :max-width="32" alt="logo" />
      </v-avatar>
    </v-app-bar-nav-icon>

    <v-progress-linear :active="settings.progress" :indeterminate="settings.progress" absolute top></v-progress-linear>

    <default-navigation-bar v-if="settings.layout === 'top'" />

    <v-spacer></v-spacer>

    <slot name="right"></slot>

    <template #extension v-if="settings.multiTab">
      <default-multi-tab />
    </template>
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent, unref } from 'vue-demi'

import DefaultNavigationBar from './NavigationBar/index.vue'
import DefaultMultiTab from './MultiTab/index.vue'

import { injectContext } from '@/hooks'

export default defineComponent({
  name: 'DefaultAppBar',
  components: {
    DefaultNavigationBar,
    DefaultMultiTab
  },
  setup(props, { emit }) {
    const { logo, settings, collapsed } = injectContext()

    function collapsedChange() {
      emit('collapsed-change', !unref(collapsed))
    }

    return {
      settings,
      logo,
      collapsedChange
    }
  }
})
</script>

<style lang="scss">
#default-app-bar {
  .v-btn--active.v-btn--app:not(:hover):not(:focus) {
    &::before {
      opacity: 0;
    }
  }
  .v-toolbar__extension {
    padding: 0;
  }
}
</style>
