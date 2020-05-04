<template>
  <el-col :span="4" v-if="type === 'VARCHAR(250)' || type === 'DATE'">
    {{filterName}}:
    <el-select v-model="value" :placeholder="filterName" v-on:change="sendToParent">
      <el-option
        v-for="option in optionsList"
        :key="option"
        :label="option"
        :value="option">
      </el-option>
    </el-select>
    <el-button type="danger" v-on:click="removeToParent">Remove Filter</el-button>
  </el-col>
  <el-col :span="4" v-else>
    {{filterName}}:
    <el-input
      size="medium"
      :placeholder="`Min ${filterName}`"
      v-model="min"
      v-on:input="sendToParent">
    </el-input>
    <el-input
      size="medium"
      :placeholder="`Max ${filterName}`"
      v-model="max"
      v-on:input="sendToParent">
    </el-input>
    <el-button type="danger" v-on:click="removeToParent">Remove Filter</el-button>
  </el-col>
</template>

<script>
export default {
  name: 'filter-option',
  data() {
    return {
      value: '',
      min: null,
      max: null,
      filterList: {},
    };
  },
  props: {
    filterName: String,
    type: String,
    optionsList: Array,
    filterListFromParent: Object,
  },
  methods: {
    removeToParent() {
      const copy = { ...this.filterList };
      // This causes a bug for some reason it removes all entries after the deleted object
      delete copy[this.filterName];
      this.$emit('interface', copy);
    },
    // sends the new filter values to the FilterContainer
    sendToParent() {
      const updatedFilter = {
        name: this.filterName,
        type: this.type,
        max: this.max,
        min: this.min,
        value: this.value,
      };
      this.$emit('interface', { ...this.filterList, [this.filterName]: { ...updatedFilter } });
    },
  },
  beforeMount() {
    this.filterList = this.filterListFromParent;
  },
};
</script>
