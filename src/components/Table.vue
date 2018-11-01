<template>
  <table class="wrap" oncontextmenu="return false;">
    <vue-thead
      :header="headers"
      :submenu-thead="submenuThead"
      v-on:thead-td-context-menu="handleTheadContextMenu"
      :submenu-status="submenuStatusThead"
      v-on:submenu-enable="enableSubmenu"
      v-on:thead-submenu-click-change-color="changeColorThead"
      v-on:thead-submenu-click-change-value="changeValueThead">
    </vue-thead>

    <vue-tbody
      :rowData="data"
      :submenu-tbody="submenuTbody"
      v-on:tbody-td-click="handleTbodyTdClick"
      v-on:tbody-td-double-click="handleTbodyTdDoubleClick"
      v-on:tbody-td-context-menu="handleTbodyContextMenu"
      v-on:tbody-input-change="handleTbodyInputChange"
      v-on:tbody-select-change="handleTbodySelectChange"
      v-on:tbody-nav="handleTbodyNav"
      v-on:tbody-nav-enter="handleTbodyNavEnter"
      :submenu-status="submenuStatusTbody"
      v-on:submenu-enable="enableSubmenu"
      v-on:tbody-submenu-click-change-color="changeColor"
      v-on:tbody-submenu-click-change-value="changeValue">
    </vue-tbody>
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
    submenuTbody: Array,
    submenuThead: Array,
  },
  components: {
    VueThead,
    VueTbody,
  },
  data() {
    return {
      submenuStatusTbody: false,
      submenuStatusThead: false,
      submenuEnableCol: null,
    };
  },
  methods: {
    // global
    enableSubmenu(place) {
      if (place === 'thead') {
        this.submenuStatusThead = true;
        this.submenuStatusTbody = false;
      } else if (place === 'tbody') {
        this.submenuStatusThead = false;
        this.submenuStatusTbody = true;
      } else {
        this.submenuStatusThead = false;
        this.submenuStatusTbody = false;
      }
    },
    // tbody
    handleTbodyTdDoubleClick(event, entry, rowIndex, colIndex, activElement, type) {
      console.log('handleTbodyTdDoubleClick', event, entry, rowIndex, colIndex, activElement, type);
      this.enableSubmenu();
    },
    handleTbodyTdClick(event, entry, rowIndex, colIndex, type) {
      console.log('handleTbodyTdClick', event, entry, rowIndex, colIndex, type);
      this.enableSubmenu();
    },
    handleTbodyContextMenu(event, entry, rowIndex, colIndex, type) {
      console.log('handleTbodyContextMenu', event, entry, rowIndex, colIndex, type);
    },
    handleTbodyNav(event, entry, keyCode, actualElement, rowIndex, colIndex) {
      console.log('handleTbodyNav', event, entry, keyCode, actualElement, rowIndex, colIndex);
      this.enableSubmenu();
    },
    handleTbodyNavEnter(event, entry, keyCode, actualElement, rowIndex, colIndex) {
      console.log('handleTbodyNavEnter', event, entry, keyCode, actualElement, rowIndex, colIndex);
      this.enableSubmenu();
    },
    handleTbodyInputChange(event, entry, rowIndex, colIndex) {
      console.log('handleTbodyInputChange', event, entry, rowIndex, colIndex);
      this.enableSubmenu();
    },
    handleTbodySelectChange(event, entry, rowIndex, colIndex) {
      const activeElement = Object.values(this.data[rowIndex])[colIndex];
      const nextElement = Object.values(this.data[rowIndex])[colIndex + 1];
      const prevElement = Object.values(this.data[rowIndex])[colIndex - 1];

      const actualYear = new Date().getFullYear();
      if (nextElement && nextElement.selectedOptions) {
        nextElement.selectedOptions = actualYear - activeElement.selectedOptions;
      }
      if (prevElement && prevElement.selectedOptions) {
        prevElement.selectedOptions = actualYear - activeElement.selectedOptions;
      }

      console.log('handleTbodySelectChange', event, entry, rowIndex, colIndex);
      this.enableSubmenu();
    },
    changeColor(event, entry, rowIndex, colIndex, type, submenuFunction) {
      this.data[rowIndex][entry].style.color = '#000';
      console.log('changeColor', event, rowIndex, colIndex, type, submenuFunction);
    },
    changeValue(event, entry, rowIndex, colIndex, type, submenuFunction) {
      this.data[rowIndex][entry].value = 'coucou';
      console.log('changeValue', event, rowIndex, colIndex, type, submenuFunction);
    },
    // thead
    handleTheadContextMenu(event, entry, colIndex) {
      console.log('handleTheadContextMenu', event, entry, colIndex);
    },
    changeColorThead(event, entry, colIndex, submenuFunction) {
      this.headers[colIndex].style.color = '#000';
      console.log('changeColor', event, entry, colIndex, submenuFunction);
    },
    changeValueThead(event, entry, colIndex, submenuFunction) {
      this.headers[colIndex].headerName = 'T-shirt';
      this.headers[colIndex].headerKey = 't-shirt';
      console.log('changeValue', event, entry, colIndex, submenuFunction);
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
