<template>
  <default-settings-group :i18nRender="i18nRender" :path="path" :internalValue.sync="internalValue" :items="items" />
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, PropType } from 'vue-demi'
import DefaultSettingsGroup from './Group.vue'
import { mdiFormatPilcrowArrowLeft, mdiFormatPilcrowArrowRight } from '@/vuetify/icons'
import { useEmitChange } from '../hooks/use-emit-change'
import { useVuetify } from '@/hooks/core'

export default defineComponent({
  name: 'DefaultSettingsRtl',
  components: { DefaultSettingsGroup },
  props: {
    rtl: {
      type: Boolean,
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
    const path = ref<string>('direction')

    const items = computed(() => [
      {
        text: 'ltr',
        icon: mdiFormatPilcrowArrowRight
      },
      {
        text: 'rtl',
        icon: mdiFormatPilcrowArrowLeft
      }
    ])

    const internalValue = computed({
      get: () => (props.rtl ? 'rtl' : 'ltr'),
      set: val => {
        const bool = val === 'rtl'

        initPtl(bool)
        onEmitChange('rtl', bool)
      }
    })

    onMounted(() => initPtl(props.rtl))

    function initPtl(rtl?: boolean) {
      if (typeof rtl !== 'boolean') return
      vuetify.rtl = rtl
    }

    return {
      path,
      items,
      internalValue
    }
  }
})
</script>
