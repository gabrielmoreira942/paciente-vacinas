<template>
  <div>
    <v-row>
      <v-col class="d-flex justify-end">
        <!-- <v-form > -->
        <v-dialog max-width="600" v-model="dialog" persistent>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              @click="(btnAction = 'Cadastrar'), (dialog = true)"
              color="primary"
              v-bind="attrs"
              v-on="on"
              >Cadastrar</v-btn
            >
          </template>
          <v-card>
            <v-toolbar color="primary" dark>
              {{ btnAction }} Paciente
            </v-toolbar>
            <v-card-text>
              <!-- ANCHOR - DADOS PESSOAIS -->
              <div v-if="step == 0">
                <v-text-field
                  v-model="patient.firstName"
                  class="mt-3"
                  label="Nome"
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="patient.lastName"
                  label="Sobrenome"
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="patient.gender"
                  label="Gênero"
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="patient.cpf"
                  label="CPF"
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="patient.birthDate"
                  label="Data de Nascimento"
                  outlined
                  type="date"
                  :max="currentDate"
                ></v-text-field>
              </div>
              <div v-else-if="step == 1">
                <!-- ANCHOR - CONTATOS -->
                <v-text-field
                  v-model="patient.contact.telephone"
                  class="mt-3"
                  label="Telefone"
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="patient.contact.whatsapp"
                  label="Whatsapp"
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="patient.contact.email"
                  label="E-mail"
                  outlined
                ></v-text-field>
              </div>
              <!-- ANCHOR - ENDEREÇO -->
              <div v-else-if="step == 2">
                <v-text-field
                  class="mt-3"
                  label="Número"
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="patient.address.neighborhood"
                  label="Bairro"
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="patient.address.county"
                  label="Cidade"
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="patient.address.zipCode"
                  label="CEP"
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="patient.address.state"
                  label="Estado"
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="patient.address.street"
                  label="Rua"
                  outlined
                ></v-text-field>
              </div>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn text @click="stepBack()">{{ btnBack }}</v-btn>
              <v-btn
                v-if="btnNext == 'Próximo'"
                color="primary"
                @click="stepNext()"
                >{{ btnNext }}</v-btn
              >
              <v-btn
                v-if="btnNext == 'Salvar'"
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
        <!-- </v-form> -->
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { clearObject } from "@/utils/ClearValues";
import { createPatient } from "@/services/PatientServices";

export default {
  data() {
    return {
      dialog: false,
      loadingBtn: false,
      step: 0,
      btnNext: "Próximo",
      btnAction: "",
      btnBack: "Fechar",
      teste: "",
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
  methods: {
    async crud() {
      switch (this.btnAction) {
        case "Cadastrar":
          this.createRequest(this.patient);
          break;
        case "Editar":
          await createPatient(this.patient);
          break;
        case "Excluir":
          await createPatient(this.patient);
          break;
      }
    },
    async createRequest() {
      this.setLoading();
      await createPatient(this.patient);
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
        switch (this.btnAction) {
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
        return (this.dialog = false);
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
      this.dialog = false;
      this.$eventBus.$emit("refresh-patient", true);
      clearObject(this.patient);
    },
    // !SECTION
  },
};
</script>