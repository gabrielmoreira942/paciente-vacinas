<template>
  <v-container>
    <v-row>
      <v-col class="d-flex justify-end">
        <v-dialog  max-width="600">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" v-bind="attrs" v-on="on">Cadastrar</v-btn>
          </template>
          <template v-slot:default="dialog">
            <v-card>
              <v-toolbar color="primary" dark>
                Cadastrar Novo Paciente
              </v-toolbar>
              <v-card-text>
                <v-text-field class="mt-3" label="Nome" outlined></v-text-field>
                <v-text-field label="Sobrenome" outlined></v-text-field>
                <v-text-field label="Gênero" outlined></v-text-field>
                <v-text-field
                  label="Data de Nascimento"
                  outlined
                ></v-text-field>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn text @click="dialog.value = false">Fechar</v-btn>
                <v-btn color="primary" @click="salvar">Salvar</v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="desserts"
          :items-per-page="5"
          class="elevation-1"
        ></v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>
  
  <script>
import { dataBr } from "@/utils/FormatDate";
export default {
  name: "HelloWorld",
  components: {},
  data() {
    return {
      dialog: false,
      headers: [
        {
          text: "Paciente",
          align: "start",
          value: "firstName",
        },
        {
          text: "Sobrenome",
          value: "lastName",
        },
        { text: "CPF", value: "cpf" },
        { text: "Gênero", value: "gender" },
        { text: "Data de nascimento", value: "birthDate" },
      ],
      desserts: [],
    };
  },
  created() {
    this.$api.patient.get("patient").then(({ data }) => {
      this.desserts = this.dateBr(data);
    });
  },
  methods: {
    dateBr(data) {
      let result = data;
      data.map((item, i) => {
        result[i].birthDate = dataBr(item.birthDate);
      });
      return result;
    },
  },
};
</script>
  