<template>
  <v-list-item
    v-show="isShow"
    :style="{ minHeight: '32px !important' }"
    :href="routeMeta.target === '_blank' ? item.path : undefined"
    :rel="routeMeta.target === '_blank' ? 'nofollow' : undefined"
    :target="routeMeta.target"
    :to="routeMeta.target !== '_blank' ? item.path : undefined"
    color="primary"
    v-on="$listeners"
  >
    <v-list-item-icon class="mr-2" v-if="routeMeta.icon">
      <v-icon v-text="routeMeta.icon" />
    </v-list-item-icon>

    <v-list-item-content>
      <v-list-item-title v-text="routeMeta.title" />
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'
import type { RouteConfig } from 'vue-router'
import { useRouteMeta } from '@/hooks'

export default defineComponent({
  name: 'DefaultDrawerListItem',
  props: {
    item: {
      type: Object as PropType<RouteConfig>,
      default: () => ({})
    }
  },
  setup(props) {
    return {
      ...useRouteMeta(props.item)
    }
  }
})
</script>
