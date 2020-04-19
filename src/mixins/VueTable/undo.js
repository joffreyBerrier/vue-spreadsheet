// eslint-disable-next-line import/prefer-default-export
export const undo = {
  data() {
    return {
      changeDataIncrement: 0,
      storeUndoData: [],
    };
  },
  methods: {
    changeData(rowIndex, header) {
      const cell = this.tbodyData[rowIndex][header];

      this.changeDataIncrement += 1;
      this.storeUndoData.push({ rowIndex, header, cell });
      this.$emit("tbody-change-data", rowIndex, header);
    },
    rollBackUndo() {
      if (this.storeUndoData.length && this.changeDataIncrement > 0) {
        const index = this.changeDataIncrement - 1;
        const store = this.storeUndoData[index];

        this.$emit("tbody-undo-data", store.rowIndex, store.header);
        this.tbodyData[store.rowIndex][store.header] = store.cell.duplicate;
        this.storeUndoData.splice(index, 1);
        this.changeDataIncrement -= 1;
      }
    },
    clearStoreUndo() {
      this.changeDataIncrement = 0;
      this.storeUndoData = [];
    },
  },
};
