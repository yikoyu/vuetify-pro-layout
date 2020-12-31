<template>
  <div>
    <default-settings-group :i18nRender="i18nRender" :path="path" :internalValue="null" />

    <v-color-picker class="mx-1 my-2 py-1" v-model="internalValue" :swatches="swatches" :mode="mode" show-swatches></v-color-picker>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, watch, onMounted, computed } from '@vue/composition-api'
import { VColorPicker } from 'vuetify/lib'

import DefaultSettingsGroup from './Group.vue'

export default defineComponent({
  name: 'DefaultSettingsColorPicker',
  components: {
    VColorPicker,
    DefaultSettingsGroup
  },
  props: {
    primarycolor: {
      type: String,
      require: true
    },
    i18nRender: {
      type: Function,
      default: t => t
    }
  },
  setup(prop, ctx) {
    const path: Ref<string> = ref('primarycolor')

    const swatches: Ref<string[][]> = ref([
      ['#0096C7', '#EE4F12'],
      ['#EE44AA', '#31944F'],
      ['#46BBB1', '#55BB46'],
      ['#1976D2', '#F5222D']
    ])

    const mode: Ref<string> = ref('hexa')

    const internalValue = computed({
      get: () => prop.primarycolor,
      set: val => {
        ctx.emit('setting-change', { type: 'primarycolor', value: val })
      }
    })

    return {
      internalValue,
      path,
      swatches,
      mode
    }
  }
})
</script>
