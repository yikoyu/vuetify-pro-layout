<template>
  <v-hover>
    <template #default="{ hover }">
      <v-navigation-drawer
        v-model="drawerCollapsed"
        :class="[miniVariant && hover ? 'elevation-16' : 'elevation-1']"
        app
        :expand-on-hover="miniVariant"
        :color="settings.dark ? '#272727' : undefined"
        :right="settings.rtl"
      >
        <template #prepend>
          <default-drawer-list-prepend :miniVariant="miniVariant" />
        </template>

        <default-drawer-list :items="menu" />
      </v-navigation-drawer>
    </template>
  </v-hover>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'
import { VNavigationDrawer, VHover } from 'vuetify/lib'

import { DefaultDrawerList, DefaultDrawerListPrepend } from './List'

import { useInject } from 'vuetify-pro-layout/hooks'

export default defineComponent({
  name: 'DefaultDrawer',
  components: {
    VNavigationDrawer,
    VHover,
    DefaultDrawerList,
    DefaultDrawerListPrepend
  },
  setup(prop, ctx) {
    const inject = useInject()

    const miniVariant = computed(() => {
      return ctx.root.$vuetify.breakpoint.mobile ? false : !inject.collapsed.value
    })

    const drawerCollapsed = computed({
      get: () => (ctx.root.$vuetify.breakpoint.mobile ? inject.collapsed.value : true),
      set: (val: boolean) => {
        ctx.emit('collapsed-change', val)
      }
    })

    return {
      ...inject,

      miniVariant,
      drawerCollapsed
    }
  }
})
</script>
