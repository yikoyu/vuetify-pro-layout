<template>
  <v-menu
    v-bind="$attrs"
    bottom
    close-delay="100"
    content-class="rounded"
    left
    max-height="500"
    offset-y
    open-delay="60"
    open-on-hover
    transition="slide-y-transition"
    v-on="$listeners"
  >
    <template #activator="props">
      <slot name="activator" v-bind="{ ...props }" />
    </template>

    <app-sheet>
      <slot v-if="$slots.default" />

      <default-list v-else :items="items">
        <template v-if="$scopedSlots.item" #item="props">
          <slot name="item" v-bind="{ ...props }" />
        </template>
      </default-list>
    </app-sheet>
  </v-menu>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue-demi'

import AppSheet from '../Sheet/index.vue'
import DefaultList from '@/model/Drawer/List/index.vue'
export default defineComponent({
  name: 'AppMenu',
  components: {
    AppSheet,
    DefaultList
  },
  props: {
    items: {
      type: Array as PropType<any[]>,
      default: () => []
    }
  }
})
</script>
