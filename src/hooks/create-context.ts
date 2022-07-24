import { defineComponent, unref, inject, provide, computed } from 'vue-demi'
import type { ComputedRef, InjectionKey, PropType } from 'vue-demi'
import { useLocale } from '@/locales'
import type { ContextInstance } from '@/type'

const key: InjectionKey<ComputedRef<ContextInstance>> = Symbol('vuetify-pro-layout')

export function createContext() {
  return defineComponent({
    props: {
      value: {
        type: Object as PropType<ContextInstance>,
        required: true
      }
    },
    setup(props, { slots }) {
      const { t } = useLocale()

      const values = computed<ContextInstance>(() => {
        const { value } = props

        return {
          ...value,
          i18nRender: value.i18nRender ? value.i18nRender : unref(t)
        }
      })

      provide(key, values)
      return () => slots.default?.()
    }
  })
}

export function injectContext(defaultValue?: ContextInstance) {
  const context = inject<ComputedRef<Required<ContextInstance>>>(key, computed(() => defaultValue) as ComputedRef<Required<ContextInstance>>)

  const title = computed<ContextInstance['title']>(() => unref(context).title)
  const logo = computed<ContextInstance['logo']>(() => unref(context).logo)
  const menu = computed<ContextInstance['menu']>(() => unref(context).menu)
  const collapsed = computed<ContextInstance['collapsed']>(() => unref(context).collapsed)
  const setting = computed<ContextInstance['setting']>(() => unref(context).setting)
  const settings = computed<ContextInstance['settings']>(() => unref(context).settings)
  const i18nRender = computed<NonNullable<ContextInstance['i18nRender']>>(() => unref(context).i18nRender)

  return {
    title,
    logo,
    menu,
    collapsed,
    setting,
    settings,
    i18nRender
  }
}
