<template>
  <v-list dense expand nav>
    <template v-for="(item, i) in items">
      <div v-if="item.heading" :key="`heading-${i}`" class="pt-2 pb-1 px-2 text-subtitle-2 font-weight-black" v-text="item.heading" />

      <v-divider v-else-if="item.divider" :key="`divider-${i}`" class="my-2 ml-2 mr-n2" />

      <default-drawer-list-group v-else-if="item.children && item.children.length" :key="`group-${i}`" :item="item" />

      <slot v-else-if="$scopedSlots.item" name="item" :index="i" :item="item" />

      <default-drawer-list-item v-else :key="`item-${i}`" :item="item" />
    </template>
  </v-list>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { VList, VDivider } from 'vuetify/lib'

import { DefaultDrawerListGroup, DefaultDrawerListItem } from './'

export default defineComponent({
  name: 'DefaultDrawerList',
  components: { VList, VDivider, DefaultDrawerListGroup, DefaultDrawerListItem },
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  setup(prop, ctx) {}
})
</script>
