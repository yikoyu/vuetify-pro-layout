<template>
  <div class="default-multi-tab elevation-1">
    <v-chip-group v-model="routePath" mandatory active-class="primary--text">
      <v-slide-x-reverse-transition group>
        <v-hover v-slot="{ hover }" v-for="item in pages" :key="item.fullPath">
          <v-chip
            label
            :close="item.fullPath === routePath ? pages.length > 1 : hover"
            :value="item.fullPath"
            @click:close="remove(item.fullPath)"
            @contextmenu.prevent.native="$refs.contextmenu.openMenu($event, $el)"
          >
            {{ item.meta.title }}
          </v-chip>
        </v-hover>
      </v-slide-x-reverse-transition>
    </v-chip-group>

    <v-spacer></v-spacer>

    <v-menu open-on-hover>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon small v-bind="attrs" v-on="on" style="position: absolute;" :style="[{ [`${$vuetify.rtl ? 'left' : 'right'}`]: 0 }]">
          <v-icon>{{ mdiDotsVertical }}</v-icon>
        </v-btn>
      </template>

      <v-list dense>
        <v-list-item v-for="(item, index) in menuList" :key="index" :disabled="item.disabled" @click="item.function">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <app-context-menu ref="contextmenu" :menu-list="menuList" />

    <v-snackbar v-model="snackbar" app absolute top right>
      <div>{{ i18nRender('app.setting.multiTab.snackbar.closeend') }}</div>
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar = false">
          {{ i18nRender('app.setting.multiTab.snackbar.close') }}
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref, watch } from '@vue/composition-api'

import { VBtn, VSpacer, VChipGroup, VChip, VIcon, VMenu, VSnackbar, VSlideXReverseTransition, VHover } from 'vuetify/lib'
import { AppContextMenu } from '../../../components'

import { mdiDotsVertical } from '../../../vuetify/icons'

import { Route } from 'vue-router'

export default defineComponent({
  name: 'DefaultMultiTab',
  components: {
    AppContextMenu,
    VBtn,
    VSpacer,
    VChipGroup,
    VChip,
    VIcon,
    VMenu,
    VSnackbar,
    VSlideXReverseTransition,
    VHover
  },
  props: {
    i18nRender: {
      type: Function,
      default: t => t
    }
  },
  setup(prop, ctx) {
    const snackbar = ref(false)
    const fullPathList: Ref<string[]> = ref([])
    const pages: Ref<Route[]> = ref([])
    const routePath = computed({
      get: () => ctx.root.$route.fullPath,
      set: (val: string) => {
        ctx.root.$router.push(val)
      }
    })

    const menuList = computed(() => [
      { title: prop.i18nRender('app.setting.multiTab.allClose'), function: () => closeAll() },
      { title: prop.i18nRender('app.setting.multiTab.closeCurrent'), function: () => closeThat() }
    ])

    function selectedLastPath() {
      routePath.value = fullPathList.value[fullPathList.value.length - 1]
    }

    function remove(targetKey: string) {
      if (pages.value.length <= 1) {
        snackbar.value = true
        return
      }

      pages.value = pages.value.filter(page => page.fullPath !== targetKey)
      fullPathList.value = fullPathList.value.filter(p => p !== targetKey)
      if (!fullPathList.value.includes(routePath.value)) {
        selectedLastPath()
      }
    }

    function closeAll() {
      pages.value = pages.value.filter(page => page.fullPath === routePath.value)
      fullPathList.value = fullPathList.value.filter(p => p === routePath.value)
    }

    function closeThat() {
      remove(routePath.value)
    }

    watch(
      () => ctx.root.$route,
      val => {
        routePath.value = val.fullPath
        if (!fullPathList.value.includes(val.fullPath)) {
          fullPathList.value.push(val.fullPath)
          pages.value.push(val)
        }
      },
      { immediate: true }
    )

    return {
      mdiDotsVertical,
      snackbar,
      pages,
      routePath,
      menuList,

      remove
    }
  }
})
</script>

<style lang="scss">
.default-multi-tab {
  display: flex;
  position: relative;
  align-items: center;
  width: 100%;
  padding: 0 20px;
  .v-toolbar__content {
    padding-right: 0;
    padding-left: 0;
  }
}
</style>
