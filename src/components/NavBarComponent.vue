<template>
  <v-app-bar fixed elevate-on-scroll color="blue-grey lighten-5">
    <v-row >
      <v-col cols="4" sm="4" md="3" align-self="center">
        <v-icon @click.stop="toggleMenu(!showMenu)" class="lightBlue">mdi-menu</v-icon>
      </v-col>
      <v-col cols="4" sm="4" md="6" class="text-center" align-self="center">
        <div style="height: 100%; overflow: hidden;">
          <img src="@/assets/logo.svg" width="40px"/>
        </div>
      </v-col>
      <v-col sm="4" md="2" align-self="center" class="text-end header-username">
        <span>{{ this.$store.state.completeName }}</span>
      </v-col>
      <v-col cols="4" sm="4" md="1" align-self="center" class="header-logoutbtn">
        <v-icon @click.stop="closeSession()" class="lightBlue">mdi-logout</v-icon>
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<style scoped>
.header-username {
  display: block;
}

.header-logoutbtn {
  text-align: center;
}

@media (max-width: 920px) {
  .header-username {
    display: none;
  }

  .header-logoutbtn {
    text-align: end;
  }
}
</style>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'NavBar',
  methods: {
    ...mapMutations({
      toggleMenu: 'TOGGLE_MENU',
      logout: 'LOGOUT'
    }),
    closeSession () {
      const loader = this.$loading.show({
        isFullPage: true,
        canCancel: false,
        color: '#175EFB',
        opacity: 1
      })

      this.$store.dispatch('logoutAction').then(() => {
        loader.hide()
      })
    }
  },
  computed: {
    ...mapState(['showMenu', 'isUserAuthenticated'])
  }
}
</script>
