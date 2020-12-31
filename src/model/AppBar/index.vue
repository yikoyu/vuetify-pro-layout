<template>
  <v-app-bar
    id="default-app-bar"
    :elevation="1"
    app
    dense
    :color="settings.dark ? undefined : 'white'"
    v-bind="{ [`clipped-${settings.rtl ? 'left' : 'right'}`]: true }"
  >
    <v-app-bar-nav-icon v-if="settings.layout !== 'top'" @click="collapsedChange"></v-app-bar-nav-icon>
    <v-app-bar-nav-icon v-if="settings.layout === 'top'">
      <v-img :src="logo.default" :max-height="$vuetify.application.top - 16" :max-width="$vuetify.application.top - 16" />
    </v-app-bar-nav-icon>

    <v-progress-linear :active="settings.progress" :indeterminate="settings.progress" absolute top></v-progress-linear>

    <default-navigation-bar v-if="settings.layout === 'top'" :menu="menu" />

    <v-spacer></v-spacer>

    <slot name="right"></slot>
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'
import { VAppBar, VAppBarNavIcon, VImg, VProgressLinear, VSpacer } from 'vuetify/lib'

import DefaultNavigationBar from './NavigationBar/index.vue'

import { ISettings, ILogo } from '../../index.interface'

export default defineComponent({
  name: 'DefaultAppBar',
  components: {
    VAppBar,
    VAppBarNavIcon,
    VImg,
    VProgressLinear,
    VSpacer,
    DefaultNavigationBar
  },
  props: {
    logo: {
      type: Object as PropType<ILogo>,
      require: true
    },
    menu: {
      type: Array,
      default: []
    },
    collapsed: {
      type: Boolean,
      require: true
    },
    settings: {
      type: Object as PropType<ISettings>,
      require: true
    }
  },
  setup(prop, ctx) {
    function collapsedChange() {
      ctx.emit('collapsed-change', !prop.collapsed)
    }

    return {
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
}
</style>
