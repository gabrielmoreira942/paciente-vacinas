<template>
  <div>
    <v-row>
      <v-col class="d-flex justify-end">
        <!-- <v-form > -->
        <v-dialog max-width="600" v-model="dialog" persistent>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              @click="(btnAction = 'Cadastrar'), (dialog = true)"
              color="primary"
              v-bind="attrs"
              v-on="on"
              >Cadastrar</v-btn
            >
          </template>
          <v-card>
            <v-toolbar color="primary" dark> {{ btnAction }} Vacina </v-toolbar>
            <v-card-text>
              <!-- ANCHOR - DADOS PESSOAIS -->
              <div v-if="step == 0">
                <v-text-field
                  v-model="vaccine.manufacturer"
                  class="mt-3"
                  label="Fabricante"
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="vaccine.batch"
                  label="Lote"
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="vaccine.validateDate"
                  label="Validade"
                  outlined
                  type="date"
                ></v-text-field>
                <v-text-field
                  v-model="vaccine.amountOfDose"
                  label="Quantidade de doses"
                  outlined
                ></v-text-field>
                <v-text-field
                  type="number"
                  v-model="vaccine.intervalBetweenDoses"
                  label="Intervalo entre doses"
                  outlined
                ></v-text-field>
              </div>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn text @click="dialog = false">Fechar</v-btn>
              <v-btn
                v-if="btnAction == 'Cadastrar'"
                color="primary"
                @click="crud()"
                >{{ btnAction }}</v-btn
              >
              <v-btn
                v-if="btnAction == 'Editar'"
                color="primary"
                @click="crud()"
                >{{ btnAction }}</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- </v-form> -->
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { clearObject } from "@/utils/ClearValues";
import { createVaccine } from "@/services/VaccineServices";

export default {
  data() {
    return {
      dialog: false,
      step: 0,
      btnAction: "",
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
  methods: {
    async crud() {
      switch (this.btnAction) {
        case "Cadastrar":
          await createVaccine(this.vaccine);
          break;
        case "Editar":
          await createVaccine(this.vaccine);
          break;
        case "Excluir":
          await createVaccine(this.vaccine);
          break;
      }
    },
  },
};
</script>