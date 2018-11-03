<template>
  <div id="app">
    <vue-table
      :data="products"
      :headers="headers"
      :submenu-tbody="submenuTbody"
      :submenu-thead="submenuThead">
    </vue-table>
  </div>
</template>

<script>
import VueTable from './components/Table.vue';

export default {
  name: 'app',
  data() {
    return {
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
            value: 'Joffrey',
            active: false,
            style: {
              color: '#000',
            },
          },
          surname: {
            type: 'input',
            value: 'Berrier',
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
            value: 'Emma',
            active: false,
            style: {
              color: '#000',
            },
          },
          surname: {
            type: 'input',
            value: 'Hypopo',
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
    };
  },
  components: {
    VueTable,
  },
};
</script>

<style lang="scss">
body {
  color: #2c3e50;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #fff;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  text-align: center;
  font: 400 11px system-ui;
}
.row,
.thead {
  display: flex;
}
.wrap {
  margin: 10px auto;
}
</style>
