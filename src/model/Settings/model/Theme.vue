<template>
  <default-settings-group :i18nRender="i18nRender" :path="path" :internalValue.sync="internalValue" :items="items" />
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, Ref, ref, watch } from '@vue/composition-api'

import DefaultSettingsGroup from './Group.vue'

import { mdiWhiteBalanceSunny, mdiWeatherNight, mdiDesktopTowerMonitor } from '../../../vuetify/icons'

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
      type: Function,
      default: t => t
    }
  },
  setup(prop, ctx) {
    const path: Ref<string> = ref('theme')

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
        if (prop.mixed) return 'mixed'
        if (prop.system) return 'system'

        return prop.dark ? 'dark' : 'light'
      },
      set: (val: string) => {
        const set = items.value.find(item => item.text === val)

        set!.cb()
      }
    })

    // const vThemeDark = computed(() => ctx.root.$vuetify.theme.dark)

    // watch(vThemeDark, (val: boolean) => {
    //   if (dark.value === val) return
    //   dark.value = val
    // })

    // watch(dark, (val: boolean) => {
    //   // if (vThemeDark.value === val) return
    //   dark.value = val
    //   // ctx.root.$vuetify.theme.dark = val
    // })

    function setTheme(iDark = false, iMixed = false, iSystem = false) {
      ctx.emit('setting-change', { type: 'dark', value: iDark })
      ctx.emit('setting-change', { type: 'mixed', value: iMixed })
      ctx.emit('setting-change', { type: 'system', value: iSystem })
    }

    onMounted(() => {
      window.matchMedia('(prefers-color-scheme: dark)').addListener(() => {
        if (prop.system) setSystemTheme()
      })
    })

    function setSystemTheme() {
      if (!IN_BROWSER || !window.matchMedia) return

      const iDark = window.matchMedia('(prefers-color-scheme: dark)').matches

      setTheme(iDark, prop.mixed, true)
    }

    return {
      path,
      items,
      internalValue
    }
  }
})
</script>
