<template>
  <div
    ref="vueTable"
    :style="styleWrapVueTable"
    v-on:scroll="scrollFunction">

    <slot name="header">
    </slot>

    <table class="vue_table" oncontextmenu="return false;">
      <vue-thead
        ref="vueThead"
        :headers="headers"
        :sort-header="sortHeader"
        :submenu-status-thead="submenuStatusThead"
        :submenu-thead="submenuThead"
        :tbody-index="tbodyIndex"
        v-on:handle-up-drag-to-fill="handleUpDragToFill"
        v-on:submenu-enable="enableSubmenu"
        v-on:thead-submenu-click-callback="callbackSubmenuThead"
        v-on:handle-up-drag-size-header="handleUpDragSizeHeader"
        v-on:thead-td-context-menu="handleTheadContextMenu"
        v-on:thead-td-sort="callbackSort">
      </vue-thead>

      <vue-tbody
        ref="vueTbody"
        :disable-cells="disableCells"
        :drag-to-fill="dragToFill"
        :headers="headers"
        :newData="newData"
        :tbody-data="tbodyData"
        :submenu-status-tbody="submenuStatusTbody"
        :submenu-tbody="submenuTbody"
        :tbody-index="tbodyIndex"
        v-on:handle-to-calculate-position="calculPosition"
        v-on:handle-to-open-select="enableSelect"
        v-on:submenu-enable="enableSubmenu"
        v-on:tbody-down-dragtofill="handleDownDragToFill"
        v-on:tbody-input-change="handleTbodyInputChange"
        v-on:tbody-move-dragtofill="handleMoveDragToFill"
        v-on:tbody-nav-backspace="handleTbodyNavBackspace"
        v-on:tbody-nav-enter="handleTbodyNavEnter"
        v-on:tbody-nav="handleTbodyNav"
        v-on:tbody-select-change="handleTbodySelectChange"
        v-on:tbody-select-multiple-cell="handleSelectMultipleCell"
        v-on:tbody-submenu-click-callback="callbackSubmenuTbody"
        v-on:tbody-td-click="handleTbodyTdClick"
        v-on:tbody-td-context-menu="handleTbodyContextMenu"
        v-on:tbody-td-double-click="handleTbodyTdDoubleClick"
        v-on:tbody-up-dragtofill="handleUpDragToFill">
      </vue-tbody>
    </table>
  </div>
</template>

<script type="text/javascript">
import VueThead from './Thead.vue';
import VueTbody from './Tbody.vue';

