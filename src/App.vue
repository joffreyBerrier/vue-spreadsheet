<template>
  <div id="app">
    <vue-table :data="products" :headers="headers"></vue-table>
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
        },
        {
          headerName: 'Nom',
          headerKey: 'name',
        },
        {
          headerName: 'Prénom',
          headerKey: 'surname',
        },
        {
          headerName: 'Age',
          headerKey: 'age',
        },
      ],
      products: [
        {
          img: {
            type: 'img',
            value: 'https://via.placeholder.com/350x150',
          },
          name: {
            type: 'input',
            value: 'Joffrey',
          },
          surname: {
            type: 'input',
            value: 'Berrier',
          },
          age: {
            type: 'select',
            value: [28, 29, 30],
            selectedOptions: 28,
          },
        },
        {
          img: {
            type: 'img',
            value: 'https://via.placeholder.com/350x150',
          },
          name: {
            type: 'input',
            value: 'Joffrey',
          },
          surname: {
            type: 'input',
            value: 'Berrier',
          },
          age: {
            type: 'select',
            value: [28, 29, 30],
            selectedOptions: 28,
          },
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
