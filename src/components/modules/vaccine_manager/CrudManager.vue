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
                  v-model="getVaccineManager.vaccineDate"
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
                  outlined
                ></v-text-field>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn @click="closeDialog()" text>Fechar</v-btn>
                <v-btn
                  color="primary"
                  :loading="loadingBtn"
                  type="submit"
                  >{{ getActionVaccineManager }}</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-form>
        </v-dialog>
        <v-dialog v-model="getVaccineManagerDialogDelete" max-width="500px">
          <v-card>
            <v-card-title>Confirmação de Exclusão</v-card-title>
            <v-card-text>
              Tem certeza de que deseja excluir este item?
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn @click="changeVaccineManagerDialogDelete(false)"
                >Cancelar</v-btn
              >
              <v-btn color="error" @click="crud()">Confirmar</v-btn>
            </v-card-actions>
          </v-card>
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
import { createVaccineManager, editVaccineManager } from "@/services/VaccineManagerServices";
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
      "getVaccineManagerDialog",
      "getActionVaccineManager",
    ]),
  },
  methods: {
    ...mapActions([
      "changeVaccineManager",
      "changeVaccineManagerDialog",
      "changeVaccineManagerDialogDelete",
      "changeActionVaccineManager",
    ]),
    async crud() {
      if (this.$refs.send.validate()) {
        switch (this.getActionVaccineManager) {
          case "Cadastrar":
            this.createRequest(this.getVaccineManager);
            break;
          case "Editar":
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
      await createVaccineManager(this.getVaccineManager);
      this.setLoading();
      this.refresh();
    },
    async editRequest() {
      this.setLoading();
      await editVaccineManager(this.getVaccineManager);
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
    },
    closeDialog() {
      this.changeVaccineManagerDialog(false);
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