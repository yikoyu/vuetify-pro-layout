<template>
  <v-menu
    v-model="visible"
    v-if="isShowFun(routeMeta.hidden)"
    :offset-x="isOffsetX"
    :offset-y="isOffsetY"
    :open-on-hover="isOpenOnHover"
    :transition="transition"
  >
    <template v-slot:activator="{ on }">
      <v-list-item :dense="dense" v-if="isSubMenu" v-on="on">
        <v-list-item-title>{{ routeMeta.title }}</v-list-item-title>
        <v-icon right>{{ mdiMenuRight }}</v-icon>
      </v-list-item>
      <v-btn
        depressed
        :color="dark ? '#272727' : 'white'"
        v-else
        v-on="on"
        :href="routeMeta.target === '_blank' ? item.path : undefined"
        :target="routeMeta.target"
      >
        <v-icon v-if="routeMeta.icon" :dense="dense" left>{{ routeMeta.icon }}</v-icon>
        {{ routeMeta.title }}
      </v-btn>
    </template>

    <v-list v-if="item.children && item.children.length">
      <template v-for="(_item, index) in innerItems">
        <v-list-item-group color="primary" :key="index">
          <app-nest-menu
            v-if="_item.children && _item.children.length"
            :item="_item"
            :is-open-on-hover="false"
            :is-offset-x="true"
            :is-offset-y="false"
            :is-sub-menu="true"
            @click:item="clickItem"
          />
          <v-list-item
            v-else
            :to="_item.meta && _item.meta.target !== '_blank' ? _item.path : undefined"
            :href="_item.meta && _item.meta.target === '_blank' ? _item.path : undefined"
            :rel="_item.meta && _item.meta.target === '_blank' ? 'nofollow' : undefined"
            :target="_item.meta && _item.meta.target"
            :dense="dense"
            @click="clickItem(_item)"
          >
            <v-list-item-title>{{ _item.meta && _item.meta.title }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </template>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from '@vue/composition-api'
import type { RouteConfig } from 'vue-router'

import { mdiMenuRight } from '@/vuetify/icons'

export default defineComponent({
  name: 'AppNestMenu',
  props: {
    item: {
      type: Object as PropType<RouteConfig>,
      required: true
    },
    dense: { type: Boolean, default: true },
    dark: { type: Boolean, default: false },
    isOffsetX: { type: Boolean, default: false },
    isOffsetY: { type: Boolean, default: true },
    isOpenOnHover: { type: Boolean, default: false },
    isSubMenu: { type: Boolean, default: false },
    transition: { type: String, default: 'scale-transition' }
  },
  setup(props, { emit }) {
    const visible = ref<boolean>(false)

    const routeMeta = computed((): Partial<NonNullable<RouteConfig['meta']>> => {
      return props.item.meta || {}
    })

    function isShowFun(bool?: boolean) {
      if (typeof bool !== 'boolean') return true
      return !bool
    }

    function clickItem(item: any) {
      visible.value = false
      emit('click:item', item)
    }

    const innerItems = computed(() => {
      if (!props.item.children) return []
      return props.item.children.filter(k => isShowFun(k.meta?.hidden))
    })

    return {
      routeMeta,
      isShowFun,
      mdiMenuRight,
      innerItems,
      visible,
      clickItem
    }
  }
})
</script>
