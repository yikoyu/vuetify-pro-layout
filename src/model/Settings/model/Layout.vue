<template>
  <default-settings-group :i18nRender="i18nRender" :path="path" :internalValue.sync="internalValue" :items="items" />
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref, watch } from '@vue/composition-api'

import DefaultSettingsGroup from './Group.vue'

import { mdiPageLayoutSidebarLeft, mdiPageLayoutHeader } from '../../../vuetify/icons'

export default defineComponent({
  name: 'DefaultSettingsLayout',
  components: { DefaultSettingsGroup },
  props: {
    layout: {
      type: String,
      require: true
    },
    i18nRender: {
      type: Function,
      default: t => t
    }
  },
  setup(prop, ctx) {
    const path: Ref<string> = ref('navigationmode')

    const items = computed(() => [
      {
        text: 'side',
        icon: mdiPageLayoutSidebarLeft
      },
      {
        text: 'top',
        icon: mdiPageLayoutHeader
      }
    ])

    const internalValue = computed({
      get: () => {
        return prop.layout
      },
      set: val => {
        ctx.emit('setting-change', { type: 'layout', value: val })
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
