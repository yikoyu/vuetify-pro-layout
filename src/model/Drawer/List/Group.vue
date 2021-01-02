<template>
  <v-list-group
    class="default-drawer-list-group v-list-group--default"
    v-model="model"
    v-if="show"
    :group="group"
    :prepend-icon="icon"
    append-icon="$mdiMenuDown"
    no-action
    v-bind="$attrs"
  >
    <template v-slot:activator>
      <v-list-item-content>
        <v-list-item-title v-if="item.meta.title" v-text="item.meta.title" />
      </v-list-item-content>
    </template>

    <template v-for="(child, i) in item.children">
      <default-drawer-list-group v-if="child.children && child.children.length" :key="`sub-group-${i}`" :item="child" sub-group />

      <default-drawer-list-item v-else :key="`child-${i}`" :item="child" />
    </template>
  </v-list-group>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, computed } from '@vue/composition-api'
import { VListGroup, VListItemContent, VListItemTitle } from 'vuetify/lib'

import { DefaultDrawerListItem } from './'

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
      icon
    }
  }
})
</script>

<style lang="scss">
.default-drawer-list-group.v-list-group.v-list-group--default {
  .v-list-group__header {
    min-height: 32px;
    > .v-list-item__icon {
      margin-bottom: 6px;
      margin-top: 6px;
    }
  }
}
</style>
