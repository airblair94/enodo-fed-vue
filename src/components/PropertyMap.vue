
<template>
  <div>
    <el-row :gutter="10">
      <FilterContainer
      v-bind:parentFilterList="filterList"
      v-bind:filters="filters"
      @interface="handleSubmittedFilters"
    />
    </el-row>
    <el-row>
      <GmapMap
        :center="{lat:41.89, lng:-87.65}"
        :zoom="13"
        style="width: 100vw; height: 95vh"
      >
        <PropertyMapMarker
          :key="p.id"
          v-bind:id="p.id.toString()"
          v-for="p in properties"
          v-bind:position="{lat: parseFloat(p.latitude), lng: parseFloat(p.longitude)}"
          v-bind:label="p['full_address']"
          v-bind:iconColor="colorSpectrum && colorSpectrum.colorAt(p.estimated_market_value)"
        />
      </GmapMap>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios';
import PropertyMapMarker from './PropertyMapMarker.vue';
import FilterContainer from './FilterContainer.vue';

export default {
  name: 'PropertyMap',
  components: {
    PropertyMapMarker,
    FilterContainer,
  },
  data() {
    return {
      properties: [],
      filters: [],
      colorSpectrum: null,
      filterList: {},
    };
  },
  methods: {
    getMinEstMV(data) {
      // eslint-disable-next-line
      return data.reduce((min, p) => p.estimated_market_value < min ?
        p.estimated_market_value
        : min, data[0].estimated_market_value);
    },
    getMaxEstMV(data) {
      // eslint-disable-next-line
      return data.reduce((max, p) => p.estimated_market_value > max ?
        p.estimated_market_value
        : max, data[0].estimated_market_value);
    },
    // returns all filters(ie. columns in db) and said filter's type wether it be categorical
    // or numerical data. If it is categorical returns all possible options
    getFilters() {
      const path = 'http://localhost:5000/filters';
      axios.get(path)
        .then((res) => {
          this.filters = res.data;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    // sets the color spectrum for the markers using rainbowvis.js
    setSpectrum(data) {
      const minEstMV = this.getMinEstMV(data);
      const maxEstMV = this.getMaxEstMV(data);
      // eslint-disable-next-line
      const Rainbow = require('rainbowvis.js');
      this.colorSpectrum = new Rainbow();
      this.colorSpectrum.setSpectrum('red', 'green');
      this.colorSpectrum.setNumberRange(minEstMV, maxEstMV);
    },
    // sends the filters that have been selected by the user and sets new data
    handleSubmittedFilters(event) {
      const path = 'http://localhost:5000/properties';
      axios.post(path, event)
        .then((res) => {
          this.properties = res.data;
          this.setSpectrum(res.data);
        })
        .catch((err) => {
          // eslint-disable-next-line
          console.error(err);
        });
    },
    // gets initial properties
    getProperties() {
      const path = 'http://localhost:5000/properties';
      axios.get(path)
        .then((res) => {
          this.properties = res.data;
          this.setSpectrum(res.data);
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
  },
  created() {
    this.getProperties();
    this.getFilters();
  },
};
</script>
