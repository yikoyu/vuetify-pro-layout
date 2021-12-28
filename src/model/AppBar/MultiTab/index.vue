<template>
  <div class="default-multi-tab elevation-1">
    <v-tabs v-model="routePath" ref="tabsRef">
      <v-hover v-slot="{ hover }" v-for="item in pages" :key="item.fullPath">
        <v-slide-x-reverse-transition @after-leave="onResize">
          <v-tab
            :to="item.fullPath"
            style="transition: all 0.3s"
            :style="{ background: settings.dark ? undefined : hover ? '#E0E0E0' : '#FAFAFA' }"
            :active-class="settings.dark ? undefined : 'white'"
            @contextmenu.prevent.native="openMenu"
          >
            {{ item.meta ? item.meta.title : '' }}
            <v-icon v-if="pages.length > 1" v-bind="{ [`${settings.rtl ? 'left' : 'right'}`]: true }" small @click.prevent.stop="remove(item.fullPath)">
              $close
            </v-icon>
          </v-tab>
        </v-slide-x-reverse-transition>
      </v-hover>
    </v-tabs>

    <v-spacer></v-spacer>

    <v-menu open-on-hover>
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" icon small v-on="on" style="position: absolute" :style="[{ [`${settings.rtl ? 'left' : 'right'}`]: 0 }]">
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
        <v-btn v-bind="attrs" text @click="snackbar = false">
          {{ i18nRender('app.setting.multiTab.snackbar.close') }}
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, unref, watch } from '@vue/composition-api'
import { Route } from 'vue-router'
import { AppContextMenu } from '@/components'
import { mdiDotsVertical } from '@/vuetify/icons'
import { useContext } from '@/hooks'

export default defineComponent({
  name: 'DefaultMultiTab',
  components: {
    AppContextMenu
  },
  setup(prop, { root }) {
    const tabsRef = ref<Nullable<Recordable>>(null)
    const contextmenu = ref<Nullable<Recordable>>(null)

    const { settings, i18nRender } = useContext()

    const snackbar = ref<boolean>(false)
    const fullPathList = ref<string[]>([])
    const pages = ref<Route[]>([])
    const routePath = computed({
      get: () => root.$route.fullPath,
      set: (val: string) => {
        root.$router.push(val)
      }
    })

    const menuList = computed((): { title: string; disabled?: boolean; function: () => void }[] => [
      { title: unref(i18nRender)('app.setting.multiTab.allClose'), function: () => closeAll() },
      { title: unref(i18nRender)('app.setting.multiTab.closeCurrent'), function: () => closeThat() }
    ])

    function selectedLastPath() {
      routePath.value = unref(fullPathList)[unref(fullPathList).length - 1]
    }

    function remove(targetKey: string) {
      if (unref(pages).length <= 1) {
        snackbar.value = true
        return
      }

      pages.value = unref(pages).filter(page => page.fullPath !== targetKey)
      fullPathList.value = unref(fullPathList).filter(p => p !== targetKey)
      if (!unref(fullPathList).includes(unref(routePath))) {
        selectedLastPath()
      }
    }

    function closeAll() {
      pages.value = unref(pages).filter(page => page.fullPath === unref(routePath))
      fullPathList.value = unref(fullPathList).filter(p => p === unref(routePath))
    }

    function closeThat() {
      remove(unref(routePath))
    }

    watch(
      () => root.$route,
      val => {
        routePath.value = val.fullPath
        if (!unref(fullPathList).includes(val.fullPath)) {
          unref(fullPathList).push(val.fullPath)
          unref(pages).push(val)
        }
      },
      { immediate: true }
    )

    function onResize() {
      unref(tabsRef)?.onResize()
    }

    function openMenu(event: Event) {
      unref(contextmenu)?.openMenu(event, root.$el)
    }

    return {
      settings,
      i18nRender,
      mdiDotsVertical,
      snackbar,
      pages,
      routePath,
      menuList,

      remove,
      onResize,
      openMenu
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
