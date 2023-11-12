<template>
  <v-container>
    <CrudVaccine></CrudVaccine>
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
import CrudVaccine from "@/components/modules/vaccine/CrudVaccine.vue";
import { getVaccine } from "@/services/VaccineServices";
export default {
  name: "HelloWorld",
  components: {
    CrudVaccine,
  },
  data() {
    return {
      headers: [
        {
          text: "Fabricante",
          align: "start",
          value: "manufacturer",
        },
        {
          text: "Lote",
          value: "batch",
        },
        { text: "Validade", value: "validateDate" },
        { text: "Quantidade de doses", value: "amountOfDose" },
        { text: "Intervalo entre doses", value: "intervalBetweenDoses" },
        { text: "Identificador", value: "id" },
      ],
      items: [],
    };
  },
  async created() {
    this.items = this.dateBr(await getVaccine());
  },
  methods: {
    dateBr(data) {
      let result = data;
      data.map((item, i) => {
        result[i].validateDate = dataBr(item.validateDate);
      });
      return result;
    },
  },
};
</script>
  