<template>
  <div id="main">
    <v-banner app color="green" dark>
      <div class="d-flex align-center">
        <v-title class="text-h1">
          <v-icon large left>
            mdi-wifi
          </v-icon>
          FindConnection
        </v-title>
      </div>
    </v-banner>
    <v-card-text>
      <v-autocomplete v-model="model" :items="item" :loading="isLoading" :search-input.sync="search"
        color="white" hide-no-data hide-selected item-text="Description" item-value="API" label="Public APIs"
        placeholder="Start typing to Search" prepend-icon="mdi-database-search" return-object></v-autocomplete>
    </v-card-text>

    <li v-for="item in apiInformation" :key="item.isp">
      {{ item.isp }}
    </li>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'home-page',

  data() {
    return {
      apiInformation: [],
    };
  },


  mounted() {
    axios
      .get("https://app-challenge-api.herokuapp.com/plans").then((response) => {
        this.apiInformation = response.data
      })
      .catch((error) => {
        console.log(error);
      });
  },

  computed: {
    ispNames: function () {
      return this.apiInformation.filter(function (number) {
        return number % 2 === 0
      })
    }
  }
}
</script>