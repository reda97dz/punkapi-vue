<template>
  <div>
    <div class="side primary"> 
      <button class="filter-button" type="button" v-on:click="fetchBeers()">Filter</button>

      <label for="beername">Beer name</label>
      <input type="text" name="beername" v-model="name"/>

      <label for="yeast">Yeast</label>
      <input type="text" name="yeast" v-model="yeast"/>

      <label for="hops">Hops</label>
      <input type="text" name="hops" v-model="hops"/>

      <label for="malt">Malt</label>
      <input type="text" name="malt" v-model="malt"/>

      <label for="food">Food</label>
      <input type="text" name="food" v-model="food"/>

      <label for="abv">abv</label>
      <v-range-slider v-model="abv" :max="abv_max" :min="abv_min" class="white" hide-details>
        <template v-slot:prepend>
          <v-text-field
            :value="abv[0]"
            class="mt-0 pt-0"
            hide-details
            single-line
            type="number"
            style="width: 35px"
            @change="$set(abv, 0, $event)"
          ></v-text-field>
        </template>
        <template v-slot:append>
          <v-text-field
            :value="abv[1]"
            class="mt-0 pt-0"
            hide-details
            single-line
            type="number"
            style="width: 35px"
            @change="$set(abv, 1, $event)"
          ></v-text-field>
        </template> 
      </v-range-slider>

      <label for="ibu">ibu</label>
      <v-range-slider v-model="ibu" :max="ibu_max" :min="ibu_min" class="white" hide-details>
        <template v-slot:prepend>
          <v-text-field
            :value="ibu[0]"
            class="mt-0 pt-0"
            hide-details
            single-line
            type="number"
            style="width: 50px"
            @change="$set(ibu, 0, $event)"
          ></v-text-field>
        </template>
        <template v-slot:append>
          <v-text-field
            :value="ibu[1]"
            class="mt-0 pt-0"
            hide-details
            single-line
            type="number"
            style="width: 50px"
            @change="$set(ibu, 1, $event)"
          ></v-text-field>
        </template> 
      </v-range-slider>

      <label for="ebc">ebc</label>
      <v-range-slider v-model="ebc" :max="ebc_max" :min="ebc_min" class="white" hide-details>
        <template v-slot:prepend>
          <v-text-field
            :value="ebc[0]"
            class="mt-0 pt-0"
            hide-details
            single-line
            type="number"
            style="width: 50px"
            @change="$set(ebc, 0, $event)"
          ></v-text-field>
        </template>
        <template v-slot:append>
          <v-text-field
            :value="ebc[1]"
            class="mt-0 pt-0"
            hide-details
            single-line
            type="number"
            style="width: 50px"
            @change="$set(ebc, 1, $event)"
          ></v-text-field>
        </template> 
      </v-range-slider>

      <button class="reset-button" v-on:click="reset()">reset</button>



    </div>

    <p class="click mt-4">Click on card for more details</p>
    <div class="list">
      <v-card
        v-for="{ name, id, tagline, image_url, description } in beers"
        :key="id"
        elevation="1"
        :to="`/beer/${id}`"
        class="indigo lighten-5"
      >
        <div class="list-item">
          <div class="list-item-header">
            <div class="title">
              <h2>{{name}}</h2>
            </div>
            <div class="subtitle">
              <h4>{{tagline}}</h4>
            </div>
            <div class="image">
              <img :src="image_url">
            </div>
          </div>
          <div class="list-item-content indigo lighten-4">
            {{description}}
          </div>
        </div>
      </v-card>
    </div>
    <div>
      <v-pagination
        v-model="page"
        :length="Math.round(total / per_page)"
        circle
        @input="fetchBeers()"
      ></v-pagination>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import axios from 'axios'

  export default Vue.extend({
    data() {
      return {
        beers: [],
        page: 1,
        total: 325,
        per_page: 24,
        name: "",
        yeast: "",
        hops: "",
        malt: "",
        food: "",
        abv_min: 0,
        abv_max: 60,
        abv: [0, 60],
        ibu_max: 1160,
        ibu_min: 0,
        ibu: [0, 1160],
        ebc_max: 601,
        ebc_min: 0,
        ebc: [0, 601],
      }
    },

    mounted() {
      this.fetchBeers()
    },

    methods: {

      reset() {
        this.name = ""
        this.yeast = ""
        this.hops = ""
        this.malt = ""
        this.food = ""
        this.abv = [0, 60]
        this.ibu = [0, 1160]
        this.ebc = [0, 601]
        this.fetchBeers()
      },

      async fetchBeers() {        
        const params: ParamObject = { page: this.page, per_page: this.per_page };
        if(this.name) params["beer_name"] = this.name.split(" ").join("_")
        if(this.yeast) params["yeast"] = this.yeast.split(" ").join("_")
        if(this.hops) params["hops"] = this.hops.split(" ").join("_")
        if(this.malt) params["alt"] = this.malt.split(" ").join("_")
        if(this.food) params["food"] = this.food.split(" ").join("_")
        if(this.abv[0] > 0) params["abv_gt"] = this.abv[0]
        if(this.abv[1] < 60) params["abv_lt"] = this.abv[1]
        if(this.ibu[0] > 0) params["ibu_gt"] = this.ibu[0]
        if(this.ibu[1] < 1160) params["ibu_lt"] = this.ibu[1]
        if(this.ebc[0] > 0) params["ebc_gt"] = this.ebc[0]
        if(this.ebc[1] < 601) params["ebc_lt"] = this.ebc[1]
        
        try {
          const response = await axios.get("https://api.punkapi.com/v2/beers", {
            params: params,
          });
          this.beers = response.data;
        } catch (error) {
          console.log(error);
        }
      },

    }

  })

  interface ParamObject {
    [key: string]: any
  }
