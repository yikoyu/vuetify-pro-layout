<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

// import { useApp } from '@/store/hooks'

export default defineComponent({
  name: 'App',
  setup() {
    // const { lang } = useApp()

    // onMounted(() => {
    //   lang.value = lang.value
    // })

    return {}
  }
})
</script>
