<template>
  <div>
    <v-row>
      <v-col class="d-flex justify-end">
        <v-dialog max-width="600" v-model="getDialogVaccine" persistent>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              @click="actionCreate()"
              color="primary"
              v-bind="attrs"
              v-on="on"
              >Cadastrar</v-btn
            >
          </template>
          <v-form ref="send" @submit.prevent="crud()">
            <v-card>
              <v-toolbar color="primary" dark>
                {{ getActionVaccine }} Vacina
              </v-toolbar>
              <v-card-text>
                <div>
                  <v-text-field
                    :rules="rules"
                    v-model="getVaccine.manufacturer"
                    class="mt-3"
                    label="Fabricante"
                    outlined
                  ></v-text-field>
                  <v-text-field
                    :rules="rules"
                    v-model="getVaccine.batch"
                    label="Lote"
                    outlined
                  ></v-text-field>
                  <v-text-field
                    :rules="rules"
                    v-model="getVaccine.validateDate"
                    label="Validade"
                    outlined
                    type="date"
                  ></v-text-field>
                  <v-text-field
                    :rules="rules"
                    v-model="getVaccine.amountOfDose"
                    label="Quantidade de doses"
                    outlined
                  ></v-text-field>
                  <v-text-field
                    :rules="rules"
                    v-model="getVaccine.intervalBetweenDoses"
                    label="Intervalo entre doses"
                    outlined
                  ></v-text-field>
                </div>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn
                  :loading="loadingBtn"
                  text
                  @click="changeDialogVaccine(false)"
                  >Fechar</v-btn
                >
                <v-btn
                  type="submit"
                  v-if="getActionVaccine == 'Cadastrar'"
                  color="primary"
                  :loading="loadingBtn"
                  >{{ getActionVaccine }}</v-btn
                >
                <v-btn
                  type="submit"
                  v-if="getActionVaccine == 'Editar'"
                  color="primary"
                  :loading="loadingBtn"
                  >{{ getActionVaccine }}</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-form>
        </v-dialog>
        <v-dialog v-model="getDialogDeleteVaccine" max-width="500px">
          <v-card>
            <v-card-title>Confirmação de Exclusão</v-card-title>
            <v-card-text>
              Tem certeza de que deseja excluir este item?
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                :loading="loadingBtn"
                @click="changeDialogDeleteVaccine(false)"
                >Cancelar</v-btn
              >
              <v-btn
                color="error"
                :loading="loadingBtn"
                @click="deleteRequest()"
                >Confirmar</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { clearObject } from "@/utils/ClearValues";
import {
  createVaccine,
  deleteVaccine,
  editVaccine,
} from "@/services/VaccineServices";
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      dialog: false,
      loadingBtn: false,
      rules: [(v) => !!v || "Campo obrigatório"],
      btnBack: "Fechar",
      vaccine: {
        manufacturer: "",
        batch: "",
        validateDate: "",
        amountOfDose: "",
        intervalBetweenDoses: "",
      },
    };
  },
  created() {
    this.changeVaccine(this.vaccine);
  },
  methods: {
    ...mapActions([
      "changeDialogDeleteVaccine",
      "changeVaccine",
      "changeDialogVaccine",
      "changeActionVaccine",
    ]),
    async crud() {
      if (this.$refs.send.validate()) {
        switch (this.getActionVaccine) {
          case "Cadastrar":
            this.createRequest();
            break;
          case "Editar":
            this.editRequest();
            break;
        }
      }
    },
    async createRequest() {
      this.setLoading();
      const { status } = await createVaccine(this.getVaccine);
      if (status == "error") {
        return this.setLoading();
      }
      this.setLoading();
      this.refresh();
      this.$refs.send.reset();
    },
    async editRequest() {
      this.setLoading();
      const { status } = await editVaccine(this.getVaccine);
      if (status == "error") {
        return this.setLoading();
      }
      this.setLoading();
      this.refresh();
      this.$refs.send.reset();
    },
    async deleteRequest() {
      this.setLoading();
      await deleteVaccine(this.getVaccine.id);
      this.setLoading();
      this.refresh();
    },
    setLoading() {
      this.loadingBtn = !this.loadingBtn;
    },
    actionCreate() {
      this.changeActionVaccine("Cadastrar");
      this.changeDialogVaccine(true);
    },
    closeDialog() {
      this.changeDialogVaccine(false);
    },
    refresh() {
      this.changeDialogVaccine(false);
      this.changeDialogDeleteVaccine(false);
      this.$eventBus.$emit("refresh-vaccine", true);
    },
  },
  computed: {
    ...mapGetters([
      "getDialogDeleteVaccine",
      "getVaccine",
      "getActionVaccine",
      "getDialogVaccine",
    ]),
  },
};
</script>