export default {
  name: 'VueTable',
  props: {
    headers: {
      type: Array,
      required: true,
    },
    tbodyData: {
      type: Array,
      required: true,
    },
    disableCells: {
      type: Array,
      required: false,
    },
    dragToFill: {
      type: Boolean,
      required: false,
    },
    newData: {
      type: Object,
      required: false,
    },
    sortHeader: {
      type: Boolean,
      required: false,
    },
    submenuTbody: {
      type: Array,
      required: false,
    },
    submenuThead: {
      type: Array,
      required: false,
    },
    tbodyIndex: {
      type: Boolean,
      required: false,
    },
    selectPosition: {
      type: Object,
      required: false,
    },
    styleWrapVueTable: {
      type: Object,
      required: false,
    },
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
      headerKeys: [],
      oldTdActive: null,
      oldTdShow: null,
      selectedCell: null,
      selectedMultipleCell: null,
      lastSelectOpen: null,
      submenuStatusTbody: false,
      submenuStatusThead: false,
      submenuEnableCol: null,
    };
  },
  mounted() {
    this.headerKeys = this.headers.map(x => x.headerKey);
    document.addEventListener('copy', () => {
      this.storeCopyDatas = [];
      this.copyStoreData();
      this.cleanActiveOnTd('selected');
    });
    document.addEventListener('paste', () => {
      if (this.storeCopyDatas.length > 0) {
        this.pasteReplaceData();
        this.cleanActiveOnTd('selected');
        this.selectedMultipleCell = null;
      }
    });
  },
  computed: {
    colHeaderWidths() {
      return this.headers.map(x => parseInt(x.style.width, 10));
    },
  },
  methods: {
    // global
    scrollFunction() {
      this.enableSubmenu('thead');
      if (this.lastSelectOpen) {
        this.enableSelect(this.lastSelectOpen.event, this.lastSelectOpen.entry, this.lastSelectOpen.col, this.lastSelectOpen.rowIndex, this.lastSelectOpen.colIndex);
      }
    },
    enableSelect(event, entry, col, rowIndex, colIndex) {
      if (!col.search) {
        this.lastSelectOpen = {
          event,
          entry,
          col,
          rowIndex,
          colIndex,
        };
        this.$set(this.tbodyData[rowIndex][entry], 'search', true);
        this.$set(this.tbodyData[rowIndex][entry], 'show', true);
        this.$set(this.tbodyData[rowIndex][entry], 'typing', false);

        this.$refs.vueTbody.$refs[`input-${colIndex}-${rowIndex}`][0].focus();
        this.calculPosition(event, rowIndex, colIndex, 'dropdown');
      } else {
        this.$set(this.tbodyData[rowIndex][entry], 'search', false);
        this.$set(this.tbodyData[rowIndex][entry], 'show', false);
        this.$set(this.tbodyData[rowIndex][entry], 'typing', true);
        this.lastSelectOpen = null;
      }
    },
    calculPosition(event, rowIndex, colIndex, entry) {
      // stock scrollLeft / scrollTop position of parent
      const scrollLeft = this.$refs.vueTable.scrollLeft;
      const scrollTop = this.$refs.vueTable.scrollTop;

      // stock size / offsetTop / offsetLeft of the element
      const width = this.$refs.vueTbody.$refs[`td-${colIndex}-${rowIndex}`][0].offsetWidth;

      let top = ((this.$refs.vueTbody.$refs[`td-${colIndex}-${rowIndex}`][0].offsetTop - scrollTop) + 40);
      let left = this.$refs.vueTbody.$refs[`td-${colIndex}-${rowIndex}`][0].offsetLeft - scrollLeft;

      if (this.selectPosition) {
        top = ((this.$refs.vueTbody.$refs[`td-${colIndex}-${rowIndex}`][0].offsetTop - scrollTop) + 40) + this.selectPosition.top;
        left = (this.$refs.vueTbody.$refs[`td-${colIndex}-${rowIndex}`][0].offsetLeft - scrollLeft) + this.selectPosition.left;
      }
      // set size / top position / left position
      this.$refs.vueTbody.$refs[`${entry}-${colIndex}-${rowIndex}`][0].style.width = `${width}px`;
      this.$refs.vueTbody.$refs[`${entry}-${colIndex}-${rowIndex}`][0].style.top = `${top}px`;
      this.$refs.vueTbody.$refs[`${entry}-${colIndex}-${rowIndex}`][0].style.left = `${left}px`;
    },
    handleUpDragSizeHeader(event, headers) {
      this.$emit('handle-up-drag-size-header', event, headers);
    },
    createCell(rowIndex, entry, type) {
      if (type === 'newCol') {
        const data = JSON.parse(JSON.stringify(this.newData));
        this.$set(this.tbodyData[rowIndex], entry, data);
      }
    },
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
      this.tbodyData[rowIndex][entry].active = true;
      // stock oldTdActive in object
      if (this.oldTdActive) this.tbodyData[this.oldTdActive.row][this.oldTdActive.key].active = false;
      this.oldTdActive = {
        key: entry,
        row: rowIndex,
        col: colIndex,
      };
    },
    cleanActiveOnTd(params) {
      this.tbodyData.forEach((data, index) => {
        if (params === 'active') {
          Object.keys(data).forEach((key) => {
            if (this.tbodyData[index][key].active === true) {
              this.tbodyData[index][key].active = false;
              this.tbodyData[index][key].show = false;
            }
          });
        } else if (params === 'selected') {
          Object.keys(data).forEach((key) => {
            if (this.tbodyData[index][key].selected === true) {
              this.tbodyData[index][key].selected = false;
            }
          });
        }
      });
      this.$forceUpdate();
    },
    // Copy / Paste
    handleSelectMultipleCell(event, entry, rowIndex, colIndex) {
      // console.log('handleSelectMultipleCell', event, entry, rowIndex, colIndex);
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
      const newData = JSON.parse(JSON.stringify(this.tbodyData));

      if (this.selectedMultipleCell) {
        let rowMin = this.selectedMultipleCell.rowStart;
        let colMin = this.selectedMultipleCell.colStart;
        const rowMax = this.selectedMultipleCell.rowEnd;
        const colMax = this.selectedMultipleCell.colEnd;
        let storeData = {};

        while (rowMin <= rowMax) {
          storeData[this.headerKeys[colMin]] = newData[rowMin][this.headerKeys[colMin]];
          colMin += 1;
          if (colMin > colMax) {
            this.storeCopyDatas.push(storeData);
            colMin = this.selectedMultipleCell.colStart;
            rowMin += 1;
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
        const store = JSON.parse(JSON.stringify(this.storeCopyDatas[0]));
        this.tbodyData[this.selectedCell.row][this.selectedCell.key] = store;
      }
    },
    modifyMultipleCell(params) {
      const rowMax = this.selectedMultipleCell.rowEnd;
      const colMax = this.selectedMultipleCell.colEnd;
      let rowMin = this.selectedMultipleCell.rowStart;
      let colMin = this.selectedMultipleCell.colStart;

      while (rowMin <= rowMax) {
        const key = rowMin - this.selectedMultipleCell.rowStart;
        const keyValue = this.headerKeys[colMin];

        if (params === 'removeValue') {
          this.$emit('tbody-nav-multiple-backspace', rowMin, colMin, keyValue);
          this.$set(this.tbodyData[rowMin][keyValue], 'value', '');
          this.$set(this.tbodyData[rowMin][keyValue], 'selected', false);
        }
        if (params === 'selected') {
          this.$set(this.tbodyData[rowMin][keyValue], 'selected', true);
        } else if (params === 'replace') {
          this.$set(this.tbodyData[rowMin][keyValue], 'selected', false);
          if (this.dragToFill && this.eventDrag) {
            // multiple colCells dragToFill
            const newCopyData = JSON.parse(JSON.stringify(this.storeCopyDatas));
            this.tbodyData[rowMin][keyValue] = newCopyData[0][keyValue];
          } else if (Object.keys(this.storeCopyDatas[0]).length === 1) {
            // 0 => 1
            // 0 => 1
            this.tbodyData[rowMin][keyValue] = Object.values(this.storeCopyDatas[key])[0];
          } else if (Object.keys(this.storeCopyDatas[key]).filter(x => x === keyValue).length === 0 && !this.eventDrag) {
            // col to col copyPaste
            const index = colMin - Object.values(this.storeCopyDatas[key]).length - 1;
            const entry = Object.keys(this.storeCopyDatas[key])[index];
            this.tbodyData[rowMin][keyValue] = this.storeCopyDatas[key][entry];
          } else {
            // multiple rowCells copyPaste
            this.tbodyData[rowMin][keyValue] = this.storeCopyDatas[key][keyValue];
          }
        }
        colMin += 1;
        if (colMin > colMax) {
          colMin = this.selectedMultipleCell.colStart;
          rowMin += 1;
        }
      }
      this.$forceUpdate();
    },
    // drag To Fill
    handleDownDragToFill(event, entry, data, rowIndex, colIndex) {
      // console.log('handleDownDragToFill', event, entry, data, rowIndex, colIndex);
      this.tbodyData[rowIndex][entry].active = true;
      this.eventDrag = true;

      if (!this.selectedMultipleCell) {
        this.selectedMultipleCell = {
          rowStart: this.selectedCell.row,
          colStart: this.selectedCell.col,
          keyStart: this.selectedCell.key,
          rowEnd: rowIndex,
          colEnd: colIndex,
          keyEnd: entry,
        };
        this.copyStoreData();
      } else {
        // if drag col to col in row to row to row
        this.selectedMultipleCell.rowStart = rowIndex;
        this.copyStoreData();
      }
    },
    handleMoveDragToFill(event, entry, col, rowIndex, colIndex) {
      // console.log('handleMoveDragToFill', event, entry, col, rowIndex, colIndex);
      if (this.eventDrag === true && this.selectedMultipleCell && this.selectedMultipleCell.rowEnd !== rowIndex) {
        this.selectedMultipleCell.rowEnd = rowIndex;
        this.modifyMultipleCell('selected');
      }
    },
    handleUpDragToFill(event, entry, rowIndex, colIndex, type) {
      // console.log('handleUpDragToFill', event, entry, rowIndex, colIndex, type);
      if (this.eventDrag === true && this.selectedMultipleCell) {
        this.selectedMultipleCell.rowEnd = rowIndex;
        this.modifyMultipleCell('replace');
        this.cleanActiveOnTd('selected');
        this.cleanActiveOnTd('active');
        this.$emit('tbody-up-dragtofill', this.selectedMultipleCell, entry, rowIndex, colIndex);
        this.eventDrag = false;
        this.storeCopyDatas = [];
        this.selectedMultipleCell = null;
      }
    },
    // On click on td
    handleTbodyTdClick(event, entry, rowIndex, colIndex, type) {
      this.createCell(rowIndex, entry, type);
      // console.log('handleTbodyTdClick', event, entry, rowIndex, colIndex, type);
      this.bindClassActiveOnTd(entry, rowIndex, colIndex);
      this.selectedCell = {
        key: entry,
        row: rowIndex,
        col: colIndex,
      };

      this.enableSubmenu();
      if (this.oldTdShow && this.oldTdShow.col !== colIndex) {
        this.tbodyData[this.oldTdShow.row][this.oldTdShow.key].show = false;
      }
    },
    handleTbodyTdDoubleClick(event, entry, col, rowIndex, colIndex, type) {
      // console.log('handleTbodyTdDoubleClick', event, entry, col, rowIndex, colIndex, type);
      this.createCell(rowIndex, entry, type);

      // stock oldTdShow in object
      if (this.oldTdShow) this.tbodyData[this.oldTdShow.row][this.oldTdShow.key].show = false;

      // add class show on element
      this.tbodyData[rowIndex][entry].show = true;

      this.oldTdShow = {
        key: entry,
        row: rowIndex,
        col: colIndex,
      };

      this.enableSubmenu();
    },
    handleTbodyNav(event, keyCode, actualElement, rowIndex, colIndex) {
      // console.log('handleTbodyNav', event, keyCode, actualElement, rowIndex, colIndex);
      this.enableSubmenu();
    },
    handleTbodyNavEnter(event, entry, keyCode, actualElement, rowIndex, colIndex) {
      // console.log('handleTbodyNavEnter', event, entry, keyCode, actualElement, rowIndex, colIndex);
      this.enableSubmenu();
    },
    handleTbodyNavBackspace(event, actualElement, actualCol, rowIndex, colIndex) {
      this.$emit('tbody-nav-backspace', event, actualElement, actualCol, rowIndex, colIndex);
      if (this.selectedMultipleCell) {
        this.modifyMultipleCell('removeValue');
      } else {
        this.tbodyData[rowIndex][actualCol].value = '';
      }
    },
    handleTbodyInputChange(event, entry, rowIndex, colIndex) {
      // remove class show on input when it change
      if (this.oldTdShow) this.tbodyData[this.oldTdShow.row][this.oldTdShow.key].show = false;
      this.enableSubmenu();

      // callback
      this.$emit('tbody-input-change', event, entry, rowIndex, colIndex);
    },
    handleTbodySelectChange(event, entry, col, rowIndex, colIndex) {
      // remove class show on select when it change
      if (this.oldTdShow) this.tbodyData[this.oldTdShow.row][this.oldTdShow.key].show = false;
      this.enableSubmenu();

      // callback
      this.$emit('tbody-select-change', event, entry, col, rowIndex, colIndex);
    },
    // Context Menu
    handleTbodyContextMenu(event, entry, rowIndex, colIndex, type) {
      this.createCell(rowIndex, entry, type);
      // console.log('handleTbodyContextMenu', event, entry, rowIndex, colIndex, type);
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
      // console.log('handleTheadContextMenu', event, entry, colIndex);
    },
    callbackSort(event, entry, colIndex) {
      this.$emit('thead-td-sort', event, entry, colIndex);
    },
  },
};
</script>


<style lang="scss">
  table{
    margin: 0;
    border-collapse: collapse;
    th {
      color: #000;
      font-weight: normal;
    }
    td, th {
      margin: 0;
    }
  }
</style>
