<template>
  <v-container>
    <CrudPatient :dialog="dialog"></CrudPatient>
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
                  <v-icon color="green" @click="view(item)">mdi-eye</v-icon>
                </span>
              </template>
              <span>Visualizar</span>
            </v-tooltip>
            <v-tooltip bottom color="primary">
              <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on">
                  <v-icon color="primary" @click="edit(item)"
                    >mdi-pencil</v-icon
                  >
                </span>
              </template>
              <span>Editar</span>
            </v-tooltip>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template> 
  <script>
import { dataBr } from "@/utils/FormatDate";
import CrudPatient from "@/components/modules/patient/CrudPatient.vue";
import { getPatient } from "@/services/PatientServices";
import { mapActions, mapGetters } from "vuex";
import { dataEUA } from "@/utils/FormatDate";

export default {
  name: "HelloWorld",
  components: {
    CrudPatient,
  },
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
    ...mapGetters(["getPatient", "getDialog"]),
  },
  methods: {
    ...mapActions(["changePatient", "changeDialog", "changeAction"]),
    async requestPatient() {
      this.items = this.dateBr(await getPatient());
    },
    view(event) {
      this.$router.push({
        name: "Visualizar Pacientes",
        params: { name: "view" },
        query: { id: event.id },
      });
    },
    edit(item) {
      let items = { ...item };
      items.birthDate = dataEUA(item.birthDate);
      this.changeAction("Editar");
      this.changePatient(items);
      this.changeDialog(true);
    },
    dateBr(data) {
      let result = data;
      data.map((item, i) => {
        result[i].birthDate = dataBr(item.birthDate);
      });
      return result;
    },
    refreshPatient() {
      this.$eventBus.$on("refresh-patient", async () => {
        this.items = [];
        this.loadingGrid = true;
        this.requestPatient();
        this.loadingGrid = false;
      });
    },
  },
};
</script>
  