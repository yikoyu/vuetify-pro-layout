<template>
  <page-header-wrapper :tab-active-key.sync="tabActiveKey" :tab-list="tabList" @tab-change="tabChange">
    <v-card max-width="350">
      <v-card-title>Vuetify Pro Layout</v-card-title>
    </v-card>
    <v-btn color="primary" @click="toolbar = !toolbar">显示Toolbar</v-btn>

    <template #toolbar v-if="toolbar">
      <v-spacer></v-spacer>

      <v-btn color="warning">批量删除</v-btn>
    </template>
  </page-header-wrapper>
</template>

<script lang="ts">
import { defineComponent, reactive, Ref, ref, unref, watch } from '@vue/composition-api'

export default defineComponent({
  name: 'DashboardWorkplace',
  setup() {
    const toolbar = ref(false)
    const lang = reactive({ lang: '' })

    const tabActiveKey: Ref<number> = ref(0)
    const tabList: Ref<string[]> = ref(['Tab 1', 'Tab 2', 'Tab 3', 'Tab 4', 'Tab 5'])

    watch(tabActiveKey, (val: number) => {
      console.log('val', val, tabList.value[val])
    })

    function tabChange(e: number) {
      console.log('e', e, tabList.value[e])
    }

    return {
      toolbar,

      tabActiveKey,
      tabList,
      tabChange
    }
  }
})
</script>

<style lang="scss" scoped></style>
