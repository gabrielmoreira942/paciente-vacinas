<template>
  <div>
    <Sidebar :drawer="drawer"></Sidebar>
    <v-app-bar app :color="navbarColor">
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        color="white"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="white--text">{{ $route.name }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text class="white--text" to="/">Home</v-btn>
      <v-btn text class="white--text" to="/about">Sobre</v-btn>
    </v-app-bar>
  </div>
</template>


<script>
import Sidebar from "./Sidebar";
export default {
  name: "PacienteVacinasNavbar",
  components: {
    Sidebar,
  },
  data() {
    return {
      drawer: false,
    };
  },
  mounted() {
  },

  methods: {},
  computed: {
    navbarColor() {
      switch (this.$route.fullPath) {
        case "/patients":
          return "red";
        case "/patients/view":
          return "red";
        case "/":
          return "green";
        case "/vaccines":
          return "green";
        case "/vaccine_manager":
          return "blue";
        case "/vaccine_manager/view":
          return "blue";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>