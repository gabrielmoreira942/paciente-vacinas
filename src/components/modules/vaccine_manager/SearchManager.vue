<template>
  <div>
    <h3>Filtros <v-icon>mdi-filter</v-icon></h3>
    <v-row>
      <v-col class="d-flex">
        <!-- ANCHOR - FILTRAR POR VACINAÇÃO -->
        <v-dialog max-width="600" v-model="filterVaccineDialog" persistent>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              @click="filterVaccineDialog = true"
              color="primary"
              v-bind="attrs"
              v-on="on"
              id="filter_manager"
              >Fabricante</v-btn
            >
          </template>
          <v-form @submit.prevent="filterVaccine()" ref="filterVaccine">
            <v-card>
              <v-toolbar color="primary" dark>
                Filtrar por fabricante
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
                    <v-select
                      label="Estado"
                      id="vacina"
                      item-text="state"
                      item-value="state"
                      :items="stateSelect"
                      v-model="searchVaccine.state"
                      clearable
                      outlined
                    ></v-select>
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
              @click="filterPatientDialog = true"
              color="primary"
              v-bind="attrs"
              v-on="on"
              id="filter_manager"
              >Paciente</v-btn
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
        <v-dialog max-width="600" v-model="filterOverdueDialog" persistent>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="ml-2"
              @click="filterOverdueDialog = true"
              color="primary"
              v-bind="attrs"
              v-on="on"
              id="filter_manager"
              >Atrasadas</v-btn
            >
          </template>
          <v-form @submit.prevent="filterOverdue()" ref="filterOverdue">
            <v-card>
              <v-toolbar color="primary" dark> Vacinas atrasadas </v-toolbar>
              <v-card-text>
                <!-- ANCHOR - FILTRAR POR ATRASADAS -->
                <v-row>
                  <v-col md="6">
                    <v-select
                      label="Estado"
                      id="atrasadas"
                      item-text="state"
                      item-value="state"
                      :rules="rules"
                      :items="stateSelect"
                      v-model="searchOverdue.state"
                      clearable
                      outlined
                    ></v-select>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn @click="closeFilterOverdue()" text>Fechar</v-btn>
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
import { getPatient } from "@/services/PatientServices";
import { getVaccine } from "@/services/VaccineServices";
import { getStates, filterOverdueManager } from "@/services/VaccineManagerServices";
import {
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
      filterOverdueDialog: false,
      filterPatientDialog: false,
      step: 0,
      patientSelect: [],
      stateSelect: [],
      rules: [(v) => !!v || "Campo obrigatório"],
      vaccineSelect: [],
      searchVaccine: {
        manufacturer: "",
        state: "",
      },
      searchPatient: {
        id: "",
      },
      searchOverdue: {
        state: "",
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
    this.stateSelect = await getStates();
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
        if (result.status == "error") {
          return this.setLoading();
        }
        this.setLoading();
        this.refreshSearchManager(result);
        this.closeFilterVaccine();
      }
    },
    async filterOverdue() {
      if (this.$refs.filterOverdue.validate()) {
        this.setLoading();
        let result = await filterOverdueManager(this.searchOverdue.state);
        if (result.status == "error") {
          return this.setLoading();
        }
        this.setLoading();
        this.refreshSearchManager(result);
        this.closeFilterOverdue();
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
        this.refreshSearchManager(result);
        this.closeFilterPatient();
      }
    },
    async getPatientRequest() {
      let patient = [];
      patient = await getPatient();
      patient.map((item, i) => {
        patient[i].name = patient[i].firstName + " " + patient[i].lastName;
      });
      this.patientSelect = patient;
    },
    closeFilterVaccine() {
      this.filterVaccineDialog = false;
      for (let vaccine in this.searchVaccine) {
        this.searchVaccine[vaccine] = "";
      }
      this.$refs.filterVaccine.resetValidation();
    },
    closeFilterPatient() {
      this.filterPatientDialog = false;
      for (let patient in this.searchPatient) {
        this.searchPatient[patient] = "";
      }
      this.$refs.filterPatient.resetValidation();
    },
    closeFilterOverdue() {
      this.filterOverdueDialog = false;
      for (let overdue in this.searchOverdue) {
        this.searchOverdue[overdue] = "";
      }
      this.$refs.filterOverdue.resetValidation();
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
    refreshSearchManager(value) {
      this.$eventBus.$emit("refresh-search-manager", value);
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