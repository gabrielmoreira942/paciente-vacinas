<template>
  <v-navigation-drawer app :value="drawer" class="border-right grey lighten-4">
    <v-list>
      <v-list-item link to="/patients" class="mt-2">
        <v-list-item-content>
          <v-list-item-title>
              Pacientes
              <v-icon color="red">mdi-heart-plus-outline</v-icon>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link class="mt-2" to="vaccines">
        <v-list-item-content>
          <v-list-item-title>
              Vacinas
              <v-icon color="green">mdi-needle</v-icon>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link class="mt-2" to="vaccine_manager">
        <v-list-item-content>
          <v-list-item-title
            >Administração
            <v-icon color="blue">mdi-hospital-building</v-icon>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
  
  <script>
export default {
  props: {
    drawer: Boolean,
  },
};
</script>
