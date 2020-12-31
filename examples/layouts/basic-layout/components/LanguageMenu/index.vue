<template>
  <app-menu key="language-menu" :items="items" min-width="110">
    <template #activator="{ attrs, on }">
      <v-btn :icon="$vuetify.breakpoint.smAndDown" class="text--secondary px-0 px-md-2" text v-bind="attrs" v-on="on">
        <v-icon>$mdiTranslate</v-icon>

        <v-icon class="hidden-sm-and-down" size="14" v-text="'$mdiChevronDown'" />
      </v-btn>
    </template>

    <template #item="{ item }">
      <v-list-item-group v-model="lang">
        <v-list-item :key="item.locale" :value="item.locale" class="v-list-item--default" @click="setLang(item.locale)">
          <v-list-item-title v-text="item.title" />
        </v-list-item>
      </v-list-item-group>
    </template>
  </app-menu>
</template>

<script lang="ts">
import { defineComponent, computed, watch } from '@vue/composition-api'
import { i18nRender } from '@/locales'
import useApp from '@/store/hooks/use-app'

import { AppMenu } from 'vuetify-pro-layout'

export default defineComponent({
  name: 'DefaultLanguageMenu',
  components: { AppMenu },
  setup(prop, ctx) {
    const { lang } = useApp()

    const items = computed(() => {
      return [{ heading: i18nRender('app.translations') }, { title: 'English', locale: 'en-US' }, { title: '简体中文', locale: 'zh-CN' }]
    })

    function setLang(locale: string) {
      lang.value = locale
    }

    return {
      lang,
      items,
      setLang
    }
  }
})
// import { get } from 'vuex-pathify'

// // Language
// import locales from '@/i18n/locales'

// export default {
//   name: 'LanguageMenu',

//   data: () => ({ locales }),

//   computed: {
//     locale: get('route/params@locale'),
//     current() {
//       return this.locales.find(l => l.locale === this.locale) || {}
//     },
//     items() {
//       console.log('locales', JSON.stringify([{ heading: this.$t('translations') }, ...this.locales]))
//       return [{ heading: this.$t('translations') }, ...this.locales]
//     }
//   },

//   methods: {
//     switchLocale(locale) {
//       window.localStorage.setItem('currentLanguage', locale)
//     }
//   }
// }
</script>
