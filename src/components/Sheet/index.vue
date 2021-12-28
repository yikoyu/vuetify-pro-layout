<template>
  <v-sheet v-bind="$attrs" class="overflow-hidden" outlined rounded v-on="$listeners">
    <slot />
  </v-sheet>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'AppSheet'
})
</script>
