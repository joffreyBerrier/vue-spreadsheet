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
        v-on:handle-up-drag-size-header="handleUpDragSizeHeader"
        v-on:handle-up-drag-to-fill="handleUpDragToFill"
        v-on:submenu-enable="enableSubmenu"
        v-on:thead-submenu-click-callback="callbackSubmenuThead"
        v-on:thead-td-context-menu="handleTheadContextMenu"
        v-on:thead-td-sort="callbackSort">
      </vue-thead>

      <vue-tbody
        ref="vueTbody"
        :disable-cells="disableCells"
        :drag-to-fill="dragToFill"
        :headers="headers"
        :newData="newData"
        :submenu-status-tbody="submenuStatusTbody"
        :submenu-tbody="submenuTbody"
        :tbody-data="tbodyData"
        :tbody-index="tbodyIndex"
        v-on:handle-to-calculate-position="calculPosition"
        v-on:handle-to-open-select="enableSelect"
        v-on:submenu-enable="enableSubmenu"
        v-on:tbody-down-dragtofill="handleDownDragToFill"
        v-on:tbody-input-change="handleTbodyInputChange"
        v-on:tbody-move-dragtofill="handleMoveDragToFill"
        v-on:tbody-move-keydown="moveKeydown"
        v-on:tbody-move-keyup="moveKeyup"
        v-on:tbody-nav-backspace="handleTbodyNavBackspace"
        v-on:tbody-nav-enter="handleTbodyNavEnter"
        v-on:tbody-nav="handleTbodyNav"
        v-on:tbody-search-handle-change="searchHandleChange"
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
    parentElementScroll: {
      type: Number,
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
      dragStart: {
        name: '',
        row: null,
        data: {},
      },
      eventDrag: false,
      headerKeys: [],
      incrementCol: 0,
      incrementRow: 0,
      keys: {},
      lastSelectOpen: null,
      oldTdActive: null,
      oldTdShow: null,
      selectedCell: null,
      selectedCoordCells: null,
      storeCopyDatas: [],
      submenuEnableCol: null,
      submenuStatusTbody: false,
      submenuStatusThead: false,
    };
  },
  mounted() {
    this.headerKeys = this.headers.map(x => x.headerKey);
    document.addEventListener('copy', () => {
      event.preventDefault();
      this.storeCopyDatas = [];
      this.copyStoreData();
    });
    document.addEventListener('paste', () => {
      event.preventDefault();
      if (this.storeCopyDatas.length > 0) {
        this.pasteReplaceData();
        this.selectedCoordCells = null;
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
        this.enableSelect(this.lastSelectOpen.event, this.lastSelectOpen.header, this.lastSelectOpen.col, this.lastSelectOpen.rowIndex, this.lastSelectOpen.colIndex);
      }
    },
    searchHandleChange(col, header, rowIndex) {
      this.$set(this.tbodyData[rowIndex][header], 'search', true);
      this.$set(this.tbodyData[rowIndex][header], 'typing', true);
      this.$set(this.tbodyData[rowIndex][header], 'show', true);
    },
    enableSelect(event, header, col, rowIndex, colIndex) {
      if (!col.search) {
        this.lastSelectOpen = {
          event,
          header,
          col,
          rowIndex,
          colIndex,
        };
        this.$set(this.tbodyData[rowIndex][header], 'search', true);
        this.$set(this.tbodyData[rowIndex][header], 'show', true);
        this.$set(this.tbodyData[rowIndex][header], 'typing', false);

        this.$refs.vueTbody.$refs[`input-${colIndex}-${rowIndex}`][0].focus();
        this.calculPosition(event, rowIndex, colIndex, 'dropdown');
      } else {
        this.$set(this.tbodyData[rowIndex][header], 'search', false);
        this.$set(this.tbodyData[rowIndex][header], 'show', false);
        this.$set(this.tbodyData[rowIndex][header], 'typing', true);
        this.lastSelectOpen = null;
      }
    },
    calculPosition(event, rowIndex, colIndex, header) {
      // stock scrollLeft / scrollTop position of parent element (body / div)
      const scrollParentTop = this.parentElementScroll;

      // stock scrollLeft / scrollTop position of parent
      const scrollLeft = this.$refs.vueTable.scrollLeft;
      const scrollTop = this.$refs.vueTable.scrollTop;

      // stock size / offsetTop / offsetLeft of the element
      const width = this.$refs.vueTbody.$refs[`td-${colIndex}-${rowIndex}`][0].offsetWidth;

      let top = ((this.$refs.vueTbody.$refs[`td-${colIndex}-${rowIndex}`][0].offsetTop - scrollTop) + 40) - scrollParentTop;
      let left = this.$refs.vueTbody.$refs[`td-${colIndex}-${rowIndex}`][0].offsetLeft - scrollLeft;

      if (this.selectPosition) {
        top = (((this.$refs.vueTbody.$refs[`td-${colIndex}-${rowIndex}`][0].offsetTop - scrollTop) + 40) + this.selectPosition.top) - scrollParentTop;
        left = (this.$refs.vueTbody.$refs[`td-${colIndex}-${rowIndex}`][0].offsetLeft - scrollLeft) + this.selectPosition.left;
      }
      // set size / top position / left position
      this.$refs.vueTbody.$refs[`${header}-${colIndex}-${rowIndex}`][0].style.width = `${width}px`;
      this.$refs.vueTbody.$refs[`${header}-${colIndex}-${rowIndex}`][0].style.top = `${top}px`;
      this.$refs.vueTbody.$refs[`${header}-${colIndex}-${rowIndex}`][0].style.left = `${left}px`;
    },
    handleUpDragSizeHeader(event, headers) {
      this.$emit('handle-up-drag-size-header', event, headers);
    },
    createCell(rowIndex, header, type) {
      if (type === 'newCol') {
        const data = JSON.parse(JSON.stringify(this.newData));
        this.$set(this.tbodyData[rowIndex], header, data);
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
    bindClassActiveOnTd(header, rowIndex, colIndex) {
      this.cleanActiveOnTd('active');
      this.tbodyData[rowIndex][header].active = true;
      // stock oldTdActive in object
      if (this.oldTdActive) this.tbodyData[this.oldTdActive.row][this.oldTdActive.key].active = false;
      this.oldTdActive = {
        key: header,
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
        } else if (params === 'search') {
          Object.keys(data).forEach((key) => {
            if (this.tbodyData[index][key].search === true) {
              this.tbodyData[index][key].search = false;
            }
          });
        }
      });
      this.$forceUpdate();
    },
    // Copy / Paste
    handleSelectMultipleCell(event, header, rowIndex, colIndex) {
      // console.log('handleSelectMultipleCell', event, header, rowIndex, colIndex);
      if (this.selectedCell) {
        this.selectedCoordCells = {
          rowStart: this.selectedCell.row,
          colStart: this.selectedCell.col,
          keyStart: this.selectedCell.key,
          rowEnd: rowIndex,
          colEnd: colIndex,
          keyEnd: header,
        };
      }
      // Add active on selectedCoordCells selected
      this.modifyMultipleCell('selected');
    },
    copyStoreData() {
      // stock data in new Data
      const newData = JSON.parse(JSON.stringify(this.tbodyData));

      if (this.selectedCoordCells) {
        let rowMin = this.selectedCoordCells.rowStart;
        let colMin = this.selectedCoordCells.colStart;
        const rowMax = this.selectedCoordCells.rowEnd;
        const colMax = this.selectedCoordCells.colEnd;
        let storeData = {};

        while (rowMin <= rowMax) {
          storeData[this.headerKeys[colMin]] = newData[rowMin][this.headerKeys[colMin]];
          colMin += 1;
          if (colMin > colMax) {
            this.storeCopyDatas.push(storeData);
            colMin = this.selectedCoordCells.colStart;
            rowMin += 1;
            storeData = {};
          }
        }
      } else if (this.selectedCell) {
        this.storeCopyDatas.push(newData[this.selectedCell.row][this.selectedCell.key]);
      }
    },
    pasteReplaceData() {
      if (this.selectedCoordCells) {
        this.modifyMultipleCell('replace');
        this.$emit('tbody-paste-data', this.selectedCoordCells);
      } else if (this.selectedCell) {
        const store = JSON.parse(JSON.stringify(this.storeCopyDatas[0]));
        this.tbodyData[this.selectedCell.row][this.selectedCell.key] = store;
        this.$emit('tbody-paste-data', this.selectedCell);
      }
    },
    modifyMultipleCell(params) {
      const rowMax = this.selectedCoordCells.rowEnd;
      const colMax = this.selectedCoordCells.colEnd;
      let rowMin = this.selectedCoordCells.rowStart;
      let colMin = this.selectedCoordCells.colStart;

      while (rowMin <= rowMax) {
        const key = rowMin - this.selectedCoordCells.rowStart;
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
          } else if (!this.selectedMultipleCell && this.storeCopyDatas.length > 1) {
            // copy multiple cells at once at pasting them
            if (this.tbodyData.length >= (rowMin + this.selectedCell.row) + 1) {
              this.tbodyData[rowMin + this.selectedCell.row][this.selectedCell.key] = Object.values(this.storeCopyDatas[key])[0];
            }
          } else if (Object.keys(this.storeCopyDatas[0]).length === 1) {
            // copy x col to x
            this.tbodyData[rowMin][keyValue] = Object.values(this.storeCopyDatas[key])[0];
          } else if (this.storeCopyDatas.length === 1 && (this.selectedCoordCells.rowStart < this.selectedCoordCells.rowEnd)) {
            // copy one cell to multiple cells at once
            const newCopyData = JSON.parse(JSON.stringify(this.storeCopyDatas[0]));
            this.tbodyData[rowMin][keyValue] = newCopyData;
          } else if (Object.keys(this.storeCopyDatas[key]).filter(x => x === keyValue).length === 0 && !this.eventDrag) {
            // col to col copyPaste
            const index = colMin - Object.values(this.storeCopyDatas[key]).length - 1;
            const header = Object.keys(this.storeCopyDatas[key])[index];
            this.tbodyData[rowMin][keyValue] = this.storeCopyDatas[key][header];
          } else {
            // multiple rowCells copyPaste
            this.tbodyData[rowMin][keyValue] = this.storeCopyDatas[key][keyValue];
          }
        }
        colMin += 1;
        if (colMin > colMax) {
          colMin = this.selectedCoordCells.colStart;
          rowMin += 1;
        }
      }
      this.$forceUpdate();
    },
    // drag To Fill
    handleDownDragToFill(event, header, data, rowIndex, colIndex) {
      // console.log('handleDownDragToFill', event, header, data, rowIndex, colIndex);
      this.tbodyData[rowIndex][header].active = true;
      this.eventDrag = true;

      if (!this.selectedCoordCells) {
        this.selectedCoordCells = {
          rowStart: this.selectedCell.row,
          colStart: this.selectedCell.col,
          keyStart: this.selectedCell.key,
          rowEnd: rowIndex,
          colEnd: colIndex,
          keyEnd: header,
        };
        this.copyStoreData();
      } else {
        // if drag col to col in row to row to row
        this.selectedCoordCells.rowStart = rowIndex;
        this.copyStoreData();
      }
    },
    handleMoveDragToFill(event, header, col, rowIndex, colIndex) {
      // console.log('handleMoveDragToFill', event, header, col, rowIndex, colIndex);
      if (this.eventDrag === true && this.selectedCoordCells && this.selectedCoordCells.rowEnd !== rowIndex) {
        this.selectedCoordCells.rowEnd = rowIndex;
        this.modifyMultipleCell('selected');
        this.$emit('tbody-move-dragtofill', this.selectedCoordCells, header, col, rowIndex, colIndex);
      }
    },
    handleUpDragToFill(event, header, rowIndex, colIndex) {
      // console.log('handleUpDragToFill', event, header, rowIndex, colIndex, type);
      if (this.eventDrag === true && this.selectedCoordCells) {
        this.selectedCoordCells.rowEnd = rowIndex;
        this.modifyMultipleCell('replace');
        this.cleanActiveOnTd('selected');
        this.cleanActiveOnTd('active');
        this.$emit('tbody-up-dragtofill', this.selectedCoordCells, header, rowIndex, colIndex);
        this.eventDrag = false;
        this.storeCopyDatas = [];
        this.selectedCoordCells = null;
      }
    },
    // On click on td
    handleTbodyTdClick(event, col, header, rowIndex, colIndex, type) {
      if (this.keys[16]) {
        this.selectedMultipleCell = true;
      } else {
        this.selectedMultipleCell = false;
      }
      
      this.cleanActiveOnTd('search');

      this.createCell(rowIndex, header, type);

      this.bindClassActiveOnTd(header, rowIndex, colIndex);

      this.selectedCell = {
        key: header,
        row: rowIndex,
        col: colIndex,
      };

      this.enableSubmenu();
      if (this.oldTdShow && this.oldTdShow.col !== colIndex) {
        this.tbodyData[this.oldTdShow.row][this.oldTdShow.key].show = false;
      }

      if (type === 'select' && col.handleSearch) {
        this.$set(this.tbodyData[rowIndex][header], 'typing', false);
        this.calculPosition(event, rowIndex, colIndex, 'dropdown');
        this.$refs.vueTbody.$refs[`input-${colIndex}-${rowIndex}`][0].focus();
      }
    },
    handleTbodyTdDoubleClick(event, header, col, rowIndex, colIndex, type) {
      // console.log('handleTbodyTdDoubleClick', event, header, col, rowIndex, colIndex, type);
      this.createCell(rowIndex, header, type);

      // stock oldTdShow in object
      if (this.oldTdShow) this.tbodyData[this.oldTdShow.row][this.oldTdShow.key].show = false;

      // add class show on element
      this.tbodyData[rowIndex][header].show = true;

      this.oldTdShow = {
        key: header,
        row: rowIndex,
        col: colIndex,
      };

      this.enableSubmenu();
    },
    handleTbodyNav() {
      // console.log('handleTbodyNav', event, keyCode, actualElement, rowIndex, colIndex);
      this.enableSubmenu();
    },
    handleTbodyNavEnter() {
      // console.log('handleTbodyNavEnter', event, header, keyCode, actualElement, rowIndex, colIndex);
      this.enableSubmenu();
    },
    handleTbodyNavBackspace(event, actualElement, header, rowIndex, colIndex) {
      if (this.selectedCoordCells) {
        this.modifyMultipleCell('removeValue');
      } else {
        this.tbodyData[rowIndex][header].value = '';
      }
      this.$emit('tbody-nav-backspace', event, actualElement, header, rowIndex, colIndex);
    },
    handleTbodyInputChange(event, header, rowIndex, colIndex) {
      // remove class show on input when it change
      if (this.oldTdShow) this.tbodyData[this.oldTdShow.row][this.oldTdShow.key].show = false;
      this.enableSubmenu();

      // callback
      this.$emit('tbody-input-change', event, header, rowIndex, colIndex);
    },
    handleTbodySelectChange(event, header, col, option, rowIndex, colIndex) {
      // remove class show on select when it change
      if (this.oldTdShow) this.tbodyData[this.oldTdShow.row][this.oldTdShow.key].show = false;
      this.enableSubmenu();

      // callback
      this.$emit('tbody-select-change', event, header, col, option, rowIndex, colIndex);
    },
    // Context Menu
    handleTbodyContextMenu(event, header, rowIndex, colIndex, type) {
      this.createCell(rowIndex, header, type);
      // console.log('handleTbodyContextMenu', event, header, rowIndex, colIndex, type);
    },
    callbackSubmenuThead(event, header, colIndex, submenuFunction, selectOptions) {
      this.submenuStatusThead = false;
      if (selectOptions) {
        this.$emit(`thead-submenu-click-${submenuFunction}`, event, header, colIndex, selectOptions);
      } else {
        this.$emit(`thead-submenu-click-${submenuFunction}`, event, header, colIndex);
      }
    },
    callbackSubmenuTbody(event, header, rowIndex, colIndex, type, submenuFunction) {
      this.$emit(`tbody-submenu-click-${submenuFunction}`, event, header, rowIndex, colIndex, type, submenuFunction);
    },
    // thead
    handleTheadContextMenu() {
      this.submenuStatusTbody = false;
    },
    callbackSort(event, header, colIndex) {
      this.$emit('thead-td-sort', event, header, colIndex);
    },
    moveKeyup(event) {     
      if (event.keyCode === 16) {
        this.keys[event.keyCode] = false;
        this.incrementCol = 0;
        this.incrementRow = 0;
        this.cleanActiveOnTd('selected');
      }
    },
    moveKeydown(event) {
      const actualElement = document.getElementsByClassName('active_td')[0];
      if (event.keyCode === 16) {
        this.keys[event.keyCode] = true;
      }

      if (actualElement &&
        (event.keyCode === 37 ||
        event.keyCode === 39 ||
        event.keyCode === 40 ||
        event.keyCode === 38 ||
        event.keyCode === 13 ||
        event.keyCode === 27 ||
        event.keyCode === 8)) {
        const colIndex = Number(actualElement.getAttribute('data-col-index'));
        const rowIndex = Number(actualElement.getAttribute('data-row-index'));

        // remove active to before-active cell
        let header = Object.values(this.headerKeys)[colIndex];

        // set colMax rowMax
        const colMax = Object.keys(this.tbodyData[0]).length;
        const rowMax = this.tbodyData.length;

        // shift
        if (this.keys[16]) {
          this.tbodyData[rowIndex][header].active = false;
          this.incrementCol = this.incrementCol !== 0 ? this.incrementCol : colIndex;

          // shift / right
          if (event.keyCode === 39) {
            this.incrementCol += 1;
          }
          // shift / left
          if (event.keyCode === 37) {
            this.incrementCol -= 1;
          }
          // shift / bottom
          if (event.keyCode === 40) {
            this.incrementRow += 1;
          }
          // shift / top
          if (event.keyCode === 38) {
            this.incrementRow -= 1;
          }

          this.handleSelectMultipleCell(event, header, this.incrementRow, this.incrementCol);
          header = Object.values(this.headerKeys)[this.incrementCol];
          this.tbodyData[this.incrementRow][header].active = true;
        } else {
          this.tbodyData[rowIndex][header].active = false;
          // right
          if (event.keyCode === 39) {
            const col = Object.values(this.headerKeys)[colIndex + 1];
            if (col) {
              this.tbodyData[rowIndex][col].active = true;
            } else {
              header = this.headerKeys[colMax - colIndex - 1];
              this.tbodyData[rowIndex][header].active = true;
            }
          }
          // left
          if (event.keyCode === 37) {
            let col = Object.values(this.headerKeys)[colIndex - 1];
            if (col) {
              this.tbodyData[rowIndex][col].active = true;
            } else {
              header = this.headerKeys[colMax - 1];
              col = Object.values(this.headerKeys)[colMax - 1];
              this.tbodyData[rowIndex][col].active = true;
            }
          }
          // bottom
          if (event.keyCode === 40) {
            if (rowIndex + 1 !== rowMax) {
              this.tbodyData[rowIndex + 1][header].active = true;
            } else {
              this.tbodyData[(rowIndex + 1) - rowMax][header].active = true;
            }
          }
          // top
          if (event.keyCode === 38) {
            if (rowIndex !== 0) {
              this.tbodyData[rowIndex - 1][header].active = true;
            } else {
              this.tbodyData[(rowIndex + rowMax) - 1][header].active = true;
            }
          }
        }
        // press enter
        if (event.keyCode === 13) {
          this.tbodyData[rowIndex][header].show = true;
          if (this.$refs[`input-${colIndex}-${rowIndex}`]) {
            this.$refs[`input-${colIndex}-${rowIndex}`][0].focus();
          }
          this.$emit('tbody-nav-enter', event, event.keyCode, actualElement, rowIndex, colIndex);
        }
        // press backspace
        if (event.keyCode === 8) {
          this.$emit('tbody-nav-backspace', event, actualElement, header, rowIndex, colIndex);
        }
        // press esc
        if (event.keyCode === 27) {
          this.tbodyData[rowIndex][header].active = false;
        }
      }
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
