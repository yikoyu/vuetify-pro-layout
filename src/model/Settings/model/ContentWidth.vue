<template>
  <default-settings-group :i18nRender="i18nRender" :path="path" :internalValue.sync="internalValue" :items="items" />
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref, watch } from '@vue/composition-api'

import DefaultSettingsGroup from './Group.vue'

import { mdiArrowCollapseHorizontal, mdiArrowExpandHorizontal } from '../../../vuetify/icons'

export default defineComponent({
  name: 'DefaultSettingsContentWidth',
  components: { DefaultSettingsGroup },
  props: {
    layout: {
      type: String,
      require: true
    },
    contentWidth: {
      type: String,
      require: true
    },
    i18nRender: {
      type: Function,
      default: t => t
    }
  },
  setup(prop, ctx) {
    const path: Ref<string> = ref('contentwidth')

    const items = computed(() => [
      {
        text: 'fluid',
        icon: mdiArrowCollapseHorizontal
      },
      {
        text: 'fixed',
        icon: mdiArrowExpandHorizontal,
        disabled: prop.layout === 'side'
      }
    ])

    const internalValue = computed({
      get: () => {
        return prop.contentWidth
      },
      set: val => {
        ctx.emit('setting-change', { type: 'contentWidth', value: val })
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
