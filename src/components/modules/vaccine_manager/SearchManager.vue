<template>
  <div>
    <v-row>
      <v-col class="d-flex">
        <!-- ANCHOR - FILTRAR POR VACINAÇÃO -->
        <v-dialog max-width="600" v-model="filterVaccineDialog" persistent>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              @click="filterVaccineDialog()"
              color="primary"
              v-bind="attrs"
              v-on="on"
              id="filter_manager"
              >Filtrar por vacinação</v-btn
            >
          </template>
          <v-form @submit.prevent="filterVaccine()" ref="filterVaccine">
            <v-card>
              <v-toolbar color="primary" dark>
                Filtrar por vacinação
              </v-toolbar>
              <v-card-text>
                <!-- ANCHOR - FILTRAR VACINAS -->
                <v-row>
                  <v-col md="6">
                    <v-select
                      label="Vacina"
                      id="vacina"
                      item-text="manufacturer"
                      :rules="rules"
                      item-value="manufacturer"
                      :items="vaccineSelect"
                      v-model="searchVaccine.manufacturer"
                      clearable
                      outlined
                    ></v-select>
                  </v-col>
                  <v-col md="6">
                    <v-text-field
                      label="Estado"
                      id="vacina"
                      v-model="searchVaccine.state"
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn @click="closeFilterVaccine()" text>Fechar</v-btn>
                <v-btn color="primary" :loading="loadingBtn" type="submit"
                  >Filtrar</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-form>
        </v-dialog>
        <v-dialog max-width="600" v-model="filterPatientDialog" persistent>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="ml-2"
              @click="filterPatientDialog()"
              color="primary"
              v-bind="attrs"
              v-on="on"
              id="filter_manager"
              >Filtrar por paciente</v-btn
            >
          </template>
          <v-form @submit.prevent="filterPatient()" ref="filterPatient">
            <v-card>
              <v-toolbar color="primary" dark> Filtrar por paciente </v-toolbar>
              <v-card-text>
                <!-- ANCHOR - FILTRAR POR PACIENTE -->
                <v-row>
                  <v-col md="6">
                    <v-select
                      label="Paciente"
                      id="paciente"
                      item-text="name"
                      item-value="id"
                      :rules="rules"
                      :items="patientSelect"
                      v-model="searchPatient.id"
                      clearable
                      outlined
                    ></v-select>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn @click="closeFilterPatient()" text>Fechar</v-btn>
                <v-btn color="primary" :loading="loadingBtn" type="submit"
                  >Filtrar</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-form>
        </v-dialog>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { clearObject } from "@/utils/ClearValues";
import { deletePatient, getPatient } from "@/services/PatientServices";
import { getVaccine } from "@/services/VaccineServices";
import {
  createVaccineManager,
  editVaccineManager,
  filterVaccineManager,
  filterPatientManager,
} from "@/services/VaccineManagerServices";
import { mapActions, mapGetters } from "vuex";

export default {
  props: {},
  data() {
    return {
      loadingBtn: false,
      filterVaccineDialog: false,
      filterPatientDialog: false,
      step: 0,
      patientSelect: [],
      rules: [(v) => !!v || "Campo obrigatório"],
      vaccineSelect: [],
      searchVaccine: {
        manufacturer: "",
        state: "",
      },
      searchPatient: {
        id: "",
      },
      btnNext: "Cadastrar",
      vaccineManager: {
        idPatient: "",
        idVaccine: "",
        vaccineDate: "",
        nurseProfessional: {
          name: "",
          cpf: "",
        },
      },
    };
  },
  async created() {
    this.getPatientRequest();
    this.vaccineSelect = await getVaccine();
    this.changeVaccineManager(this.vaccineManager);
  },
  computed: {
    ...mapGetters([
      "getVaccineManager",
      "getActionVaccineManager",
      "getDisabledVaccineManager",
      "getVaccineManagerDialog",
      "getVaccineManagerSearchDialog",
    ]),
  },
  methods: {
    ...mapActions([
      "changeVaccineManager",
      "changeVaccineManagerDialogDelete",
      "changeActionVaccineManager",
      "changeDisabledVaccineManager",
      "changeVaccineManagerDialog",
      "changeVaccineManagerSearchDialog",
    ]),
    async filterVaccine() {
      if (this.$refs.filterVaccine.validate()) {
        this.setLoading();
        let result = await filterVaccineManager(this.searchVaccine);
        console.log(result);
        if (result.status == "error") {
          return this.setLoading();
        }
        this.setLoading();
        this.refresh();
      }
    },
    async filterPatient() {
      if (this.$refs.filterPatient.validate()) {
        this.setLoading();
        let result = await filterPatientManager(this.searchPatient.id);
        if (result.status == "error") {
          return this.setLoading();
        }
        this.setLoading();
        this.refresh();
      }
    },
    async createRequest() {
      this.setLoading();
      const { status } = await createVaccineManager(this.getVaccineManager);
      if (status == "error") {
        return this.setLoading();
      }
      this.setLoading();
      this.refresh();
    },
    async editRequest() {
      this.setLoading();
      const { status } = await editVaccineManager(this.getVaccineManager);
      if (status == "error") {
        return this.setLoading();
      }
      this.setLoading();
      this.refresh();
    },
    async deleteRequest() {
      this.setLoading();
      await deletePatient(this.getVaccineManager);
      this.setLoading();
      this.refresh();
    },
    async getPatientRequest() {
      let patient = [];
      patient = await getPatient();
      patient.map((item, i) => {
        patient[i].name = patient[i].firstName + " " + patient[i].lastName;
      });
      this.patientSelect = patient;
    },
    filterVaccineDialog() {
      this.filterVaccineDialog = true;
    },
    filterPatientDialog() {
      this.filterPatientDialog = true;
    },
    closeFilterVaccine() {
      this.filterVaccineDialog = false;
      this.$refs.send.resetValidation();
    },
    closeFilterPatient() {
      this.filterPatientDialog = false;
      this.$refs.send.resetValidation();
    },
    // !SECTION

    // SECTION - UTILS
    currentDate() {
      const today = new Date();
      const year = today.getFullYear();
      let month = today.getMonth() + 1;
      let day = today.getDate();
      month = month < 10 ? `0${month}` : month;
      day = day < 10 ? `0${day}` : day;
      return `${year}-${month}-${day}`;
    },
    setLoading() {
      this.loadingBtn = !this.loadingBtn;
    },
    refresh() {
      this.step = 0;
      this.changeVaccineManagerDialog(false);
      this.changeVaccineManagerDialogDelete(false);
      this.$eventBus.$emit("refresh-patient", true);
      clearObject(this.getVaccineManager);
    },
    // !SECTION
  },
  watch: {
    getVaccineManagerDialog(e) {
      if (e == false) {
        clearObject(this.getVaccineManager);
      }
    },
    getVaccineManagerDialogDelete(e) {
      if (e == false) {
        clearObject(this.getVaccineManager);
      }
    },
  },
};
</script>