<template>
  <v-toolbar flat dense>
    <span class="`text-h6 font-weight-medium text--primary`">{{ i18nRender('app.setting') }}</span>

    <v-spacer />

    <v-btn icon @click="settingChange">
      <v-icon>$close</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'
import { useEmitChange } from '../hooks/use-emit-change'

export default defineComponent({
  name: 'DefaultSettingsDrawerPrepend',
  props: {
    setting: {
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
    function settingChange() {
      onEmitChange('setting', !props.setting)
    }

    return {
      settingChange
    }
  }
})
</script>
