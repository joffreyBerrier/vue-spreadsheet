import VSelect from "./VSelect.vue";

export default {
  name: "vue-tbody",
  components: {
    VSelect,
  },
  props: {
    tbodyHighlight: {
      type: Array,
      required: true,
    },
    filteredList: {
      type: Array,
      required: true,
    },
    headers: {
      type: Array,
      required: true,
    },
    currentTable: {
      type: Number,
      required: true,
    },
    tbodyData: {
      type: Array,
      required: true,
    },
    trad: {
      type: Object,
      required: true,
    },
    disableCells: {
      type: Array,
      required: false,
    },
    tbodyIndex: {
      type: Boolean,
      required: false,
    },
    tbodyCheckbox: {
      type: Boolean,
      required: false,
    },
    submenuStatusTbody: {
      type: Boolean,
      required: false,
    },
    submenuTbody: {
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      emptyCell: "",
      eventDrag: false,
      oldTooltipHover: {},
      oldValue: null,
      submenuEnableCol: null,
      submenuEnableRow: null,
      vuetableTooltip: {},
      vueTableComment: {},
    };
  },
  computed: {
    headerKeys() {
      return this.headers.map((x) => x.headerKey);
    },
  },
  methods: {
    checkedRow(row) {
      this.$emit("tbody-checked-row", row);
    },
    handleHoverTriangleComment(header, rowIndex) {
      if (!this.vueTableComment[rowIndex]) {
        this.$set(this.vueTableComment, rowIndex, header);
      }
    },
    handleOutTriangleComment() {
      this.vueTableComment = {};
    },
    handleHoverTooltip(header, rowIndex, colIndex, type) {
      if (this.$refs[`span-${this.currentTable}-${colIndex}-${rowIndex}`] && type !== "img") {
        const element = this.$refs[`span-${this.currentTable}-${colIndex}-${rowIndex}`][0];

        if (
          !this.vuetableTooltip[rowIndex] &&
          element &&
          element.scrollWidth > element.clientWidth
        ) {
          this.$set(this.vuetableTooltip, rowIndex, header);
        }
      }
    },
    handleOutTooltip() {
      this.vuetableTooltip = {};
      this.handleOutTriangleComment();
    },
    disabledEvent(col, header) {
      if (col.disabled === undefined) {
        return this.disableCells.some((x) => x === header);
      }

      return col.disabled;
    },
    escKeyup(col, rowIndex, header, colIndex, type) {
      if (!this.disabledEvent(col, header)) {
        this.$emit("tbody-handle-set-oldvalue", col, rowIndex, header, colIndex, type);
      }
    },
    // select
    tbodyOpenSelect(event, header, col, rowIndex, colIndex) {
      this.$emit("handle-to-open-select", event, header, col, rowIndex, colIndex);
    },
    tbodySelectChange(event, header, col, option, rowIndex, colIndex) {
      this.$emit("tbody-select-change", event, header, col, option, rowIndex, colIndex);
    },
    tbodySearchInputSelect(event, header, col, searchInput, rowIndex, colIndex) {
      this.$emit(
        "tbody-handle-search-input-select",
        event,
        searchInput,
        col,
        header,
        rowIndex,
        colIndex
      );
    },
    handleSelectMultipleCell(event, header, rowIndex, colIndex, type) {
      this.$emit("tbody-select-multiple-cell", event, header, rowIndex, colIndex, type);
    },
    handleDownDragToFill(event, header, col, rowIndex, colIndex) {
      if (!this.disabledEvent(col, header)) {
        this.eventDrag = true;
        this.$emit("tbody-down-dragtofill", event, header, col, rowIndex, colIndex);
      }
    },
    handleMoveDragToFill(event, header, col, rowIndex, colIndex) {
      if (this.eventDrag && !this.disabledEvent(col, header)) {
        this.$emit("tbody-move-dragtofill", event, header, col, rowIndex, colIndex);
      }
    },
    handleUpDragToFill(event, header, col, rowIndex, colIndex, type) {
      if (this.eventDrag && !this.disabledEvent(col, header)) {
        this.eventDrag = false;
        this.$emit("tbody-up-dragtofill", event, header, rowIndex, colIndex, type);
      }
    },
    handleClickTd(event, col, header, rowIndex, colIndex, type) {
      // this.searchInput = "";
      this.$emit("tbody-td-click", event, col, header, rowIndex, colIndex, type);
    },
    handleDoubleClickTd(event, header, col, rowIndex, colIndex) {
      if (!this.disabledEvent(col, header)) {
        this.$emit("tbody-td-double-click", event, header, col, rowIndex, colIndex);
      }
    },
    handleContextMenuTd(event, header, rowIndex, colIndex, type) {
      this.submenuEnableCol = colIndex;
      this.submenuEnableRow = rowIndex;
      this.$emit("submenu-enable", "tbody");
      this.$emit("tbody-td-context-menu", event, header, rowIndex, colIndex, type);
      this.$emit("handle-to-calculate-position", event, rowIndex, colIndex, "contextMenu");
    },
    inputHandleChange(event, header, rowIndex, colIndex) {
      this.$emit("tbody-input-change", event, header, rowIndex, colIndex);
    },
    handleClickSubmenu(event, header, rowIndex, colIndex, type, submenuFunction) {
      this.$emit(
        "tbody-submenu-click-callback",
        event,
        header,
        rowIndex,
        colIndex,
        type,
        submenuFunction
      );
    },
    autorizeOnlyNumericValue(e) {
      const k = e.which;

      if (k !== 8 && k !== 13 && k !== 27 && e.key !== "0" && !Number(e.key)) return true;

      return false;
    },
    inputHandleKeydow(event, header, rowIndex, colIndex) {
      if (this.tbodyData[rowIndex][header].numeric && this.autorizeOnlyNumericValue(event))
        event.preventDefault();

      this.$emit("tbody-input-keydown", event, header, rowIndex, colIndex);
    },
  },
};
