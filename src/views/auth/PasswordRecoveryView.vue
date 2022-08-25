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
            <p class="text-h5 text-center pt-5">Restaurar contraseña</p>
            <p class="text-center">Para generar el cambio de contraseña se le enviará un correo con un código de uso único que le permitirá generar el cambio en <b>las próximas 6 horas</b></p>

            <v-form @submit.prevent="sendMail()">
              <v-card-text>
                <v-text-field append-icon="mdi-card-account-details" name="user" label="Usuario" type="text" @keydown="disableEnter" v-model="user"
                  :rules="userRules"
                >
                </v-text-field>
                <v-text-field append-icon="mdi-email" name="email" label="Correo electrónico *" type="text" @keydown="disableEnter" v-model="email"
                  :rules="emailRules"
                >
                </v-text-field>
              </v-card-text>

              <v-alert v-if="showAlert" type="error">{{ alertMessage }}</v-alert>

              <v-row class="pt-5">
                <v-col cols="12" md="6" class="flex justify-center text-center">
                  <v-btn color="bg-lightBlue white--text px-sm-8" rounded type="submit">Recibir correo</v-btn>
                </v-col>
              </v-row>
            </v-form>
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
    email: null,
    user: null,
    showAlert: false,
    alertMessage: null,
    userRules: [(v) => (v !== null && v !== '') || 'Usuario no valida']
  }),
  methods: {
    sendMail () {
      if (this.email === '' || this.user === '' || this.email === null || this.user === null) {
        this.showAlert = true
        this.alertMessage = 'Debe ingresar un correo y usuario válido'
        setTimeout(() => {
          this.showAlert = false
          this.alertMessage = null
        }, 2000)
      } else {
        const loader = this.$loading.show(this.$store.state.defaultLoading)
        setTimeout(() => {
          this.$router.replace('/passwordCode')
          loader.hide()
        }, 2000)
      }
    }
  },
  computed: {
    emailRules () {
      return [
        (v) => (this.isEmail(v)) || "El correo ingresado no es válido"
      ]
    }
  }
}
</script>
