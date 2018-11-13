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
      dragStart: {
        name: '',
        row: null,
        data: {},
      },
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
    document.addEventListener('copy', () => {
      this.copyStoreData();
      this.cleanActiveOnTd('selected');
    });
    document.addEventListener('paste', () => {
      if (this.storeCopyDatas.length > 0) {
        this.pasteReplaceData();
        this.cleanActiveOnTd('selected');
        this.storeCopyDatas = [];
        this.selectedMultipleCell = null;
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
        if (params === 'active') {
          Object.keys(data).forEach((key) => {
            if (this.data[index][key].active === true) {
              this.data[index][key].active = false;
              this.data[index][key].show = false;
            }
          });
        } else if (params === 'selected') {
          Object.keys(data).forEach((key) => {
            if (this.data[index][key].selected === true) {
              this.data[index][key].selected = false;
            }
          });
        }
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
        const maxRow = newData.length;

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
            if (rowMin !== maxRow) {
              rowValues = Object.values(newData[rowMin]);
            } else {
              rowValues = Object.values(newData[rowMin - 1]);
            }
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
          this.$set(this.data[rowMin][keyValue], 'selected', true);
        } else if (params === 'replace') {
          this.$set(this.data[rowMin][keyValue], 'selected', false);
          if (Object.keys(this.storeCopyDatas[0]).length === 1) {
            // 0 => 1
            // 0 => 1
            this.data[rowMin][keyValue] = Object.values(this.storeCopyDatas[key])[0];
          } else if (this.dragToFill && this.eventDrag && this.storeCopyDatas.length === 1) {
            // multiple colCells dragToFill
            const newCopyData = JSON.parse(JSON.stringify(this.storeCopyDatas));
            this.data[rowMin][keyValue] = newCopyData[0][keyValue];
          } else if (Object.keys(this.storeCopyDatas[key]).filter(x => x === keyValue).length === 0 && !this.eventDrag) {
            const index = colMin - Object.values(this.storeCopyDatas[key]).length - 1;
            const entry = Object.keys(this.storeCopyDatas[key])[index];
            this.data[rowMin][keyValue] = this.storeCopyDatas[key][entry];
          } else {
            // multiple rowCells copyPaste
            this.data[rowMin][keyValue] = this.storeCopyDatas[key][keyValue];
          }
        }
        colMin += 1;
        if (colMin > colMax) {
          colMin = this.selectedMultipleCell.colStart;
          rowMin += 1;
        }
      }
    },
    // drag To Fill
    handleDownDragToFill(event, entry, data, rowIndex, colIndex) {
      console.log('handleDownDragToFill', event, entry, data, rowIndex, colIndex);
      // if drag col to col in vertical
      // Store the data of the cell which it start
      this.data[rowIndex][entry].active = true;
      this.eventDrag = true;
      this.dragStart = {
        data,
        name: entry,
        row: rowIndex,
      };

      // if drag col to col in row to row to row
      if (this.selectedMultipleCell && this.selectedMultipleCell.rowEnd === rowIndex) {
        this.selectedMultipleCell.rowStart = rowIndex;
        this.copyStoreData();
      }
    },
    handleMoveDragToFill(event, entry, col, rowIndex, colIndex) {
      // console.log('handleMoveDragToFill', event, entry, col, rowIndex, colIndex);

      // if drag col to col in vertical
      if (this.eventDrag === true && entry === this.dragStart.name && rowIndex > this.dragStart.row && !this.selectedMultipleCell) {
        this.data[rowIndex][entry].active = true;
        this.dragStart.row = rowIndex;

        this.arrayDragData.push({
          key: entry,
          value: col.value,
          row: rowIndex,
          col: colIndex,
        });

        // if drag col to col in row to row to row
      } else if (this.eventDrag === true && this.selectedMultipleCell) {
        if (this.selectedMultipleCell.rowEnd !== rowIndex) {
          this.selectedMultipleCell.rowEnd = rowIndex;
          this.modifyMultipleCell('selected');
        }
      }
    },
    handleUpDragToFill(event, entry, rowIndex, colIndex, type) {
      console.log('handleUpDragToFill', event, entry, rowIndex, colIndex, type);
      // if drag col to col in vertical
      if (this.eventDrag === true && entry === this.dragStart.name && !this.selectedMultipleCell) {
        this.dragTofillReplaceData(entry, rowIndex, colIndex);

        // if drag col to col in row to row to row
      } else if (this.eventDrag === true && this.selectedMultipleCell) {
        this.selectedMultipleCell.rowEnd = rowIndex;
        this.modifyMultipleCell('replace');
        this.cleanActiveOnTd('selected');
        this.cleanActiveOnTd('active');
        this.eventDrag = false;
        this.storeCopyDatas = [];
      }
    },
    dragTofillReplaceData(entry, rowIndex, colIndex) {
      // replace by the new data
      this.arrayDragData.forEach((data) => {
        this.data[data.row][data.key].value = this.dragStart.data.value;
      });
      this.arrayDragData = [];
      this.eventDrag = false;
      this.bindClassActiveOnTd(entry, rowIndex, colIndex);
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
    callbackSubmenuThead(event, entry, colIndex, submenuFunction, selectOptions) {
      this.submenuStatusThead = false;
      if (selectOptions) {
        this.$emit(`thead-submenu-click-${submenuFunction}`, event, entry, colIndex, selectOptions);
      } else {
        this.$emit(`thead-submenu-click-${submenuFunction}`, event, entry, colIndex);
      }
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
