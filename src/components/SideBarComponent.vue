<template>
  <v-navigation-drawer
    :mini-variant="showMenu"
    permanent
    color="white"
    class="hola"
  >
    <div class="px-2 py-2 aside-header">
      <div class="aside-header--logo">
        <img src="./../assets/logo.png" />
      </div>

      <div class="aside-header--action">
        <v-btn icon @click.stop="toggleMenu(!showMenu)">
          <v-icon class="lightBlue">mdi-chevron-left</v-icon>
        </v-btn>
      </div>
    </div>

    <v-divider></v-divider>

    <v-list nav dense>
      <v-list-item-group
        v-model="selectedItem"
        color="primary"
      >
        <v-list-item
          v-for="(option, key) in menuOptions"
          :key="key"
          :to="option.route"
        >
          <v-list-item-icon>
            <v-icon v-text="option.icon"></v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title v-text="option.name"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
aside {
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.05);
}

.aside-header {
  display: grid;
  grid-template-columns: 85% 15%;
  align-items: center;
}

.aside-header--logo {
  text-align: center;
}

.aside-header--logo img {
  width: 75%;
}

.aside-header--action {
  text-align: center;
}

@media (max-width: 940px) {
 .aside-header--logo img {
    width: 50%;
  }
}
</style>

<script>
import { mapMutations, mapState } from "vuex"

export default {
  name: "SideBarComponent",
  data: () => ({
    selectedItem: 0
  }),
  methods: {
    ...mapMutations({
      toggleMenu: "TOGGLE_MENU"
    })
  },
  computed: {
    ...mapState(["showMenu", "menuOptions"])
  }
}
</script>
