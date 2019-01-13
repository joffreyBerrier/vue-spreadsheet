<template>
  <div id="app">
    <vue-table
      :headers="headers"
      :tbody-data="products"
      :submenu-tbody="submenuTbody"
      :submenu-thead="submenuThead"
      :disable-cells="disableCells"
      :disable-sort-thead="disableSortThead"
      :drag-to-fill="dragToFill"
      :fuse-options="fuseOptions"
      :loading="loading"
      :new-data="newData"
      :parent-scroll-element="parentScrollElement"
      :sort-header="sortHeader"
      :style-wrap-vue-table="styleWrapVueTable"
      :tbody-index="tbodyIndex"
      :select-position="selectPosition"
      :trad="trad"
      v-on:tbody-change-data="changeData"
      v-on:tbody-submenu-click-change-color="changeColorTbody"
      v-on:tbody-submenu-click-change-value="changeValueTbody"
      v-on:thead-submenu-click-change-color="changeColor"
      v-on:thead-submenu-click-change-value="changeValue"
      v-on:thead-td-sort="sortProduct">
    <div slot="header">
      Specific Header
    </div>
    <div slot="loader" v-if="loader">
      Loader
    </div>
    </vue-table>
  </div>
</template>

<script>
import VueTable from './components/VueTable.vue';
import exempleData from './data';

export default {
  name: 'app',
  data() {
    return exempleData;
  },
  components: {
    VueTable,
  },
  mounted() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 300);
  },
  methods: {
    changeData(row, header) {
      console.log(row, header);
    },
    sortProduct(event, entry, colIndex) {
      // console.log('sort product');
    },
    // callback
    changeColor(event, entry, colIndex) {
      // console.log('changeColor', event, entry, colIndex);
      this.headers[colIndex].style.color = '#e40000';
    },
    changeValue(event, entry, colIndex) {
      // console.log('changeValue', event, entry, colIndex);
      this.headers[colIndex].headerName = 'T-shirt';
    },
    changeColorTbody(event, entry, rowIndex, colIndex, type) {
      // console.log('changeColorTbody', event, entry, rowIndex, colIndex, type);
      if (type === 'input') {
        this.products[rowIndex][entry].style.color = '#e40000';
      }
    },
    changeValueTbody(event, entry, rowIndex, colIndex, type) {
      // console.log('changeValueTbody', event, entry, rowIndex, colIndex, type);
      if (type === 'input') {
        this.products[rowIndex][entry].value = 'T-shirt';
      }
    },
  },
};
</script>

<style lang="scss">
::-moz-selection {
  color: #2c3e50;
  background: transparent;
}
::selection {
  color: #2c3e50;
  background: transparent;
}
</style>
