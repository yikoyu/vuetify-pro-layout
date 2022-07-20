import type { SetupContext } from 'vue-demi'
import type { Settings } from '@/type'

export interface EmitType extends Settings {
  setting: boolean
}

export type EmitKey = keyof EmitType

export function useEmitChange(emit: SetupContext['emit']) {
  function onEmitChange<T extends EmitKey = EmitKey>(type: T, value?: EmitType[T]) {
    emit('setting-change', { type, value })
  }

  return {
    onEmitChange
  }
}
