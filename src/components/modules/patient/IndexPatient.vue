<template>
  <v-container>
    <CrudPatient></CrudPatient>
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="items"
          :items-per-page="10"
          class="elevation-1"
        ></v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>
  
  <script>
import { dataBr } from "@/utils/FormatDate";
import CrudPatient from "@/components/modules/patient/CrudPatient.vue";
import { getPatient } from "@/services/PatientServices";
export default {
  name: "HelloWorld",
  components: {
    CrudPatient,
  },
  data() {
    return {
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
      items: [],
    };
  },
  async created() {
    this.items = this.dateBr(await getPatient());
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
  