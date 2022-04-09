<template>
  <div class="container" v-if="!fetching">
    <div class="header">
      <img :src="beer.image_url" :alt="beer.name" class="image">
      <div>
        <h1>{{beer.name}}</h1>
        <p>{{beer.tagline}}</p>
        <p>First brewed in {{beer.first_brewed}}</p>
        <p> {{beer.description}} </p>
      </div>
    </div>
    <div class="content">
      <v-simple-table dense dark class="table">
        <tbody>
          <tr>
            <td>abv</td>
            <td>{{beer.abv}}</td>
          </tr>
          <tr>
            <td>ibu</td>
            <td>{{beer.ibu}}</td>
          </tr>
          <tr>
            <td>ebc</td>
            <td>{{beer.ebc}}</td>
          </tr>
          <tr>
            <td>target_fg</td>
            <td>{{beer.target_fg}}</td>
          </tr>
          <tr>
            <td>target_og</td>
            <td>{{beer.target_og}}</td>
          </tr>
          <tr>
            <td>srm</td>
            <td>{{beer.srm}}</td>
          </tr>
          <tr>
            <td>ph</td>
            <td>{{beer.ph}}</td>
          </tr>
          <tr>
            <td>attenuation level</td>
            <td>{{beer.attenuation_level}}</td>
          </tr>
          <tr>
            <td>volume</td>
            <td>{{beer.volume.value}} {{beer.volume.unit}}</td>
          </tr>
          <tr>
            <td>boil volume</td>
            <td>{{beer.boil_volume.value}} {{beer.boil_volume.unit}}</td>
          </tr>
        </tbody>
      </v-simple-table>
      <div>
        <h3 class="mb-4">Ingredients</h3>
        <h5>Malt</h5>
        <div :key="item.name" v-for="item in beer.ingredients.malt" class="ingredient ml-1">
          <span> {{item.name}} </span>
          <span class="ml-10">  {{item.amount.value}} {{item.amount.unit}} </span>
        </div>
        <h5>Hops</h5>
        <div :key="item.name" v-for="item in beer.ingredients.hops" class="ingredient ml-1">
          <span> {{item.name}} ({{item.attribute}}) </span>
          <span> {{item.amount.value}} {{item.amount.unit}} </span>
        </div>
        <h5>Yeast</h5>
        <span class="ml-1">{{beer.ingredients.yeast}}</span>
      </div>
      <div class="max-width">
        <h3 class="mb-4">Method</h3>
        <h5>Mash</h5>
        <div :key="i" v-for="(item, i) in beer.method.mash_temp" class="ml-1">
          <span> {{item.temp.value}} {{item.temp.unit}} </span>
          <span class="ml-10"> {{item.duration}}' </span>
        </div>
        <h5>Fermentation</h5>
        <span class="ml-1">{{beer.method.fermentation.temp.value}} {{beer.method.fermentation.temp.unit}}</span>
        <h5>Twist</h5>
        <span class="ml-1 twist">{{beer.method.twist}}</span>
      </div>
    </div>
    <div class="mt-6">
      <h3>Food pairing</h3>
      <ul>
        <li :key="item" v-for="item in beer.food_pairing">{{item}}</li>
      </ul>
      <h3 class="mt-2">Tips</h3>
      <p>{{beer.brewers_tips}}</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
export default Vue.extend({
  data() {
    return {
      beer: {},
      fetching: true,
    }
  },
  mounted() {
    this.fetchBeer()
  },
  methods: {
    async fetchBeer() {
      this.fetching = true;
      try {
        const response = await axios.get(`https://api.punkapi.com/v2/beers/${this.$route.params.id}`)
        this.beer = response.data[0]
        this.fetching = false
      } catch(error) {
        console.log(error);
        
      }
    }
  }
})
</script>

<style>
.container {
  margin: auto;
  max-width: 1260px;
  margin-top: 1em;
  display: flex;
  flex-direction: column;
}
.header {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.header > *+* {
  margin-left: 2em;
}

.image {
  max-height: 20em;
}

.content {
  margin-top: 1em;
  display: flex;
  flex-direction: flex;
  justify-content: space-around;
}

.table {
  width: 18%;
  border: 1px solid black;
  border-radius: 2px;
}

.ingredient {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.max-width{
  max-width: 25em;
}
</style>