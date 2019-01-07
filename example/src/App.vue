<template>
  <div id="app">
    <vue-table
      ref="vueTable"
      :disable-cells="disableCells"
      :disable-sort-thead="disableSortThead"
      :drag-to-fill="dragToFill"
      :headers="headers"
      :loading="loading"
      :new-data="newData"
      :parent-element-scroll="0"
      :parent-scroll-element="'html'"
      :sort-header="sortHeader"
      :style-wrap-vue-table="styleWrapVueTable"
      :submenu-tbody="submenuTbody"
      :submenu-thead="submenuThead"
      :tbody-data="products"
      :tbody-index="tbodyIndex"
      v-on:tbody-change-data="changeData"
      v-on:tbody-input-change="inputChange"
      v-on:tbody-nav-backspace="deleteCell"
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
    <div slot="loader" v-if="loader">
      Loader
    </div>
    </vue-table>
  </div>
</template>

<script>
import VueTable from 'vuejs-spreadsheet';
// import exempleData from './data';
export default {
  name: 'app',
  data() {
    return {
      dragToFill: true,
      disableCells: ['a'],
      sortHeader: true,
      tbodyIndex: true,
      loader: false,
      loading: false,
      selectPosition: {
        top: 0,
        left: 0,
      },
      disableSortThead: ['a'],
      styleWrapVueTable: {
        height: '500px',
        width: '1000px',
        overflow: 'scroll',
      },
      newData: {
        type: 'input',
        value: '',
        active: false,
        style: {
          color: '#000',
        },
      },
      headers: [],
      products: [],
      submenuThead: [
        {
          type: 'button',
          value: 'change color',
          function: 'change-color',
          disabled: ['a'],
        },
        {
          type: 'select',
          disabled: ['a'],
          subtitle: 'Select state:',
          selectOptions: [
            {
              value: 'new-york',
              label: 'new-york',
            },
            {
              value: 'france',
              label: 'france',
            },
          ],
          value: 'new-york',
          buttonOption: {
            value: 'change city',
            function: 'change-city',
            style: {
              display: 'block',
            },
          },
        },
        {
          type: 'button',
          value: 'change value',
          function: 'change-value',
          disabled: ['a', 'b'],
        },
      ],
      submenuTbody: [
        {
          type: 'button',
          value: 'change color',
          function: 'change-color',
          disabled: ['img'],
        },
        {
          type: 'button',
          value: 'change value',
          function: 'change-value',
          disabled: ['img', 'name'],
        },
      ],
    };
  },
  mounted() {
    for (let i = 0; i < 10; i++) {
      this.headers.push({
        headerName: this.$faker().name.jobTitle(),
        headerKey: this.$faker().name.jobTitle(),
        style: {
          width: '200px',
          minWidth: '200px',
          color: '#000',
        },
      });
    }
    let product = {};
    this.headers.forEach((header, headerI) => {
      const object = {
        type: 'input',
        value: this.$faker().name.firstName(),
        active: false,
        style: {
          color: '#000',
        },
      };
      if (!product[header.headerKey]) {
        product[header.headerKey] = JSON.parse(JSON.stringify(object));
      }
        this.products.push(JSON.parse(JSON.stringify(product)));
      // }
    });
    this.$refs.vueTable.createdCell();
  },
  components: {
    VueTable,
  },
  methods: {
    changeData(row, header) {
      console.log(row, header);
    },
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
      // to get our element => this.products[rowIndex])[colIndex];
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
        this.products[rowIndex][entry].value = this.$faker().name.firstName();
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