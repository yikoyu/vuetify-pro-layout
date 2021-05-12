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
import { computed, defineComponent } from '@vue/composition-api'
import { VToolbar, VListItem, VImg } from 'vuetify/lib'

import { useInject } from 'vuetify-pro-layout/hooks'

export default defineComponent({
  name: 'DefaultDrawerListPrepend',
  components: { VToolbar, VListItem, VImg },
  props: {
    miniVariant: {
      type: Boolean,
      require: true
    }
  },
  setup(prop, ctx) {
    const { logo, settings } = useInject()

    const logoRender = computed(() => {
      if (prop.miniVariant) return logo.value?.default
      return settings.value?.dark ? logo.value?.dark : logo.value?.light
    })

    const logoWidth = computed(() => (prop.miniVariant ? 32 : 124))

    return {
      logoRender,
      logoWidth
    }
  }
})
</script>
