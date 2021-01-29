<template>
  <default-settings-group :i18nRender="i18nRender" :path="path" :internalValue.sync="internalValue" :items="items" />
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref, watch } from '@vue/composition-api'

import DefaultSettingsGroup from './Group.vue'

import { mdiTabPlus, mdiTab } from '../../../vuetify/icons'

export default defineComponent({
  name: 'DefaultSettingsMultiTab',
  components: { DefaultSettingsGroup },
  props: {
    multiTab: {
      type: Boolean,
      require: true
    },
    i18nRender: {
      type: Function,
      default: t => t
    }
  },
  setup(prop, ctx) {
    const path: Ref<string> = ref('multiTab')

    const items = computed(() => [
      {
        text: 'multi',
        icon: mdiTabPlus
      },
      {
        text: 'uni',
        icon: mdiTab
      }
    ])

    const internalValue = computed({
      get: () => {
        return prop.multiTab ? 'multi' : 'uni'
      },
      set: val => {
        const bool = val === 'multi'

        ctx.emit('setting-change', { type: 'multiTab', value: bool })
      }
    })

    return {
      path,
      items,
      internalValue
    }
  }
})
</script>
