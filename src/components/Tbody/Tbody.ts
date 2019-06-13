import {
  Component,
  Vue,
  Watch,
  Prop,
} from 'vue-property-decorator';

import VueTableInterface from '@/components/VueTable/VueTableInterface';
import TbodyInterface from '@/components/Tbody/TbodyInterface';

@Component
export default class VueTbody extends Vue {
  name!: 'VueTbody'

  // Prop
  @Prop({ required: true }) filteredList!: VueTable.FilteredList[]

  @Prop({ required: true }) headers!: VueTable.Header[]

  @Prop({ required: true }) tbodyData!: any[]

  @Prop({ required: true }) trad!: Tbody.Trad

  @Prop({ required: true }) disableCells!: VueTable.DisableCells[]

  @Prop({ required: true }) tbodyIndex!: boolean

  @Prop({ required: true }) submenuStatusTbody!: boolean

  @Prop({ required: true }) submenuTbody!: VueTable.Submenu[]

  // Data
  eventDrag: boolean = false

  searchInput: string = ''

  submenuEnableCol: number | null = null

  submenuEnableRow: number | null = null

  vueTableComment: any = {}

  vuetableTooltip: any = {}

  // Computed
  get headerKeys() : any[] {
    return this.headers.map(x => x.headerKey);
  }

  // Methods
  handleHoverTriangleComment(header: string, rowIndex: number) {
    if (!this.vueTableComment[rowIndex]) {
      this.$set(this.vueTableComment, rowIndex, header);
    }
  }

  handleOutTriangleComment() {
    this.vueTableComment = {};
  }

  handleHoverTooltip(header: string, rowIndex: number, colIndex: number, type: string) {
    if (this.$refs[`span-${colIndex}-${rowIndex}`] && type !== 'img') {
      const element = this.$refs[`span-${colIndex}-${rowIndex}`][0];
      if (!this.vuetableTooltip[rowIndex] && element && (element.scrollWidth > element.clientWidth)) {
        this.$set(this.vuetableTooltip, rowIndex, header);
      }
    }
  }

  handleOutTooltip() {
    this.vuetableTooltip = {};
  }

  disabledEvent(col: any, header: string) : boolean {
    if (col.disabled === undefined) {
      return !this.disableCells.find(x => x === header);
    } else if (col.disabled) {
      return !col.disabled;
    }
    return true;
  }

  enableSelect(event: any, header: string, col: any, rowIndex: number, colIndex: number) {
    if (this.disabledEvent(col, header)) {
      this.searchInput = '';
      this.$emit('handle-to-open-select', event, header, col, rowIndex, colIndex);
    }
  }

  escKeyup(col: any, rowIndex: number, header: string, colIndex: number, type: string) {
    if (this.disabledEvent(col, header)) {
      this.$emit('tbody-handle-set-oldvalue', col, rowIndex, header, colIndex, type);
    }
  }

  handleSelectMultipleCell(event: any, header: string, rowIndex: number, colIndex: number, type: string) {
    this.$emit('tbody-select-multiple-cell', event, header, rowIndex, colIndex, type);
  }

  handleDownDragToFill(event: any, header: string, col: any, rowIndex: number, colIndex: number) {
    if (this.disabledEvent(col, header)) {
      this.eventDrag = true;
      this.$emit('tbody-down-dragtofill', event, header, col, rowIndex, colIndex);
    }
  }

  handleMoveDragToFill(event: any, header: string, col: any, rowIndex: number, colIndex: number) {
    if (this.eventDrag && this.disabledEvent(col, header)) {
      this.$emit('tbody-move-dragtofill', event, header, col, rowIndex, colIndex);
    }
  }

  handleUpDragToFill(event: any, header: string, col: any, rowIndex: number, colIndex: number, type: string) {
    if (this.eventDrag && this.disabledEvent(col, header)) {
      this.eventDrag = false;
      this.$emit('tbody-up-dragtofill', event, header, rowIndex, colIndex, type);
    }
  }

  handleClickTd(event: any, col: any, header: string, rowIndex: number, colIndex: number, type: string) {
    this.searchInput = '';
    this.$emit('tbody-td-click', event, col, header, rowIndex, colIndex, type);
  }

  handleDoubleClickTd(event: any, header: string, col: any, rowIndex: number, colIndex: number, type: string) {
    if (this.disabledEvent(col, header)) {
      if (type === 'input') {
        this.$refs[`input-${colIndex}-${rowIndex}`][0].focus();
      }
      this.$emit('tbody-td-double-click', event, header, col, rowIndex, colIndex);
    }
  }

  handleContextMenuTd(event: any, header: string, rowIndex: number, colIndex: number, type: string) {
    this.submenuEnableCol = colIndex;
    this.submenuEnableRow = rowIndex;
    this.$emit('handle-to-calculate-position', event, rowIndex, colIndex, 'contextMenu');
    this.$emit('submenu-enable', 'tbody');
    this.$emit('tbody-td-context-menu', event, header, rowIndex, colIndex, type);
  }

  inputHandleChange(event: any, header: string, rowIndex: number, colIndex: number) {
    this.$emit('tbody-input-change', event, header, rowIndex, colIndex);
  }

  validSearch(event: any, header: string, col: any, option, rowIndex: number, colIndex: number) {
    this.$emit('tbody-select-change', event, header, col, option, rowIndex, colIndex);
  }

  selectHandleChange(event: any, header: string, col: any, option, rowIndex: number, colIndex: number) {
    this.$emit('tbody-select-change', event, header, col, option, rowIndex, colIndex);
  }

  handleSearchInputSelect(event: any, col: any, header: string, rowIndex: number, colIndex: number) {
    if (this.disabledEvent(col, header)) {
      this.$emit('tbody-handle-search-input-select', event, this.searchInput, col, header, rowIndex, colIndex);
    }
  }

  handleClickSubmenu(event: any, header: string, rowIndex: number, colIndex: number, type: string, submenuFunction: void) {
    this.$emit('tbody-submenu-click-callback', event, header, rowIndex, colIndex, type, submenuFunction);
  }
}
