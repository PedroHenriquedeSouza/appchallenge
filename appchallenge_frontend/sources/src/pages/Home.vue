<template>
  <div id="main">
    <v-banner color="green" dark>
      <div class="d-flex align-center">
        <v-title class="text-xs-h5 text-sm-h3 text-md-h1">
          <v-icon large left> mdi-wifi </v-icon>
          FindConnection
        </v-title>
      </div>
    </v-banner>

    <div class="text-center ma-12">
      <v-row align="center">
        <v-col cols="3" class="ma-6">
          <v-select
            v-model="pedro"
            :items="items"
            item-text="uf"
            item-value="uf"
            label="UF"
            return-object
            single-line
          ></v-select>
        </v-col>
        <v-btn color="success" rounded @click="getPlans">Planos</v-btn>
      </v-row>
    </div>

    <div class="ma-12 elevation-24">
      <v-expansion-panels>
        <v-expansion-panel
          v-for="(item, company) in apiInformation"
          :key="item"
        >
          <v-expansion-panel-header> {{ company }} </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-layout wrap>
              <v-flex xs12 sm6 md4 lg3 v-for="plan in item" :key="plan">
                <v-card class="ma-2 elevation-24">
                  <v-card-title class="text-h4 yellow"
                    >Plano: {{ plan.download_speed }} MBs
                  </v-card-title>
                    <div class="text-subtitle-1 ms-4">
                      Internet via: {{ plan.type_of_internet }}
                    </div>

                  <v-card-text>

                    <div class="my-4 text-h3 green--text">
                      R$ {{ plan.price_per_month }} /mês
                    </div>

                    <div>Velocidade de Download: {{ plan.download_speed }} MBs</div>

                    <div>Velocidade de Upload: {{ plan.upload_speed }} MBs</div>
                  </v-card-text>

                  <v-divider class="mx-4"></v-divider>

                  <v-card-actions>
                    <v-btn color="purple darken-2" class="white--text" @click="reserve">
                      Quero Contratar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "home-page",

  data() {
    return {
      apiInformation: [],
      select: {},
      state: "",
      items: [
        { uf: "Todos" },
        { uf: "RO" },
        { uf: "AC" },
        { uf: "AM" },
        { uf: "RR" },
        { uf: "PA" },
        { uf: "AP" },
        { uf: "TO" },
        { uf: "MA" },
        { uf: "PI" },
        { uf: "CE" },
        { uf: "RN" },
        { uf: "PB" },
        { uf: "PE" },
        { uf: "AL" },
        { uf: "SE" },
        { uf: "BA" },
        { uf: "MG" },
        { uf: "ES" },
        { uf: "RJ" },
        { uf: "SP" },
        { uf: "PR" },
        { uf: "SC" },
        { uf: "RS" },
        { uf: "MS" },
        { uf: "MT" },
        { uf: "GO" },
        { uf: "DF" },
      ],
    };
  },

  methods: {
    getPlans() {
      console.log("state" + this.state.uf);
      if (this.state.uf == undefined || this.state.uf == "Todos") {
        this.getPlansUrl();
      } else {
        this.getPlansStateUrl();
      }
    },

    getPlansUrl() {
      console.log("state" + this.state.uf);
      axios
        .get("https://app-challenge-api.herokuapp.com/plans")
        .then((response) => {
          if (response.data != null)
            this.apiInformation = response.data.reduce((group, row) => {
              const { isp } = row;
              group[isp] = group[isp] ?? [];
              group[isp].push(row);
              return group;
            }, {});
          console.log(this.apiInformation);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getPlansStateUrl() {
      axios
        .get(
          "https://app-challenge-api.herokuapp.com/plans?state=" + this.state.uf
        )
        .then((response) => {
          if (response.data != null)
            this.apiInformation = response.data.reduce((group, row) => {
              const { isp } = row;
              group[isp] = group[isp] ?? [];
              group[isp].push(row);
              return group;
            }, {});
          console.log(this.apiInformation);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  computed: {
    planSelected() {
      return this.apiInformation.filter((plan) =>
        this.apiInformation.data.includes(plan.id)
      );
    },
    pedro: {
      get() {
        console.log(this.value);
        return this.value;
      },
      set(item) {
        console.log(item);
        this.state = item;
      },
    },
  },
};
</script>