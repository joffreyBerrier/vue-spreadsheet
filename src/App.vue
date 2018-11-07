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
      v-on:tbody-submenu-click-change-color="changeColorTbody"
      v-on:tbody-submenu-click-change-value="changeValueTbody"
      v-on:tbody-input-change="inputChange"
      v-on:tbody-select-change="selectChange">
    </vue-table>
  </div>
</template>

<script>
import VueTable from './components/Table.vue';

export default {
  name: 'app',
  data() {
    return {
      dragToFill: true,
      headers: [
        {
          headerName: 'Image',
          headerKey: 'img',
          style: {
            color: '#000',
          },
        },
        {
          headerName: 'Nom',
          headerKey: 'name',
          style: {
            color: '#000',
          },
        },
        {
          headerName: 'Prénom',
          headerKey: 'surname',
          style: {
            color: '#000',
          },
        },
        {
          headerName: 'Age',
          headerKey: 'age',
          style: {
            color: '#000',
          },
        },
        {
          headerName: 'Born',
          headerKey: 'born',
          style: {
            color: '#000',
          },
        },
      ],
      products: [
        {
          img: {
            type: 'img',
            value: 'https://via.placeholder.com/350x150',
            active: false,
          },
          name: {
            type: 'input',
            value: 'John',
            active: false,
            style: {
              color: '#000',
            },
          },
          surname: {
            type: 'input',
            value: '1',
            active: false,
            style: {
              color: '#000',
            },
          },
          age: {
            type: 'select',
            value: [26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38],
            selectedOptions: 28,
            active: false,
          },
          born: {
            type: 'select',
            value: [1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992],
            selectedOptions: 1990,
            active: false,
          },
        },
        {
          img: {
            type: 'img',
            value: 'https://via.placeholder.com/350x150',
            active: false,
          },
          name: {
            type: 'input',
            value: 'Em',
            active: false,
            style: {
              color: '#000',
            },
          },
          surname: {
            type: 'input',
            value: '2',
            active: false,
            style: {
              color: '#000',
            },
          },
          age: {
            type: 'select',
            value: [26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38],
            selectedOptions: 25,
            active: false,
          },
          born: {
            type: 'select',
            value: [1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992],
            selectedOptions: 1993,
            active: false,
          },
        },
        {
          img: {
            type: 'img',
            value: 'https://via.placeholder.com/350x150',
            active: false,
          },
          name: {
            type: 'input',
            value: 'Tom',
            active: false,
            style: {
              color: '#000',
            },
          },
          surname: {
            type: 'input',
            value: '3',
            active: false,
            style: {
              color: '#000',
            },
          },
          age: {
            type: 'select',
            value: [26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38],
            selectedOptions: 25,
            active: false,
          },
          born: {
            type: 'select',
            value: [1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992],
            selectedOptions: 1998,
            active: false,
          },
        },
        {
          img: {
            type: 'img',
            value: 'https://via.placeholder.com/350x150',
            active: false,
          },
          name: {
            type: 'input',
            value: 'Tim',
            active: false,
            style: {
              color: '#000',
            },
          },
          surname: {
            type: 'input',
            value: '4',
            active: false,
            style: {
              color: '#000',
            },
          },
          age: {
            type: 'select',
            value: [26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38],
            selectedOptions: 25,
            active: false,
          },
          born: {
            type: 'select',
            value: [1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992],
            selectedOptions: 1995,
            active: false,
          },
        },
      ],
      submenuThead: [
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
  components: {
    VueTable,
  },
  methods: {
    inputChange(event, entry, rowIndex, colIndex) {
      console.log('InputChange', event, entry, rowIndex, colIndex);
    },
    selectChange(event, entry, rowIndex, colIndex) {
      console.log('selectChange', event, entry, rowIndex, colIndex);
      this.changeValueSelect(rowIndex, colIndex);
    },
    // callback
    changeValueSelect(rowIndex, colIndex) {
      console.log('changeValueSelect', rowIndex, colIndex);
      const activeElement = Object.values(this.products[rowIndex])[colIndex];
      const nextElement = Object.values(this.products[rowIndex])[colIndex + 1];
      const prevElement = Object.values(this.products[rowIndex])[colIndex - 1];

      const actualYear = new Date().getFullYear();
      if (nextElement && nextElement.selectedOptions) {
        nextElement.selectedOptions = actualYear - activeElement.selectedOptions;
      }
      if (prevElement && prevElement.selectedOptions) {
        prevElement.selectedOptions = actualYear - activeElement.selectedOptions;
      }
    },
    changeColor(event, entry, colIndex, submenuFunction) {
      console.log('changeColor', event, entry, colIndex, submenuFunction);
      this.headers[colIndex].style.color = '#e40000';
    },
    changeValue(event, entry, colIndex, submenuFunction) {
      console.log('changeValue', event, entry, colIndex, submenuFunction);
      this.headers[colIndex].headerName = 'T-shirt';
    },
    changeColorTbody(event, entry, rowIndex, colIndex, type, submenuFunction) {
      console.log('changeColorTbody', event, entry, rowIndex, colIndex, type, submenuFunction);
      if (type === 'input') {
        this.products[rowIndex][entry].style.color = '#e40000';
      }
    },
    changeValueTbody(event, entry, rowIndex, colIndex, type, submenuFunction) {
      console.log('changeValueTbody', event, entry, rowIndex, colIndex, type, submenuFunction);
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
