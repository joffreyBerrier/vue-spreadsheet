<template>
  <div class="wrap">
    <vue-thead :header="headers"></vue-thead>
    <vue-tbody :rowData="data" :type="type"></vue-tbody>
  </div>
</template>

<script type="text/javascript">
import VueThead from './Thead.vue';
import VueTbody from './Tbody.vue';

export default {
  name: 'VueTable',
  props: {
    data: Array,
    type: String,
  },
  components: {
    VueThead,
    VueTbody,
  },
  data() {
    return {};
  },
  computed: {
    headers() {
      return Object.keys(this.data[0]);
    },
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
