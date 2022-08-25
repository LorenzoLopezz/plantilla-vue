<template>
  <v-main>
    <v-container fluid fill-height style="margin-bottom: 60px;">
      <v-layout justify-center>
        <v-flex xs12 sm8 md6 lg4 xl3>
          <v-img class="mx-auto d-flex mb-2" src="@/assets/logo.png" max-width="350"/>

          <v-card class="pa-2 pa-sm-10" rounded="lg" :elevation="5" v-if="!codeIsValid">
            <p class="text-h5 text-center pt-5">Ingrese el código recibido para restaurar su contraseña</p>

            <v-card-text>
              <v-otp-input length="6" @finish="validateCode"></v-otp-input>
              <v-alert v-if="showAlert" type="error">{{ alertMessage }}</v-alert>
            </v-card-text>
          </v-card>

          <v-card class="pa-2 pa-sm-10" rounded="lg" :elevation="5" v-if="codeIsValid && !showSuccess">
            <p class="text-h5 text-center pt-5">¡Excelente! Ahora puede cambiar su contraseña</p>

            <v-text-field append-icon="mdi-eye" id="password" name="password" v-model="newPassword" label="Ingrese nueva contraseña *"
              :type="showPassword ? 'text' : 'password'"
              :rules="passwordRules"
            >
              <template #append>
                <v-icon v-if="!showPassword" @click="showPassword = !showPassword">mdi-eye</v-icon>
                    <v-icon v-else @click="showPassword = !showPassword">mdi-eye-off</v-icon>
              </template>
            </v-text-field>
            <v-text-field append-icon="mdi-eye" id="passwordRepeat" name="passwordRepeat" v-model="repeatPassword" label="Repita su nueva contraseña *"
              :type="showPassword ? 'text' : 'password'"
              :rules="passwordRules"
            >
              <template #append>
                <v-icon v-if="!showPassword" @click="showPassword = !showPassword">mdi-eye</v-icon>
                <v-icon v-else @click="showPassword = !showPassword">mdi-eye-off</v-icon>
              </template>
            </v-text-field>

            <v-alert v-if="showAlert" type="error">{{ alertMessage }}</v-alert>

            <v-row class="pt-5">
              <v-col cols="12" md="6" class="flex justify-center text-center">
                <v-btn color="bg-lightBlue white--text px-sm-8" rounded type="button" @click.prevent="updatePassword">Actualizar contraseña</v-btn>
              </v-col>
            </v-row>
          </v-card>

          <v-card class="pa-2 pa-sm-10" rounded="lg" :elevation="5" v-if="showSuccess">
            <v-alert v-if="showSuccess" type="success" style="margin-bottom: 0px;">{{ successMessage }}</v-alert>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-main>
</template>

<script>
export default {
  name: 'PasswordRecoveryView',
  data: () => ({
    code: null,
    invalidCodeCounter: 0,
    newPassword: null,
    repeatPassword: null,
    showAlert: false,
    alertMessage: null,
    codeIsValid: false,
    showPassword: false,
    showSuccess: false,
    successMessage: null,
    passwordRules: [(v) => (v !== null && v !== '') || 'Contraseña no valida']
  }),
  methods: {
    validateCode (value) {
      if (value !== '123456') {
        if (this.invalidCodeCounter === 2) {
          this.showAlert = true
          this.alertMessage = 'Este usuario ha sido bloqueado, por favor contacte al administrador de este sistema'
          setTimeout(() => {
            this.$router.replace('/')
          }, 3000)
        } else {
          this.showAlert = true
          this.alertMessage = 'El código ingresado no es válido'
          this.invalidCodeCounter++

          setTimeout(() => {
            this.showAlert = false
            this.alertMessage = null
          }, 2000)
        }
      } else {
        const loader = this.$loading.show(this.$store.state.defaultLoading)
        setTimeout(() => {
          this.codeIsValid = true
          loader.hide()
        }, 2000)
      }
    },
    updatePassword () {
      if (this.newPassword === null || this.repeatPassword === null || this.newPassword === '' || this.repeatPassword === '') {
        this.showAlert = true
        this.alertMessage = 'Llenar todos los campos es requerido'
        setTimeout(() => {
          this.showAlert = false
          this.alertMessage = null
        }, 2000)
      } else if (this.newPassword !== this.repeatPassword) {
        this.showAlert = true
        this.alertMessage = 'Las contraseñas ingresadas no coinciden'
        setTimeout(() => {
          this.showAlert = false
          this.alertMessage = null
        }, 2000)
      } else {
        // Realizar actualización de contraseña
        const loader = this.$loading.show(this.$store.state.defaultLoading)
        setTimeout(() => {
          this.showSuccess = true
          this.successMessage = 'Su contraseña ha sido actualizada, a continuación inicie sesión con sus nuevas credenciales. Redireccionando...'
          loader.hide()
          setTimeout(() => {
            this.$router.replace('/')
          }, 2000)
        }, 2000)
      }
    }
  },
  computed: {}
}
</script>
