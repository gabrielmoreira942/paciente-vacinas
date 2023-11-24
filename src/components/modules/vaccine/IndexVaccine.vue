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
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-tooltip bottom color="primary">
              <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on">
                  <v-icon color="primary" @click="edit(item)"
                    >mdi-pencil-outline</v-icon
                  >
                </span>
              </template>
              <span>Editar</span>
            </v-tooltip>
            <v-tooltip bottom color="red">
              <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on">
                  <v-icon color="red" @click="deleteItem(item)"
                    >mdi-delete</v-icon
                  >
                </span>
              </template>
              <span>Excluir</span>
            </v-tooltip>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>
  
  <script>
import { dataBr } from "@/utils/FormatDate";
import CrudVaccine from "@/components/modules/vaccine/CrudVaccine.vue";
import { getVaccine } from "@/services/VaccineServices";
import { mapActions } from "vuex";
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
        { text: "Ações", value: "actions" },
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
    ...mapActions(["changeDialogDeleteVaccine", "changeActionVaccine", "changeVaccine"]),
    async requestVaccine() {
      this.items = this.dateBr(await getVaccine());
    },
    edit(item) {},
    deleteItem(item) {
      this.changeVaccine(item)
      this.changeDialogDeleteVaccine(true);
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
  