<template>
  <div>
    <v-card-text>
      <!-- ANCHOR - DADOS PESSOAIS -->
      <div>
        <v-col>
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
        </v-col>
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
      <div>
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
      <div>
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
    console.log(this.getPatient);
  },
  computed: {
    ...mapGetters(["getPatient"]),
  },
};
</script>

<style lang="scss" scoped>
</style>