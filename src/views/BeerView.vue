<template>
  <div class="about">
    <h1>This is an about page</h1>
    {{ $route.params.id }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
export default Vue.extend({
  data() {
    return {
      beer: {},
    }
  },
  mounted() {
    this.fetchBeer()
  },
  methods: {
    async fetchBeer() {
      try {
        const response = await axios.get(`https://api.punkapi.com/v2/beers/${this.$route.params.id}`)
        console.log(response.data);
        
      } catch(error) {
        console.log(error);
        
      }
    }
  }
})
</script>