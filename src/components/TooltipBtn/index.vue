<template>
  <span class="v-app-tooltip-btn d-inline-block">
    <v-tooltip bottom content-class="app-tooltip-btn__content v-app-tooltip-btn__content" open-delay="200">
      <template #activator="{ on }">
        <v-btn
          v-bind="$attrs"
          :aria-label="path"
          icon
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
import { defineComponent } from 'vue-demi'

export default defineComponent({
  name: 'AppTooltipBtn',
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
