<template>
  <div v-if="type === 'VARCHAR(250)' || type === 'DATE'">
    <el-select v-model="value" :placeholder="filterName" v-on:change="sendToParent">
      <el-option
        v-for="option in optionsList"
        :key="option"
        :label="option"
        :value="option">
      </el-option>
    </el-select>
  </div>
  <div v-else>
    {{filterName}}:
    <el-input :placeholder="`Min ${filterName}`" v-model="min" v-on:input="sendToParent"></el-input>
    <el-input :placeholder="`Max ${filterName}`" v-model="max" v-on:input="sendToParent"></el-input>
  </div>
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
