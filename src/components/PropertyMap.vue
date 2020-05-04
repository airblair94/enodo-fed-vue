
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
        map-type-id="terrain"
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
      min_est_MV: null,
      max_est_MV: null,
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
    getFilters() {
      const path = 'http://localhost:5000/filters';
      axios.get(path)
        .then((res) => {
          console.log(res.data);
          this.filters = res.data;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    handleSubmittedFilters(event) {
      const path = 'http://localhost:5000/properties';
      console.log(event);
      axios.post(path, event)
        .then((res) => {
          console.log(res.data);
          this.properties = res.data;
          this.min_est_MV = this.getMinEstMV(res.data);
          this.max_est_MV = this.getMaxEstMV(res.data);
          // eslint-disable-next-line
          const Rainbow = require('rainbowvis.js');
          this.colorSpectrum = new Rainbow();
          this.colorSpectrum.setSpectrum('red', 'green');
          this.colorSpectrum.setNumberRange(this.min_est_MV, this.max_est_MV);
        })
        .catch((err) => {
          // eslint-disable-next-line
          console.error(err);
        });
    },
    getProperties() {
      const path = 'http://localhost:5000/properties';
      axios.get(path)
        .then((res) => {
          // eslint-disable-next-line
          console.log(res.data);
          this.properties = res.data;
          this.min_est_MV = this.getMinEstMV(res.data);
          this.max_est_MV = this.getMaxEstMV(res.data);
          // eslint-disable-next-line
          const Rainbow = require('rainbowvis.js');
          this.colorSpectrum = new Rainbow();
          this.colorSpectrum.setSpectrum('red', 'green');
          this.colorSpectrum.setNumberRange(this.min_est_MV, this.max_est_MV);
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
