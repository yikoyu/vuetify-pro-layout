<template>
  <v-hover>
    <template #default="{ hover }">
      <v-navigation-drawer
        v-model="drawerCollapsed"
        :class="[miniVariant && hover ? 'elevation-16' : undefined]"
        :miniVariant="miniVariant"
        app
        :expand-on-hover="miniVariant"
        :color="settings.dark ? '#272727' : undefined"
        :right="settings.rtl"
      >
        <template #prepend>
          <default-drawer-list-prepend />
        </template>

        <default-drawer-list :items="menu" />
      </v-navigation-drawer>
    </template>
  </v-hover>
</template>

<script lang="ts">
import { computed, defineComponent, unref } from 'vue-demi'

import { DefaultDrawerList, DefaultDrawerListPrepend } from './List'

import { injectContext } from '@/hooks'
import { useVuetify } from '@/hooks/core'

export default defineComponent({
  name: 'DefaultDrawer',
  components: {
    DefaultDrawerList,
    DefaultDrawerListPrepend
  },
  setup(props, { emit }) {
    const vuetify = useVuetify()

    const { settings, menu, collapsed } = injectContext()

    const miniVariant = computed(() => {
      return vuetify.breakpoint.mobile ? false : !unref(collapsed)
    })

    const drawerCollapsed = computed({
      get: () => (vuetify.breakpoint.mobile ? unref(collapsed) : true),
      set: (val: boolean) => {
        emit('collapsed-change', val)
      }
    })

    return {
      settings,
      menu,
      miniVariant,
      drawerCollapsed
    }
  }
})
</script>
