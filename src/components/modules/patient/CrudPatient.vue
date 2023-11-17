<template>
  <div>
    <v-row>
      <v-col class="d-flex justify-end">
        <!-- <v-form > -->
        <v-dialog max-width="600" v-model="getDialog" persistent>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              @click="createDialog()"
              color="primary"
              v-bind="attrs"
              v-on="on"
              id="cadastro_paciente"
              >Cadastrar</v-btn
            >
          </template>
          <v-card>
            <v-toolbar color="primary" dark>
              {{ getAction }} Paciente
            </v-toolbar>
            <v-card-text>
              <!-- ANCHOR - DADOS PESSOAIS -->
              <div v-if="step == 0">
                <v-text-field
                  v-model="getPatient.firstName"
                  class="mt-3"
                  id="nome"
                  label="Nome"
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="getPatient.lastName"
                  label="Sobrenome"
                  id="sobrenome"
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="getPatient.gender"
                  label="Gênero"
                  id="genero"
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="getPatient.cpf"
                  label="CPF"
                  id="cpf"
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="getPatient.birthDate"
                  label="Data de Nascimento"
                  outlined
                  id="data_nascimento"
                  type="date"
                  :max="currentDate"
                ></v-text-field>
              </div>
              <div v-else-if="step == 1">
                <!-- ANCHOR - CONTATOS -->
                <v-text-field
                  v-model="getPatient.contact.telephone"
                  class="mt-3"
                  id="telefone"
                  label="Telefone"
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="getPatient.contact.whatsapp"
                  label="Whatsapp"
                  id="whatsapp"
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="getPatient.contact.email"
                  label="E-mail"
                  id="email"
                  outlined
                ></v-text-field>
              </div>
              <!-- ANCHOR - ENDEREÇO -->
              <div v-else-if="step == 2">
                <v-text-field
                  class="mt-3"
                  id="numero"
                  label="Número"
                  outlined
                  v-model="getPatient.address.number"
                ></v-text-field>
                <v-text-field
                  v-model="getPatient.address.neighborhood"
                  label="Bairro"
                  id="bairro"
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="getPatient.address.county"
                  label="Cidade"
                  id="cidade"
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="getPatient.address.zipCode"
                  label="CEP"
                  id="cep"
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="getPatient.address.state"
                  label="Estado"
                  id="estado"
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="getPatient.address.street"
                  label="Rua"
                  id="rua"
                  outlined
                ></v-text-field>
              </div>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn text @click="stepBack()">{{ btnBack }}</v-btn>
              <v-btn
                v-if="btnNext == 'Próximo'"
                id="proximo"
                color="primary"
                @click="stepNext()"
                >{{ btnNext }}</v-btn
              >
              <v-btn
                v-if="btnNext == 'Salvar'"
                id="salvar"
                color="primary"
                @click="crud()"
                :loading="loadingBtn"
                >{{ btnNext }}</v-btn
              >
              <v-btn
                v-if="btnNext == 'Editar'"
                color="primary"
                :loading="loadingBtn"
                @click="crud()"
                >{{ btnNext }}</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="getDialogDelete" max-width="500px">
          <v-card>
            <v-card-title>Confirmação de Exclusão</v-card-title>
            <v-card-text>
              Tem certeza de que deseja excluir este item?
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn @click="changeDialogDelete(false)">Cancelar</v-btn>
              <v-btn color="error" @click="crud()">Confirmar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- </v-form> -->
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { clearObject } from "@/utils/ClearValues";
import {
  createPatient,
  editPatient,
  deletePatient,
} from "@/services/PatientServices";
import { mapActions, mapGetters } from "vuex";

export default {
  props: {},
  data() {
    return {
      loadingBtn: false,
      step: 0,
      btnNext: "Próximo",
      btnBack: "Fechar",
      patient: {
        firstName: "",
        lastName: "",
        gender: "",
        cpf: "",
        birthDate: "",
        contact: {
          telephone: "",
          whatsapp: "",
          email: "",
        },
        address: {
          number: "",
          neighborhood: "",
          county: "",
          zipCode: "",
          state: "",
          street: "",
        },
      },
    };
  },
  created() {
    this.changePatient(this.patient);
  },
  computed: {
    ...mapGetters(["getPatient", "getDialog", "getDialogDelete", "getAction"]),
  },
  methods: {
    ...mapActions([
      "changePatient",
      "changeDialog",
      "changeDialogDelete",
      "changeAction",
    ]),
    async crud() {
      switch (this.getAction) {
        case "Cadastrar":
          this.createRequest(this.getPatient);
          break;
        case "Editar":
          this.editRequest(this.getPatient);
          break;
        case "Excluir":
          this.deleteRequest(this.getPatient);
          break;
      }
    },
    async createRequest() {
      this.setLoading();
      await createPatient(this.getPatient);
      this.setLoading();
      this.refresh();
    },
    async editRequest() {
      this.setLoading();
      await editPatient(this.getPatient);
      this.setLoading();
      this.refresh();
    },
    async deleteRequest() {
      this.setLoading();
      await deletePatient(this.getPatient);
      this.setLoading();
      this.refresh();
    },
    // SECTION - STEPS
    stepNext() {
      if (this.step < 2) {
        this.btnBack = "Voltar";
        this.step++;
      }
      if (this.step == 2) {
        switch (this.getAction) {
          case "Cadastrar":
            this.btnNext = "Salvar";
            break;
          case "Editar":
            this.btnNext = "Editar";
            break;
          case "Excluir":
            this.btnNext = "Excluir";
            break;
        }
      }
    },
    stepBack() {
      if (this.step == 0) {
        return this.changeDialog(false);
      }
      this.step -= 1;
      switch (this.step) {
        case 0:
          this.btnBack = "Fechar";
          this.btnNext = "Próximo";
          break;
        case 1:
          this.btnBack = "Voltar";
          this.btnNext = "Próximo";
          break;
      }
    },
    createDialog() {
      this.changeAction("Cadastrar");
      this.changeDialog(true);
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
      this.btnNext = "Próximo";
      this.changeDialog(false);
      this.changeDialogDelete(false);
      this.$eventBus.$emit("refresh-patient", true);
      clearObject(this.getPatient);
    },
    // !SECTION
  },
  watch: {
    getDialog(e) {
      if (e == false) {
        clearObject(this.getPatient);
      }
    },
    getDialogDelete(e) {
      if (e == false) {
        clearObject(this.getPatient);
      }
    },
  },
};
</script>