<template>
  <v-scroll-y-transition>
    <keep-alive :include="include">
      <router-view :key="route.name" />
    </keep-alive>
  </v-scroll-y-transition>
</template>

<script lang="ts">
import { defineComponent, watch, computed, reactive } from '@vue/composition-api'
import router from '@/router'

export default defineComponent({
  name: 'RouteView',
  setup(prop, ctx) {
    const include: string[] = reactive([])

    const route = computed(() => ctx.root.$route)

    watch(
      route,
      newVal => {
        if (!newVal.meta.keepAlive || typeof newVal.meta.component !== 'string') return
        const component = newVal.meta.component
        const isHas = include.includes(component)
        if (!isHas) {
          include.push(component)
        }
      },
      { deep: true, immediate: true }
    )

    return {
      include,
      route
    }
  }
})
</script>
