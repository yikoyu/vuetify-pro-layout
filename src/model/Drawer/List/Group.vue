<template>
  <v-list-group
    v-bind="$attrs"
    class="default-drawer-list-group v-list-group--default mb-1"
    v-model="model"
    v-show="isShow"
    :group="group"
    :append-icon="layer ? '' : '$expand'"
    no-action
  >
    <template #activator>
      <v-list-item-content>
        <v-list-item-title v-if="routeMeta.title" v-text="routeMeta.title" />
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
        :key="`sub-group-${String(i)}`"
        :item="child"
        :layer="layer + 1"
      />

      <default-drawer-list-item v-else :style="layerPadding" :key="`child-${String(i)}`" :item="child" />
    </template>
  </v-list-group>
</template>

<script lang="ts">
import { defineComponent, ref, unref, computed, PropType } from '@vue/composition-api'
import type { RouteConfig } from 'vue-router'
import { useRoute } from '@/hooks'

import { DefaultDrawerListItem } from './'

import { mdiMenuDown } from '@/vuetify/icons'

export default defineComponent({
  name: 'DefaultDrawerListGroup',
  components: {
    DefaultDrawerListItem
  },
  props: {
    item: {
      type: Object as PropType<RouteConfig>,
      default: () => ({})
    },
    layer: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    const { routeMeta, isShow } = useRoute(props.item)

    const model = ref<Nullable<boolean>>(null)

    const group = computed((): string => setGroup(props.item.children))

    const icon = computed((): string | undefined => {
      const iconStr = unref(routeMeta)!.icon

      if (!iconStr) return undefined
      const [off, on] = iconStr.split(':')
      return unref(model) ? on || off : off
    })

    const layerPadding = computed(() => {
      const left = (12 + props.layer * 4) * 4
      return {
        paddingLeft: `${left}px`
      }
    })

    function setGroup(children: RouteConfig[] = []): string {
      return children
        .reduce((acc: string[], cur: RouteConfig) => {
          acc.push(cur.children ? setGroup(cur.children) : cur.path)

          return acc
        }, [])
        .join('|')
    }

    return {
      model,
      routeMeta,
      group,
      isShow,
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
