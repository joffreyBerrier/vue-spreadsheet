<template>
  <thead class="thead">
    <tr>
      <template v-for="header in header">
        <th class="th" :key="header.headerKey">
          <span>{{header.headerName}}</span>
        </th>
      </template>
    </tr>
  </thead>
</template>

<script type="text/javascript">
export default {
  name: 'vue-thead',
  props: {
    header: Array,
  },
  data() {
    return {};
  },
  computed: {
  },
};
</script>

<style lang="scss" scoped>
.th {
  width: 120px;
  height: 40px;
  line-height: 40px;
  position: relative;
  background: #dadada;
  border: 1px solid white;
  z-index: 15;
  text-align: left;
  padding: 2px 5px;
  box-sizing: border-box;
  border-right: 0;
  border-top: 0;
  transition: all ease 0.5s;
  &:last-child {
    border-right: 1px solid white;
  }
}
</style>
