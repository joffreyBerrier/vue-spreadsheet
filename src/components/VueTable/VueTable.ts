import {
  Component,
  Vue,
  Watch,
  Prop,
} from 'vue-property-decorator';

import VueTableInterface from '@/components/VueTable/VueTableInterface';

const Fuse = require('fuse.js');

@Component({
  components: {
    VueThead: () => import('@/components/Thead/Thead.vue'),
    VueTbody: () => import('@/components/Tbody/Tbody.vue'),
  },
})

export default class VueTable extends Vue {
  name!: 'VueTable'

  $refs: any

  // Prop
  @Prop({ required: true }) headers!: VueTable.Header[]

  @Prop({ required: true }) tbodyData!: any[]

  @Prop({ required: true }) highlight!: VueTable.Highlight

  @Prop({ required: true }) customOptions!: VueTable.CustomOptions

  @Prop({ required: true }) styleWrapVueTable!: VueTable.StyleWrapVueTable

  @Prop({ required: true }) submenuThead!: VueTable.Submenu[]

  @Prop({ required: true }) disableSortThead!: VueTable.DisableSortThead[]

  @Prop({ required: true }) loading!: Boolean

  @Prop({ required: true }) selectPosition!: VueTable.SelectPosition

  @Prop({ required: true }) parentScrollElement!: VueTable.ParentScrollElement

  @Prop({ required: false }) disableCells!: VueTable.DisableCells[]

  @Prop({ required: true }) submenuTbody!: VueTable.Submenu[]

  // Data
  actualElement: any | null = null

  changeDataIncrement: number = 0

  copyMultipleCell: boolean | null = null

  disableKeyTimeout: number | null = null

  eventDrag: boolean = false

  headerTop: number = 0

  incrementCol: number | null = 0

  incrementOption: number | null = null

  incrementRow: number | null = null

  keys: any | null = {}

  lastSelectOpen: any | null = null

  lastSubmenuOpen: any | null = null

  oldTdActive: any | null = null

  oldTdShow: any | null = null

  pressedShift: number = 0

  rectangleSelectedCell: any | null = null

  scrollDocument: number | null = null

  scrollToSelectTimeout: number | null = null

  selectedCell: any | null = null

  selectedCoordCells: any | null = null

  selectedCoordCopyCells: any | null = null

  selectedMultipleCell: boolean = false

  selectedMultipleCellActive: boolean = false

  setFirstCell: boolean = false

  storeCopyDatas: any[] = []

  storeRectangleSelection: any[] = []

  storeUndoData: any[] = []

  submenuStatusTbody: boolean = false

  submenuStatusThead: boolean = false


  // Computed
  get colHeaderWidths() : number[] {
    return this.headers.map(x => parseInt(x.style.width, 10));
  }

  get filteredList() : VueTable.FilteredList[] {
    if (this.lastSelectOpen) {
      const { selectOptions } = this.lastSelectOpen.col;
      const { searchValue } = this.lastSelectOpen;
      const fuseSearch = new Fuse(selectOptions, this.customOptions.fuseOptions);
      if (searchValue && searchValue.length > 1) {
        return fuseSearch.search(searchValue);
      }
      return this.sorter(selectOptions);
    }
    return [];
  }

  get headerKeys() : any[] {
    return this.headers.map(header => header.headerKey);
  }

  // Watch
  @Watch('tbodyData') onTbodyDataChanged() {
    this.createdCell();
  }

  // Mounted
  mounted() {
    this.createdCell();
    window.addEventListener('keydown', this.moveKeydown);
    window.addEventListener('keyup', this.moveKeyup);
    document.addEventListener('copy', (event) => {
      if (this.actualElement) {
        event.preventDefault();
        this.storeCopyDatas = [];
        this.copyStoreData('copy');
      }
    });
    document.addEventListener('paste', (event) => {
      if (this.storeCopyDatas.length > 0) {
        event.preventDefault();
        this.pasteReplaceData();
      }
    });
    document.addEventListener('scroll', (event) => {
      this.scrollTopDocument(event);
    });
    // set property of triangle bg comment
    this.setPropertyStyleOfComment();
  }

  // Methods
  setPropertyStyleOfComment() {
    if (this.styleWrapVueTable.comment && this.styleWrapVueTable.comment.borderColor) {
      this.$refs.vueTable.style.setProperty('--borderCommentColor', this.styleWrapVueTable.comment.borderColor);
    }
    if (this.styleWrapVueTable.comment && this.styleWrapVueTable.comment.borderSize) {
      this.$refs.vueTable.style.setProperty('--borderCommentSize', this.styleWrapVueTable.comment.borderSize);
    }
    if (this.styleWrapVueTable.comment && this.styleWrapVueTable.comment.widthBox) {
      this.$refs.vueTable.style.setProperty('--boxCommentWidth', this.styleWrapVueTable.comment.widthBox);
    }
    if (this.styleWrapVueTable.comment && this.styleWrapVueTable.comment.heightBox) {
      this.$refs.vueTable.style.setProperty('--BoxCommentHeight', this.styleWrapVueTable.comment.heightBox);
    }
  }

