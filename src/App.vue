<template>
  <v-app>
    <Navbar></Navbar>
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "./components/layouts/Navbar.vue";

export default {
  name: "App",
  data: () => ({}),
  components: { Navbar },
};
</script>
