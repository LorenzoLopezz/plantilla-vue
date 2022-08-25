<template>
  <v-app v-if="isUserAuthenticated">
    <NavBar/>
    <div class="mainContainer mainContainer-fold" id="mainContainer">
      <SideBar class="sideBar"/>
      <v-main class="mainContent">
        <router-view/>
      </v-main>
    </div>
    <Footer/>
  </v-app>

  <v-app v-else>
    <v-main>
      <router-view/>
    </v-main>
    <Footer/>
  </v-app>
</template>

<style>
@import '@/assets/css/main.css';
</style>

<script>
import Footer from './components/FooterComponent.vue'
import NavBar from './components/NavBarComponent.vue'
import SideBar from './components/SideBarComponent.vue'

export default {
  name: 'App',
  components: {
    Footer,
    NavBar,
    SideBar
  },
  data: () => ({}),
  computed: {
    isUserAuthenticated: function () {
      return this.$store.state.isUserAuthenticated
    }
  }
}
</script>