  changeData(rowIndex: number, header: string) {
    const cell = this.tbodyData[rowIndex][header];
    this.changeDataIncrement += 1;
    this.storeUndoData.push({ rowIndex, header, cell });
    this.$emit('tbody-change-data', rowIndex, header);
  }

  rollBackUndo() {
    if (this.storeUndoData.length && this.changeDataIncrement > 0) {
      const index = this.changeDataIncrement - 1;
      const store = this.storeUndoData[index];

      this.$emit('tbody-undo-data', store.rowIndex, store.header);
      this.tbodyData[store.rowIndex][store.header] = store.cell.duplicate;
      this.storeUndoData.splice(index, 1);
      this.changeDataIncrement -= 1;
    }
  }

  clearStoreUndo() {
    this.changeDataIncrement = 0;
    this.storeUndoData = [];
  }

  sorter(options) : any[] {
    return options.sort((a, b) => {
      const productA = a.value;
      const productB = b.value;
      if (productA === undefined && productB) return 1;
      if (productA && productB === undefined) return -1;
      if (productA < productB) return -1;
      if (productA > productB) return 1;
      return 0;
    });
  }

  cleanPropertyOnCell(action: string) {
    if (this.storeRectangleSelection.length > 0) {
      this.storeRectangleSelection.forEach((cell) => {
        if (action === 'paste' && !cell.classList.value.includes('rectangleSelection') && !cell.classList.value.includes('copy')) {
          this.cleanProperty(cell);
        } else if (action === 'copy' && !cell.classList.value.includes('selected')) {
          this.cleanProperty(cell);
        }
      });
    }
  }

  cleanProperty(element: HTMLElement) {
    element.style.setProperty('--rectangleWidth', '100%');
    element.style.setProperty('--rectangleHeight', '40px');
    element.style.setProperty('--rectangleTop', '0');
    element.style.setProperty('--rectangleBottom', '0');
  }

  createdCell() {
    // create cell if isn't exist
    this.tbodyData.forEach((tbody, rowIndex) => {
      this.headerKeys.forEach((header) => {
        if (!tbody[header]) {
          const data = JSON.parse(JSON.stringify(this.customOptions.newData));
          this.$set(this.tbodyData[rowIndex], header, data);
        }
        const copy = JSON.parse(JSON.stringify(this.tbodyData[rowIndex][header]));
        this.$set(this.tbodyData[rowIndex][header], 'duplicate', copy);
      });
    });
  }

  disabledEvent(col: any, header: string) : boolean {
    if (col.disabled === undefined) {
      return !this.disableCells.find(x => x === header);
    } else if (col.disabled) {
      return !col.disabled;
    }
    return true;
  }

  scrollFunction(event: any) {
    this.affixHeader('vueTable');

    if (this.lastSelectOpen) {
      this.calculPosition(this.lastSelectOpen.event, this.lastSelectOpen.rowIndex, this.lastSelectOpen.colIndex, 'dropdown');
    } else if (this.lastSubmenuOpen) {
      this.calculPosition(this.lastSubmenuOpen.event, this.lastSubmenuOpen.rowIndex, this.lastSubmenuOpen.colIndex, 'contextMenu');
    }
  }

  scrollTopDocument(event: any) {
    this.affixHeader('document');

    if (this.lastSelectOpen) {
      this.calculPosition(event, this.lastSelectOpen.rowIndex, this.lastSelectOpen.colIndex, 'dropdown');
    } else if (this.lastSubmenuOpen) {
      this.calculPosition(event, this.lastSubmenuOpen.rowIndex, this.lastSubmenuOpen.colIndex, 'contextMenu');
    }
  }

  affixHeader(target: string) {
    if (this.$refs && this.$refs.table && this.$refs.table.offsetTop) {
      this.scrollDocument = document.querySelector(`${this.parentScrollElement.attribute}`).scrollTop;
      const offsetTopVueTable = this.$refs.table.offsetTop;
      const scrollOnDocument = this.scrollDocument || target === 'document';
      const offsetEl = scrollOnDocument ? this.scrollDocument : offset.target.scrollTop;

      if (offsetEl > offsetTopVueTable) {
        this.headerTop = scrollOnDocument ? (offsetEl - offsetTopVueTable) : (offsetEl - 18);
      } else {
        this.headerTop = 0;
      }
    }
  }

  updateSelectedCell(header: string, row: number, col: any) {
    if (!this.setFirstCell) {
      this.$set(this.tbodyData[row][header], 'rectangleSelection', true);
      this.setFirstCell = true;
    }
    this.selectedCell = {
      header,
      row,
      col,
    };
  }

  activeSelectSearch(event: any, rowIndex: number, colIndex: number) {
    this.calculPosition(event, rowIndex, colIndex, 'dropdown');
    if (this.$refs.vueTbody.$refs[`input-${colIndex}-${rowIndex}`][0]) {
      this.$refs.vueTbody.$refs[`input-${colIndex}-${rowIndex}`][0].focus();
    }
  }

