<template>
  <span class="v-app-tooltip-btn d-inline-block">
    <v-tooltip bottom content-class="app-tooltip-btn__content v-app-tooltip-btn__content" open-delay="200">
      <template #activator="{ on }">
        <v-btn
          :aria-label="path"
          icon
          v-bind="$attrs"
          v-on="{
            ...on,
            ...$listeners
          }"
        >
          <slot v-if="$slots.icon" name="icon" />

          <v-icon v-else v-text="icon" />
        </v-btn>
      </template>
      {{ path }}
    </v-tooltip>
  </span>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { VTooltip, VBtn, VIcon } from 'vuetify/lib'

export default defineComponent({
  name: 'AppTooltipBtn',
  components: { VTooltip, VBtn, VIcon },
  inheritAttrs: false,
  props: {
    icon: String,
    path: String
  }
})
</script>

<style lang="scss">
.app-tooltip-btn__content.v-app-tooltip-btn__content p {
  margin: 0;
}
</style>
