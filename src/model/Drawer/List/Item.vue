<template>
  <v-list-item
    v-if="show"
    class="default-drawer-list-item v-list-item--default"
    :href="item.meta.target === '_blank' ? item.path : undefined"
    :rel="item.meta.target === '_blank' ? 'nofollow' : undefined"
    :target="item.meta.target"
    :to="item.meta.target !== '_blank' ? item.path : undefined"
    color="primary"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <v-list-item-icon v-if="item.meta.icon">
      <v-icon v-text="item.meta.icon" />
    </v-list-item-icon>

    <v-list-item-content>
      <v-list-item-title v-text="item.meta.title" />
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import { VListItem, VListItemIcon, VListItemTitle, VListItemContent, VIcon } from 'vuetify/lib'

export default defineComponent({
  name: 'DefaultDrawerListItem',
  components: { VListItem, VListItemIcon, VListItemTitle, VListItemContent, VIcon },
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  setup(prop, ctx) {
    const show = computed(() => {
      if (typeof prop.item.hidden !== 'boolean') return true
      return !prop.item.hidden
    })

    return {
      show
    }
  }
})
</script>

<style lang="scss">
.v-list-item.v-list-item.v-list-item--default {
  min-height: 32px;
  > .v-list-item__icon {
    margin-bottom: 6px;
    margin-top: 6px;
  }
}
</style>
