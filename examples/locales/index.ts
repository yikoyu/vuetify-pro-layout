import Vue from 'vue'
import VueI18n, { TranslateResult } from 'vue-i18n'
import defaultSettings from '@/config/defaultSettings'
import moment from 'moment'
import zhCN from './lang/zh-CN'

Vue.use(VueI18n)

export const defaultLang = defaultSettings.lang

const messages = Object()
messages[defaultLang] = { ...zhCN }

const i18n = new VueI18n({
  silentTranslationWarn: true,
  locale: defaultLang,
  fallbackLocale: defaultLang,
  messages
})

const loadedLanguages = [defaultLang]

const setI18nLanguage = (lang: string): string => {
  i18n.locale = lang
  // request.headers['Accept-Language'] = lang
  ;(document.querySelector('html') as HTMLHtmlElement).setAttribute('lang', lang)
  return lang
}

export const loadLanguageAsync = (lang: string = defaultLang): Promise<string> => {
  return new Promise(resolve => {
    // 缓存语言设置
    if (i18n.locale !== lang) {
      if (!loadedLanguages.includes(lang)) {
        return import(`./lang/${lang}`).then(msg => {
          const locale = msg.default
          i18n.setLocaleMessage(lang, locale)
          loadedLanguages.push(lang)
          moment.updateLocale(locale.momentName, locale.momentLocale)
          return setI18nLanguage(lang)
        })
      }
      moment.updateLocale(i18n.messages[lang].momentName as string, i18n.messages[lang].momentLocale as any)
      return resolve(setI18nLanguage(lang))
    }
    return resolve(lang)
  })
}

export const i18nRender = (key: string, values?: any[] | { [key: string]: any }) => {
  return i18n.t(`${key}`, values).toString()
}

export const hasMessage = (key: string) => {
  return Object.keys(i18n.messages[i18n.locale]).includes(key)
}

export default i18n
