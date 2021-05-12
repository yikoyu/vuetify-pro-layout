<template>
  <v-app-bar id="default-app-bar" app dense :color="settings.dark ? undefined : 'white'" v-bind="{ [`clipped-${settings.rtl ? 'left' : 'right'}`]: true }">
    <v-app-bar-nav-icon v-if="settings.layout !== 'top'" @click="collapsedChange"></v-app-bar-nav-icon>
    <v-app-bar-nav-icon v-if="settings.layout === 'top'">
      <v-img :src="logo.default" :max-height="imgSize" :max-width="imgSize" />
    </v-app-bar-nav-icon>

    <v-progress-linear :active="settings.progress" :indeterminate="settings.progress" absolute top></v-progress-linear>

    <default-navigation-bar v-if="settings.layout === 'top'" :menu="menu" />

    <v-spacer></v-spacer>

    <slot name="right"></slot>

    <template #extension v-if="settings.multiTab">
      <default-multi-tab :i18n-render="i18nRender" />
    </template>
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from '@vue/composition-api'
import { VAppBar, VAppBarNavIcon, VImg, VProgressLinear, VSpacer } from 'vuetify/lib'

import { logoDarkText, logoLightText, logoDefault } from '../../assets/icon'

import DefaultNavigationBar from './NavigationBar/index.vue'
import DefaultMultiTab from './MultiTab/index.vue'

import { ISettings, ILogo } from '../../index.interface'

export default defineComponent({
  name: 'DefaultAppBar',
  components: {
    VAppBar,
    VAppBarNavIcon,
    VImg,
    VProgressLinear,
    VSpacer,
    DefaultNavigationBar,
    DefaultMultiTab
  },
  props: {
    logo: {
      type: Object as PropType<ILogo>,
      default: () => {
        return {
          dark: logoDarkText,
          light: logoLightText,
          default: logoDefault
        }
      }
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
    },
    i18nRender: {
      type: Function,
      default: t => t
    }
  },
  setup(prop, ctx) {
    const imgSize = computed(() => {
      const top = ctx.root.$vuetify.application.top
      return prop.settings.multiTab ? top / 2 - 12 : top - 12
    })

    function collapsedChange() {
      ctx.emit('collapsed-change', !prop.collapsed)
    }

    return {
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
