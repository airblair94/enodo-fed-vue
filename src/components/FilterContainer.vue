<template>
  <div>
    <el-col :span="4">
      <el-dropdown @command="addFilter">
        <el-button type="primary">
          Add Filter<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="col in filters"
            :key="col.name"
            :command="col"
          >
            {{col.name}}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button type="success" v-on:click="submitFilters">
        Submit Filters
      </el-button>
    </el-col>
    <el-col :span="20">
      <FilterOption
        v-for="value in filterList"
        v-bind:key="`filter-${value.name}`"
        v-bind:type="value.type"
        v-bind:optionsList="value.optionsList"
        v-bind:filterName="value.name"
        v-bind:filterListFromParent="filterList"
        @interface="filterList = $event"
      >
      </FilterOption>
    </el-col>
  </div>
</template>

<script>
import FilterOption from './FilterOption.vue';

export default {
  name: 'FilterContainer',
  components: {
    FilterOption,
  },
  data() {
    return {
      filterList: {},
    };
  },
  props: {
    filters: Array,
    parentFilterList: Object,
  },
  methods: {
    // passes filters to PropertyMap
    submitFilters() {
      this.$emit('interface', this.filterList);
    },
    // Adds filter every time a dropdown option is selected
    addFilter({ name, type, optionsList }) {
      if (type === 'VARCHAR(250)' || type === 'DATE') {
        this.filterList = {
          ...this.filterList,
          [name]: {
            name,
            type,
            optionsList,
            value: null,
          },
        };
      } else {
        this.filterList = {
          ...this.filterList,
          [name]: {
            name,
            type,
            min: null,
            max: null,
          },
        };
      }
    },
  },
  beforeMount() {
    this.filterList = this.parentFilterList;
  },
};
</script>
