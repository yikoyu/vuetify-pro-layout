<template>
  <div>
    <default-settings-group :i18nRender="i18nRender" :path="path" :internalValue="null" />

    <v-color-picker class="mx-1 my-2 py-1" v-model="internalValue" :swatches="swatches" :mode="mode" show-swatches></v-color-picker>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, PropType, onMounted } from '@vue/composition-api'

import DefaultSettingsGroup from './Group.vue'
import { useEmitChange } from '../hooks/use-emit-change'
import { useVuetify } from '@/hooks/core'

export default defineComponent({
  name: 'DefaultSettingsColorPicker',
  components: {
    DefaultSettingsGroup
  },
  props: {
    primarycolor: {
      type: String,
      require: true
    },
    i18nRender: {
      type: Function as PropType<(t: string) => string>,
      default: (t: string): string => t
    }
  },
  setup(props, { emit }) {
    const vuetify = useVuetify()

    const { onEmitChange } = useEmitChange(emit)
    const path = ref<string>('primarycolor')

    const swatches = ref<string[][]>([
      ['#0096C7', '#EE4F12'],
      ['#EE44AA', '#31944F'],
      ['#46BBB1', '#55BB46'],
      ['#1976D2', '#F5222D']
    ])

    const mode = ref<string>('hexa')

    const internalValue = computed({
      get: () => props.primarycolor,
      set: val => {
        initPrimary(val)
        onEmitChange('primarycolor', val)
      }
    })

    onMounted(() => initPrimary(props.primarycolor))

    function initPrimary(primary?: string) {
      if (!primary) return
      vuetify.theme.themes.light.primary = primary
      vuetify.theme.themes.dark.primary = primary
    }

    return {
      internalValue,
      path,
      swatches,
      mode
    }
  }
})
</script>
