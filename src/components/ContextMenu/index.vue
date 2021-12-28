<template>
  <v-menu v-bind="$attrs" v-model="visible" :min-width="menuMinWidth" :position-x="x" :position-y="y" v-on="$listeners">
    <v-list dense>
      <v-list-item v-for="(item, index) in items" :key="index" :disabled="item.disabled" @click="item.function">
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, ref, toRefs, watch } from '@vue/composition-api'

export interface IItem {
  title: string
  disabled?: boolean
  function: () => void
}

export default defineComponent({
  name: 'AppContextMenu',
  props: {
    items: {
      type: Array as PropType<IItem[]>,
      default: () => []
    }
  },
  setup(props, { root }) {
    const visible = ref(false)
    const menuMinWidth = ref(105)

    const position = reactive({
      x: 0,
      y: 0
    })

    watch(visible, val => {
      if (val) {
        document.body.addEventListener('click', closeMenu)
      } else {
        document.body.removeEventListener('click', closeMenu)
      }
    })

    function openMenu(e: MouseEvent, el: Element) {
      const offsetLeft = el.getBoundingClientRect().left // container margin left
      const offsetWidth = (el as HTMLElement).offsetWidth // container width
      const maxLeft = offsetWidth - menuMinWidth.value // left boundary
      const left = e.clientX - offsetLeft + 15 // 15: margin right
      if (left > maxLeft) {
        position.x = maxLeft + root.$vuetify.application.left
      } else {
        position.x = left + root.$vuetify.application.left
      }
      position.y = e.clientY
      visible.value = true
    }

    function closeMenu() {
      visible.value = false
    }

    return {
      visible,
      menuMinWidth,
      ...toRefs(position),
      openMenu,
      closeMenu
    }
  }
})
</script>
