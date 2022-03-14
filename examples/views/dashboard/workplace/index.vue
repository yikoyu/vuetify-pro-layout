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
import { defineComponent, reactive, ref, unref, watch } from '@vue/composition-api'

export default defineComponent({
  name: 'DashboardWorkplace',
  setup() {
    const toolbar = ref(false)
    const lang = reactive({ lang: '' })

    const tabActiveKey = ref<number>(0)
    // const tabList = ref<string[]>(['Tab 1', 'Tab 2', 'Tab 3', 'Tab 4', 'Tab 5'])
    const tabList = ref([
      {
        label: 'Tab 1',
        value: 11
      },
      {
        label: 'Tab 2',
        value: 22
      },
      {
        label: 'Tab 3',
        value: 33
      },
      {
        label: 'Tab 4',
        value: 44,
        disabled: true
      },
      {
        label: 'Tab 5',
        value: 55
      }
    ])

    watch(tabActiveKey, (val: number) => {
      console.log('watch', val, unref(tabList)[val])
    })

    function tabChange(e: Recordable) {
      console.log('change', e, unref(tabList)[e.index])
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