</script>

<style>
body{
  background: #181824;
}

.list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20em, 1fr));
  grid-gap: 1em;
  grid-auto-flow: dense;
  padding: 1em;
  margin-left: 18em;
}
.click {
  margin-left: 19em;
}

.list-item {
  display: flex;
  flex-direction: column;
  margin: 0;
  cursor: pointer;
  padding: 1em;
  min-height: 15em;
  max-height: 20em;
}

.list-item-header {
  display: grid;
  grid-template-columns: 5fr 1fr;
  grid-template-rows: repeat(6, auto);
  grid-gap: .1em;
}

.title {
  grid-column: 1/2;
  grid-row: 1/2;
}

.subtitle {
  color: blue;
  grid-column: 1/2;
  grid-row: 2/7;
}

.image {
  grid-column: 2/3;
  grid-row: 1/7;
  height: 8em;
  text-align: center;
}

.image > img {
  max-height: 8em;
}

.list-item-content {
  border-radius: 5px;
  padding: .5em;
  margin-top: 1em;
  overflow-y: auto;
}

::-webkit-scrollbar {
    width: 0.1em;
  }

::-webkit-scrollbar-thumb {
  background-color: #181824;
  outline: none;
  border-radius: 2em;
}

::-webkit-scrollbar-track-piece {
  margin: 0.2em 0;
  background-color: #9e9e9e;
  border-radius: 2em;
}

.side {
  display: block;
  position: fixed;
  height: calc(100% - 6em);
  background-color: primary;
  padding: 0.5em;
  border-radius: 5px;
  top: 5em;
  overflow-y: auto;
  left: 1em;
  max-width: 17em;
}

@media (max-width: 40em) {
  .side {
    display: none;
  }
  .click {
    margin-left: 1em;
  }
  .list {
    margin-left: 0;
  }
}

.filter-button {
  background-color: #fff;
  text-align: center;
  padding: 0.4em;
  border-radius: 4px;
  width: 100%;
  font-size: 1.2em;
  margin-bottom: 1em;
}

.filter-button:active {
  transform: scale(0.99);
}

.reset-button {
  background: transparent;
  text-align: right;
  color: orange;
  margin-top: 0.7em;
  font-size: 1em;
}

label {
  color: #fff;
}

.side > input {
  background-color: transparent;
  border: 1px solid #fff;
  border-radius: 4px;
  width: 100%;
  padding: 0.3em;
  margin-bottom: 0.8em;
  color: #fff;
}
</style>