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

    <div class="text-center">
        <div class="my-4">
          <v-btn @click="getPlansStateUrl">Planos</v-btn>
          </div>
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
                  <template slot="progress">
                    <v-progress-linear
                      color="deep-purple"
                      height="10"
                      indeterminate
                    ></v-progress-linear>
                  </template>

                  <v-card-title class="yellow"
                    >Plano: {{ plan.download_speed }} MBs</v-card-title
                  >

                  <v-card-text>
                    <v-row align="center" class="mx-0">
                      <div class="text-subtitle-1 ms-4">Internet via: {{ plan.type_of_internet }}</div>
                    </v-row>

                    <div class="my-4 text-h3">R$ {{ plan.price_per_month }} /mês</div>

                    <div>
                      Small plates, salads & sandwiches - an intimate setting
                      with 12 indoor seats plus patio seating.
                    </div>
                  </v-card-text>

                  <v-divider class="mx-4"></v-divider>

                  <v-card-title>Tonight's availability</v-card-title>

                  <v-card-text>
                    <v-chip-group
                      v-model="selection"
                      active-class="deep-purple accent-4 white--text"
                      column
                    >
                      <v-chip>5:30PM</v-chip>

                      <v-chip>7:30PM</v-chip>

                      <v-chip>8:00PM</v-chip>

                      <v-chip>9:00PM</v-chip>
                    </v-chip-group>
                  </v-card-text>

                  <v-card-actions>
                    <v-btn color="deep-purple lighten-2" text @click="reserve">
                      Reserve
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
    };
  },

  methods: {
    getPlansUrl() {
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
        .get("https://app-challenge-api.herokuapp.com/plans?state=")
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

  mounted() {
    /*axios
      .get("https://app-challenge-api.herokuapp.com/plans")
      .then((response) => {
        if (response.data != null)
          this.apiInformation = response.data.reduce((group, row) => {
            const { isp } = row;
            group[isp] = group[isp] ?? [];
            group[isp].push(row);
            return group;
          }, {});

        // response.data.forEach((row) => {
        //   if (!this.apiInformation[row.isp])
        //     this.apiInformation[row.isp] = []
        //     this.apiInformation[row.isp].push(row)
        //})
        console.log(this.apiInformation);
        //this.apiInformation = response.data
      })
      .catch((error) => {
        console.log(error);
      });*/
  },

  computed: {
    planSelected() {
      return this.apiInformation.filter((plan) =>
        this.apiInformation.data.includes(plan.id)
      );
    },
  },
};
</script>