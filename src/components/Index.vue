  <template>
  <div class="d-flex">
    <v-card class="mx-auto" max-width="344">
      <v-img src="../assets/patient_logo.png" height="200px"></v-img>

      <v-card-title> Consultar Pacientes </v-card-title>

      <v-btn color="primary" to="patients" text> Acessar </v-btn>
    </v-card>
    <v-card class="mx-auto" max-width="344">
      <v-img src="../assets/vaccine_logo.png" height="200px"></v-img>

      <v-card-title> Consultar Vacinas </v-card-title>

      <v-btn color="primary" to="vaccines" text> Acessar </v-btn>
    </v-card>
    <v-card class="mx-auto" max-width="344">
      <v-img src="../assets/manager_logo.png" height="200px"></v-img>

      <v-card-title> Administrar Vacinas </v-card-title>

      <v-btn color="primary" to="vaccines" text> Acessar </v-btn>
    </v-card>
  </div>
</template>
<script>
export default {
  data: () => ({
    show: false,
  }),
};
</script>




