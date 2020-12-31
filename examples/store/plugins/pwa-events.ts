import { Store } from 'vuex'
import { IRootState, ROOT_DISPATCH } from '@/store'

import { IN_BROWSER } from '@/utils/globals'

const pwa = (store: Store<IRootState>) => {
  if (!IN_BROWSER) return

  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault()
    store.dispatch('pwa/set_install_prompt', e, ROOT_DISPATCH)
    store.dispatch('pwa/set_can_install', true, ROOT_DISPATCH)
  })

  document.addEventListener('swUpdated', (e: any) => {
    store.dispatch('pwa/set_update_detail', e.detail, ROOT_DISPATCH)
    store.dispatch('pwa/set_update_available', true, ROOT_DISPATCH)
  })
}

export default pwa
