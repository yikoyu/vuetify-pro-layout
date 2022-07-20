<template>
  <v-toolbar-items ref="menuRef" class="overflow-hidden" style="width: 100%">
    <app-nest-menu v-for="(item, index) in items" :key="index" :item="item" :dark="settings.dark" />
  </v-toolbar-items>
</template>

<script lang="ts">
import { defineComponent, ref, unref, computed } from '@vue/composition-api'
import clonedeep from 'lodash.clonedeep'
import type { RouteConfig } from 'vue-router'

import { AppNestMenu } from '@/components'

import { injectContext, useResizeObserver } from '@/hooks'

export default defineComponent({
  name: 'DefaultNavigationBar',
  components: { AppNestMenu },
  setup() {
    const { settings, menu } = injectContext()

    const menuRef = ref<Element | null>(null)
    const showCount = ref<number>(0) // 显示数量

    const items = computed((): RouteConfig[] => {
      const cache = clonedeep(unref(menu))
      const count = unref(showCount)

      if (count <= 0) return cache

      const list: RouteConfig[] = cache.filter(item => !item.meta?.hidden).slice(0, count)
      const omitList: RouteConfig[] = cache.filter(item => !item.meta?.hidden).slice(count, cache.length)
      const retList: RouteConfig[] = [...list, { name: '...', meta: { title: '...' }, children: omitList } as RouteConfig]

      return omitList.length <= 0 ? list : retList
    })

    /**
     * 监听工具栏变化，计算应显示数量
     */
    useResizeObserver(menuRef, entries => {
      const entry = entries[0]
      if (!entry) return

      const width = entry.contentRect.width
      const len = entry.target.children.length

      showCount.value = 0

      for (let i = 0, itemsWidth = 0; i <= len; i++) {
        const children = entry.target.children.item(i)
        if (children?.clientWidth) {
          const sumWidth = itemsWidth + children.clientWidth
          if (width < sumWidth) break
          itemsWidth = sumWidth
          showCount.value += 1
        }
      }
    })

    return {
      settings,
      menuRef,
      items
    }
  }
})
</script>
