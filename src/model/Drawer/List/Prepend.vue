<template>
  <v-sheet>
    <v-toolbar flat dense>
      <v-list-item class="pa-0 mx-n1 fill-height">
        <v-list-item-avatar tile size="32">
          <v-img :src="logo.image" alt="logo" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="text-h4 text-truncate" v-text="logo.text"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-toolbar>
    <v-divider :class="settings.dark ? undefined : 'grey lighten-5'"></v-divider>
  </v-sheet>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import { useContext } from '@/hooks'

export default defineComponent({
  name: 'DefaultDrawerListPrepend',
  setup() {
    const { settings, logo } = useContext()

    return {
      settings,
      logo
    }
  }
})
</script>
