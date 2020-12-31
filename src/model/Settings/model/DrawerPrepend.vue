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
import { defineComponent } from '@vue/composition-api'
import { VToolbar, VSpacer, VBtn, VIcon } from 'vuetify/lib'

export default defineComponent({
  name: 'DefaultSettingsDrawerPrepend',
  components: { VToolbar, VSpacer, VBtn, VIcon },
  props: {
    setting: {
      type: Boolean,
      require: true
    },
    i18nRender: {
      type: Function,
      default: t => t
    }
  },
  setup(prop, ctx) {
    function settingChange() {
      ctx.emit('setting-change', { type: 'setting', value: !prop.setting })
    }

    return {
      settingChange
    }
  }
})
</script>
