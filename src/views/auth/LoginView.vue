<template>
  <v-main>
    <v-container fluid fill-height style="margin-bottom: 60px;">
      <v-layout justify-center>
        <v-flex xs12 sm8 md6 lg4 xl3>
          <v-img
            class="mx-auto d-flex mb-2"
            src="@/assets/logo.png"
            max-width="350"
          />
          <v-card class="pa-2 pa-sm-10" rounded="lg" :elevation="5">
            <p class="text-h5 text-center pt-5">
              Inicie sesión para continuar
            </p>

            <v-form @submit.prevent="login()">
              <v-card-text>
                <v-text-field
                  append-icon="mdi-card-account-details"
                  name="user"
                  label="Usuario"
                  type="text"
                  @keydown="disableEnter"
                  v-model="user"
                  :rules="userRules"
                >
                </v-text-field>

                <v-text-field
                  append-icon="mdi-eye"
                  id="password"
                  name="password"
                  v-model="password"
                  label="Contraseña *"
                  :type="showPassword ? 'text' : 'password'"
                  :rules="passwordRules"
                >
                  <template #append>
                    <v-icon v-if="!showPassword" @click="showPassword = !showPassword">mdi-eye</v-icon>
                    <v-icon v-else @click="showPassword = !showPassword">mdi-eye-off</v-icon>
                  </template>
                </v-text-field>
              </v-card-text>

              <v-alert v-if="showAlert" type="error">{{ errorMessage }}</v-alert>

              <v-row class="pt-5">
                <v-col cols="12" md="6" class="flex justify-center text-center">
                  <v-btn color="bg-lightBlue white--text px-sm-8" rounded type="submit" id="loginBtn">iniciar sesión</v-btn>
                </v-col>
              </v-row>

              <v-row class="pa-0 ma-0">
                <v-btn text style="text-transform: none" color="lightBlue" class="mt-2 mx-auto" rounded to="/passwordRecovery">Olvidaste tu contraseña?</v-btn>
              </v-row>
            </v-form>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-main>
</template>

<script>
import { mapMutations } from 'vuex'
import '@/plugins/utils'

export default {
  name: 'LoginView',
  data: () => ({
    showAlert: false,
    errorMessage: null,
    user: null,
    password: null,
    userRules: [(v) => (v !== null && v !== '') || 'Usuario no valida'],
    passwordRules: [(v) => (v !== null && v !== '') || 'Contraseña no valida'],
    showPassword: false
  }),
  methods: {
    ...mapMutations({
      createSession: 'SET_USER_AUTH'
    }),
    async login () {
      if (this.user === '' || this.password === '' || this.user === null || this.password === null) {
        this.showAlert = true
        this.errorMessage = 'Debe ingresar usuario y contraseña para acceder'
        setTimeout(() => {
          this.showAlert = false
          this.errorMessage = null
        }, 2000)
      } else {
        document.querySelector('#loginBtn').disabled = true
        // Check the credentials in API
        const loader = this.$loading.show(this.$store.state.defaultLoading)
        // Primero valido los accesos del usuario
        await this.$store.dispatch('setMenuOptions')

        // Si el usuario cuenta con accesos entonces permitimos la creación de sesión
        if (this.$store.state.menuOptions.length > 0) {
          await this.$axios.get(process.env.VUE_APP_API_LOGIN).then(response => {
            if (response.data.estado) {
              this.createSession({
                isUserAuthenticated: true,
                refreshToken: response.data.token,
                completeName: response.data.completeName
              })
              this.$router.replace('/dashboard')
            } else {
              this.showAlert = true
              this.errorMessage = 'Las crendenciales ingresadas no han podido ser validadas'
              setTimeout(() => {
                this.showAlert = false
                this.errorMessage = null
              }, 6000)
            }
          }).catch(error => {
            console.log(error)
          })
        } else {
          this.showAlert = true
          this.errorMessage = 'El usuario no cuenta con accesos asignados'
          setTimeout(() => {
            this.showAlert = false
            this.errorMessage = null
          }, 6000)
        }

        document.querySelector('#loginBtn').disabled = false
        loader.hide()
      }
    }
  },
  computed: {
  }
}
</script>
