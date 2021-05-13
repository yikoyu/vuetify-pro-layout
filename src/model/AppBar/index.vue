<template>
  <v-app-bar id="default-app-bar" app dense :color="settings.dark ? undefined : 'white'" v-bind="{ [`clipped-${settings.rtl ? 'left' : 'right'}`]: true }">
    <v-app-bar-nav-icon v-if="settings.layout !== 'top'" @click="collapsedChange"></v-app-bar-nav-icon>
    <v-app-bar-nav-icon v-if="settings.layout === 'top'" @click="$router.push({ name: 'index' })">
      <v-avatar tile size="32">
        <v-img :src="logo.image" alt="logo" />
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
import { defineComponent, computed } from '@vue/composition-api'
import { VAppBar, VAppBarNavIcon, VAvatar, VImg, VProgressLinear, VSpacer } from 'vuetify/lib'

import DefaultNavigationBar from './NavigationBar/index.vue'
import DefaultMultiTab from './MultiTab/index.vue'

import { useInject } from 'vuetify-pro-layout/hooks'

export default defineComponent({
  name: 'DefaultAppBar',
  components: {
    VAppBar,
    VAppBarNavIcon,
    VAvatar,
    VImg,
    VProgressLinear,
    VSpacer,
    DefaultNavigationBar,
    DefaultMultiTab
  },
  setup(prop, ctx) {
    const inject = useInject()

    const imgSize = computed(() => {
      const top = ctx.root.$vuetify.application.top
      return inject.settings.value.multiTab ? top / 2 - 12 : top - 12
    })

    function collapsedChange() {
      ctx.emit('collapsed-change', !inject.collapsed.value)
    }

    return {
      ...inject,

      imgSize,
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
