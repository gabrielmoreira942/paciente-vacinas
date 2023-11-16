<template>
  <div>
    <!-- Dados Pessoais -->
    <v-card>
      <v-card-title>Dados Pessoais</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="getPatient.firstName"
              label="Nome"
              outlined
              disabled
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="getPatient.lastName"
              label="Sobrenome"
              outlined
              disabled
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="getPatient.gender"
              label="Gênero"
              outlined
              disabled
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="getPatient.cpf"
              label="CPF"
              outlined
              disabled
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="getPatient.birthDate"
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
              v-model="getPatient.contact.telephone"
              label="Telefone"
              outlined
              disabled
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="getPatient.contact.whatsapp"
              label="Whatsapp"
              outlined
              disabled
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="getPatient.contact.email"
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
              v-model="getPatient.address.number"
              label="Número"
              outlined
              disabled
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model="getPatient.address.neighborhood"
              label="Bairro"
              outlined
              disabled
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model="getPatient.address.county"
              label="Cidade"
              outlined
              disabled
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model="getPatient.address.zipCode"
              label="CEP"
              outlined
              disabled
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="getPatient.address.state"
              label="Estado"
              outlined
              disabled
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="getPatient.address.street"
              label="Rua"
              outlined
              disabled
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-btn class="ml-5" color="primary" @click="$router.back()">VOLTAR</v-btn>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "PacienteVacinasShowPatient",

  data() {
    return {};
  },
  created() {
  },
  computed: {
    ...mapGetters(["getPatient"]),
  },
};
</script>

<style lang="scss" scoped>
</style>