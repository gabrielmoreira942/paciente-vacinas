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
      headers: [
        {
          text: "Paciente",
          align: "start",
          value: "patient.name",
        },
        {
          text: "Estado",
          value: "patient.address.state",
        },
        {
          text: "Fabricante da Vacina",
          value: "vaccine.manufacturer",
        },
        {
          text: "Lote",
          value: "vaccine.batch",
        },
        { text: "Qtd doses", value: "vaccine.amountOfDose" },
        {
          text: "Intervalo entre doses",
          value: "vaccine.intervalBetweenDoses",
        },
        { text: "Identificador", value: "id" },
        { text: "Ações", value: "actions" },
      ],
      items: [],
    };
  },
  beforeDestroy() {
    this.$eventBus.$off("refresh-vaccine-manager");
    this.$eventBus.$off("refresh-search-manager");
  },
  async created() {
    this.requestVaccineManager();
    this.refreshVaccineManager();
    this.refreshSearchManager();
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
    async requestVaccineManager() {
      this.items = await getVaccineManager();
      this.getPatientFormat();
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
      items.idPatient = items.patient.id;
      items.idVaccine = items.vaccine.id;
      let obj = {
        lastDateOfVaccine: "",
        id: items.id,
        idPatient: items.idPatient,
        idVaccine: items.idVaccine,
        nurseProfessional: {
          name: "",
          cpf: "",
        },
      };
      this.changeActionVaccineManager("Adicionar");
      this.changeVaccineManager(obj);
      this.changeVaccineManagerDialog(true);
      this.changeDisabledVaccineManager(true);
    },
    refreshVaccineManager() {
      this.$eventBus.$on("refresh-vaccine-manager", async () => {
        console.log("object");
        this.items = [];
        this.loadingGrid = true;
        this.requestVaccineManager();
        this.loadingGrid = false;
      });
    },
    refreshSearchManager() {
      this.$eventBus.$on("refresh-search-manager", async (value) => {
        this.items = [];
        this.items = value;
        this.getPatientFormat()
        this.loadingGrid = true;
        this.loadingGrid = false;
      });
    },
    async getPatientFormat() {
      this.items.map((item, i) => {
        this.items[i].patient.name =
          this.items[i].patient.firstName +
          " " +
          this.items[i].patient.lastName;
      });
    },
  },
};
</script>
  