<template>
  <div ref="nestMenu" id="nestMenu" class="d-flex overflow-hidden" style="width: 100%;">
    <app-nest-menu v-for="(item, index) in autoMenuItems" :key="index" :menu-items="item" />
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, onMounted, nextTick, PropType } from '@vue/composition-api'
import elementResizeDetectorMaker from 'element-resize-detector'
import { deepCopy } from '../../../utils'

import { AppNestMenu } from '../../../components'

export default defineComponent({
  name: 'DefaultNavigationBar',
  components: { AppNestMenu },
  props: {
    menu: {
      type: Array as PropType<any[]>,
      default: () => []
    }
  },
  setup(prop, ctx) {
    const nestMenu: Ref = ref(null)
    const maxLenDom: Ref<number[]> = ref([])

    onMounted(async () => {
      autoMenuItems.value = await createMenu()
      elementResizeDetectorMaker().listenTo(nestMenu.value, async () => {
        autoMenuItems.value = await createMenu()
      })
    })

    function createMenu() {
      return new Promise(resolve => {
        nextTick(() => {
          const maxWidth: number = nestMenu.value?.clientWidth

          if (!maxLenDom.value.length) {
            const children: number[] = []
            for (const item of nestMenu.value?.childNodes) {
              if ((item.className || '').includes('v-btn')) {
                children.push(item.clientWidth)
              }
            }
            maxLenDom.value = deepCopy(children)
          }

          let i = 0
          for (const len: number = maxLenDom.value.length; i < len; i++) {
            console.log()
            const arr: number[] = maxLenDom.value.slice(0, i + 1)
            const sum: number = arr.reduce((prev: number, curr: number) => prev + curr)

            if (sum > maxWidth) {
              i = i - 1
              break
            }
          }

          const list = prop.menu.filter(item => !item.hidden).slice(0, i)
          const ohList = prop.menu.filter(item => !item.hidden).slice(i, prop.menu.length)
          const ret = [...list, { name: '...', meta: { title: '...' }, children: ohList }]

          if (ohList.length === 0) resolve(deepCopy(list))
          if (ohList.length !== 0) resolve(deepCopy(ret))
        })
      })
    }

    const autoMenuItems: Ref = ref(prop.menu)

    return {
      nestMenu,
      autoMenuItems
    }
  }
})
</script>