  enableSelect(event: any, header: string, col: any, rowIndex: number, colIndex: number) {
    const currentElement = this.tbodyData[rowIndex][header];
    if (!col.search) {
      this.removeClass(['search', 'show']);
      this.lastSelectOpen = {
        col,
        colIndex,
        event,
        header,
        rowIndex,
      };

      this.$set(currentElement, 'search', true);
      this.$set(currentElement, 'show', true);

      this.$refs.vueTbody.$refs[`input-${colIndex}-${rowIndex}`][0].focus();
      this.calculPosition(event, rowIndex, colIndex, 'dropdown');

      if (currentElement.value !== '') {
        this.showDropdown(colIndex, rowIndex);
        const index = currentElement.selectOptions.map(x => x.value).indexOf(currentElement.value);
        this.incrementOption = index;
      } else {
        this.incrementOption = 0;
      }
    } else {
      this.$set(currentElement, 'search', false);
      this.$set(currentElement, 'show', false);
      this.lastSelectOpen = null;
    }
  }

  handleSearchInputSelect(event: any, searchValue, col: any, header: string, rowIndex: number, colIndex: number) {
    const disableSearch = !(searchValue === '' && event.keyCode === 8);

    if ((!this.keys.cmd || !this.keys.ctrl)
      && disableSearch
      && event.keyCode !== 13
      && event.keyCode !== 16
      && event.keyCode !== 17
      && event.keyCode !== 27
      && event.keyCode !== 37
      && event.keyCode !== 38
      && event.keyCode !== 39
      && event.keyCode !== 40
      && event.keyCode !== 91) {
      if (this.lastSelectOpen) {
        this.$set(this.lastSelectOpen, 'searchValue', searchValue);
      } else {
        this.lastSelectOpen = {
          event,
          header,
          col,
          rowIndex,
          colIndex,
          searchValue,
        };
      }

      // active class
      if (event.keyCode !== 8) {
        const currentData = this.tbodyData[rowIndex][header];
        this.$set(currentData, 'search', true);
        this.$set(currentData, 'show', true);

        this.showDropdown(colIndex, rowIndex);
      }
      this.incrementOption = 0;
    }
  }

  showDropdown(colIndex: number, rowIndex: number) {
    // clear timeout
    if (this.$refs.vueTbody.$refs[`dropdown-${colIndex}-${rowIndex}`]) {
      const dropdown = this.$refs.vueTbody.$refs[`dropdown-${colIndex}-${rowIndex}`][0];
      if (!this.scrollToSelectTimeout === null) {
        clearTimeout(this.scrollToSelectTimeout);
      }
      // set scrollTop on select
      this.scrollToSelectTimeout = setTimeout(() => {
        dropdown.scrollTop = 45 * this.incrementOption;
        this.scrollToSelectTimeout = null;
      }, 100);
    }
  }

  handleTbodySelectChange(event: any, header: string, col, option, rowIndex: number, colIndex: number) {
    const currentData = this.tbodyData[rowIndex][header];
    currentData.selectOptions.forEach((selectOption) => {
      const sOption = selectOption;
      sOption.active = false;
    });
    currentData.selectOptions.find(x => x.value === option.value).active = true;

    this.$set(currentData, 'search', false);
    this.$set(currentData, 'show', false);
    this.$set(currentData, 'value', option.value);

    this.lastSelectOpen = null;
    // remove class show on select when it change
    if (this.oldTdShow) this.tbodyData[this.oldTdShow.row][this.oldTdShow.key].show = false;
    this.enableSubmenu(null);
    // callback
    this.$emit('tbody-select-change', event, header, col, option, rowIndex, colIndex);
    this.changeData(rowIndex, header);
  }

  calculPosition(event: any, rowIndex: number, colIndex: number, header: string) {
    // stock scrollLeft / scrollTop position of parent
    const { scrollLeft } = this.$refs.vueTable;
    const { scrollTop } = this.$refs.vueTable;

    // get offsetTop of firstCell
    const firstCellOffsetTop = this.$refs.vueTbody.$refs['td-0-0'][0].offsetTop;
    // stock $el
    const el = this.$refs.vueTbody.$refs[`td-${colIndex}-${rowIndex}`][0];
    // stock height Of VueTable
    const realHeightTable = this.$refs.vueTable.offsetHeight;
    // stock size / offsetTop / offsetLeft of the element
    const width = el.offsetWidth;
    // stock heightOfScrollbar(40) cell(40) dropdown(140)
    const heightOfScrollbarCellDropdown = 180;

    let top = ((el.offsetTop - scrollTop) + 40) - this.parentScrollElement.positionTop;
    let left = el.offsetLeft - scrollLeft;

    if (this.selectPosition) {
      top = (((el.offsetTop - scrollTop) + 40) + this.selectPosition.top) - this.parentScrollElement.positionTop;
      left = (el.offsetLeft - scrollLeft) + this.selectPosition.left;
    }

    // subtracted top of scroll top document
    if (this.scrollDocument) {
      top = (((el.offsetTop - scrollTop) + 40) - this.parentScrollElement.positionTop) - this.scrollDocument;
    }

    // set size / top position / left position
    const currentSelect = this.$refs.vueTbody.$refs[`${header}-${colIndex}-${rowIndex}`];
    if (currentSelect && currentSelect.length > 0) {
      currentSelect[0].style.setProperty('--selectWidth', `${width}px`);
      currentSelect[0].style.setProperty('--selectLeft', `${left}px`);

      if ((realHeightTable + firstCellOffsetTop) < (el.offsetTop + 250)) {
        currentSelect[0].style.setProperty('--selectTop', `${top - heightOfScrollbarCellDropdown}px`);
      } else {
        currentSelect[0].style.setProperty('--selectTop', `${top}px`);
      }
    }
  }

