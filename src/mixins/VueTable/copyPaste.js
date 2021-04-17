const lodashClonedeep = require("lodash.clonedeep");

// eslint-disable-next-line import/prefer-default-export
export const copyPaste = {
  data() {
    return {
      storeCopyDatas: [],
      storeRectangleSelection: [],
      rectangleSelectedCell: null,
      selectedCoordCopyCells: null,
      selectedCoordCells: null,
    };
  },
  mounted() {
    document.addEventListener("copy", (event) => {
      if (this.actualElement) {
        event.preventDefault();
        this.storeCopyDatas = [];
        this.copyStoreData("copy");
      }
    });
    document.addEventListener("paste", (event) => {
      if (this.storeCopyDatas.length > 0) {
        event.preventDefault();
        this.pasteReplaceData();
      }
    });
  },
  methods: {
    disabledEvent(cell, header) {
      if (cell.disabled === undefined) {
        return this.disableCells.some((x) => x === header);
      }

      return cell.disabled;
    },
    copyStoreData(params) {
      const value = lodashClonedeep(this.value);

      this.removeClass(["stateCopy"]);

      if (this.selectedCoordCells && this.selectedMultipleCell && params === "copy") {
        if (
          this.selectedCell.row !== this.selectedCoordCells.rowEnd ||
          this.selectedCell.col !== this.selectedCoordCells.colEnd
        ) {
          this.selectedCell.row = this.selectedCoordCells.rowEnd;
          this.selectedCell.col = this.selectedCoordCells.colEnd;
        }
      }

      if (
        this.selectedCoordCells &&
        this.selectedCell.col === this.selectedCoordCells.colEnd &&
        this.selectedCell.row === this.selectedCoordCells.rowEnd &&
        params === "copy"
      ) {
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

        if (params === "copy") {
          this.$set(this.value[rowMin][header], "stateCopy", true);
          this.removeClass(["rectangleSelection"]);
          this.cleanPropertyOnCell("copy");
        }

        while (rowMin <= rowMax) {
          // remove stateCopy if present of storeData
          const copyData = value[rowMin][this.headerKeys[colMin]];

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
        if (params === "copy" && this.selectedCell) {
          this.cleanPropertyOnCell("copy");
          this.$set(this.value[this.selectedCell.row][this.selectedCell.header], "stateCopy", true);
        } else {
          this.storeCopyDatas = [];
        }

        // remove stateCopy if present of storeData
        const copyData = value[this.selectedCell.row][this.selectedCell.header];

        copyData.active = false;
        copyData.selected = false;
        copyData.stateCopy = false;
        copyData.rectangleSelection = false;
        this.storeCopyDatas.push(copyData);
        this.copyMultipleCell = false;
      }
    },
    pasteReplaceData() {
      const maxRow = this.value.length;
      const cell = this.value[this.selectedCell.row][this.selectedCell.header];

      this.cleanPropertyOnCell("paste");

      // copy / paste one cell || disable on disabled cell
      if (
        this.storeCopyDatas[0].value &&
        !this.copyMultipleCell &&
        !this.selectedMultipleCell &&
        !this.eventDrag &&
        !this.disabledEvent(cell, this.selectedCell.header)
      ) {
        // get the copied cell as new object
        const [copiedData] = lodashClonedeep(this.storeCopyDatas);

        // Keep reference of previous cell object
        copiedData.duplicate = cell;
        copiedData.active = true;
        this.value[this.selectedCell.row][this.selectedCell.header] = copiedData;
        // callback changeData
        this.$emit("tbody-paste-data", this.selectedCell.row, this.selectedCell.header, copiedData);
        this.changeData(this.selectedCell.row, this.selectedCell.header);
        // disable on disabled cell
      } else if (!this.disabledEvent(cell, this.selectedCell.header) && this.selectedCoordCells) {
        // if paste in multiple selection
        const conditionPasteToMultipleSelection =
          this.selectedCoordCopyCells !== null &&
          this.selectedCoordCells !== this.selectedCoordCopyCells;
        // new paste data
        const conditionRowToMultiplePasteRow =
          this.storeCopyDatas.length === 1 &&
          !this.storeCopyDatas[0].type &&
          this.selectedCoordCopyCells !== null &&
          Object.values(this.storeCopyDatas[0]).length > 1 &&
          this.selectedCoordCells.rowStart < this.selectedCoordCells.rowEnd;
        // copy / paste multiple cell | drag to fill one / multiple cell
        let rowMin = Math.min(this.selectedCoordCells.rowStart, this.selectedCoordCells.rowEnd);
        let rowMax = Math.max(this.selectedCoordCells.rowStart, this.selectedCoordCells.rowEnd);
        let colMin = Math.min(this.selectedCoordCells.colStart, this.selectedCoordCells.colEnd);
        let colMax = Math.max(this.selectedCoordCells.colStart, this.selectedCoordCells.colEnd);

        if (conditionPasteToMultipleSelection) {
          rowMin = Math.min(
            this.selectedCoordCopyCells.rowStart,
            this.selectedCoordCopyCells.rowEnd
          );
          rowMax = Math.max(
            this.selectedCoordCopyCells.rowStart,
            this.selectedCoordCopyCells.rowEnd
          );
        }

        if (conditionRowToMultiplePasteRow) {
          rowMin = Math.min(this.selectedCoordCells.rowStart, this.selectedCoordCells.rowEnd);
          rowMax = Math.max(this.selectedCoordCells.rowStart, this.selectedCoordCells.rowEnd);
        }

        if (conditionPasteToMultipleSelection || conditionRowToMultiplePasteRow) {
          colMin = Math.min(
            this.selectedCoordCopyCells.colStart,
            this.selectedCoordCopyCells.colEnd
          );
          colMax = Math.max(
            this.selectedCoordCopyCells.colStart,
            this.selectedCoordCopyCells.colEnd
          );
        }

        let row = 0;
        let col = 0;

        while (rowMin <= rowMax) {
          const header = this.headerKeys[colMin];
          const newCopyData = lodashClonedeep(this.storeCopyDatas);

          if (this.eventDrag) {
            // Drag To Fill
            const { duplicate } = this.value[rowMin][header];

            if (newCopyData[0][header]) {
              newCopyData[0][header].duplicate = duplicate;
              this.value[rowMin][header] = newCopyData[0][header]; // multiple cell
              this.$emit("tbody-paste-data", rowMin, header, newCopyData[0][header]);
            } else {
              newCopyData[0].duplicate = duplicate;
              [this.value[rowMin][header]] = newCopyData; // one cell
              this.$emit("tbody-paste-data", rowMin, header, newCopyData);
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
            // one cell to multipleCell
            const cellToCells =
              newCopyData.length === 1 &&
              Object.values(newCopyData).length === 1 &&
              newCopyData[0].type;
            // 1 row to 1 row
            const rowToRow =
              newCopyData.length === 1 &&
              Object.values(newCopyData[0]).length > 1 &&
              !newCopyData[0].type &&
              this.selectedCoordCells.rowStart === this.selectedCoordCells.rowEnd;
            // 1 row & multiple cols => to multiple row & cols
            const rowColsToRowsCols =
              newCopyData.length === 1 &&
              Object.values(newCopyData[0]).length > 1 &&
              this.selectedCoordCells.rowStart < this.selectedCoordCells.rowEnd &&
              this.selectedCoordCells.colStart !== this.selectedCoordCells.colEnd;
            // multiple col / row to multiple col / row
            const rowsColsToRowsCols =
              newCopyData.length > 1 && Object.values(newCopyData[0]).length > 1;

            // ▭ => ▭ / ▭
            // ▭ =>   / ▭
            if (colsToCols) {
              currentHeader = this.headerKeys[this.selectedCell.col];

              if (incrementRow < maxRow) {
                this.replacePasteData(col, header, incrementRow, currentHeader);
                col += 1;
              }
            }

            // ▭ => ▭▭
            //      ▭▭
            if (rowColsToRowsCols) {
              this.replacePasteData(0, header, incrementRow, currentHeader);

              if (colMin < colMax) {
                col += 1;
              } else {
                col = 0;
              }
              // ▭ => ▭
              //      ▭
            } else if (cellToCells) {
              if (this.selectedCoordCells.colStart === this.selectedCoordCells.colEnd) {
                currentHeader = this.selectedCell.header;
                newCopyData[0].duplicate = this.value[rowMin][currentHeader].duplicate;

                [this.value[rowMin][currentHeader]] = newCopyData;
                this.$emit("tbody-paste-data", rowMin, currentHeader, newCopyData[0]);
                this.changeData(rowMin, currentHeader);
              } else {
                // ▭ => ▭ ▭ ▭
                this.replacePasteData(col, header, this.selectedCell.row, header);
              }
            }

            // ▭▭▭ => ▭ / ▭▭▭
            if (rowToRow) {
              this.replacePasteData(0, header, this.selectedCell.row, currentHeader);
              col += 1;
            }

            // ▭▭▭ => ▭ / ▭▭▭
            // ▭▭▭ =>     ▭▭▭
            if (rowsColsToRowsCols) {
              if (this.value[incrementRow][currentHeader]) {
                newCopyData[row][header].duplicate = this.value[incrementRow][
                  currentHeader
                ].duplicate;
              }

              this.replacePasteData(row, header, incrementRow, currentHeader);

              if (colMin < colMax) {
                col += 1;
              } else {
                col = 0;
              }
            }

            // add active / selected status on firstCell
            this.value[this.selectedCell.row][this.selectedCell.header].selected = true;
            this.value[this.selectedCell.row][this.selectedCell.header].rectangleSelection = true;
            this.value[this.selectedCell.row][this.selectedCell.header].active = true;
          }

          colMin += 1;

          if (colMin > colMax) {
            if (
              this.selectedCoordCopyCells !== null &&
              this.selectedCoordCells !== this.selectedCoordCopyCells
            ) {
              colMin = Math.min(
                this.selectedCoordCopyCells.colStart,
                this.selectedCoordCopyCells.colEnd
              );
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
    cleanPropertyOnCell(action) {
      if (this.storeRectangleSelection.length > 0) {
        this.storeRectangleSelection.forEach((cell) => {
          if (
            action === "paste" &&
            !cell.classList.value.includes("rectangleSelection") &&
            !cell.classList.value.includes("copy")
          ) {
            this.cleanProperty(cell);
          } else if (action === "copy" && !cell.classList.value.includes("selected")) {
            this.cleanProperty(cell);
          }
        });
      }
    },
    cleanProperty(element) {
      element.style.setProperty("--rectangleWidth", "100%");
      element.style.setProperty("--rectangleHeight", "40px");
      element.style.setProperty("--rectangleTop", 0);
      element.style.setProperty("--rectangleBottom", 0);
    },
    replacePasteData(col, header, incrementRow, currentHeader) {
      const newCopyData = lodashClonedeep(this.storeCopyDatas);
      let copyData;

      // If copyMultipleCell, newCopyData => [{header: {}}]
      if (this.copyMultipleCell) {
        copyData = newCopyData[col][header];
      } else {
        // Else, newCopyData => [{}]
        copyData = newCopyData[col];
      }

      copyData.duplicate = this.value[incrementRow][currentHeader];

      this.value[incrementRow][currentHeader] = copyData;
      this.$emit("tbody-paste-data", incrementRow, currentHeader, copyData);
      this.changeData(incrementRow, currentHeader);
    },
    modifyMultipleCell(params) {
      let rowMin = Math.min(this.selectedCoordCells.rowStart, this.selectedCoordCells.rowEnd);
      const rowMax = Math.max(this.selectedCoordCells.rowStart, this.selectedCoordCells.rowEnd);
      let colMin = Math.min(this.selectedCoordCells.colStart, this.selectedCoordCells.colEnd);
      const colMax = Math.max(this.selectedCoordCells.colStart, this.selectedCoordCells.colEnd);

      while (rowMin <= rowMax) {
        const header = this.headerKeys[colMin];
        const cell = this.value[rowMin][header];

        // disable on disabled cell
        if (params === "removeValue" && !this.disabledEvent(cell, header) && !!cell.value) {
          this.changeData(rowMin, header);
          this.$set(cell, "value", "");
          this.$set(cell, "selected", false);
          this.$emit("tbody-nav-backspace", rowMin, colMin, header, cell);
        }

        if (params === "selected") {
          this.$set(cell, "selected", true);
          this.selectedMultipleCellActive = true;

          if (colMin === colMax && rowMin === rowMax) {
            // add active on the last cell
            this.removeClass(["active"]);
            this.$set(cell, "active", true);
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
    },
    setRectangleSelection(colMin, colMax, rowMin, rowMax) {
      let width = 100;
      let height = 40;

      // Defined width of rectangle
      if (colMin === 0 && colMax === 0) {
        width = 100 * (colMin + 1);
      } else if (colMin === 0 && colMax > 0) {
        width = 100 * (colMax + 1);
      } else {
        width = 100 * (colMax - colMin + 1);
      }

      // Defined height of rectangle
      if ((rowMin === 0 && rowMax === 0) || (rowMin === 0 && rowMax > 0)) {
        height = 40 * (rowMin + 1);
      } else if (this.selectedCoordCells.rowEnd > this.selectedCoordCells.rowStart) {
        height = 40 * (this.selectedCoordCells.rowEnd - this.selectedCoordCells.rowStart + 1);
      } else {
        height = 40 * (this.selectedCoordCells.rowStart - this.selectedCoordCells.rowEnd + 1);
      }

      if (this.$refs[`${this.customTable}-vueTbody`]?.$refs) {
        [this.rectangleSelectedCell] = this.$refs[`${this.customTable}-vueTbody`].$refs[
          `td-${this.customTable}-${this.selectedCoordCells.colStart}-${this.selectedCoordCells.rowStart}`
        ];

        if (!this.selectedMultipleCellActive) {
          [this.rectangleSelectedCell] = this.$refs[`${this.customTable}-vueTbody`].$refs[
            `td-${this.customTable}-${this.selectedCell.col}-${this.selectedCell.row}`
          ];
        }
      }

      this.rectangleSelectedCell.style.setProperty("--rectangleWidth", `${width + 1}%`);
      this.rectangleSelectedCell.style.setProperty("--rectangleHeight", `${height}px`);

      // Position bottom/top of rectangle if rowStart >= rowEnd
      if (this.selectedCoordCells.rowStart >= this.selectedCoordCells.rowEnd) {
        this.rectangleSelectedCell.style.setProperty("--rectangleTop", "auto");
        this.rectangleSelectedCell.style.setProperty("--rectangleBottom", 0);
      } else {
        this.rectangleSelectedCell.style.setProperty("--rectangleTop", 0);
        this.rectangleSelectedCell.style.setProperty("--rectangleBottom", "auto");
      }

      // Position left/right of rectangle if colStart >= colEnd
      if (this.selectedCoordCells.colStart >= this.selectedCoordCells.colEnd) {
        this.rectangleSelectedCell.style.setProperty("--rectangleLeft", "auto");
        this.rectangleSelectedCell.style.setProperty("--rectangleRight", 0);
      } else {
        this.rectangleSelectedCell.style.setProperty("--rectangleLeft", 0);
      }

      if (!this.storeRectangleSelection.includes(this.rectangleSelectedCell)) {
        this.storeRectangleSelection.push(this.rectangleSelectedCell);
      }
    },
  },
};
