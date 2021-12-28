<template>
  <v-hover>
    <template #default="{ hover }">
      <v-navigation-drawer
        v-model="drawerCollapsed"
        :class="[miniVariant && hover ? 'elevation-16' : undefined]"
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
import { computed, defineComponent, unref } from '@vue/composition-api'

import { DefaultDrawerList, DefaultDrawerListPrepend } from './List'

import { useContext } from '@/hooks'

export default defineComponent({
  name: 'DefaultDrawer',
  components: {
    DefaultDrawerList,
    DefaultDrawerListPrepend
  },
  setup(props, { root, emit }) {
    const { settings, menu, collapsed } = useContext()

    const miniVariant = computed(() => {
      return root.$vuetify.breakpoint.mobile ? false : !unref(collapsed)
    })

    const drawerCollapsed = computed({
      get: () => (root.$vuetify.breakpoint.mobile ? unref(collapsed) : true),
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
