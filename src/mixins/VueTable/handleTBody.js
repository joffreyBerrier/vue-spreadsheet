// eslint-disable-next-line import/prefer-default-export
export const handleTBody = {
  data() {
    return {
      oldTdActive: null,
      oldTdShow: null,
    };
  },
  methods: {
    bindClassActiveOnTd(header, rowIndex, colIndex) {
      this.removeClass(["active", "show"]);
      this.value[rowIndex][header].active = true;
      // stock oldTdActive in object
      this.oldTdActive = {
        key: header,
        row: rowIndex,
        col: colIndex,
      };
    },
    handleTBodyContextMenu(event, header, rowIndex, colIndex) {
      this.lastSubmenuOpen = {
        event,
        header,
        rowIndex,
        colIndex,
      };
    },
    handleTbodyTdClick(event, col, header, rowIndex, colIndex, type) {
      const column = col;

      if (this.selectedMultipleCell) {
        this.selectedMultipleCell = false;
      }

      if (!column.active) {
        if (!this.keys[16]) {
          this.removeClass(["selected", "rectangleSelection"]);
        }

        this.removeClass(["search"]);
        this.lastSelectOpen = null;
      }

      this.bindClassActiveOnTd(header, rowIndex, colIndex);

      this.updateSelectedCell(header, rowIndex, colIndex);

      this.enableSubmenu();

      if (this.oldTdShow && this.oldTdShow.col !== colIndex) {
        this.value[this.oldTdShow.row][this.oldTdShow.key].show = false;
      }

      if (type === "select" && column.handleSearch) {
        this.activeSelectSearch(event, rowIndex, colIndex, header);
      }
    },
    handleSearchInputSelect(event, searchValue, col, header, rowIndex, colIndex) {
      const disableSearch = !(searchValue === "" && event.keyCode === 8);

      if (
        (!this.keys.cmd || !this.keys.ctrl) &&
        disableSearch &&
        ![13, 16, 17, 27, 37, 38, 39, 40, 91].includes(event.keyCode)
      ) {
        if (this.lastSelectOpen) {
          this.$set(this.lastSelectOpen, "searchValue", searchValue);
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
          const currentData = this.value[rowIndex][header];

          this.$set(currentData, "search", true);
          this.$set(currentData, "show", true);

          this.showDropdown(colIndex, rowIndex);
        }

        this.incrementOption = 0;
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
        this.modifyMultipleCell("selected");

        // highlight row and column of selected cell
        this.highlightTdAndThead(rowIndex, colIndex);
      }
    },
    handleTbodyInputChange(event, header, rowIndex, colIndex) {
      // remove class show on input when it change
      if (this.oldTdShow) this.value[this.oldTdShow.row][this.oldTdShow.key].show = false;
      this.enableSubmenu();

      // callback
      this.$emit("tbody-input-change", event, header, rowIndex, colIndex);
      this.changeData(rowIndex, header);
    },
    handleTbodyInputKeydown(event, header, rowIndex, colIndex) {
      this.$emit("tbody-input-keydown", event, header, rowIndex, colIndex);
    },
    handleTbodyTdDoubleClick(event, header, col, rowIndex, colIndex) {
      if (col.handleSearch) return;

      // stock oldTdShow in object
      if (this.oldTdShow) {
        this.value[this.oldTdShow.row][this.oldTdShow.key].show = false;
      }

      // add class show on element
      this.$set(this.value[rowIndex][header], "show", true);
      event.currentTarget.lastElementChild.focus();

      this.oldTdShow = {
        key: header,
        row: rowIndex,
        col: colIndex,
      };

      this.enableSubmenu();
    },
  },
};
