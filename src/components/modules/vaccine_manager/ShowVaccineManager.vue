<template>
  <div>
    <!-- Dados Pessoais -->
    <v-card>
      <v-card-title>Dados Pessoais </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="getVaccineManager.patient.firstName"
              label="Nome"
              outlined
              disabled
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="getVaccineManager.patient.lastName"
              label="Sobrenome"
              outlined
              disabled
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="getVaccineManager.patient.gender"
              label="Gênero"
              outlined
              disabled
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="getVaccineManager.patient.cpf"
              label="CPF"
              outlined
              v-mask="'###.###.###-##'"
              disabled
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="getVaccineManager.patient.birthDate"
              label="Data de Nascimento"
              outlined
              type="date"
              disabled
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Contatos -->
    <v-card>
      <v-card-title>Contatos</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="4">
            <v-text-field
              v-model="getVaccineManager.patient.contact.telephone"
              label="Telefone"
              outlined
              disabled
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="getVaccineManager.patient.contact.whatsapp"
              label="Whatsapp"
              outlined
              disabled
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="getVaccineManager.patient.contact.email"
              label="E-mail"
              outlined
              disabled
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Endereço -->
    <v-card>
      <v-card-title>Endereço</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="3">
            <v-text-field
              v-model="getVaccineManager.patient.address.number"
              label="Número"
              outlined
              disabled
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model="getVaccineManager.patient.address.neighborhood"
              label="Bairro"
              outlined
              disabled
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model="getVaccineManager.patient.address.county"
              label="Cidade"
              outlined
              disabled
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model="getVaccineManager.patient.address.zipCode"
              label="CEP"
              outlined
              disabled
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="getVaccineManager.patient.address.state"
              label="Estado"
              outlined
              disabled
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="getVaccineManager.patient.address.street"
              label="Rua"
              outlined
              disabled
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-title
        >Vacinação
        <v-btn class="ml-5" color="error" @click="removeLastVaccine()"
          >Remover última vacina</v-btn
        >
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="4">
            <v-text-field
              v-model="getVaccineManager.vaccine.validateDate"
              label="Data de vacinação"
              outlined
              disabled
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="getVaccineManager.vaccine.manufacturer"
              label="Fabricante da Vacina"
              outlined
              disabled
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="getVaccineManager.vaccine.batch"
              label="Lote"
              outlined
              disabled
            ></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field
              v-model="getVaccineManager.vaccine.amountOfDose"
              label="Quantidade de doses"
              outlined
              disabled
            ></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field
              v-model="getVaccineManager.vaccine.intervalBetweenDoses"
              label="Intervalo entre doses"
              outlined
              disabled
            ></v-text-field>
          </v-col>
          <!-- <v-col cols="6">
            <v-text-field
              v-model="getVaccineManager.nurseProfessional.name"
              label="Nome do profissional de enfermagem"
              outlined
              disabled
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="getVaccineManager.nurseProfessional.cpf"
              label="cpf"
              v-mask="'###.###.###-##'"
              outlined
              disabled
            ></v-text-field>
          </v-col> -->
          <v-data-table
            :headers="headers"
            :items-per-page="10"
            :items="items"
            class="elevation-1"
          ></v-data-table>
        </v-row>
      </v-card-text>
      <v-btn class="ml-5" color="primary" @click="$router.back()">VOLTAR</v-btn>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { dataBr } from "@/utils/FormatDate";
import {
  removeLastVaccineManager,
  getPatientById,
} from "@/services/VaccineManagerServices";
export default {
  name: "PacienteVacinasShowPatient",

  data() {
    return {
      getVaccineManager: {},
      headers: [
        { text: "Lista de doses", value: "list" },
        {
          text: "Profissional de enfermagem",
          value: "name",
        },
        {
          text: "CPF",
          value: "cpf",
        },
      ],
      items: [],
    };
  },
  created() {
    this.getItems();
    this.dealings();
  },
  methods: {
    ...mapActions(["changeVaccineManager"]),
    async removeLastVaccine() {
      this.$swal({
        icon: "info",
        title: "Deseja excluir a última vacinação?",
        html: `<p><span>Essa ação não poderá ser revertida!</span></p>`,
        showCancelButton: true,
        confirmButtonColor: "#ff5252",
        cancelButtonColor: "#1976d2",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Excluir",
        reverseButtons: true,
      }).then(async (response) => {
        if (response.isConfirmed) {
          if (await removeLastVaccineManager(this.getVaccineManager.id)) {
            this.changeVaccineManager(
              await getPatientById(this.getVaccineManager.patient.id)
            );
            this.returnItems();
          }
        }
      });
    },
    getItems() {
      this.getVaccineManager = JSON.parse(
        localStorage.getItem("vaccineManagerView")
      );
      this.getVaccineManager.vaccine.validateDate = dataBr(
        this.getVaccineManager.vaccine.validateDate
      );
    },
    returnItems() {
      this.items = [];
      this.getVaccineManager = this.getVManager[0];
      this.getVaccineManager.vaccine.validateDate = dataBr(
        this.getVaccineManager.vaccine.validateDate
      );
      this.dealings();
    },
    dealings() {
      this.getVaccineManager.listOfDoses.map((item, i) => {
        this.items.push({
          list: dataBr(item),
        });
      });
      this.getVaccineManager.nurseProfessionals.map((item, i) => {
        this.items[i].name = item.name;
        this.items[i].cpf = item.cpf;
      });
    },
  },
  computed: {
    ...mapGetters({ getVManager: "getVaccineManager" }),
  },
};
</script>

<style lang="scss" scoped>
</style>