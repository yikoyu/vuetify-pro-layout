<template>
  <default-settings-group :i18nRender="i18nRender" :path="path" :internalValue.sync="internalValue" :items="items" />
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, PropType } from '@vue/composition-api'
import DefaultSettingsGroup from './Group.vue'
import { mdiWhiteBalanceSunny, mdiWeatherNight, mdiDesktopTowerMonitor } from '@/vuetify/icons'
import { useEmitChange } from '../hooks/use-emit-change'
import { useVuetify } from '@/hooks/core'
import Logger from '@/utils/logger'

const IN_BROWSER = typeof window !== 'undefined'

export default defineComponent({
  name: 'DefaultSettingsTheme',
  components: { DefaultSettingsGroup },
  props: {
    dark: {
      type: Boolean,
      require: true
    },
    mixed: {
      type: Boolean,
      require: true
    },
    system: {
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
    const path = ref<string>('theme')

    const items = computed(() => [
      {
        text: 'light',
        icon: mdiWhiteBalanceSunny,
        cb: () => setTheme()
      },
      {
        text: 'dark',
        icon: mdiWeatherNight,
        cb: () => setTheme(true)
      },
      {
        text: 'system',
        icon: mdiDesktopTowerMonitor,
        cb: () => setSystemTheme()
      }
      // {
      //   text: 'mixed',
      //   icon: '$mdiThemeLightDark',
      //   cb: () => setTheme(false, true)
      // }
    ])

    const internalValue = computed({
      get: () => {
        if (props.mixed) return 'mixed'
        if (props.system) return 'system'

        return props.dark ? 'dark' : 'light'
      },
      set: (val: string) => {
        const set = items.value.find(item => item.text === val)

        set?.cb()
      }
    })

    function initTheme() {
      if (props.system) {
        setSystemTheme()
        return
      }

      if (typeof props.dark === 'boolean') {
        setTheme(props.dark)
      }
    }

    function setTheme(iDark = false, iMixed = false, iSystem = false) {
      vuetify.theme.dark = iDark

      onEmitChange('dark', iDark)
      onEmitChange('mixed', iMixed)
      onEmitChange('system', iSystem)
    }

    onMounted(() => {
      const darkMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

      try {
        // Chrome & Firefox
        darkMediaQuery.addEventListener('change', () => {
          if (props.system) setSystemTheme()
        })
      } catch (e1) {
        try {
          // Safari
          darkMediaQuery.addListener(() => {
            if (props.system) setSystemTheme()
          })
        } catch (e2) {
          if (e2 instanceof Error) {
            Logger.error(e2.message)
          }
        }
      }

      initTheme()
    })

    function setSystemTheme() {
      if (!IN_BROWSER || !window.matchMedia) return

      const iDark = window.matchMedia('(prefers-color-scheme: dark)').matches

      setTheme(iDark, props.mixed, true)
    }

    return {
      path,
      items,
      internalValue
    }
  }
})
</script>
