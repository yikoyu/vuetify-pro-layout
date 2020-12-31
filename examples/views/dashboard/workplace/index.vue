<template>
  <page-header-wrapper :tab-active-key.sync="tabActiveKey" :tab-list="tabList" @tab-change="tabChange">
    <v-card max-width="350">
      <v-card-title>
        Vuetify Pro Layout
      </v-card-title>
    </v-card>
  </page-header-wrapper>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref, watch } from '@vue/composition-api'
import router from '@/router'
import moment from 'moment'

export default defineComponent({
  name: 'Workplace',
  setup(prop, ctx) {
    const date: Ref<string[]> = ref([])

    const tabActiveKey: Ref<number> = ref(0)
    const tabList: Ref<string[]> = ref(['Tab 1', 'Tab 2', 'Tab 3', 'Tab 4', 'Tab 5'])

    watch(tabActiveKey, (val: number) => {
      console.log('val', val, tabList.value[val])
    })

    function tabChange(e: number) {
      console.log('e', e, tabList.value[e])
    }

    return {
      date,

      tabActiveKey,
      tabList,
      tabChange,

      moment
    }
  }
})
</script>

<style lang="scss" scoped></style>
