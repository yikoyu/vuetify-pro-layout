import { defineComponent, ref, unref, inject, provide, toRefs } from '@vue/composition-api'
import type { Ref, InjectionKey, PropType, ToRefs } from '@vue/composition-api'
import type { ContextInstance } from '@/type'

const key: InjectionKey<Ref<ContextInstance>> = Symbol('vuetify-pro-layout')

export function createContext() {
  return defineComponent({
    props: {
      value: {
        type: Object as PropType<ContextInstance>,
        required: true
      }
    },
    setup(props, { slots }) {
      const { value } = toRefs(props)

      provide(key, value)
      return () => slots.default?.()
    }
  })
}

export function injectContext(defaultValue?: ContextInstance): ToRefs<Readonly<ContextInstance>> {
  const context = inject(key, ref(defaultValue) as Ref<ContextInstance>)

  return toRefs(unref(context))
}
