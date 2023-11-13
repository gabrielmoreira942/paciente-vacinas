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
          :loading="loadingGrid"
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
      loadingGrid: false,
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
  beforeDestroy() {
    this.$eventBus.$off("refresh-vaccine");
  },
  async created() {
    this.refreshVaccine();
    this.requestVaccine();
  },
  methods: {
    async requestVaccine() {
      this.items = this.dateBr(await getVaccine());
    },
    dateBr(data) {
      let result = data;
      data.map((item, i) => {
        result[i].validateDate = dataBr(item.validateDate);
      });
      return result;
    },
    refreshVaccine() {
      this.$eventBus.$on("refresh-vaccine", async () => {
        this.items = [];
        this.loadingGrid = true;
        this.requestVaccine();
        this.loadingGrid = false;
      });
    },
  },
};
</script>
  