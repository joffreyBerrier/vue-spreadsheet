// eslint-disable-next-line import/prefer-default-export
export const dragToFill = {
  data() {
    return {
      eventDrag: false,
    };
  },
  methods: {
    handleDownDragToFill(event, header, col, rowIndex) {
      this.storeCopyDatas = [];
      this.$set(this.tbodyData[rowIndex][header], "active", true);
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

      this.copyStoreData("drag");
    },
    handleMoveDragToFill(event, header, col, rowIndex, colIndex) {
      if (
        this.eventDrag === true &&
        this.selectedCoordCells &&
        this.selectedCoordCells.rowEnd !== rowIndex
      ) {
        this.selectedCoordCells.rowEnd = rowIndex;
        this.modifyMultipleCell("selected");
        this.$emit(
          "tbody-move-dragtofill",
          this.selectedCoordCells,
          header,
          col,
          rowIndex,
          colIndex
        );
      }
    },
    handleUpDragToFill(event, header, rowIndex, colIndex) {
      if (this.eventDrag === true && this.selectedCoordCells) {
        this.selectedCoordCells.rowEnd = rowIndex;
        this.pasteReplaceData();
        this.removeClass(["selected", "rectangleSelection", "active", "show"]);
        this.$emit("tbody-up-dragtofill", this.selectedCoordCells, header, rowIndex, colIndex);
        this.eventDrag = false;
        this.storeCopyDatas = [];
        this.selectedCoordCells = null;
      }
    },
  },
};
