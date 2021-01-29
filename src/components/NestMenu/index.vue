<template>
  <v-menu v-model="visible" v-if="show(menuItems.hidden)" :offset-x="isOffsetX" :offset-y="isOffsetY" :open-on-hover="isOpenOnHover" :transition="transition">
    <template v-slot:activator="{ on }">
      <v-list-item :dense="dense" v-if="isSubMenu" v-on="on">
        <v-list-item-title>{{ menuItems.meta.title }}</v-list-item-title>
        <v-icon right>{{ mdiMenuRight }}</v-icon>
      </v-list-item>
      <v-btn
        depressed
        :color="$vuetify.theme.dark ? '#272727' : 'white'"
        v-else
        v-on="on"
        :href="menuItems.meta.target === '_blank' ? menuItems.path : undefined"
        :target="menuItems.meta.target"
      >
        <v-icon :dense="dense" left>{{ menuItems.meta.icon }}</v-icon>
        {{ menuItems.meta.title }}
      </v-btn>
    </template>

    <v-list v-if="menuItems.children && menuItems.children.length">
      <template v-for="(item, index) in menuItems.children.filter(s => show(s.hidden))">
        <app-nest-menu
          v-if="item.children && item.children.length"
          :key="index"
          :menu-items="item"
          :is-open-on-hover="false"
          :is-offset-x="true"
          :is-offset-y="false"
          :is-sub-menu="true"
          @menu-click="emitClickEvent"
        />
        <v-list-item
          :to="item.meta.target !== '_blank' ? item.path : undefined"
          :href="item.meta.target === '_blank' ? item.path : undefined"
          :rel="item.meta.target === '_blank' ? 'nofollow' : undefined"
          :target="item.meta.target"
          :dense="dense"
          v-else
          :key="index"
          @click="emitClickEvent(item)"
        >
          <v-list-item-title>{{ item.meta.title }}</v-list-item-title>
        </v-list-item>
      </template>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, computed, PropType } from '@vue/composition-api'
import { VMenu, VList, VListItem, VListItemTitle, VIcon, VBtn } from 'vuetify/lib'

import { mdiMenuRight } from '../../vuetify/icons'

export default defineComponent({
  name: 'AppNestMenu',
  components: {
    VMenu,
    VList,
    VListItem,
    VListItemTitle,
    VIcon,
    VBtn
  },
  props: {
    menuItems: Object,
    dense: { type: Boolean, default: true },
    isOffsetX: { type: Boolean, default: false },
    isOffsetY: { type: Boolean, default: true },
    isOpenOnHover: { type: Boolean, default: false },
    isSubMenu: { type: Boolean, default: false },
    transition: { type: String, default: 'scale-transition' }
  },
  setup(prop, ctx) {
    const visible: Ref<boolean> = ref(false)

    function emitClickEvent(item) {
      visible.value = false
      ctx.emit('menu-click', item)
    }

    function show(v: undefined | boolean) {
      if (typeof v !== 'boolean') return true
      return !v
    }

    return {
      mdiMenuRight,
      visible,
      emitClickEvent,

      show
    }
  }
})
</script>
