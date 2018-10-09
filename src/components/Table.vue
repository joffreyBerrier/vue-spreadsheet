<template>
  <table class="wrap">
    <vue-thead :header="headers"></vue-thead>
    <vue-tbody :rowData="data"></vue-tbody>
  </table>
</template>

<script type="text/javascript">
import VueThead from './Thead.vue';
import VueTbody from './Tbody.vue';

export default {
  name: 'VueTable',
  props: {
    data: Array,
    headers: Array,
  },
  components: {
    VueThead,
    VueTbody,
  },
};
</script>

<style lang="scss">
body {
  background: #fff;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  text-align: center;
  font: 400 11px system-ui;
}
table{
  border-collapse: collapse;
  margin: 5px;
  th {
    background-color: #ccc;
    color: #000;
    font-weight: normal;
  }
  td, th {
    border: 1px solid #ccc;
    margin: 0;
    padding: 4px;
  }
}
.wrap {
  margin: 10px auto;
}
</style>
