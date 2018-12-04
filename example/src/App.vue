<template>
  <div id="app">
    <vue-table
      :disable-cells="disableCells"
      :drag-to-fill="dragToFill"
      :headers="headers"
      :new-data="newData"
      :parent-element-scroll="0"
      :sort-header="sortHeader"
      :style-wrap-vue-table="styleWrapVueTable"
      :submenu-tbody="submenuTbody"
      :submenu-thead="submenuThead"
      :tbody-data="products"
      :tbody-index="tbodyIndex"
      v-on:tbody-input-change="inputChange"
      v-on:tbody-nav-backspace="deleteCell"
      v-on:tbody-nav-multiple-backspace="deleteMultipleCell"
      v-on:tbody-select-change="selectChange"
      v-on:tbody-submenu-click-change-color="changeColorTbody"
      v-on:tbody-submenu-click-change-value="changeValueTbody"
      v-on:tbody-up-dragtofill="handleUpDragToFill"
      v-on:thead-submenu-click-change-city="changeCity"
      v-on:thead-submenu-click-change-color="changeColor"
      v-on:thead-submenu-click-change-value="changeValue"
      v-on:thead-td-sort="sortProduct">

    <div slot="header">
      Specific Header
    </div>

    </vue-table>
  </div>
</template>

<script>
import VueTable from 'spreadsheet-vuejs';
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
    handleUpDragToFill(selectedMultipleCell, entry, rowIndex, colIndex) {
      console.log(selectedMultipleCell, entry, rowIndex, colIndex);
    },
    sortProduct(event, entry, colIndex) {
      console.log('sort product');
    },
    deleteCell(event, actualElement, actualCol, rowIndex, colIndex) {
      console.log(event, actualElement, actualCol, rowIndex, colIndex);
    },
    inputChange(event, entry, rowIndex, colIndex) {
      console.log('InputChange', event, entry, rowIndex, colIndex);
    },
    selectChange(event, entry, col, option, rowIndex, colIndex) {
      console.log('selectChange', event, entry, rowIndex, colIndex);
      this.changeValueSelect(rowIndex, colIndex);
    },
    deleteMultipleCell(rowMin, colMin, keyValue) {
      console.log(rowMin, colMin, keyValue);
    },
    // callback
    changeCity(event, entry, colIndex, selectOptions) {
      this.products.forEach((elm) => {
        const product = elm;
        product[entry].value = selectOptions;
      });
    },
    changeValueSelect(rowIndex, colIndex) {
      console.log('changeValueSelect', rowIndex, colIndex);
      // to get our element => Object.values(this.products[rowIndex])[colIndex];
    },
    changeColor(event, entry, colIndex) {
      console.log('changeColor', event, entry, colIndex);
      this.headers[colIndex].style.color = '#e40000';
    },
    changeValue(event, entry, colIndex) {
      console.log('changeValue', event, entry, colIndex);
      this.headers[colIndex].headerName = 'T-shirt';
    },
    changeColorTbody(event, entry, rowIndex, colIndex, type) {
      console.log('changeColorTbody', event, entry, rowIndex, colIndex, type);
      if (type === 'input') {
        this.products[rowIndex][entry].style.color = '#e40000';
      }
    },
    changeValueTbody(event, entry, rowIndex, colIndex, type) {
      console.log('changeValueTbody', event, entry, rowIndex, colIndex, type);
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