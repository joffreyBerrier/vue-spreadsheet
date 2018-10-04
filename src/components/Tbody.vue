<template>
  <div>
    <template v-for="(row, rowIndex) in rowData">
      <div class="row" :key="row + '' + rowIndex">
        <template v-for="(value, index) in row">
          <div class="td" v-on:dblclick="showInput($event)" :key="index">
            <!-- If Input -->
            <template v-if="type === 'input'">
              <span>{{row[index]}}</span>
              <input type="text" v-model="row[index]" />
            </template>
            <!-- If Select -->
            <template v-if="type === 'select'">
              <select v-model="row[index]">
                <option v-for="(value, index) in row" :value="value" :key="index">
                {{value}}
                </option>
              </select>
            </template>
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'vue-tbody',
  props: {
    rowData: Array,
    type: String,
  },
  data() {
    return {
      activElement: '',
    };
  },
  methods: {
    showInput(event) {
      if (this.activElement !== '') {
        this.activElement.classList.remove('show');
      }

      this.activElement = event.currentTarget;
      this.activElement.classList.add('show');
      this.activElement.lastElementChild.focus();
    },
  },
};
</script>

<style lang="scss">
.td {
  width: 120px;
  height: 40px;
  line-height: 40px;
  position: relative;
  background: white;
  border: 1px solid #dadada;
  z-index: 15;
  text-align: left;
  padding: 2px 5px;
  box-sizing: border-box;
  border-right: 0;
  border-top: 0;
  transition: all ease 0.5s;
  &:last-child {
    border-right: 1px solid #dadada;
  }
  input,
  select,
  span {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    background: white;
    text-align: left;
    padding: 2px 5px;
    box-sizing: border-box;
    outline: none;
    border: 0;
  }
  input,
  select {
    z-index: 5;
  }
  span {
    z-index: 10;
  }
}
.show input,
.show select {
  z-index: 11;
}
</style>
