<template>
  <v-list-group
    class="default-drawer-list-group v-list-group--default mb-1"
    v-model="model"
    v-if="show"
    :group="group"
    :append-icon="layer ? '' : '$expand'"
    no-action
    v-bind="$attrs"
  >
    <template #activator>
      <v-list-item-content>
        <v-list-item-title v-if="item.meta.title" v-text="item.meta.title" />
      </v-list-item-content>
    </template>

    <template #prependIcon>
      <v-icon v-if="icon">{{ icon }}</v-icon>
      <v-icon v-else :style="{ transform: model ? 'rotate(180deg)' : 'rotate(0deg)' }">{{ mdiMenuDown }}</v-icon>
    </template>

    <template v-for="(child, i) in item.children">
      <default-drawer-list-group
        v-if="child.children && child.children.length"
        class="default-drawer-list-item-group"
        :key="`sub-group-${i}`"
        :item="child"
        :layer="layer + 1"
      />

      <default-drawer-list-item v-else :style="layerPadding" :key="`child-${i}`" :item="child" />
    </template>
  </v-list-group>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, computed } from '@vue/composition-api'
import { VListGroup, VListItemContent, VListItemTitle } from 'vuetify/lib'

import { DefaultDrawerListItem } from './'

import { mdiMenuDown } from 'vuetify-pro-layout/vuetify/icons'

export default defineComponent({
  name: 'DefaultDrawerListGroup',
  components: {
    VListGroup,
    VListItemContent,
    VListItemTitle,
    DefaultDrawerListItem
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    layer: {
      type: Number,
      default: 0
    }
  },
  setup(prop, ctx) {
    const model: Ref = ref(null)

    const group = computed(() => genGroup(prop.item.children))
    const show = computed(() => {
      if (typeof prop.item.hidden !== 'boolean') return true
      return !prop.item.hidden
    })

    const icon = computed(() => {
      if (!prop.item.meta!.icon) return undefined
      const [off, on] = prop.item.meta!.icon.split(':')
      return model.value ? on || off : off
    })

    const layerPadding = computed(() => {
      const left = (12 + prop.layer * 4) * 4
      return {
        paddingLeft: `${left}px`
      }
    })

    function genGroup(children) {
      return children!
        .reduce((acc: string[], cur) => {
          acc.push(cur.children ? genGroup(cur.children) : cur.path)

          return acc
        }, [])
        .join('|')
    }

    return {
      model,
      group,
      show,
      icon,
      layerPadding,
      mdiMenuDown
    }
  }
})
</script>

<style lang="scss">
.default-drawer-list-group.v-list-group.v-list-group--default {
  .default-drawer-list-item-group {
    .v-list-item__icon.v-list-group__header__prepend-icon {
      margin-top: 4px;
      margin-bottom: 4px;
    }
  }

  .v-list-group__header {
    min-height: 32px;
    .v-list-item__icon.v-list-group__header__prepend-icon {
      margin-right: 14px;
    }
  }
}
</style>
