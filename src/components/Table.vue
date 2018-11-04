<template>
  <table class="wrap" oncontextmenu="return false;">
    <vue-thead
      :header="headers"
      :submenu-thead="submenuThead"
      :submenu-status="submenuStatusThead"
      v-on:submenu-enable="enableSubmenu"
      v-on:thead-td-context-menu="handleTheadContextMenu"
      v-on:thead-submenu-click-callback="callbackSubmenu">
    </vue-thead>

    <vue-tbody
      :drag-to-fill="dragToFill"
      :rowData="data"
      :submenu-tbody="submenuTbody"
      :submenu-status="submenuStatusTbody"
      v-on:submenu-enable="enableSubmenu"
      v-on:tbody-td-click="handleTbodyTdClick"
      v-on:tbody-td-double-click="handleTbodyTdDoubleClick"
      v-on:tbody-td-context-menu="handleTbodyContextMenu"
      v-on:tbody-input-change="handleTbodyInputChange"
      v-on:tbody-select-change="handleTbodySelectChange"
      v-on:tbody-nav="handleTbodyNav"
      v-on:tbody-nav-enter="handleTbodyNavEnter"
      v-on:tbody-submenu-click-change-color="changeColor"
      v-on:tbody-submenu-click-change-value="changeValue"
      v-on:tbody-down-dragtofill="handleDownDragToFill"
      v-on:tbody-move-dragtofill="handleMoveDragToFill"
      v-on:tbody-up-dragtofill="handleUpDragToFill">
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
    dragToFill: Boolean,
    submenuTbody: Array,
    submenuThead: Array,
  },
  components: {
    VueThead,
    VueTbody,
  },
  data() {
    return {
      arrayDragData: [],
      eventDrag: false,
      dragStartData: {},
      dragStartName: '',
      dragStartRow: null,
      oldTdActive: null,
      oldTdShow: null,
      submenuStatusTbody: false,
      submenuStatusThead: false,
      submenuEnableCol: null,
    };
  },
  methods: {
    callbackSubmenu(event, entry, colIndex, submenuFunction) {
      this.$emit(`thead-submenu-click-${submenuFunction}`, event, entry, colIndex, submenuFunction);
    },
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
    bindClassActiveOnTd(entry, rowIndex, colIndex) {
      this.data[rowIndex][entry].active = true;
      // stock oldTdActive in object

      if (this.oldTdActive) this.data[this.oldTdActive.row][this.oldTdActive.key].active = false;
      this.oldTdActive = {
        key: entry,
        row: rowIndex,
        col: colIndex,
      };
    },
    // dragToFill
    dragTofillReplaceData(entry, rowIndex, colIndex, type) {
      // replace by the new data
      if (type === 'input' || 'img') {
        this.arrayDragData.forEach((data) => {
          this.data[data.row][data.key].value = this.dragStartData.value;
        });
      }
      if (type === 'select') {
        this.arrayDragData.forEach((data) => {
          this.data[data.row][data.key].selectedOptions = this.dragStartData.selectedOptions;
        });
      }
      this.arrayDragData = [];
      this.eventDrag = false;
      this.bindClassActiveOnTd(entry, rowIndex, colIndex);
    },
    handleDownDragToFill(event, entry, data, rowIndex, colIndex) {
      console.log('handleDownDragToFill', event, entry, data, rowIndex, colIndex);
      // Store the data of the cell which it start
      this.data[rowIndex][entry].active = true;
      this.eventDrag = true;
      this.dragStartName = entry;
      this.dragStartData = data;
      this.dragStartRow = rowIndex;
    },
    handleMoveDragToFill(event, entry, col, rowIndex, colIndex) {
      // Only eventDrag &&
      // dragStartName equal the actual entry data &&
      // rowIndex is > at dragStartRow
      if (this.eventDrag === true && entry === this.dragStartName && rowIndex > this.dragStartRow) {
        console.log('handleMoveDragToFill', event, entry, col, rowIndex, colIndex);

        // create an object wich contains new data
        this.data[rowIndex][entry].active = true;
        this.dragStartRow = rowIndex;
        this.arrayDragData.push({
          key: entry,
          value: col.value,
          row: rowIndex,
          col: colIndex,
        });
      }
    },
    handleUpDragToFill(event, entry, rowIndex, colIndex, type) {
      if (this.eventDrag === true && entry === this.dragStartName) {
        console.log('handleUpDragToFill', event, entry, rowIndex, colIndex, type);
        this.dragTofillReplaceData(entry, rowIndex, colIndex, type);
      }
    },
    // tbody
    handleTbodyTdClick(event, entry, rowIndex, colIndex, type) {
      console.log('handleTbodyTdClick', event, entry, rowIndex, colIndex, type);
      this.bindClassActiveOnTd(entry, rowIndex, colIndex);
      this.enableSubmenu();
      if (this.oldTdShow && this.oldTdShow.col !== colIndex) {
        this.data[this.oldTdShow.row][this.oldTdShow.key].show = false;
      }
    },
    handleTbodyTdDoubleClick(event, entry, rowIndex, colIndex, activElement, type) {
      console.log('handleTbodyTdDoubleClick', event, entry, rowIndex, colIndex, activElement, type);

      // stock oldTdShow in object
      if (this.oldTdShow) this.data[this.oldTdShow.row][this.oldTdShow.key].show = false;

      // add class show on element
      this.data[rowIndex][entry].show = true;
      if (type === 'input') {
        event.currentTarget.lastElementChild.focus();
      }
      this.oldTdShow = {
        key: entry,
        row: rowIndex,
        col: colIndex,
      };

      this.enableSubmenu();
    },
    handleTbodyContextMenu(event, entry, rowIndex, colIndex, type) {
      console.log('handleTbodyContextMenu', event, entry, rowIndex, colIndex, type);
    },
    handleTbodyNav(event, keyCode, actualElement, rowIndex, colIndex) {
      console.log('handleTbodyNav', event, keyCode, actualElement, rowIndex, colIndex);
      this.enableSubmenu();
    },
    handleTbodyNavEnter(event, entry, keyCode, actualElement, rowIndex, colIndex) {
      console.log('handleTbodyNavEnter', event, entry, keyCode, actualElement, rowIndex, colIndex);
      this.enableSubmenu();
    },
    handleTbodyInputChange(event, entry, rowIndex, colIndex) {
      // remove class show on input when it change
      if (this.oldTdShow) this.data[this.oldTdShow.row][this.oldTdShow.key].show = false;
      this.enableSubmenu();

      // callback
      this.$emit('tbody-input-change', event, entry, rowIndex, colIndex);
    },
    handleTbodySelectChange(event, entry, rowIndex, colIndex) {
      // remove class show on select when it change
      if (this.oldTdShow) this.data[this.oldTdShow.row][this.oldTdShow.key].show = false;
      this.enableSubmenu();

      // callback
      this.$emit('tbody-select-change', event, entry, rowIndex, colIndex);
    },
    changeColor(event, entry, rowIndex, colIndex, type, submenuFunction) {
      console.log('changeColor', event, rowIndex, colIndex, type, submenuFunction);
      this.data[rowIndex][entry].style.color = '#e40000';
    },
    changeValue(event, entry, rowIndex, colIndex, type, submenuFunction) {
      console.log('changeValue', event, rowIndex, colIndex, type, submenuFunction);
      this.data[rowIndex][entry].value = 'coucou';
    },
    // thead
    handleTheadContextMenu(event, entry, colIndex) {
      console.log('handleTheadContextMenu', event, entry, colIndex);
    },
    // fake function
    changeColorThead(event, entry, colIndex, submenuFunction) {
      console.log('changeColor', event, entry, colIndex, submenuFunction);
      this.headers[colIndex].style.color = '#e40000';
    },
    changeValueThead(event, entry, colIndex, submenuFunction) {
      console.log('changeValue', event, entry, colIndex, submenuFunction);
      this.headers[colIndex].headerName = 'T-shirt';
      this.headers[colIndex].headerKey = 't-shirt';
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
    color: #000;
    font-weight: normal;
  }
  td, th {
    margin: 0;
  }
}
.wrap {
  margin: 10px auto;
}
</style>
