<template>
  <div id="page-header-wrapper" class="fill-height ma-n2">
    <v-toolbar class="ma-2 mb-0" rounded dense height="auto" :elevation="2" v-bind="$attrs" v-on="$listeners">
      <div class="d-flex flex-column mb-2" style="width: 100%;">
        <v-breadcrumbs class="px-0 py-2" :items="matchRoute"></v-breadcrumbs>
        <v-toolbar-title class="text-h6 font-weight-bold">{{ routeName }}</v-toolbar-title>

        <div v-if="content || extraContent || $slots.content || $slots.extraContent" class="d-flex pt-3 flex-column flex-md-row">
          <div class="flex-grow-1">
            <slot name="content">{{ content }}</slot>
          </div>

          <div class="text-md-right ml-md-16 mt-3 mt-md-0">
            <slot name="extraContent">{{ extraContent }}</slot>
          </div>
        </div>
      </div>

      <template v-if="tabList.length" #extension>
        <v-tabs v-model="tabActiveKeySync" show-arrows center-active @change="handleChange">
          <v-tab v-for="(item, index) in tabList" :key="index">{{ item }}</v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-container fluid class="px-2" :class="[{ 'mb-14': $slots.toolbar }]">
      <slot></slot>
    </v-container>

    <v-expand-transition>
      <v-toolbar v-if="$slots.toolbar" dense :style="toolbarStyle">
        <slot name="toolbar"></slot>
      </v-toolbar>
    </v-expand-transition>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@vue/composition-api'
import { VSheet, VToolbar, VToolbarTitle, VBreadcrumbs, VTabs, VTab, VContainer, VExpandTransition } from 'vuetify/lib'

export default defineComponent({
  name: 'PageHeaderWrapper',
  components: { VSheet, VToolbar, VToolbarTitle, VBreadcrumbs, VTabs, VTab, VContainer, VExpandTransition },
  props: {
    content: {
      type: String,
      default: ''
    },
    extraContent: {
      type: String,
      default: ''
    },
    tabList: {
      type: Array as PropType<string[]>,
      default: () => []
    },
    tabActiveKey: {
      type: Number,
      default: 0
    }
  },
  setup(prop, ctx) {
    const toolbarStyle = computed(() => {
      return {
        position: 'fixed',
        bottom: 0,
        left: ctx.root.$vuetify.application.left + 'px',
        right: ctx.root.$vuetify.application.right + 'px',
        'margin-bottom': '0px',
        transform: 'translateY(0px)'
      }
    })

    const tabActiveKeySync = computed({
      get: () => prop.tabActiveKey,
      set: (val: number) => {
        ctx.emit('update:tabActiveKey', val)
      }
    })

    const matchRoute = computed(() => {
      return (ctx.root as any).$route.matched.map(item => {
        return {
          text: item.meta.title,
          to: item.path || '/'
        }
      })
    })

    const routeName = computed(() => (ctx.root as any).$route.meta.title)

    function handleChange(e: number) {
      ctx.emit('tab-change', e)
    }

    return {
      toolbarStyle,
      tabActiveKeySync,
      matchRoute,
      routeName,

      handleChange
    }
  }
})
</script>
