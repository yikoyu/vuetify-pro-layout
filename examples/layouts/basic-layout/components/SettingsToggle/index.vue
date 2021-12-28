<template>
  <app-tooltip-btn :input-value="setting" icon="$mdiCogOutline" :path="'app.setting'" @click="setting = !setting" />
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import { useApp } from '#/store/hooks/use-app'

import { AppTooltipBtn } from 'vuetify-pro-layout'

export default defineComponent({
  name: 'DefaultSettingsToggle',
  components: { AppTooltipBtn },
  setup() {
    const { setting } = useApp()

    return {
      setting
    }
  }
})
</script>
