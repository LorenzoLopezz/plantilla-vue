import Vue from 'vue'
import store from '@/store'
import VueRouter from 'vue-router'
import axios from 'axios'
import LoginView from '../views/auth/LoginView.vue'
import PasswordRecoveryView from '../views/auth/PasswordRecoveryView.vue'
import PasswordCodeView from '../views/auth/PasswordCodeView.vue'
import DashboardView from '../views/user/DashboardView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'auth',
    component: LoginView
  },
  {
    path: '/passwordRecovery',
    name: 'passwordRecovery',
    component: PasswordRecoveryView
  },
  {
    path: '/passwordCode',
    name: 'passwordCode',
    component: PasswordCodeView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async function (to, from, next) {
  const loader = Vue.$loading.show(store.state.defaultLoading)
  const routesNoLoginNecessary = ['auth', 'passwordRecovery', 'passwordCode']
  const refreshToken = localStorage.getItem('refreshToken')

  if (!routesNoLoginNecessary.includes(to.name) && refreshToken !== null) {
    let tokenValidation = null

    await axios.get(process.env.VUE_APP_API_REFRESH_TOKEN, {
      refreshToken
    }).then(response => {
      if (response.data.status === 200) {
        tokenValidation = response.data.data
      }
      loader.hide()
    }).catch(error => {
      console.log(error)
      loader.hide()
    })

    if (tokenValidation !== null) {
      if (tokenValidation.valid) {
        await store.dispatch('setUserAutentication', { isUserAuthenticated: true, refreshToken: refreshToken, completeName: tokenValidation.completeName })
        await store.dispatch('setMenuOptions')
        if (store.state.menuOptions.length === 0) {
          await store.dispatch('logoutAction')
          return { name: 'auth' }
        } else {
          next()
        }
      } else {
        await store.dispatch('logoutAction')
        return { name: 'auth' }
      }
    } else {
      await store.dispatch('logoutAction')
      return { name: 'auth' }
    }
  } else if (routesNoLoginNecessary.includes(to.name) && refreshToken !== null) {
    next({ name: 'dashboard' })
    loader.hide()
  } else if (!routesNoLoginNecessary.includes(to.name) && refreshToken === null) {
    next({ name: 'auth' })
    loader.hide()
  } else {
    next()
    loader.hide()
  }
})

export default router
