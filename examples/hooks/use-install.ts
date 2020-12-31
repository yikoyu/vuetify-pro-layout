import { computed, Ref } from '@vue/composition-api'
import store from '@/store'

import defaultSettings from '@/config/defaultSettings'

export default function useInstall() {
  const title: Ref<string> = computed(() => defaultSettings.title)
  const canInstall = computed(() => store.state.pwa.canInstall)
  const updateAvailable = computed(() => store.state.pwa.updateAvailable)

  function promptInstaller() {
    store.dispatch('pwa/promptInstaller')
  }

  function refreshContent() {
    store.dispatch('pwa/refreshContent')
  }

  return {
    title,
    canInstall,
    updateAvailable,
    promptInstaller,
    refreshContent
  }
}
