<template>
  <default-settings-group :i18nRender="i18nRender" :path="path" :internalValue.sync="internalValue" :items="items" />
</template>

<script lang="ts">
import { computed, defineComponent, ref, PropType } from '@vue/composition-api'
import DefaultSettingsGroup from './Group.vue'
import { mdiArrowCollapseHorizontal, mdiArrowExpandHorizontal } from '@/vuetify/icons'
import { useEmitChange } from '../hooks/use-emit-change'

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
      type: Function as PropType<(t: string) => string>,
      default: (t: string): string => t
    }
  },
  setup(props, { emit }) {
    const { onEmitChange } = useEmitChange(emit)
    const path = ref<string>('contentwidth')

    const items = computed(() => [
      {
        text: 'fluid',
        icon: mdiArrowCollapseHorizontal
      },
      {
        text: 'fixed',
        icon: mdiArrowExpandHorizontal,
        disabled: props.layout === 'side'
      }
    ])

    const internalValue = computed({
      get: () => props.contentWidth,
      set: val => onEmitChange('contentWidth', val)
    })

    return {
      path,
      items,
      internalValue
    }
  }
})
</script>
