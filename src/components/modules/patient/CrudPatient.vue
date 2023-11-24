<template>
  <div>
    <v-row>
      <v-col class="d-flex justify-end">
        <!-- <v-form > -->
        <v-dialog max-width="600" v-model="getDialogPatient" persistent>
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
              <div v-show="step == 0">
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
                <v-select
                  :items="['M', 'F']"
                  v-model="getPatient.gender"
                  label="Gênero"
                  id="genero"
                  data-cy="generoSelected"
                  outlined
                ></v-select>
                <v-text-field
                  v-model="getPatient.cpf"
                  label="CPF"
                  v-mask="'###.###.###-##'"
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
              <div v-show="step == 1">
                <!-- ANCHOR - CONTATOS -->
                <v-text-field
                  v-model="getPatient.contact.telephone"
                  v-mask="'(##) ####-####'"
                  class="mt-3"
                  id="telefone"
                  label="Telefone"
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="getPatient.contact.whatsapp"
                  v-mask="'(##) # ####-####'"
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
              <div v-show="step == 2">
                <v-text-field
                  class="mt-3"
                  id="numero"
                  label="Número"
                  v-mask="'##########'"
                  outlined
                  v-model="getPatient.address.number"
                ></v-text-field>
                <span v-if="invalidCep" style="color: red"
                  ><h5>CEP inválido.</h5></span
                >
                <v-text-field
                  v-model="getPatient.address.zipCode"
                  v-mask="'#####-###'"
                  label="CEP"
                  id="cep"
                  outlined
                >
                </v-text-field>
                <v-text-field
                  v-model="getPatient.address.neighborhood"
                  label="Bairro"
                  :disabled="disabledBtn"
                  id="bairro"
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="getPatient.address.county"
                  label="Cidade"
                  :disabled="disabledBtn"
                  id="cidade"
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="getPatient.address.state"
                  label="Estado"
                  :disabled="disabledBtn"
                  id="estado"
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="getPatient.address.street"
                  label="Rua"
                  :disabled="disabledBtn"
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
                :disabled="disabledBtn"
                >{{ btnNext }}</v-btn
              >
              <v-btn
                v-if="btnNext == 'Editar'"
                color="primary"
                :loading="loadingBtn"
                :disabled="disabledBtn"
                @click="crud()"
                >{{ btnNext }}</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="getDialogDeletePatient" max-width="500px">
          <v-card>
            <v-card-title>Confirmação de Exclusão</v-card-title>
            <v-card-text>
              Tem certeza de que deseja excluir este item?
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn @click="changeDialogDeletePatient(false)">Cancelar</v-btn>
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
import axios from "axios";
export default {
  props: {},
  data() {
    return {
      loadingBtn: false,
      disabledBtn: true,
      invalidCep: false,
      step: 0,
      patient: {
        id: "",
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
      btnNext: "Próximo",
      btnBack: "Fechar",
    };
  },
  created() {
    this.changePatient(this.patient);
  },
  computed: {
    ...mapGetters([
      "getPatient",
      "getDialogPatient",
      "getDialogDeletePatient",
      "getAction",
    ]),
  },
  methods: {
    viacep(e) {
      axios.get(`https://viacep.com.br/ws/${e}/json`).then(({ data }) => {
        if (data.erro) {
          return this.getCep(false);
        }
        this.getCep(data);
      });
      //
    },
    ...mapActions([
      "changePatient",
      "changeDialogPatient",
      "changeDialogDeletePatient",
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
      delete this.getPatient.id;
      this.setLoading();
      const { status } = await createPatient(this.getPatient);
      if (status == "error") {
        return this.setLoading();
      }
      this.setLoading();
      this.refresh();
    },
    async editRequest() {
      this.setLoading();
      const { status } = await editPatient(this.getPatient);
      if (status == "error") {
        return this.setLoading();
      }
      this.setLoading();
      this.refresh();
    },
    async deleteRequest() {
      this.setLoading();
      const { status } = await deletePatient(this.getPatient);
      if (status == "error") {
        return this.setLoading();
      }
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
        return this.changeDialogPatient(false);
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
      this.changeDialogPatient(true);
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
      this.changeDialogPatient(false);
      this.changeDialogDeletePatient(false);
      this.$eventBus.$emit("refresh-patient", true);
      clearObject(this.getPatient);
    },
    getCep(data) {
      if (data) {
        this.getPatient.address.street = data.logradouro;
        this.getPatient.address.neighborhood = data.bairro;
        this.getPatient.address.county = data.localidade;
        this.getPatient.address.state = data.uf;
        this.disabledBtn = false;
        this.invalidCep = false;
      } else if (data == false) {
        if (this.getPatient.address.zipCode.length == 9) {
          this.invalidCep = true;
        } else {
          this.invalidCep = false;
        }
        this.getPatient.address.street = "";
        this.getPatient.address.neighborhood = "";
        this.getPatient.address.county = "";
        this.getPatient.address.state = "";
        this.disabledBtn = true;
      }
    },
    // !SECTION
  },
  watch: {
    "getPatient.address.zipCode": {
      handler(e) {
        if (e.length == 9) {
          this.viacep(e);
        } else {
          this.getCep(false);
        }
      },
    },
    getDialogPatient(e) {
      if (e == false) {
        clearObject(this.getPatient);
      }
    },
    getDialogDeletePatient(e) {
      if (e == false) {
        clearObject(this.getPatient);
      }
    },
  },
};
</script>