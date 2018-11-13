<template>
  <div id="app">
    <vue-table
      :data="products"
      :headers="headers"
      :drag-to-fill="dragToFill"
      :submenu-tbody="submenuTbody"
      :submenu-thead="submenuThead"
      v-on:thead-submenu-click-change-color="changeColor"
      v-on:thead-submenu-click-change-value="changeValue"
      v-on:thead-submenu-click-change-city="changeCity"
      v-on:tbody-submenu-click-change-color="changeColorTbody"
      v-on:tbody-submenu-click-change-value="changeValueTbody"
      v-on:tbody-input-change="inputChange"
      v-on:tbody-select-change="selectChange">
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
    inputChange(event, entry, rowIndex, colIndex) {
      console.log('InputChange', event, entry, rowIndex, colIndex);
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
      console.log('changeValueSelect', rowIndex, colIndex);
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
body {
  color: #2c3e50;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  background: #fff;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  text-align: center;
  font: 400 11px system-ui;
}
::-moz-selection { /* Code for Firefox */
  color: #2c3e50;
  background: transparent;
}
::selection {
  color: #2c3e50;
  background: transparent;
}
.row,
.thead {
  display: flex;
}
.wrap {
  margin: 10px auto;
}
</style>
