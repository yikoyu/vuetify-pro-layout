<template>
  <v-navigation-drawer
    app
    :color="settings.dark ? '#272727' : undefined"
    :right="settings.rtl"
    :mini-variant.sync="miniVariant"
    :value="miniCollapsed"
    @input="collapsedChange"
  >
    <template #prepend>
      <default-drawer-list-prepend :logo="logo" :settings="settings" :miniVariant="miniVariant" />
    </template>

    <default-drawer-list :items="menu" />
  </v-navigation-drawer>
</template>

<script lang="ts">
import { ref, computed, defineComponent, ComputedRef, Ref, PropType } from '@vue/composition-api'
import { VNavigationDrawer } from 'vuetify/lib'

import { DefaultDrawerList, DefaultDrawerListPrepend } from './List'

import { ISettings } from '../../index.interface'

export default defineComponent({
  name: 'DefaultDrawer',
  components: {
    VNavigationDrawer,
    DefaultDrawerList,
    DefaultDrawerListPrepend
  },
  props: {
    logo: {
      type: Object,
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
    const miniVariant = computed({
      get: () => (ctx.root.$vuetify.breakpoint.mobile ? false : !prop.collapsed),
      set: (val: boolean) => {
        ctx.emit('collapsed-change', !val)
      }
    })

    const miniCollapsed = computed(() => {
      return ctx.root.$vuetify.breakpoint.mobile ? prop.collapsed : true
    })

    function collapsedChange(val) {
      ctx.emit('collapsed-change', val)
    }

    return {
      miniVariant,
      miniCollapsed,
      collapsedChange
    }
  }
})
</script>
