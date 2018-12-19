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
        :disable-sort-thead="disableSortThead"
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
        :filtered-list="filteredList"
        :headers="headers"
        :newData="newData"
        :submenu-status-tbody="submenuStatusTbody"
        :submenu-tbody="submenuTbody"
        :tbody-data="tbodyData"
        :tbody-index="tbodyIndex"
        v-on:tbody-handle-set-oldvalue="setOldValueOnInputSelect"
        v-on:tbody-handle-search-input-select="handleSearchInputSelect"
        v-on:handle-to-calculate-position="calculPosition"
        v-on:handle-to-open-select="enableSelect"
        v-on:submenu-enable="enableSubmenu"
        v-on:tbody-down-dragtofill="handleDownDragToFill"
        v-on:tbody-input-change="handleTbodyInputChange"
        v-on:tbody-move-dragtofill="handleMoveDragToFill"
        v-on:tbody-select-change="handleTbodySelectChange"
        v-on:tbody-select-multiple-cell="handleSelectMultipleCell"
        v-on:tbody-submenu-click-callback="callbackSubmenuTbody"
        v-on:tbody-td-click="handleTbodyTdClick"
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
      required: true,
    },
    disableSortThead: {
      type: Array,
      required: true,
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
    parentScrollElement: {
      type: String,
      required: true,
    },
  },
  components: {
    VueThead,
    VueTbody,
  },
  data() {
    return {
      disableKeyTimeout: null,
      eventDrag: false,
      filteredList: [],
      headerKeys: [],
      incrementCol: 0,
      incrementOption: null,
      incrementRow: null,
      keys: {},
      lastSelectOpen: null,
      oldTdActive: null,
      oldTdShow: null,
      pressedShift: 0,
      scrollDocument: null,
      scrollToSelectTimeout: null,
      selectedCell: null,
      selectedCoordCells: null,
      selectedCoordCopyCells: null,
      selectedMultipleCell: false,
      selectedMultipleCellActive: false,
      setFirstCell: false,
      storeCopyDatas: [],
      submenuStatusTbody: false,
      submenuStatusThead: false,
    };
  },
  mounted() {
    this.headerKeys = this.headers.map(header => header.headerKey);
    this.createdCell();
    window.addEventListener('keydown', this.moveKeydown);
    window.addEventListener('keyup', this.moveKeyup);
    document.addEventListener('copy', (event) => {
      if (this.actualElement) {
        event.preventDefault();
      }
      this.storeCopyDatas = [];
      this.copyStoreData('copy');
    });
    document.addEventListener('paste', (event) => {
      event.preventDefault();
      if (this.storeCopyDatas.length > 0) {
        this.pasteReplaceData();
      }
    });
    document.addEventListener('scroll', () => {
      this.debounce(this.scrollTopDocument(), 600);
    });
  },
  computed: {
    colHeaderWidths() {
      return this.headers.map(x => parseInt(x.style.width, 10));
    },
  },
  methods: {
    createdCell() {
      // create cell if isn't exist
      this.tbodyData.forEach((tbody, rowIndex) => {
        this.headerKeys.forEach((header) => {
          if (!tbody[header]) {
            const data = JSON.parse(JSON.stringify(this.newData));
            this.$set(this.tbodyData[rowIndex], header, data);
          }
        });
      });
    },
    disabledEvent(col, header) {
      if (col.disabled === undefined) {
        return !this.disableCells.find(x => x === header);
      } else if (col.disabled) {
        return !col.disabled;
      }
      return true;
    },
    debounce(fn, delay) {
      let timeout;

      return function () {
        const functionCall = () => fn.apply(this, arguments);
        clearTimeout(timeout);
        timeout = setTimeout(functionCall, delay);
      };
    },
    scrollTopDocument(event) {
      this.scrollDocument = document.querySelector(`${this.parentScrollElement}`).scrollTop;
      if (this.lastSelectOpen) {
        this.calculPosition(event, this.lastSelectOpen.rowIndex, this.lastSelectOpen.colIndex, 'dropdown');
      }
    },
    updateSelectedCell(header, row, col) {
      if (!this.setFirstCell) {
        this.$set(this.tbodyData[row][header], 'rectangleSelection', true);
        this.setFirstCell = true;
      }
      this.selectedCell = {
        header,
        row,
        col,
      };
    },
    activeSelectSearch(event, rowIndex, colIndex, header) {
      this.$set(this.tbodyData[rowIndex][header], 'typing', false);
      this.calculPosition(event, rowIndex, colIndex, 'dropdown');
      this.$refs.vueTbody.$refs[`input-${colIndex}-${rowIndex}`][0].focus();
    },
    scrollFunction() {
      if (this.lastSelectOpen) {
        this.calculPosition(this.lastSelectOpen.event, this.lastSelectOpen.rowIndex, this.lastSelectOpen.colIndex, 'dropdown');
      }
    },
    enableSelect(event, header, col, rowIndex, colIndex) {
      const currentData = this.tbodyData[rowIndex][header];
      if (!col.search) {
        this.lastSelectOpen = {
          event,
          header,
          col,
          rowIndex,
          colIndex,
        };

        this.removeClass(['search', 'show', 'typing']);

        this.$set(currentData, 'search', true);
        this.$set(currentData, 'show', true);
        this.$set(currentData, 'typing', false);

        this.$refs.vueTbody.$refs[`input-${colIndex}-${rowIndex}`][0].focus();
        this.calculPosition(event, rowIndex, colIndex, 'dropdown');
        this.filteredList = currentData.selectOptions;
        if (currentData.value !== '') {
          this.showDropdown(currentData, colIndex, rowIndex);
          const index = currentData.selectOptions.map(x => x.value).indexOf(currentData.value);
          this.incrementOption = index;
        } else {
          this.incrementOption = 0;
        }
      } else {
        this.$set(currentData, 'search', false);
        this.$set(currentData, 'show', false);
        this.$set(currentData, 'typing', true);
        this.lastSelectOpen = null;
      }
    },
    handleSearchInputSelect(event, searchValue, col, header, rowIndex, colIndex) {
      if ((!this.keys.cmd || !this.keys.ctrl) &&
        event.keyCode !== 13 &&
        event.keyCode !== 8 &&
        event.keyCode !== 16 &&
        event.keyCode !== 17 &&
        event.keyCode !== 27 &&
        event.keyCode !== 37 &&
        event.keyCode !== 38 &&
        event.keyCode !== 39 &&
        event.keyCode !== 40 &&
        event.keyCode !== 91) {
        this.lastSelectOpen = {
          event,
          header,
          col,
          rowIndex,
          colIndex,
        };
        // active class
        const currentData = this.tbodyData[rowIndex][header];
        this.$set(currentData, 'search', true);
        this.$set(currentData, 'typing', true);
        this.$set(currentData, 'show', true);

        this.showDropdown(currentData, colIndex, rowIndex);
        this.incrementOption = 0;

        this.filteredList = col.selectOptions.filter((option) => {
          if (typeof option.value === 'number') {
            return option.value.toString().toLowerCase().includes(searchValue.toString().toLowerCase());
          }
          return option.value.toLowerCase().includes(searchValue.toLowerCase());
        });
      }
    },
    showDropdown(currentData, colIndex, rowIndex) {
      // clear timeout
      const dropdown = this.$refs.vueTbody.$refs[`dropdown-${colIndex}-${rowIndex}`][0];
      if (!this.scrollToSelectTimeout === null) {
        clearTimeout(this.scrollToSelectTimeout);
      }
      // set scrollTop on select
      this.scrollToSelectTimeout = setTimeout(() => {
        dropdown.scrollTop = 45 * this.incrementOption;
        this.scrollToSelectTimeout = null;
      }, 100);
    },
    handleTbodySelectChange(event, header, col, option, rowIndex, colIndex) {
      const currentData = this.tbodyData[rowIndex][header];
      currentData.selectOptions.forEach((selectOption) => {
        selectOption.active = false;
      });
      currentData.selectOptions.find(x => x.value === option.value).active = true;

      this.$set(currentData, 'search', false);
      this.$set(currentData, 'show', false);
      this.$set(currentData, 'value', option.value);

      this.lastSelectOpen = null;
      // remove class show on select when it change
      if (this.oldTdShow) this.tbodyData[this.oldTdShow.row][this.oldTdShow.key].show = false;
      this.enableSubmenu();
      // callback
      this.$emit('tbody-select-change', event, header, col, option, rowIndex, colIndex);
    },
    calculPosition(event, rowIndex, colIndex, header) {
      // stock scrollLeft / scrollTop position of parent
      const scrollLeft = this.$refs.vueTable.scrollLeft;
      const scrollTop = this.$refs.vueTable.scrollTop;

      // stock size / offsetTop / offsetLeft of the element
      const width = this.$refs.vueTbody.$refs[`td-${colIndex}-${rowIndex}`][0].offsetWidth;

      let top = ((this.$refs.vueTbody.$refs[`td-${colIndex}-${rowIndex}`][0].offsetTop - scrollTop) + 40) - this.parentElementScroll;
      let left = this.$refs.vueTbody.$refs[`td-${colIndex}-${rowIndex}`][0].offsetLeft - scrollLeft;

      if (this.selectPosition) {
        top = (((this.$refs.vueTbody.$refs[`td-${colIndex}-${rowIndex}`][0].offsetTop - scrollTop) + 40) + this.selectPosition.top) - this.parentElementScroll;
        left = (this.$refs.vueTbody.$refs[`td-${colIndex}-${rowIndex}`][0].offsetLeft - scrollLeft) + this.selectPosition.left;
      }
      // subtracted top of scroll top document
      if (this.scrollDocument) {
        top = (((this.$refs.vueTbody.$refs[`td-${colIndex}-${rowIndex}`][0].offsetTop - scrollTop) + 40) - this.parentElementScroll) - this.scrollDocument;
      }

      // set size / top position / left position
      const currentSelect = this.$refs.vueTbody.$refs[`${header}-${colIndex}-${rowIndex}`];
      if (currentSelect.length > 0) {
        currentSelect[0].style.setProperty('--selectWidth', `${width}px`);
        currentSelect[0].style.setProperty('--selectTop', `${top}px`);
        currentSelect[0].style.setProperty('--selectLeft', `${left}px`);
      }
    },
    setOldValueOnInputSelect(col, rowIndex, header, colIndex, type) {
      const column = col;
      column.show = false;
      this.$set(this.tbodyData[rowIndex][header], 'value', this.tbodyData[rowIndex][header].value);
      if (type === 'select') {
        column.search = false;
      }
    },
    handleUpDragSizeHeader(event, headers) {
      this.$emit('handle-up-drag-size-header', event, headers);
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
      this.removeClass(['active', 'show']);
      this.tbodyData[rowIndex][header].active = true;
      // stock oldTdActive in object
      this.oldTdActive = {
        key: header,
        row: rowIndex,
        col: colIndex,
      };
    },
    removeClass(params) {
      if (params.includes('selected')) {
        this.selectedMultipleCellActive = false;
      }
      params.forEach((param) => {
        this.tbodyData.forEach((data, index) => {
          Object.keys(data).forEach((key) => {
            if (this.tbodyData[index][key][param] === true) {
              this.tbodyData[index][key][param] = false;
            }
          });
          if (param === 'rectangleSelection') {
            this.setFirstCell = false;
          }
        });
      });
    },
    // Copy / Paste
    copyStoreData(params) {
      const tbodyData = JSON.parse(JSON.stringify(this.tbodyData));
      this.removeClass(['stateCopy']);

      if (this.selectedCoordCells && this.selectedMultipleCell && params === 'copy') {
        if (this.selectedCell.row !== this.selectedCoordCells.rowEnd || this.selectedCell.col !== this.selectedCoordCells.colEnd) {
          this.selectedCell.row = this.selectedCoordCells.rowEnd;
          this.selectedCell.col = this.selectedCoordCells.colEnd;
        }
      }

      if (this.selectedCoordCells &&
        this.selectedCell.col === this.selectedCoordCells.colEnd &&
        this.selectedCell.row === this.selectedCoordCells.rowEnd &&
        params === 'copy') {
        this.selectedCoordCopyCells = this.selectedCoordCells;
      }

      if (this.selectedMultipleCell && this.selectedCoordCells) {
        let rowMin = Math.min(this.selectedCoordCells.rowStart, this.selectedCoordCells.rowEnd);
        const rowMax = Math.max(this.selectedCoordCells.rowStart, this.selectedCoordCells.rowEnd);
        let colMin = Math.min(this.selectedCoordCells.colStart, this.selectedCoordCells.colEnd);
        const colMax = Math.max(this.selectedCoordCells.colStart, this.selectedCoordCells.colEnd);
        const header = this.headerKeys[colMin];
        let storeData = {};

        if (params === 'copy') {
          this.$set(this.tbodyData[rowMin][header], 'stateCopy', true);
          this.removeClass(['rectangleSelection']);
        }

        while (rowMin <= rowMax) {
          storeData[this.headerKeys[colMin]] = tbodyData[rowMin][this.headerKeys[colMin]];
          colMin += 1;
          if (colMin > colMax) {
            this.storeCopyDatas.push(storeData);
            colMin = Math.min(this.selectedCoordCells.colStart, this.selectedCoordCells.colEnd);
            rowMin += 1;
            storeData = {};
          }
        }
        this.copyMultipleCell = true;
      } else {
        if (params === 'copy') {
          this.$set(this.tbodyData[this.selectedCell.row][this.selectedCell.header], 'stateCopy', true);
        } else {
          this.storeCopyDatas = [];  
        }
        this.storeCopyDatas.push(tbodyData[this.selectedCell.row][this.selectedCell.header]);
        this.copyMultipleCell = false;
      }
    },
    pasteReplaceData() {
      const maxRow = this.tbodyData.length;
      // copy / paste one cell || disable on disabled cell
      if (this.storeCopyDatas[0].value && !this.copyMultipleCell && !this.selectedMultipleCell && !this.eventDrag && this.disabledEvent(this.selectedCell.col, this.selectedCell.header)) {
        const newCopyData = JSON.parse(JSON.stringify(this.storeCopyDatas));
        this.tbodyData[this.selectedCell.row][this.selectedCell.header] = newCopyData[0];
        this.$emit('tbody-replace-data', this.selectedCell.row, this.selectedCell.header);
        // disable on disabled cell
      } else if (this.disabledEvent(this.selectedCell.col, this.selectedCell.header)) {
        // copy / paste multiple cell | drag to fill one / multiple cell
        let rowMin = Math.min(this.selectedCoordCells.rowStart, this.selectedCoordCells.rowEnd);
        let rowMax = Math.max(this.selectedCoordCells.rowStart, this.selectedCoordCells.rowEnd);
        let colMin = Math.min(this.selectedCoordCells.colStart, this.selectedCoordCells.colEnd);
        let colMax = Math.max(this.selectedCoordCells.colStart, this.selectedCoordCells.colEnd);

        // if paste in multiple selection
        if (this.selectedCoordCopyCells !== null && this.selectedCoordCells !== this.selectedCoordCopyCells) {
          rowMin = Math.min(this.selectedCoordCopyCells.rowStart, this.selectedCoordCopyCells.rowEnd);
          rowMax = Math.max(this.selectedCoordCopyCells.rowStart, this.selectedCoordCopyCells.rowEnd);
          colMin = Math.min(this.selectedCoordCopyCells.colStart, this.selectedCoordCopyCells.colEnd);
          colMax = Math.max(this.selectedCoordCopyCells.colStart, this.selectedCoordCopyCells.colEnd);
        }

        let row = 0;
        let col = 0;
        while (rowMin <= rowMax) {
          const header = this.headerKeys[colMin];
          const newCopyData = JSON.parse(JSON.stringify(this.storeCopyDatas));

          if (this.dragToFill && this.eventDrag) { // Drag To Fill
            if (newCopyData[0][header]) {
              this.tbodyData[rowMin][header] = newCopyData[0][header]; // multiple cell
            } else {
              this.tbodyData[rowMin][header] = newCopyData[0]; // one cell
            }
            this.$emit('tbody-replace-data', rowMin, header);
          } else {
            let incrementRow = this.selectedCell.row + row;
            let incrementCol = this.selectedCell.col + col;

            if (this.selectedCoordCells !== this.selectedCoordCopyCells) {
              incrementRow = this.selectedCoordCells.rowStart + row;
              incrementCol = this.selectedCoordCells.colStart + col;
            }

            let currentHeader = this.headerKeys[incrementCol];

            // multiple col to multiple col
            if (Object.values(newCopyData[0]).length === 1) {
              currentHeader = this.headerKeys[this.selectedCell.col];
              if (incrementRow < maxRow) {
                this.tbodyData[incrementRow][currentHeader] = newCopyData[col][header];
                this.$emit('tbody-replace-data', incrementRow, currentHeader);
                col += 1;
              }
            }

            // one cell to multipleCell
            if (newCopyData.length === 1 && Object.values(newCopyData).length === 1 && newCopyData[0].type) {
              currentHeader = this.selectedCell.header;
              newCopyData[0].active = false;
              this.tbodyData[rowMin][currentHeader] = newCopyData[0];
              if (rowMin === this.selectedCell.row) {
                this.$set(this.tbodyData[rowMin][currentHeader], 'selected', true);
                this.$set(this.tbodyData[rowMin][currentHeader], 'rectangleSelection', true);
              }
              if (rowMin === rowMax) {
                this.$set(this.tbodyData[rowMin][currentHeader], 'active', true);
                this.$set(this.tbodyData[rowMin][currentHeader], 'rectangleSelection', false);
                this.$set(this.tbodyData[rowMin][currentHeader], 'selected', true);
              }
              this.$emit('tbody-replace-data', rowMin, currentHeader);
            }

            // 1 row to 1 row
            if (newCopyData.length === 1 && Object.values(newCopyData[0]).length > 1 && !newCopyData[0].type) {
              if (this.selectedCoordCells !== this.selectedCoordCopyCells) {
                this.tbodyData[this.selectedCoordCells.rowStart][currentHeader] = newCopyData[0][header];
                this.$emit('tbody-replace-data', this.selectedCoordCells.rowStart, currentHeader);
              } else {
                this.tbodyData[this.selectedCell.row][currentHeader] = newCopyData[0][header];
                this.$emit('tbody-replace-data', this.selectedCell.row, currentHeader);
              }
              col += 1;
            }

            // multiple col / row to multiple col / row
            if (newCopyData.length > 1 && Object.values(newCopyData[0]).length > 1) {
              this.tbodyData[incrementRow][currentHeader] = newCopyData[row][header];
              this.$emit('tbody-replace-data', incrementRow, currentHeader);
              if (colMin < colMax) {
                col += 1;
              } else {
                col = 0;
              }
            }
          }
          colMin += 1;
          if (colMin > colMax) {
            if (this.selectedCoordCopyCells !== null && this.selectedCoordCells !== this.selectedCoordCopyCells) {
              colMin = Math.min(this.selectedCoordCopyCells.colStart, this.selectedCoordCopyCells.colEnd);
            } else {
              colMin = Math.min(this.selectedCoordCells.colStart, this.selectedCoordCells.colEnd);
            }
            rowMin += 1;
            row += 1;
          }
        }
        this.modifyMultipleCell();
      }
    },
    modifyMultipleCell(params) {
      let rowMin = Math.min(this.selectedCoordCells.rowStart, this.selectedCoordCells.rowEnd);
      const rowMax = Math.max(this.selectedCoordCells.rowStart, this.selectedCoordCells.rowEnd);
      let colMin = Math.min(this.selectedCoordCells.colStart, this.selectedCoordCells.colEnd);
      const colMax = Math.max(this.selectedCoordCells.colStart, this.selectedCoordCells.colEnd);

      let width = 100;
      let height = 40;

      while (rowMin <= rowMax) {
        const header = this.headerKeys[colMin];
        // disable on disabled cell
        if (params === 'removeValue' && this.disabledEvent(this.tbodyData[rowMin][header], header)) {
          this.$emit('tbody-nav-backspace', rowMin, colMin, header);
          this.$set(this.tbodyData[rowMin][header], 'value', '');
          this.$set(this.tbodyData[rowMin][header], 'selected', false);
        }
        if (params === 'selected') {
          this.$set(this.tbodyData[rowMin][header], 'selected', true);
          this.selectedMultipleCellActive = true;
        }
        colMin += 1;
        if (colMin > colMax) {
          colMin = Math.min(this.selectedCoordCells.colStart, this.selectedCoordCells.colEnd);
          rowMin += 1;
        }
      }

      // Defined width of rectangle
      if (colMin === 0 && colMax === 0) {
        width = 100 * (colMin + 1);
      } else if (colMin === 0 && colMax > 0) {
        width = 100 * (colMax + 1);
      } else {
        width = 100 * ((colMax - colMin) + 1);
      }

      // Defined height of rectangle
      if ((rowMin === 0 && rowMax === 0) || (rowMin === 0 && rowMax > 0)) {
        height = 40 * (rowMin + 1);
      } else if (this.selectedCoordCells.rowEnd > this.selectedCoordCells.rowStart) {
        height = 40 * ((this.selectedCoordCells.rowEnd - this.selectedCoordCells.rowStart) + 1);
      } else {
        height = 40 * ((this.selectedCoordCells.rowStart - this.selectedCoordCells.rowEnd) + 1);
      }
      // Set height / width of rectangle
      this.debounce(this.setRectangleSelection(width, height), 600);
      this.$forceUpdate();
    },
    setRectangleSelection(width, height) {
      let rectangleSelectedCell = this.$refs.vueTbody.$refs[`td-${this.selectedCoordCells.colStart}-${this.selectedCoordCells.rowStart}`][0];

      if (!this.selectedMultipleCellActive) {
        rectangleSelectedCell = this.$refs.vueTbody.$refs[`td-${this.selectedCell.col}-${this.selectedCell.row}`][0];
      }

      rectangleSelectedCell.style.setProperty('--rectangleWidth', `${width + 1}%`);
      rectangleSelectedCell.style.setProperty('--rectangleHeight', `${height}px`);

      // Position bottom/top of rectangle if rowStart >= rowEnd
      if (this.selectedCoordCells.rowStart >= this.selectedCoordCells.rowEnd) {
        rectangleSelectedCell.style.setProperty('--rectangleTop', 'auto');
        rectangleSelectedCell.style.setProperty('--rectangleBottom', 0);
      } else {
        rectangleSelectedCell.style.setProperty('--rectangleTop', 0);
        rectangleSelectedCell.style.setProperty('--rectangleBottom', 'auto');
      }
      // Position left/right of rectangle if colStart >= colEnd
      if (this.selectedCoordCells.colStart >= this.selectedCoordCells.colEnd) {
        rectangleSelectedCell.style.setProperty('--rectangleLeft', 'auto');
        rectangleSelectedCell.style.setProperty('--rectangleRight', 0);
      } else {
        rectangleSelectedCell.style.setProperty('--rectangleLeft', 0);
      }
    },
    // drag To Fill
    handleDownDragToFill(event, header, col, rowIndex, colIndex) {
      this.$set(this.tbodyData[rowIndex][header], 'active', true);
      this.eventDrag = true;
      if (!this.selectedCoordCells && !this.selectedMultipleCell) {
        this.selectedCoordCells = {
          rowStart: this.selectedCell.row,
          colStart: this.selectedCell.col,
          keyStart: this.selectedCell.header,
          rowEnd: rowIndex,
          colEnd: colIndex,
          keyEnd: header,
        };
      } else {
        // if drag col to col in row to row to row
        this.selectedCoordCells.rowStart = rowIndex;
      }
      this.copyStoreData('drag');
    },
    handleMoveDragToFill(event, header, col, rowIndex, colIndex) {
      if (this.eventDrag === true && this.selectedCoordCells && this.selectedCoordCells.rowEnd !== rowIndex) {
        this.selectedCoordCells.rowEnd = rowIndex;
        if (this.storeCopyDatas.length === 1 && this.storeCopyDatas[0].type && this.eventDrag === true) {
          this.selectedCoordCells.colStart = colIndex;
          this.selectedCoordCells.colEnd = colIndex;
        }
        this.modifyMultipleCell('selected');
        this.$emit('tbody-replace-data', rowIndex, header);
        this.$emit('tbody-move-dragtofill', this.selectedCoordCells, header, col, rowIndex, colIndex);
      }
    },
    handleUpDragToFill(event, header, rowIndex, colIndex) {
      if (this.eventDrag === true && this.selectedCoordCells) {
        this.selectedCoordCells.rowEnd = rowIndex;
        this.pasteReplaceData();
        this.removeClass(['selected', 'rectangleSelection', 'active', 'show']);
        this.$emit('tbody-up-dragtofill', this.selectedCoordCells, header, rowIndex, colIndex);
        this.eventDrag = false;
        this.storeCopyDatas = [];
        this.selectedCoordCells = null;
      }
    },
    // On click on td
    handleTbodyTdClick(event, col, header, rowIndex, colIndex, type) {
      const column = col;

      if (this.selectedMultipleCell) {
        this.selectedMultipleCell = false;
      }

      if (!column.active) {
        if (!this.keys[16]) {
          this.removeClass(['selected', 'rectangleSelection']);
        }
        this.removeClass(['search']);
      }
      this.bindClassActiveOnTd(header, rowIndex, colIndex);


      this.updateSelectedCell(header, rowIndex, colIndex);

      this.enableSubmenu();
      if (this.oldTdShow && this.oldTdShow.col !== colIndex) {
        this.tbodyData[this.oldTdShow.row][this.oldTdShow.key].show = false;
      }

      if (type === 'select' && column.handleSearch) {
        this.activeSelectSearch(event, rowIndex, colIndex, header);
      }
    },
    handleSelectMultipleCell(event, header, rowIndex, colIndex) {
      if (!this.selectedMultipleCellActive) {
        this.selectedMultipleCell = true;
        if (this.selectedCell) {
          this.selectedCoordCells = {
            rowStart: this.selectedCell.row,
            colStart: this.selectedCell.col,
            keyStart: this.selectedCell.header,
            rowEnd: rowIndex,
            colEnd: colIndex,
            keyEnd: header,
          };
        }
        // Add active on selectedCoordCells selected
        this.modifyMultipleCell('selected');
      }
    },
    handleTbodyTdDoubleClick(event, header, col, rowIndex, colIndex) {
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
      this.enableSubmenu();
    },
    handleTbodyNavEnter() {
      this.enableSubmenu();
    },
    handleTbodyNavBackspace(rowIndex, colIndex, header) {
      if (this.selectedMultipleCell) {
        this.modifyMultipleCell('removeValue');
      } else {
        this.tbodyData[rowIndex][header].value = '';
        this.$emit('tbody-nav-backspace', rowIndex, colIndex, header);
      }
    },
    handleTbodyInputChange(event, header, rowIndex, colIndex) {
      // remove class show on input when it change
      if (this.oldTdShow) this.tbodyData[this.oldTdShow.row][this.oldTdShow.key].show = false;
      this.enableSubmenu();

      // callback
      this.$emit('tbody-input-change', event, header, rowIndex, colIndex);
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
    moveOnSelect(event) {
      if (this.incrementOption <= this.filteredList.length) {
        // top
        const dropdown = this.$refs.vueTbody.$refs[`dropdown-${this.lastSelectOpen.colIndex}-${this.lastSelectOpen.rowIndex}`][0];
        if (event.keyCode === 38) {
          if (this.incrementOption <= this.filteredList.length && this.incrementOption > 0) {
            if (this.filteredList[this.incrementOption]) {
              this.$set(this.filteredList[this.incrementOption], 'active', false);
              this.incrementOption -= 1;
              this.$set(this.filteredList[this.incrementOption], 'active', true);
            } else {
              this.incrementOption -= 1;
              this.$set(this.filteredList[this.incrementOption], 'active', false);
              this.incrementOption -= 1;
              this.$set(this.filteredList[this.incrementOption], 'active', true);
            }
            if (this.incrementOption % 3 === 0) {
              dropdown.scrollTop -= (45 * 3);
            }
          }
        }
        // bottom
        if (event.keyCode === 40) {
          if (this.incrementOption < this.filteredList.length - 1) {
            if (this.incrementOption === 0 || this.incrementOption === 1) {
              this.$set(this.filteredList[this.incrementOption], 'active', true);
              this.incrementOption += 1;
              this.$set(this.filteredList[this.incrementOption], 'active', true);
              this.$set(this.filteredList[this.incrementOption - 1], 'active', false);
            } else if (this.incrementOption > 1) {
              this.$set(this.filteredList[this.incrementOption], 'active', false);
              this.incrementOption += 1;
              this.$set(this.filteredList[this.incrementOption], 'active', true);
            }
          }
          if (this.incrementOption % 3 === 0) {
            dropdown.scrollTop = 45 * this.incrementOption;
          }
        }
      }
      // enter
      if (event.keyCode === 13) {
        const oldSelect = this.lastSelectOpen;
        const currentSelect = this.tbodyData[oldSelect.rowIndex][oldSelect.header];
        this.handleTbodySelectChange(event, oldSelect.header, currentSelect, this.filteredList[this.incrementOption], oldSelect.rowIndex, oldSelect.colIndex);
        this.lastSelectOpen = null;
      }
    },
    moveOnTable(event, colIndex, rowIndex) {
      const vueTable = this.$refs.vueTable;
      const maxCol = Math.max(...this.colHeaderWidths);
      // get the correct height of visible table
      const heightTable = vueTable.clientHeight - vueTable.firstElementChild.clientHeight - this.$refs.vueThead.$el.clientHeight;
      const widthTable = vueTable.clientWidth - 40;
      const borderBottomCell = Math.round(heightTable / 40);
      const borderRightCell = Math.round(widthTable / maxCol);
      // top
      if (event.keyCode === 38) {
        event.preventDefault();
        if (borderBottomCell >= rowIndex) {
          vueTable.scrollTop -= 40;
        }
      }
      // bottom
      if (event.keyCode === 40) {
        event.preventDefault();
        if ((borderBottomCell - 1) <= rowIndex) {
          vueTable.scrollTop += 40;
        }
      }
      // left
      if (event.keyCode === 37) {
        event.preventDefault();
        if ((borderRightCell + 1) >= colIndex) {
          vueTable.scrollLeft -= maxCol;
        }
      }
      // right
      if (event.keyCode === 39) {
        event.preventDefault();
        if ((borderRightCell - 1) <= colIndex) {
          vueTable.scrollLeft += maxCol;
        }
      }
    },
    pressShiftMultipleCell(event, header, rowMax, rowIndex, colMax, colIndex) {
      event.preventDefault();
      this.$set(this.tbodyData[rowIndex][header], 'active', false);
      this.incrementCol = this.incrementCol ? this.incrementCol : colIndex;
      this.incrementRow = this.incrementRow ? this.incrementRow : rowIndex;
      if (this.pressedShift >= 0) {
        this.pressedShift += 1;
      }
      if (this.pressedShift === 0) {
        this.selectedCell = {
          header,
          row: rowIndex,
          col: colIndex,
        };
      }

      // shift / left
      if (event.keyCode === 37) {
        this.incrementCol -= 1;
        if (this.incrementCol < 0) {
          this.incrementCol = 0;
        }
        this.removeClass(['selected']);
      }
      // shift / top
      if (event.keyCode === 38) {
        this.incrementRow -= 1;
        if (this.incrementRow < 0) {
          this.incrementRow = 0;
        }
        this.removeClass(['selected']);
      }
      // shift / right
      if (event.keyCode === 39) {
        if (colMax >= this.incrementCol + 2) {
          this.incrementCol += 1;
        } else {
          this.$set(this.tbodyData[rowIndex][header], 'active', true);
        }
      }
      // shift / bottom
      if (event.keyCode === 40) {
        if (rowMax >= this.incrementRow + 2) {
          this.incrementRow += 1;
        } else {
          this.$set(this.tbodyData[rowIndex][header], 'active', true);
        }
      }
      header = Object.values(this.headerKeys)[this.incrementCol];
      this.$set(this.tbodyData[this.incrementRow][header], 'active', true);
      this.handleSelectMultipleCell(event, header, this.incrementRow, this.incrementCol);
    },
    moveKeyup(event) {
      if (event.keyCode === 16) {
        this.keys[event.keyCode] = false;
        this.incrementCol = null;
        this.incrementRow = null;
        this.selectedMultipleCell = true;
        this.pressedShift = 0;
      }
      if (event.keyCode === 91 || event.keyCode === 17) {
        if (!this.disableKeyTimeout === null) {
          clearTimeout(this.disableKeyTimeout);
        }
        this.disableKeyTimeout = setTimeout(() => {
          this.keys.cmd = false;
          this.keys.ctrl = false;
          this.disableKeyTimeout = null;
        }, 400);
      }
    },
    moveKeydown(event) {
      this.actualElement = document.getElementsByClassName('active_td')[0];

      if (event.keyCode === 16) {
        this.keys[event.keyCode] = true;
      }

      if (event.keyCode === 91 || event.keyCode === 17) {
        this.keys.cmd = true;
        this.keys.ctrl = true;
      }

      if (this.lastSelectOpen) {
        this.moveOnSelect(event);
      }

      if (this.actualElement &&
        (event.keyCode === 37 ||
        event.keyCode === 39 ||
        event.keyCode === 40 ||
        event.keyCode === 38 ||
        event.keyCode === 13 ||
        event.keyCode === 27 ||
        event.keyCode === 8)) {
        this.removeClass(['selected']);

        const colIndex = Number(this.actualElement.getAttribute('data-col-index'));
        const rowIndex = Number(this.actualElement.getAttribute('data-row-index'));
        const dataType = this.actualElement.getAttribute('data-type');
        const header = this.actualElement.getAttribute('data-header');

        if (!this.setFirstCell) {
          this.$set(this.tbodyData[rowIndex][header], 'rectangleSelection', true);
          this.setFirstCell = true;
        }

        // set colMax rowMax
        const rowMax = this.tbodyData.length;
        const colMax = this.headers.length;

        this.moveOnTable(event, colIndex, rowIndex);

        // shift
        if (this.keys[16]) {
          this.pressShiftMultipleCell(event, header, rowMax, rowIndex, colMax, colIndex);
        } else if (!this.lastSelectOpen && event.keyCode !== 8) {
          if (this.selectedMultipleCell) {
            this.selectedMultipleCell = false;
          }
          this.$set(this.tbodyData[rowIndex][header], 'active', false);
          this.removeClass(['rectangleSelection']);
          // left
          if (event.keyCode === 37) {
            const decrementHeader = Object.values(this.headerKeys)[colIndex - 1];
            if (decrementHeader) {
              this.$set(this.tbodyData[rowIndex][decrementHeader], 'active', true);
              if (dataType === 'select') { this.activeSelectSearch(event, rowIndex, colIndex, decrementHeader); }
              this.updateSelectedCell(decrementHeader, rowIndex, colIndex - 1);
            } else {
              this.$set(this.tbodyData[rowIndex][header], 'active', true);
              if (dataType === 'select') { this.activeSelectSearch(event, rowIndex, colIndex, header); }
              this.updateSelectedCell(header, rowIndex, colIndex);
            }
          }
          // top
          if (event.keyCode === 38) {
            if (rowIndex !== 0) {
              this.$set(this.tbodyData[rowIndex - 1][header], 'active', true);
              if (dataType === 'select') { this.activeSelectSearch(event, rowIndex - 1, colIndex, header); }
              this.updateSelectedCell(header, rowIndex - 1, colIndex);
            } else {
              this.$set(this.tbodyData[rowIndex][header], 'active', true);
              if (dataType === 'select') { this.activeSelectSearch(event, rowIndex, colIndex, header); }
              this.updateSelectedCell(header, rowIndex, colIndex);
            }
          }
          // right
          if (event.keyCode === 39) {
            const incrementHeader = Object.values(this.headerKeys)[colIndex + 1];
            if (incrementHeader) {
              this.$set(this.tbodyData[rowIndex][incrementHeader], 'active', true);
              if (dataType === 'select') { this.activeSelectSearch(event, rowIndex, colIndex, incrementHeader); }
              this.updateSelectedCell(incrementHeader, rowIndex, colIndex + 1);
            } else {
              this.$set(this.tbodyData[rowIndex][header], 'active', true);
              if (dataType === 'select') { this.activeSelectSearch(event, rowIndex, colIndex, header); }
              this.updateSelectedCell(header, rowIndex, colIndex);
            }
          }
          // bottom
          if (event.keyCode === 40) {
            if (rowIndex + 1 !== rowMax) {
              this.$set(this.tbodyData[rowIndex + 1][header], 'active', true);
              if (dataType === 'select') { this.activeSelectSearch(event, rowIndex + 1, colIndex, header); }
              this.updateSelectedCell(header, rowIndex + 1, colIndex);
            } else {
              this.$set(this.tbodyData[rowIndex][header], 'active', true);
              if (dataType === 'select') { this.activeSelectSearch(event, rowIndex, colIndex, header); }
              this.updateSelectedCell(header, rowIndex, colIndex);
            }
          }
        }
        // press backspace
        if (event.keyCode === 8 && !this.lastSelectOpen) {
          this.handleTbodyNavBackspace(rowIndex, colIndex, header);
        }
        // press enter
        if (event.keyCode === 13) {
          if (this.$refs[`input-${colIndex}-${rowIndex}`]) {
            this.tbodyData[rowIndex][header].show = true;
            this.$refs[`input-${colIndex}-${rowIndex}`][0].focus();
          }
          this.$emit('tbody-nav-enter', event, event.keyCode, this.actualElement, rowIndex, colIndex);
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
