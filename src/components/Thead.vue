<template>
  <div class="thead">
    <template v-for="(header, index) in header">
      <div class="th" :key="index">
        <span>{{header}}</span>
      </div>
    </template>
  </div>
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

<style lang="scss">
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
