<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@vue/composition-api'

// import { useApp } from '@/store/hooks'

export default defineComponent({
  name: 'App',
  setup(prop, ctx) {
    // const { lang } = useApp()

    // onMounted(() => {
    //   lang.value = lang.value
    // })

    return {}
  }
})
</script>
