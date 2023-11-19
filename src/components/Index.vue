  <template>
  <div>
    <div>
      <div class="d-flex mt-5">
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

          <v-btn color="primary" to="vaccine_manager" text> Acessar </v-btn>
        </v-card>
      </div>
      <div>
        <v-card class="mx-auto mt-2" max-width="344">
          <v-img src="../assets/mocks_logo.png" height="200px"></v-img>
          <v-card-title>Mocks</v-card-title>
          <v-row>
            <v-col class="d-flex justify-center">
              <v-btn
                color="primary"
                :loading="loadingBtn"
                text
                @click="patientMocks()"
              >
                Pacientes
              </v-btn>
              <v-btn
                color="primary"
                :loading="loadingBtn"
                text
                @click="vaccineMocks()"
              >
                Vacinas
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </div>
      <template>
        <div class="text-center ma-2">
          <v-snackbar color="green" v-model="snackbar">
            {{ resultMock }}

            <template v-slot:action="{ attrs }">
              <v-btn
                color="white"
                text
                v-bind="attrs"
                @click="snackbar = false"
              >
                Fechar
              </v-btn>
            </template>
          </v-snackbar>
        </div>
      </template>
    </div>
  </div>
</template>
  </div>
  </div>
</template>
<script>
import { mockVaccine } from "@/services/VaccineServices";
import { mockPatient } from "@/services/PatientServices";
export default {
  data: () => ({
    loadingBtn: false,
    resultMock: "",
    snackbar: false,
  }),

  methods: {
    async vaccineMocks() {
      this.setLoading();
      this.resultMock = await mockVaccine();
      this.snackbar = true;
      this.setLoading();
    },

    async patientMocks() {
      this.setLoading();
      this.resultMock = await mockPatient();
      this.snackbar = true;

      this.setLoading();
    },

    setLoading() {
      this.loadingBtn = !this.loadingBtn;
    },
  },
};
</script>
<style>
</style>



