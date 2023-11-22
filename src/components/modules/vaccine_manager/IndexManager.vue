<template>
  <v-container>
    <v-row>
      <v-col>
        <SearchManager></SearchManager>
      </v-col>
      <v-col>
        <CrudManager></CrudManager>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="items"
          :items-per-page="10"
          class="elevation-1"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-tooltip bottom color="green">
              <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on">
                  <v-icon color="green" @click="view(item)"
                    >mdi-eye-plus</v-icon
                  >
                </span>
              </template>
              <span>Ver mais</span>
            </v-tooltip>
            <v-tooltip bottom color="primary">
              <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on">
                  <v-icon color="primary" @click="edit(item)">mdi-plus</v-icon>
                </span>
              </template>
              <span>Adicionar vacinação</span>
            </v-tooltip>
            <!-- <v-tooltip bottom color="red">
              <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on">
                  <v-icon color="red" @click="deleteItem(item)"
                    >mdi-delete</v-icon
                  >
                </span>
              </template>
              <span>Excluir</span>
            </v-tooltip> -->
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template> 
  <script>
import { dataBr } from "@/utils/FormatDate";
import CrudManager from "@/components/modules/vaccine_manager/CrudManager.vue";
import SearchManager from "@/components/modules/vaccine_manager/SearchManager.vue";
import { getVaccineManager } from "@/services/VaccineManagerServices";
import { mapActions, mapGetters } from "vuex";
import { dataEUA } from "@/utils/FormatDate";

export default {
  name: "HelloWorld",
  components: {
    CrudManager,
    SearchManager,
  },
  data() {
    return {
      dialogDelete: false,
      headers: [
        {
          text: "Fabricante da Vacina",
          value: "vaccine.manufacturer",
        },
        {
          text: "Lote",
          value: "vaccine.batch",
        },
        {
          text: "Paciente",
          align: "start",
          value: "patient.firstName",
        },
        {
          text: "Sobrenome",
          value: "patient.lastName",
        },
        { text: "Qtd doses", value: "vaccine.amountOfDose" },
        {
          text: "Intervalo entre doses",
          value: "vaccine.intervalBetweenDoses",
        },
        { text: "Data da vacina", value: "vaccineDate" },
        { text: "Identificador", value: "id" },
        { text: "Ações", value: "actions" },
      ],
      items: [],
    };
  },
  beforeDestroy() {
    this.$eventBus.$off("refresh-patient");
  },
  async created() {
    this.requestPatient();
    this.refreshPatient();
  },
  computed: {
    ...mapGetters(["getVaccineManager", "getVaccineManagerDialog"]),
  },
  methods: {
    ...mapActions([
      "changeVaccineManager",
      "changeVaccineManagerDialog",
      "changeActionVaccineManager",
      "changeDisabledVaccineManager",
    ]),
    async requestPatient() {
      this.items = this.dateBr(await getVaccineManager());
    },
    async view(event) {
      this.changeVaccineManager(event);
      this.$router.push({
        name: "Visualizar Paciente Vacinado",
        params: { name: "view" },
      });
    },
    edit(item) {
      let items = { ...item };
      items.vaccineDate = dataEUA(items.vaccineDate);
      items.idPatient = items.patient.id;
      items.idVaccine = items.vaccine.id;
      this.changeActionVaccineManager("Adicionar");
      this.changeVaccineManager(items);
      this.changeVaccineManagerDialog(true);
      this.changeDisabledVaccineManager(true);
    },
    deleteItem(item) {
      this.changeActionVaccineManager("Excluir");
      this.changePatient(item);
    },
    refreshPatient() {
      this.$eventBus.$on("refresh-patient", async () => {
        this.items = [];
        this.loadingGrid = true;
        this.requestPatient();
        this.loadingGrid = false;
      });
    },
    dealings(items) {
      let result = [];
      items.listOfDoses.map((item, i) => {
        result.push(dataBr(item));
      });
      return result;
    },
    // ANCHOR - Formatação data BR in array
    dateBr(data) {
      let result = data;
      data.map((item, i) => {
        result[i].vaccineDate = dataBr(item.vaccineDate);
      });
      return result;
    },
  },
};
</script>
  