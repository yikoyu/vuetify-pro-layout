<template>
  <default-settings-group :i18nRender="i18nRender" :path="path" :internalValue.sync="internalValue" :items="items" />
</template>

<script lang="ts">
import { computed, defineComponent, ref, PropType } from '@vue/composition-api'
import DefaultSettingsGroup from './Group.vue'
import { mdiPageLayoutSidebarLeft, mdiPageLayoutHeader } from '@/vuetify/icons'
import { useEmitChange } from '../hooks/use-emit-change'

export default defineComponent({
  name: 'DefaultSettingsLayout',
  components: { DefaultSettingsGroup },
  props: {
    layout: {
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
    const path = ref<string>('navigationmode')

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
      get: () => props.layout,
      set: val => onEmitChange('layout', val)
    })

    return {
      path,
      items,
      internalValue
    }
  }
})
</script>
