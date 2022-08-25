import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import * as types from './MutationsTypes'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isUserAuthenticated: false,
    completeName: null,
    defaultLoading: {
      isFullPage: true,
      canCancel: false,
      color: '#175EFB'
    },
    showMenu: true,
    menuOptions: []
  },
  getters: {
  },
  mutations: {
    [types.TOGGLE_MENU] (state, showMenu) {
      if (!showMenu) {
        document.querySelector('#mainContainer').classList.remove('mainContainer-fold')
      } else {
        document.querySelector('#mainContainer').classList.add('mainContainer-fold')
      }
      state.showMenu = showMenu
    },
    [types.SET_USER_AUTH] (state, { isUserAuthenticated, refreshToken, completeName }) {
      state.isUserAuthenticated = isUserAuthenticated
      state.completeName = completeName
      localStorage.setItem('refreshToken', refreshToken)
    },
    [types.LOGOUT] (state) {
      state.isUserAuthenticated = false
      state.menuOptions = []
      localStorage.removeItem('refreshToken')
    },
    [types.MENU_OPTIONS] (state, options) {
      state.menuOptions = options
    }
  },
  actions: {
    async setUserAutentication (context, autenticationData) {
      if (autenticationData.isUserAuthenticated) {
        context.commit(types.SET_USER_AUTH, autenticationData)
      } else {
        context.commit(types.LOGOUT)
      }
    },
    async setMenuOptions (context) {
      await axios.get('/menuOptions.json').then((response) => {
        if (response.data.options.length > 0) context.commit(types.MENU_OPTIONS, response.data.options)
      }).catch(() => {
        console.log('Usuario sin accesos autorizados')
      })
    },
    async logoutAction (context) {
      const refreshToken = localStorage.getItem('refreshToken')
      await axios.get(process.env.VUE_APP_API_LOGOUT, {
        refreshToken
      }).then(response => {
        if (response.data.status === 200) {
          context.commit('LOGOUT')
          location.replace('/')
        }
      }).catch(error => {
        console.log(error)
      })
    }
  },
  modules: {
  }
})
