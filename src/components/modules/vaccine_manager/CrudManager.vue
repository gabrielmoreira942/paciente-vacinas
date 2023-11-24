<template>
  <div>
    <v-row>
      <v-col class="d-flex justify-end">
        <v-dialog max-width="600" v-model="getVaccineManagerDialog" persistent>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              @click="createDialog()"
              color="primary"
              v-bind="attrs"
              v-on="on"
              id="cadastrar_adm_vacina"
              >Cadastrar</v-btn
            >
          </template>
          <v-form @submit.prevent="crud()" ref="send">
            <v-card>
              <v-toolbar color="primary" dark>
                {{ getActionVaccineManager }} Vacinação
              </v-toolbar>
              <v-card-text>
                <!-- ANCHOR - ADMINISTRAR VACINAS -->
                <v-text-field
                  class="mt-3"
                  label="Data da vacinação"
                  outlined
                  v-model="getVaccineManager.lastDateOfVaccine"
                  type="date"
                  :rules="rules"
                  :max="currentDate()"
                ></v-text-field>
                <v-select
                  label="Paciente"
                  id="paciente"
                  item-text="name"
                  item-value="id"
                  :rules="rules"
                  :items="patientSelect"
                  v-model="getVaccineManager.idPatient"
                  clearable
                  :disabled="getDisabledVaccineManager"
                  outlined
                ></v-select>
                <v-select
                  label="Vacina"
                  id="vacina"
                  item-text="manufacturer"
                  :rules="rules"
                  item-value="id"
                  :items="vaccineSelect"
                  v-model="getVaccineManager.idVaccine"
                  clearable
                  :disabled="getDisabledVaccineManager"
                  outlined
                ></v-select>
                <v-text-field
                  label="Nome do profissional de enfermagem"
                  :rules="rules"
                  id="nurse"
                  v-model="getVaccineManager.nurseProfessional.name"
                  outlined
                ></v-text-field>
                <v-text-field
                  label="CPF do profissional de enfermagem"
                  :rules="rules"
                  v-model="getVaccineManager.nurseProfessional.cpf"
                  id="cpf"
                  v-mask="'###.###.###-##'"
                  outlined
                ></v-text-field>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn @click="closeDialog()" text>Fechar</v-btn>
                <v-btn color="primary" :loading="loadingBtn" type="submit">{{
                  getActionVaccineManager
                }}</v-btn>
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
import {
  editPatient,
  deletePatient,
  getPatient,
} from "@/services/PatientServices";
import { getVaccine } from "@/services/VaccineServices";
import {
  createVaccineManager,
  editVaccineManager,
} from "@/services/VaccineManagerServices";
import { mapActions, mapGetters } from "vuex";

export default {
  props: {},
  data() {
    return {
      loadingBtn: false,
      step: 0,
      patientSelect: [],
      rules: [(v) => !!v || "Campo obrigatório"],
      vaccineSelect: [],
      btnNext: "Cadastrar",
      vaccineManager: {
        idPatient: "",
        idVaccine: "",
        lastDateOfVaccine: "",
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
      "getVaccineManagerDialog",
      "getActionVaccineManager",
      "getDisabledVaccineManager",
    ]),
  },
  methods: {
    ...mapActions([
      "changeVaccineManager",
      "changeVaccineManagerDialog",
      "changeVaccineManagerDialogDelete",
      "changeActionVaccineManager",
      "changeDisabledVaccineManager",
    ]),
    async crud() {
      if (this.$refs.send.validate()) {
        switch (this.getActionVaccineManager) {
          case "Cadastrar":
            this.createRequest(this.getVaccineManager);
            break;
          case "Adicionar":
            this.editRequest(this.getVaccineManager);
            break;
          case "Excluir":
            this.deleteRequest(this.getVaccineManager);
            break;
        }
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
    createDialog() {
      this.changeActionVaccineManager("Cadastrar");
      this.changeVaccineManagerDialog(true);
      this.changeDisabledVaccineManager(false);
    },
    closeDialog() {
      this.changeVaccineManagerDialog(false);
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
      this.changeVaccineManagerDialog(false);
      this.changeVaccineManagerDialogDelete(false);
      this.$eventBus.$emit("refresh-vaccine-manager", true);
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
  },
};
</script>