<template>
  <v-sheet class="overflow-hidden" outlined rounded v-bind="$attrs" v-on="$listeners">
    <slot />
  </v-sheet>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { VSheet } from 'vuetify/lib'

export default defineComponent({
  name: 'AppSheet',
  components: { VSheet }
})
</script>
