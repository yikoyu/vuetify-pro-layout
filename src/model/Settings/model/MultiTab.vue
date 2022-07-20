<template>
  <default-settings-group :i18nRender="i18nRender" :path="path" :internalValue.sync="internalValue" :items="items" />
</template>

<script lang="ts">
import { computed, defineComponent, ref, PropType } from 'vue-demi'
import DefaultSettingsGroup from './Group.vue'
import { mdiTabPlus, mdiTab } from '@/vuetify/icons'
import { useEmitChange } from '../hooks/use-emit-change'

export default defineComponent({
  name: 'DefaultSettingsMultiTab',
  components: { DefaultSettingsGroup },
  props: {
    multiTab: {
      type: Boolean,
      require: true
    },
    i18nRender: {
      type: Function as PropType<(t: string) => string>,
      default: (t: string): string => t
    }
  },
  setup(props, { emit }) {
    const { onEmitChange } = useEmitChange(emit)
    const path = ref<string>('multiTab')

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
      get: () => (props.multiTab ? 'multi' : 'uni'),
      set: val => onEmitChange('multiTab', val === 'multi')
    })

    return {
      path,
      items,
      internalValue
    }
  }
})
</script>
