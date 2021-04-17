// eslint-disable-next-line import/prefer-default-export
export const undo = {
  data() {
    return {
      storeUndoData: [],
    };
  },
  methods: {
    changeData(rowIndex, header) {
      const cell = this.value[rowIndex][header];

      this.storeUndoData.push({ rowIndex, header, cell });
      this.$emit("tbody-change-data", rowIndex, header);
    },
    rollBackUndo() {
      if (this.storeUndoData.length) {
        const lastEdit = this.storeUndoData.pop();
        const previousValue = this.value[lastEdit.rowIndex][lastEdit.header].value;

        this.value[lastEdit.rowIndex][lastEdit.header] = lastEdit.cell.duplicate;
        this.$emit("tbody-undo-data", lastEdit.rowIndex, lastEdit.header, previousValue);
      }
    },
    clearStoreUndo() {
      this.storeUndoData = [];
    },
  },
};
