<template>
  <v-toolbar flat dense>
    <v-list-item class="pa-0 mx-n1">
      <router-link :to="{ name: 'index' }">
        <v-img :src="logoRender" alt="logo" class="shrink" :max-height="$vuetify.application.top" :max-width="logoWidth" contain />
      </router-link>
    </v-list-item>
  </v-toolbar>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@vue/composition-api'
import { VToolbar, VListItem, VImg } from 'vuetify/lib'

import { ISettings, ILogo } from '../../../index.interface'

export default defineComponent({
  name: 'DefaultDrawerListPrepend',
  components: { VToolbar, VListItem, VImg },
  props: {
    logo: {
      type: Object as PropType<ILogo>,
      require: true
    },
    miniVariant: {
      type: Boolean,
      require: true
    },
    settings: {
      type: Object as PropType<ISettings>,
      require: true
    }
  },
  setup(prop, ctx) {
    const logoRender = computed(() => {
      if (prop.miniVariant) return prop.logo?.default
      return prop.settings?.dark ? prop.logo?.dark : prop.logo?.light
    })

    const logoWidth = computed(() => (prop.miniVariant ? 32 : 124))

    return {
      logoRender,
      logoWidth
    }
  }
})
</script>
