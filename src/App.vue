<template>
  <div id="app">
    <!-- Exemple -->
    <vue-table :data="products" type="select"></vue-table>
    <vue-table :data="products" type="input"></vue-table>
  </div>
</template>

<script>
import VueTable from './components/Table.vue';

export default {
  name: 'app',
  data() {
    return {
      products: [
        {
          ean: 'EAN 0',
          ref: 'REF 0',
          name: 'Nom 0',
          couleurprincipale: 'couleur principale 0',
          couleursecondaire: 'couleur principale 0',
        },
        {
          ean: 'EAN 1',
          ref: 'REF 1',
          name: 'Nom 1',
          couleurprincipale: 'couleur principale 1',
          couleursecondaire: 'couleur principale 1',
        },
        {
          ean: 'EAN 2',
          ref: 'REF 2',
          name: 'Nom 2',
          couleurprincipale: 'couleur principale 2',
          couleursecondaire: 'couleur principale 2',
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
.row:first-child {
  border-top: 1px solid #dadada;
}
</style>
