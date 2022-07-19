<template>
  <div class="default-settings-group">
    <span v-if="path" class="text-subtitle-2 font-weight-black mb-0 pl-1">{{ i18nRender(`app.setting.${path}`) }}</span>

    <v-item-group v-model="internalValueSync" class="mx-auto row row--dense" mandatory>
      <v-col v-for="{ icon, text, disabled } in items" :key="text" cols="6">
        <v-item :value="text">
          <template #default="{ active, toggle }">
            <v-card
              :color="active ? 'primary' : `grey ${settings.dark ? 'darken' : 'lighten'}-3`"
              :dark="!settings.dark && active"
              class="v-card--group py-3 px-4 text-center position-relative cursor-pointer d-flex align-center justify-space-between"
              rounded
              :disabled="disabled"
              flat
              @click="toggle"
            >
              <span v-if="text">{{ i18nRender(`app.setting.${path}.${text}`) }}</span>

              <v-icon v-if="icon" v-text="icon" />
            </v-card>
          </template>
        </v-item>
      </v-col>
    </v-item-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from '@vue/composition-api'
import { injectContext } from '@/hooks'

export default defineComponent({
  name: 'DefaultSettingsGroup',
  props: {
    path: {
      type: String,
      default: ''
    },
    internalValue: {
      type: String as PropType<string | null>,
      default: undefined
    },
    items: {
      type: Array as PropType<{ cb?: () => void; icon: string; text: string; disabled?: boolean }[]>,
      default: () => []
    },
    i18nRender: {
      type: Function as PropType<(t: string) => string>,
      default: (t: string): string => t
    }
  },
  setup(props, { emit }) {
    const { settings } = injectContext()

    const internalValueSync = computed({
      get: () => props.internalValue,
      set: val => {
        emit('update:internalValue', val)
      }
    })

    return {
      settings,
      internalValueSync
    }
  }
})
</script>