  setOldValueOnInputSelect(col, rowIndex: number, header: string, colIndex: number, type) {
    const column = col;
    column.show = false;
    this.$set(this.tbodyData[rowIndex][header], 'value', this.tbodyData[rowIndex][header].value);
    if (type === 'select') {
      column.search = false;
    }
  }

  handleUpDragSizeHeader(event: any, headers) {
    this.$emit('handle-up-drag-size-header', event, headers);
  }

  enableSubmenu(target: string) {
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
  }

  bindClassActiveOnTd(header: string, rowIndex: number, colIndex: number) {
    this.removeClass(['active', 'show']);
    this.tbodyData[rowIndex][header].active = true;
    // stock oldTdActive in object
    this.oldTdActive = {
      key: header,
      row: rowIndex,
      col: colIndex,
    };
  }

  removeClass(params: any[]) {
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
  }

  // Copy / Paste
  copyStoreData(params: string) {
    const tbodyData = JSON.parse(JSON.stringify(this.tbodyData));
    this.removeClass(['stateCopy']);

    if (this.selectedCoordCells && this.selectedMultipleCell && params === 'copy') {
      if (this.selectedCell.row !== this.selectedCoordCells.rowEnd || this.selectedCell.col !== this.selectedCoordCells.colEnd) {
        this.selectedCell.row = this.selectedCoordCells.rowEnd;
        this.selectedCell.col = this.selectedCoordCells.colEnd;
      }
    }

    if (this.selectedCoordCells
      && this.selectedCell.col === this.selectedCoordCells.colEnd
      && this.selectedCell.row === this.selectedCoordCells.rowEnd
      && params === 'copy') {
      this.selectedCoordCopyCells = this.selectedCoordCells;
    } else {
      this.selectedCoordCopyCells = null;
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
        this.cleanPropertyOnCell('copy');
      }

      while (rowMin <= rowMax) {
        // remove stateCopy if present of storeData
        const copyData = tbodyData[rowMin][this.headerKeys[colMin]];
        copyData.active = false;
        copyData.selected = false;
        copyData.stateCopy = false;

        storeData[this.headerKeys[colMin]] = copyData;
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
        this.cleanPropertyOnCell('copy');
        this.$set(this.tbodyData[this.selectedCell.row][this.selectedCell.header], 'stateCopy', true);
      } else {
        this.storeCopyDatas = [];
      }
      // remove stateCopy if present of storeData
      const copyData = tbodyData[this.selectedCell.row][this.selectedCell.header];
      copyData.active = false;
      copyData.selected = false;
      copyData.stateCopy = false;
      this.storeCopyDatas.push(copyData);
      this.copyMultipleCell = false;
    }
  }

  pasteReplaceData() {
    const maxRow = this.tbodyData.length;
    this.cleanPropertyOnCell('paste');

    // copy / paste one cell || disable on disabled cell
    if (this.storeCopyDatas[0].value && !this.copyMultipleCell && !this.selectedMultipleCell && !this.eventDrag && this.disabledEvent(this.selectedCell.col, this.selectedCell.header)) {
      const { duplicate } = this.tbodyData[this.selectedCell.row][this.selectedCell.header];
      this.storeCopyDatas[0].duplicate = duplicate;
      this.storeCopyDatas[0].active = true;

      // create newCopyData
      const newCopyData = JSON.parse(JSON.stringify(this.storeCopyDatas));
      [this.tbodyData[this.selectedCell.row][this.selectedCell.header]] = newCopyData;

      // callback changeData
      this.changeData(this.selectedCell.row, this.selectedCell.header);
      // disable on disabled cell
    } else if (this.disabledEvent(this.selectedCell.col, this.selectedCell.header) && this.selectedCoordCells) {
      // if paste in multiple selection
      const conditionPasteToMultipleSelection = this.selectedCoordCopyCells !== null && this.selectedCoordCells !== this.selectedCoordCopyCells;

      // new paste data
      const conditionRowToMultiplePasteRow = this.storeCopyDatas.length === 1
        && !this.storeCopyDatas[0].type
        && this.selectedCoordCopyCells !== null
        && Object.values(this.storeCopyDatas[0]).length > 1
        && this.selectedCoordCells.rowStart < this.selectedCoordCells.rowEnd;

      // copy / paste multiple cell | drag to fill one / multiple cell
      let rowMin = Math.min(this.selectedCoordCells.rowStart, this.selectedCoordCells.rowEnd);
      let rowMax = Math.max(this.selectedCoordCells.rowStart, this.selectedCoordCells.rowEnd);
      let colMin = Math.min(this.selectedCoordCells.colStart, this.selectedCoordCells.colEnd);
      let colMax = Math.max(this.selectedCoordCells.colStart, this.selectedCoordCells.colEnd);

      if (conditionPasteToMultipleSelection) {
        rowMin = Math.min(this.selectedCoordCopyCells.rowStart, this.selectedCoordCopyCells.rowEnd);
        rowMax = Math.max(this.selectedCoordCopyCells.rowStart, this.selectedCoordCopyCells.rowEnd);
      }

      if (conditionRowToMultiplePasteRow) {
        rowMin = Math.min(this.selectedCoordCells.rowStart, this.selectedCoordCells.rowEnd);
        rowMax = Math.max(this.selectedCoordCells.rowStart, this.selectedCoordCells.rowEnd);
      }

      if (conditionPasteToMultipleSelection || conditionRowToMultiplePasteRow) {
        colMin = Math.min(this.selectedCoordCopyCells.colStart, this.selectedCoordCopyCells.colEnd);
        colMax = Math.max(this.selectedCoordCopyCells.colStart, this.selectedCoordCopyCells.colEnd);
      }

      let row = 0;
      let col = 0;

      while (rowMin <= rowMax) {
        const header = this.headerKeys[colMin];
        const newCopyData = JSON.parse(JSON.stringify(this.storeCopyDatas));

        if (this.eventDrag) { // Drag To Fill
          const { duplicate } = this.tbodyData[rowMin][header];
          if (newCopyData[0][header]) {
            newCopyData[0][header].duplicate = duplicate;
            this.tbodyData[rowMin][header] = newCopyData[0][header]; // multiple cell
          } else {
            newCopyData[0].duplicate = duplicate;
            [this.tbodyData[rowMin][header]] = newCopyData; // one cell
          }
          this.changeData(rowMin, header);
        } else {
          let incrementRow = this.selectedCell.row + row;
          let incrementCol = this.selectedCell.col + col;

          if (this.selectedCoordCells !== this.selectedCoordCopyCells) {
            incrementRow = this.selectedCoordCells.rowStart + row;
            incrementCol = this.selectedCoordCells.colStart + col;
          }

          let currentHeader = this.headerKeys[incrementCol];

          // multiple col to multiple col
          const colsToCols = Object.values(newCopyData[0]).length === 1;
          if (colsToCols) {
            currentHeader = this.headerKeys[this.selectedCell.col];
            if (incrementRow < maxRow) {
              this.replacePasteData(col, header, incrementRow, currentHeader);
              col += 1;
            }
          }

          // one cell to multipleCell
          const cellToCells = newCopyData.length === 1 && Object.values(newCopyData).length === 1 && newCopyData[0].type;
          if (cellToCells) {
            currentHeader = this.selectedCell.header;
            newCopyData[0].duplicate = this.tbodyData[rowMin][currentHeader].duplicate;
            [this.tbodyData[rowMin][currentHeader]] = newCopyData;
            this.changeData(rowMin, currentHeader);
          }

          // 1 row to 1 row
          const rowToRow = newCopyData.length === 1 && Object.values(newCopyData[0]).length > 1 && !newCopyData[0].type && this.selectedCoordCells.rowStart === this.selectedCoordCells.rowEnd;
          if (rowToRow) {
            this.replacePasteData(0, header, this.selectedCell.row, currentHeader);
            col += 1;
          }

          // 1 row & multiple cols => to multiple row & cols
          const rowColsToRowsCols = newCopyData.length === 1
            && Object.values(newCopyData[0]).length > 1
            && this.selectedCoordCells.rowStart < this.selectedCoordCells.rowEnd
            && this.selectedCoordCells.colStart !== this.selectedCoordCells.colEnd;
          if (rowColsToRowsCols) {
            this.replacePasteData(0, header, incrementRow, currentHeader);
            if (colMin < colMax) {
              col += 1;
            } else {
              col = 0;
            }
          }

          // multiple col / row to multiple col / row
          const rowsColsToRowsCols = newCopyData.length > 1 && Object.values(newCopyData[0]).length > 1;
          if (rowsColsToRowsCols) {
            if (this.tbodyData[incrementRow] && this.tbodyData[incrementRow][currentHeader]) {
              newCopyData[row][header].duplicate = this.tbodyData[incrementRow][currentHeader].duplicate;
            }
            this.replacePasteData(row, header, incrementRow, currentHeader);
            if (colMin < colMax) {
              col += 1;
            } else {
              col = 0;
            }
          }

          // add active / selected status on firstCell
          this.tbodyData[this.selectedCell.row][this.selectedCell.header].selected = true;
          this.tbodyData[this.selectedCell.row][this.selectedCell.header].active = true;
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
      this.modifyMultipleCell(null);
    }
  }

  replacePasteData(col: any, header: string, incrementRow: number, currentHeader: string) {
    const newCopyData = JSON.parse(JSON.stringify(this.storeCopyDatas));
    if (this.tbodyData[incrementRow] && this.tbodyData[incrementRow][currentHeader]) {
      newCopyData[col][header].duplicate = this.tbodyData[incrementRow][currentHeader].duplicate;
      this.tbodyData[incrementRow][currentHeader] = newCopyData[col][header];
      this.changeData(incrementRow, currentHeader);
    }
  }

  modifyMultipleCell(params: string) {
    let rowMin = Math.min(this.selectedCoordCells.rowStart, this.selectedCoordCells.rowEnd);
    const rowMax = Math.max(this.selectedCoordCells.rowStart, this.selectedCoordCells.rowEnd);
    let colMin = Math.min(this.selectedCoordCells.colStart, this.selectedCoordCells.colEnd);
    const colMax = Math.max(this.selectedCoordCells.colStart, this.selectedCoordCells.colEnd);

    while (rowMin <= rowMax) {
      const header = this.headerKeys[colMin];
      // disable on disabled cell
      if (params === 'removeValue' && this.disabledEvent(this.tbodyData[rowMin][header], header)) {
        this.$emit('tbody-nav-backspace', rowMin, colMin, header, this.tbodyData[rowMin][header]);
        this.changeData(rowMin, header);
        this.$set(this.tbodyData[rowMin][header], 'value', '');
        this.$set(this.tbodyData[rowMin][header], 'selected', false);
      }
      if (params === 'selected') {
        this.$set(this.tbodyData[rowMin][header], 'selected', true);
        this.selectedMultipleCellActive = true;
        if (colMin === colMax && rowMin === rowMax) {
          // add active on the last cell
          this.removeClass(['active']);
          this.$set(this.tbodyData[rowMin][header], 'active', true);
        }
      }
      colMin += 1;
      if (colMin > colMax) {
        colMin = Math.min(this.selectedCoordCells.colStart, this.selectedCoordCells.colEnd);
        rowMin += 1;
      }
    }

    // Set height / width of rectangle
    this.setRectangleSelection(colMin, colMax, rowMin, rowMax);
  }

  setRectangleSelection(colMin: number, colMax: number, rowMin: number, rowMax: number) {
    let width = 100;
    let height = 40;

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

    if (this.$refs.vueTbody && this.$refs.vueTbody.$refs) {
      [this.rectangleSelectedCell] = this.$refs.vueTbody.$refs[`td-${this.selectedCoordCells.colStart}-${this.selectedCoordCells.rowStart}`];

      if (!this.selectedMultipleCellActive) {
        [this.rectangleSelectedCell] = this.$refs.vueTbody.$refs[`td-${this.selectedCell.col}-${this.selectedCell.row}`];
      }
    }

    this.rectangleSelectedCell.style.setProperty('--rectangleWidth', `${width + 1}%`);
    this.rectangleSelectedCell.style.setProperty('--rectangleHeight', `${height}px`);

    // Position bottom/top of rectangle if rowStart >= rowEnd
    if (this.selectedCoordCells.rowStart >= this.selectedCoordCells.rowEnd) {
      this.rectangleSelectedCell.style.setProperty('--rectangleTop', 'auto');
      this.rectangleSelectedCell.style.setProperty('--rectangleBottom', 0);
    } else {
      this.rectangleSelectedCell.style.setProperty('--rectangleTop', 0);
      this.rectangleSelectedCell.style.setProperty('--rectangleBottom', 'auto');
    }
    // Position left/right of rectangle if colStart >= colEnd
    if (this.selectedCoordCells.colStart >= this.selectedCoordCells.colEnd) {
      this.rectangleSelectedCell.style.setProperty('--rectangleLeft', 'auto');
      this.rectangleSelectedCell.style.setProperty('--rectangleRight', 0);
    } else {
      this.rectangleSelectedCell.style.setProperty('--rectangleLeft', 0);
    }

    if (!this.storeRectangleSelection.includes(this.rectangleSelectedCell)) {
      this.storeRectangleSelection.push(this.rectangleSelectedCell);
    }
  }

  // drag To Fill
  handleDownDragToFill(event: any, header: string, col: any, rowIndex: number) {
    this.storeCopyDatas = [];
    this.$set(this.tbodyData[rowIndex][header], 'active', true);
    this.eventDrag = true;
    if (!this.selectedCoordCells && !this.selectedMultipleCell) {
      this.selectedCoordCells = {
        rowStart: this.selectedCell.row,
        colStart: this.selectedCell.col,
        keyStart: this.selectedCell.header,
        rowEnd: rowIndex,
        colEnd: this.selectedCell.col,
        keyEnd: this.selectedCell.header,
      };
    } else if (this.selectedMultipleCell) {
      // if drag col to col in row to row to row
      this.selectedCoordCells.rowStart = rowIndex;
    } else {
      this.selectedCoordCells = {
        rowStart: this.selectedCell.row,
        colStart: this.selectedCell.col,
        keyStart: this.selectedCell.header,
        rowEnd: rowIndex,
        colEnd: this.selectedCell.col,
        keyEnd: this.selectedCell.header,
      };
    }
    this.copyStoreData('drag');
  }

  handleMoveDragToFill(event: any, header: string, col: any, rowIndex: number, colIndex: number) {
    if (this.eventDrag === true && this.selectedCoordCells && this.selectedCoordCells.rowEnd !== rowIndex) {
      this.selectedCoordCells.rowEnd = rowIndex;
      this.modifyMultipleCell('selected');
      this.$emit('tbody-move-dragtofill', this.selectedCoordCells, header, col, rowIndex, colIndex);
    }
  }

  handleUpDragToFill(event: any, header: string, rowIndex: number, colIndex: number) {
    if (this.eventDrag === true && this.selectedCoordCells) {
      this.selectedCoordCells.rowEnd = rowIndex;
      this.pasteReplaceData();
      this.removeClass(['selected', 'rectangleSelection', 'active', 'show']);
      this.$emit('tbody-up-dragtofill', this.selectedCoordCells, header, rowIndex, colIndex);
      this.eventDrag = false;
      this.storeCopyDatas = [];
      this.selectedCoordCells = null;
    }
  }

  // On click on td
  handleTbodyTdClick(event: any, col: any, header: string, rowIndex: number, colIndex: number, type: string) {
    const column = col;

    if (this.selectedMultipleCell) {
      this.selectedMultipleCell = false;
    }
    this.highlight = {
      tbodyHighlight: {},
      theadHighlight: {},
    }
    this.highlight.tbodyHighlight[rowIndex] = true;
    this.highlight.theadHighlight[colIndex] = true;

    if (!column.active) {
      if (!this.keys[16]) {
        this.removeClass(['selected', 'rectangleSelection']);
      }
      this.removeClass(['search']);
      this.lastSelectOpen = null;
    }
    this.bindClassActiveOnTd(header, rowIndex, colIndex);

    this.updateSelectedCell(header, rowIndex, colIndex);

    this.enableSubmenu(null);
    if (this.oldTdShow && this.oldTdShow.col !== colIndex) {
      this.tbodyData[this.oldTdShow.row][this.oldTdShow.key].show = false;
    }

    if (type === 'select' && column.handleSearch) {
      this.activeSelectSearch(event, rowIndex, colIndex);
    }
  }

  handleSelectMultipleCell(event: any, header: string, rowIndex: number, colIndex: number) {
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

      this.highlight = {
        tbodyHighlight: {},
        theadHighlight: {},
      }
      let listRow = [];
      for (let i = this.selectedCell.row; i <= rowIndex; i++) {
        listRow.push(i);
      }
      listRow.forEach(x => this.highlight.tbodyHighlight[x] = true);

      let listCol = []
      for (let i = this.selectedCell.col; i <= colIndex; i++) {
        listCol.push(i);
      }
      listCol.forEach(x => this.highlight.theadHighlight[x] = true);
      // Add active on selectedCoordCells selected
      this.modifyMultipleCell('selected');
    }
  }

  handleTbodyTdDoubleClick(event: any, header: string, col, rowIndex: number, colIndex: number) {
    // stock oldTdShow in object
    if (this.oldTdShow) this.tbodyData[this.oldTdShow.row][this.oldTdShow.key].show = false;

    // add class show on element
    this.tbodyData[rowIndex][header].show = true;

    this.oldTdShow = {
      key: header,
      row: rowIndex,
      col: colIndex,
    };

    this.enableSubmenu(null);
  }

  handleTbodyNav() {
    this.enableSubmenu(null);
  }

  handleTbodyNavEnter() {
    this.enableSubmenu(null);
  }

  handleTbodyNavBackspace(rowIndex: number, colIndex: number, header: string) {
    if (this.selectedMultipleCell) {
      this.modifyMultipleCell('removeValue');
    } else {
      this.$emit('tbody-nav-backspace', rowIndex, colIndex, header, this.tbodyData[rowIndex][header]);
      this.changeData(rowIndex, header);
      this.tbodyData[rowIndex][header].value = '';
    }
  }

  handleTbodyInputChange(event: any, header: string, rowIndex: number, colIndex: number) {
    // remove class show on input when it change
    if (this.oldTdShow) this.tbodyData[this.oldTdShow.row][this.oldTdShow.key].show = false;
    this.enableSubmenu(null);

    // callback
    this.$emit('tbody-input-change', event, header, rowIndex, colIndex);
    this.changeData(rowIndex, header);
  }

  // callback
  callbackSort(event: any, header: string, colIndex: number) {
    this.$emit('thead-td-sort', event, header, colIndex);
  }

  callbackSubmenuThead(event, header: string, colIndex: number, submenuFunction: any, selectOptions: any) {
    this.submenuStatusThead = false;
    if (selectOptions) {
      this.$emit(`thead-submenu-click-${submenuFunction}`, event, header, colIndex, selectOptions);
    } else {
      this.$emit(`thead-submenu-click-${submenuFunction}`, event, header, colIndex);
    }
  }

  callbackSubmenuTbody(event, header: string, rowIndex: number, colIndex: number, type: string, submenuFunction: any) {
    this.calculPosition(event, rowIndex, colIndex, 'submenu');
    this.$emit(`tbody-submenu-click-${submenuFunction}`, event, header, rowIndex, colIndex, type, submenuFunction);
  }

  handleTBodyContextMenu(event: any, header: string, rowIndex: number, colIndex: number) {
    this.lastSubmenuOpen = {
      event,
      header,
      rowIndex,
      colIndex,
    };
  }

  // thead
  handleTheadContextMenu() {
    this.submenuStatusTbody = false;
  }

  moveOnSelect(event: any) {
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
    }
  }

  moveOnTable(event: any, colIndex: number, rowIndex: number) {
    const { vueTable } = this.$refs;
    const maxCol = Math.max(...this.colHeaderWidths);
    // get the correct height of visible table
    if (vueTable) {
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
    }
  }

  pressShiftMultipleCell(event: any, h: string, rowMax: number, rowIndex: number, colMax, colIndex: number) {
    event.preventDefault();
    let header = h;
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
  }

  moveKeyup(event: any) {
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
  }

  moveKeydown(event: any) {
    [this.actualElement] = document.getElementsByClassName('active_td');

    if (event.keyCode === 16) {
      this.keys[event.keyCode] = true;
    }

    if (event.keyCode === 91 || event.keyCode === 17) {
      this.keys.cmd = true;
      this.keys.ctrl = true;
    }

    if ((this.keys.cmd && event.keyCode === 90) || (this.keys.ctrl && event.keyCode === 90)) {
      this.rollBackUndo();
    }

    if (this.lastSelectOpen) {
      this.moveOnSelect(event);
    }

    if (this.actualElement
      && (event.keyCode === 37
      || event.keyCode === 39
      || event.keyCode === 40
      || event.keyCode === 38
      || event.keyCode === 13
      || event.keyCode === 27
      || event.keyCode === 8)) {
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
            if (dataType === 'select') { this.activeSelectSearch(event, rowIndex, colIndex); }
            this.updateSelectedCell(decrementHeader, rowIndex, colIndex - 1);
          } else {
            this.$set(this.tbodyData[rowIndex][header], 'active', true);
            if (dataType === 'select') { this.activeSelectSearch(event, rowIndex, colIndex); }
            this.updateSelectedCell(header, rowIndex, colIndex);
          }
        }
        // top
        if (event.keyCode === 38) {
          if (rowIndex !== 0) {
            this.$set(this.tbodyData[rowIndex - 1][header], 'active', true);
            if (dataType === 'select') { this.activeSelectSearch(event, rowIndex - 1, colIndex); }
            this.updateSelectedCell(header, rowIndex - 1, colIndex);
          } else {
            this.$set(this.tbodyData[rowIndex][header], 'active', true);
            if (dataType === 'select') { this.activeSelectSearch(event, rowIndex, colIndex); }
            this.updateSelectedCell(header, rowIndex, colIndex);
          }
        }
        // right
        if (event.keyCode === 39) {
          const incrementHeader = Object.values(this.headerKeys)[colIndex + 1];
          if (incrementHeader) {
            this.$set(this.tbodyData[rowIndex][incrementHeader], 'active', true);
            if (dataType === 'select') { this.activeSelectSearch(event, rowIndex, colIndex); }
            this.updateSelectedCell(incrementHeader, rowIndex, colIndex + 1);
          } else {
            this.$set(this.tbodyData[rowIndex][header], 'active', true);
            if (dataType === 'select') { this.activeSelectSearch(event, rowIndex, colIndex); }
            this.updateSelectedCell(header, rowIndex, colIndex);
          }
        }
        // bottom
        if (event.keyCode === 40) {
          if (rowIndex + 1 !== rowMax) {
            this.$set(this.tbodyData[rowIndex + 1][header], 'active', true);
            if (dataType === 'select') { this.activeSelectSearch(event, rowIndex + 1, colIndex); }
            this.updateSelectedCell(header, rowIndex + 1, colIndex);
          } else {
            this.$set(this.tbodyData[rowIndex][header], 'active', true);
            if (dataType === 'select') { this.activeSelectSearch(event, rowIndex, colIndex); }
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
        this.storeCopyDatas = [];
        this.removeClass(['stateCopy']);
      }
    }
  }
}
