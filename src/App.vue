<template>
  <div id="app">
    <vue-table
      :disable-cells="disableCells"
      :drag-to-fill="dragToFill"
      :headers="headers"
      :new-data="newData"
      :sort-header="sortHeader"
      :submenu-tbody="submenuTbody"
      :submenu-thead="submenuThead"
      :tbody-data="products"
      :tbody-index="tbodyIndex"
      v-on:tbody-input-change="inputChange"
      v-on:tbody-nav-backspace="deleteCell"
      v-on:tbody-select-change="selectChange"
      v-on:tbody-submenu-click-change-color="changeColorTbody"
      v-on:tbody-submenu-click-change-value="changeValueTbody"
      v-on:thead-submenu-click-change-city="changeCity"
      v-on:thead-submenu-click-change-color="changeColor"
      v-on:thead-submenu-click-change-value="changeValue"
      v-on:thead-td-sort="sortProduct">
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
  methods: {
    sortProduct(event, entry, colIndex) {
      // console.log('sort product');
    },
    deleteCell(event, actualElement, actualCol, rowIndex, colIndex) {
      // console.log(event, actualElement, actualCol, rowIndex, colIndex);
    },
    inputChange(event, entry, rowIndex, colIndex) {
      // console.log('InputChange', event, entry, rowIndex, colIndex);
    },
    selectChange(event, entry, rowIndex, colIndex) {
      // console.log('selectChange', event, entry, rowIndex, colIndex);
      this.changeValueSelect(rowIndex, colIndex);
    },
    // callback
    changeCity(event, entry, colIndex, selectOptions) {
      this.products.forEach((elm) => {
        const product = elm;
        product[entry].value = selectOptions;
      });
    },
    changeValueSelect(rowIndex, colIndex) {
      // console.log('changeValueSelect', rowIndex, colIndex);
      // to get our element => Object.values(this.products[rowIndex])[colIndex];
    },
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
