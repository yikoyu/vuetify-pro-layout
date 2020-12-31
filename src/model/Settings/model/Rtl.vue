<template>
  <default-settings-group :i18nRender="i18nRender" :path="path" :internalValue.sync="internalValue" :items="items" />
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref, watch } from '@vue/composition-api'

import DefaultSettingsGroup from './Group.vue'

export default defineComponent({
  name: 'DefaultSettingsRtl',
  components: { DefaultSettingsGroup },
  props: {
    rtl: {
      type: Boolean,
      require: true
    },
    i18nRender: {
      type: Function,
      default: t => t
    }
  },
  setup(prop, ctx) {
    const path: Ref<string> = ref('direction')

    const items = computed(() => [
      {
        text: 'ltr',
        icon: '$mdiFormatTextdirectionLToR'
      },
      {
        text: 'rtl',
        icon: '$mdiFormatTextdirectionRToL'
      }
    ])

    const internalValue = computed({
      get: () => {
        return prop.rtl ? 'rtl' : 'ltr'
      },
      set: val => {
        const bool = val === 'rtl'

        ctx.emit('setting-change', { type: 'rtl', value: bool })
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
