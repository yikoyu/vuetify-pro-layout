// Pathify
import { Commit } from 'vuex'

import { BeforeInstallPromptEvent } from '@/interface'

export interface IPwa {
  canInstall: boolean
  installPrompt: BeforeInstallPromptEvent | null
  updateAvailable: boolean
  updateDetail: any
}

type context = { state: IPwa; commit: Commit }

const state: IPwa = {
  canInstall: false,
  installPrompt: null,
  updateAvailable: false,
  updateDetail: null
}

const mutations = {
  SET_CAN_INSTALL(state: IPwa, canInstall: boolean): void {
    state.canInstall = canInstall
  },

  SET_INSTALL_PROMPT(state: IPwa, installPrompt: BeforeInstallPromptEvent): void {
    state.installPrompt = installPrompt
  },

  SET_UPDATE_AVAILABLE(state: IPwa, updateAvailable: boolean): void {
    state.updateAvailable = updateAvailable
  },

  SET_UPDATE_DETAIL(state: IPwa, updateDetail: any): void {
    state.updateDetail = updateDetail
  }
}

const actions = {
  set_can_install({ commit, state }: context, canInstall: boolean): void {
    commit('SET_CAN_INSTALL', canInstall)
  },
  set_install_prompt({ commit, state }: context, installPrompt: BeforeInstallPromptEvent): void {
    commit('SET_INSTALL_PROMPT', installPrompt)
  },
  set_update_available({ commit, state }: context, updateAvailable: boolean): void {
    commit('SET_UPDATE_AVAILABLE', updateAvailable)
  },
  set_update_detail({ commit, state }: context, updateDetail: any): void {
    commit('SET_UPDATE_DETAIL', updateDetail)
  },
  promptInstaller({ commit, state }: context) {
    commit('SET_CAN_INSTALL', false)
    state.installPrompt!.prompt()
    state.installPrompt!.userChoice.then(choice => {
      if (choice.outcome === 'accepted') {
        console.log('Installation Accepted')
      } else {
        console.log('Installation Denied')
      }
      commit('SET_INSTALL_PROMPT', null)
    })
  },
  refreshContent({ commit, state }: context) {
    commit('SET_UPDATE_AVAILABLE', false)
    if (!state.updateDetail || !state.updateDetail.waiting) return
    state.updateDetail.waiting.postMessage('skipWaiting')
  }
}

export const PwaModule = {
  namespaced: true,
  state,
  mutations,
  actions
}
