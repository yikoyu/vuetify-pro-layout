<template>
  <div class="default-settings-group">
    <span v-if="path" class="text-subtitle-2 font-weight-black mb-0 pl-1">{{ i18nRender(`app.setting.${path}`) }}</span>

    <v-item-group v-model="internalValueSync" class="mx-auto row row--dense" mandatory>
      <v-col v-for="{ icon, text, disabled } in items" :key="text" cols="6">
        <v-item :value="text">
          <template #default="{ active, toggle }">
            <v-card
              :color="active ? 'primary' : `grey ${$vuetify.theme.dark ? 'darken' : 'lighten'}-3`"
              :dark="!$vuetify.theme.dark && active"
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
import { defineComponent, computed, ref, Ref, PropType } from '@vue/composition-api'
import { VItemGroup, VItem, VCol, VCard, VIcon } from 'vuetify/lib'

export default defineComponent({
  name: 'DefaultSettingsGroup',
  components: { VItemGroup, VItem, VCol, VCard, VIcon },
  props: {
    path: {
      type: String,
      default: ''
    },
    internalValue: {
      type: String,
      require: true
    },
    items: {
      type: Array as PropType<{ cb: Function; icon: string; text: string }[]>,
      require: () => []
    },
    i18nRender: {
      type: Function,
      default: t => t
    }
  },
  setup(prop, ctx) {
    const internalValueSync = computed({
      get: () => prop.internalValue,
      set: val => {
        ctx.emit('update:internalValue', val)
      }
    })

    return {
      internalValueSync
    }
  }
})
</script>

<style lang="scss">
.default-settings-group .v-card.v-card--group::before {
  border-radius: inherit;
}
</style>
