<script setup lang="ts">
import { computed, ref, unref, watch } from 'vue'
import { locale, lang } from 'vuetify-pro-layout'

const toolbar = ref(false)
const customLang = ref({ ...lang['en'] })
const customLangKey = computed(() => Object.keys(unref(customLang)))

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

function tabChange(e: Record<string, any>) {
  console.log('change', e, unref(tabList)[e.index])
}

watch(
  customLang,
  lang => {
    locale.setMessage('custom', lang)
  },
  { immediate: true }
)

function setLang(lang: string) {
  locale.setLang(lang)
}
</script>

<template>
  <page-header-wrapper :tab-active-key.sync="tabActiveKey" :tab-list="tabList" @tab-change="tabChange">
    <v-card max-width="350" class="mb-2">
      <v-card-title>Vuetify Pro Layout</v-card-title>
    </v-card>
    <v-btn color="primary" class="me-2" @click="toolbar = !toolbar">显示Toolbar</v-btn>
    <v-btn color="primary" class="me-2" @click="setLang('zhHans')">切换中文简体</v-btn>
    <v-btn color="primary" class="me-2" @click="setLang('en')">切换英语</v-btn>
    <v-btn color="primary" class="me-2" @click="setLang('custom')">切换自定义</v-btn>

    <v-card class="mt-2">
      <v-card-title>自定义语言</v-card-title>
      <v-card-text>
        <v-row>
          <v-col v-for="key in customLangKey" :key="key" :cols="12" :sm="6" :md="4" :lg="3">
            <v-text-field v-model="customLang[key]" :label="key"></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <template #toolbar v-if="toolbar">
      <v-spacer></v-spacer>

      <v-btn color="warning">批量删除</v-btn>
    </template>
  </page-header-wrapper>
</template>

<style lang="scss" scoped></style>
