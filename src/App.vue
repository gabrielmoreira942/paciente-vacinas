<template>
  <v-app>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "./components/layouts/Navbar.vue";
import BaseTransition from "./components/layouts/transitions/BaseTransition.vue";
export default {
  name: "App",
  data: () => ({}),
  components: { Navbar, BaseTransition },
};
</script>
