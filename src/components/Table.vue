<template>
  <table class="wrap" oncontextmenu="return false;">
    <vue-thead
      :header="headers"
      :submenu-thead="submenuThead"
      :submenu-status="submenuStatusThead"
      v-on:submenu-enable="enableSubmenu"
      v-on:thead-td-context-menu="handleTheadContextMenu"
      v-on:thead-submenu-click-callback="callbackSubmenuThead">
    </vue-thead>

    <vue-tbody
      :rowData="data"
      :drag-to-fill="dragToFill"
      :submenu-tbody="submenuTbody"
      :submenu-status="submenuStatusTbody"
      v-on:submenu-enable="enableSubmenu"
      v-on:tbody-td-click="handleTbodyTdClick"
      v-on:tbody-select-multiple-cell="handleSelectMultipleCell"
      v-on:tbody-td-double-click="handleTbodyTdDoubleClick"
      v-on:tbody-td-context-menu="handleTbodyContextMenu"
      v-on:tbody-submenu-click-callback="callbackSubmenuTbody"
      v-on:tbody-input-change="handleTbodyInputChange"
      v-on:tbody-select-change="handleTbodySelectChange"
      v-on:tbody-nav="handleTbodyNav"
      v-on:tbody-nav-enter="handleTbodyNavEnter"
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
      storeCopyDatas: [],
      dragStartData: {},
      dragStartName: '',
      dragStartRow: null,
      oldTdActive: null,
      oldTdShow: null,
      selectedCell: null,
      selectedMultipleCell: null,
      submenuStatusTbody: false,
      submenuStatusThead: false,
      submenuEnableCol: null,
    };
  },
  mounted() {
    const _this = this;

    document.addEventListener('copy', function () {
      _this.copyStoreData();
      _this.cleanActiveOnTd('selected');
    });
    document.addEventListener('paste', function () {
      if (_this.storeCopyDatas.length > 0) {
        _this.pasteReplaceData();
        _this.storeCopyDatas = [];
        _this.selectedMultipleCell = null;
        _this.cleanActiveOnTd('selected');
      }
    });
  },
  methods: {
    // global
    enableSubmenu(target) {
      if (target === 'thead') {
        this.submenuStatusThead = true;
        this.submenuStatusTbody = false;
      } else if (target === 'tbody') {
        this.submenuStatusThead = false;
        this.submenuStatusTbody = true;
      } else {
        this.submenuStatusThead = false;
        this.submenuStatusTbody = false;
      }
    },
    bindClassActiveOnTd(entry, rowIndex, colIndex) {
      this.cleanActiveOnTd('active');
      this.data[rowIndex][entry].active = true;
      // stock oldTdActive in object
      if (this.oldTdActive) this.data[this.oldTdActive.row][this.oldTdActive.key].active = false;
      this.oldTdActive = {
        key: entry,
        row: rowIndex,
        col: colIndex,
      };
    },
    cleanActiveOnTd(params) {
      this.data.forEach((data, index) => {
        Object.keys(data).forEach((key) => {
          if (this.data[index][key].active === true && params === 'active') {
            this.data[index][key].active = false;
          }
          if (this.data[index][key].selected === true && params === 'selected') {
            this.data[index][key].selected = false;
          }
        });
      });
    },
    // Copy / Paste
    handleSelectMultipleCell(event, entry, rowIndex, colIndex, type) {
      console.log('handleSelectMultipleCell', event, entry, rowIndex, colIndex, type);
      this.selectedMultipleCell = {
        rowStart: this.selectedCell.row,
        colStart: this.selectedCell.col,
        keyStart: this.selectedCell.key,
        rowEnd: rowIndex,
        colEnd: colIndex,
        keyEnd: entry,
      };
      // Add active on cells selected
      this.modifyMultipleCell('selected');
    },
    copyStoreData() {
      // stock data in new Data
      const newData = JSON.parse(JSON.stringify(this.data));

      if (this.selectedMultipleCell) {
        let rowMin = this.selectedMultipleCell.rowStart;
        let colMin = this.selectedMultipleCell.colStart;
        const rowMax = this.selectedMultipleCell.rowEnd;
        const colMax = this.selectedMultipleCell.colEnd;

        let rowValues = Object.values(newData[rowMin]);
        const colName = Object.keys(newData[rowMin]);

        let storeData = {};

        while (rowMin <= rowMax) {
          storeData[colName[colMin]] = rowValues[colMin];
          colMin += 1;
          if (colMin > colMax) {
            this.storeCopyDatas.push(storeData);
            colMin = this.selectedMultipleCell.colStart;
            rowMin += 1;
            rowValues = Object.values(newData[rowMin]);
            storeData = {};
          }
        }
      } else if (this.selectedCell) {
        this.storeCopyDatas.push(newData[this.selectedCell.row][this.selectedCell.key]);
      }
    },
    pasteReplaceData() {
      if (this.selectedMultipleCell) {
        this.modifyMultipleCell('replace');
      } else if (this.selectedCell) {
        this.data[this.selectedCell.row][this.selectedCell.key] = this.storeCopyDatas[0];
      }
      this.storeCopyDatas = [];
    },
    modifyMultipleCell(params) {
      const rowMax = this.selectedMultipleCell.rowEnd;
      const colMax = this.selectedMultipleCell.colEnd;
      let rowMin = this.selectedMultipleCell.rowStart;
      let colMin = this.selectedMultipleCell.colStart;

      while (rowMin <= rowMax) {
        const key = rowMin - this.selectedMultipleCell.rowStart;
        const keyValue = Object.keys(this.data[rowMin])[colMin];

        if (params === 'selected') {
          this.data[rowMin][keyValue].selected = true;
        } else if (params === 'replace') {
          this.data[rowMin][keyValue] = this.storeCopyDatas[key][keyValue];
        }
        colMin += 1;
        if (colMin > colMax) {
          colMin = this.selectedMultipleCell.colStart;
          rowMin += 1;
        }
      }
    },
    // drag To Fill
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
    // On click on td
    handleTbodyTdClick(event, entry, rowIndex, colIndex, type) {
      console.log('handleTbodyTdClick', event, entry, rowIndex, colIndex, type);
      this.bindClassActiveOnTd(entry, rowIndex, colIndex);
      this.selectedCell = {
        key: entry,
        row: rowIndex,
        col: colIndex,
      };
      this.enableSubmenu();
      if (this.oldTdShow && this.oldTdShow.col !== colIndex) {
        this.data[this.oldTdShow.row][this.oldTdShow.key].show = false;
      }
    },
    handleTbodyTdDoubleClick(event, entry, col, rowIndex, colIndex, type) {
      console.log('handleTbodyTdDoubleClick', event, entry, col, rowIndex, colIndex, type);

      // stock oldTdShow in object
      if (this.oldTdShow) this.data[this.oldTdShow.row][this.oldTdShow.key].show = false;

      // add class show on element
      this.data[rowIndex][entry].show = true;

      this.oldTdShow = {
        key: entry,
        row: rowIndex,
        col: colIndex,
      };

      this.enableSubmenu();
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
    // Context Menu
    handleTbodyContextMenu(event, entry, rowIndex, colIndex, type) {
      console.log('handleTbodyContextMenu', event, entry, rowIndex, colIndex, type);
    },
    callbackSubmenuThead(event, entry, colIndex, submenuFunction) {
      this.$emit(`thead-submenu-click-${submenuFunction}`, event, entry, colIndex, submenuFunction);
    },
    callbackSubmenuTbody(event, entry, rowIndex, colIndex, type, submenuFunction) {
      this.$emit(`tbody-submenu-click-${submenuFunction}`, event, entry, rowIndex, colIndex, type, submenuFunction);
    },
    // thead
    handleTheadContextMenu(event, entry, colIndex) {
      this.submenuStatusTbody = false;
      console.log('handleTheadContextMenu', event, entry, colIndex);
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
