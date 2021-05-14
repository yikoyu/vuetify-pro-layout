<template>
  <v-toolbar elevation="1" dense>
    <v-list-item class="pa-0 mx-n1 fill-height" :ripple="false" link @click="$router.push({ name: 'index' })">
      <v-list-item-avatar tile size="32">
        <v-img :src="logo.image" alt="logo" />
      </v-list-item-avatar>
      <v-list-item-content v-if="!settings.miniVariant">
        <v-list-item-title class="text-h4 text-truncate" v-text="logo.text"></v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-toolbar>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { VToolbar, VListItem, VListItemAvatar, VListItemContent, VListItemTitle, VImg } from 'vuetify/lib'

import { useInject } from 'vuetify-pro-layout/hooks'

export default defineComponent({
  name: 'DefaultDrawerListPrepend',
  components: { VToolbar, VListItem, VListItemAvatar, VListItemContent, VListItemTitle, VImg },
  props: {
    miniVariant: {
      type: Boolean,
      require: true
    }
  },
  setup(prop, ctx) {
    const { logo, settings } = useInject()

    return {
      logo,
      settings
    }
  }
})
</script>
