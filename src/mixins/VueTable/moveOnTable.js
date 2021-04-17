import { cleanProperty } from "../../helpers";

/* eslint-disable-next-line import/prefer-default-export */
export const moveOnTable = {
  data() {
    return {
      disableKeyTimeout: null,
      incrementCol: 0,
      incrementRow: null,
      pressedShift: 0,
      keys: {},
    };
  },
  mounted() {
    window.addEventListener("keydown", this.moveKeydown);
    window.addEventListener("keyup", this.moveKeyup);
  },
  methods: {
    moveOnTable(event, colIndex, rowIndex) {
      const vueTable = this.$refs[`${this.customTable}-vueTable`];
      const maxCol = Math.max(...this.colHeaderWidths);

      // get the correct height of visible table
      if (vueTable) {
        const heightTable =
          vueTable.clientHeight -
          vueTable.firstElementChild.clientHeight -
          this.$refs[`${this.customTable}-vueThead`].$el.clientHeight;
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

          if (borderBottomCell - 1 <= rowIndex) {
            vueTable.scrollTop += 40;
          }
        }

        // left
        if (event.keyCode === 37) {
          event.preventDefault();

          if (borderRightCell + 1 >= colIndex) {
            vueTable.scrollLeft -= maxCol;
          }
        }

        // right
        if (event.keyCode === 39) {
          event.preventDefault();

          if (borderRightCell - 1 <= colIndex) {
            vueTable.scrollLeft += maxCol;
          }
        }
      }
    },
    moveKeydown(event) {
      [this.actualElement] = document.getElementsByClassName("active_td");

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

      if (
        this.actualElement &&
        this.actualElement.getAttribute("current-table") === this.customTable.toString() &&
        [37, 39, 40, 38, 13, 27, 8].includes(event.keyCode)
      ) {
        this.removeClass(["selected"]);

        const colIndex = Number(this.actualElement.getAttribute("data-col-index"));
        const rowIndex = Number(this.actualElement.getAttribute("data-row-index"));
        const dataType = this.actualElement.getAttribute("data-type");
        const header = this.actualElement.getAttribute("data-header");
        const currentlyEditingCell = this.value[rowIndex][header].show;

        if (!currentlyEditingCell) {
          if (!this.setFirstCell) {
            this.$set(this.value[rowIndex][header], "rectangleSelection", true);
            this.setFirstCell = true;
          }

          // set colMax rowMax
          const rowMax = this.value.length;
          const colMax = this.headers.length;

          this.moveOnTable(event, colIndex, rowIndex);

          // shift
          if (this.keys[16]) {
            this.pressShiftMultipleCell(event, header, rowMax, rowIndex, colMax, colIndex);
          } else if (!this.lastSelectOpen && event.keyCode !== 8) {
            if (this.selectedMultipleCell) {
              this.selectedMultipleCell = false;
            }

            this.$set(this.value[rowIndex][header], "active", false);
            this.removeClass(["rectangleSelection"]);

            // left
            if (event.keyCode === 37) {
              const decrementHeader = Object.values(this.headerKeys)[colIndex - 1];

              if (decrementHeader) {
                this.$set(this.value[rowIndex][decrementHeader], "active", true);

                if (dataType === "select") {
                  this.activeSelectSearch(event, rowIndex, colIndex, decrementHeader);
                }

                this.updateSelectedCell(decrementHeader, rowIndex, colIndex - 1);
              } else {
                this.$set(this.value[rowIndex][header], "active", true);

                if (dataType === "select") {
                  this.activeSelectSearch(event, rowIndex, colIndex, header);
                }

                this.updateSelectedCell(header, rowIndex, colIndex);
              }
            }

            // top
            if (event.keyCode === 38) {
              if (rowIndex !== 0) {
                this.$set(this.value[rowIndex - 1][header], "active", true);

                if (dataType === "select") {
                  this.activeSelectSearch(event, rowIndex - 1, colIndex, header);
                }

                this.updateSelectedCell(header, rowIndex - 1, colIndex);
              } else {
                this.$set(this.value[rowIndex][header], "active", true);

                if (dataType === "select") {
                  this.activeSelectSearch(event, rowIndex, colIndex, header);
                }

                this.updateSelectedCell(header, rowIndex, colIndex);
              }
            }

            // right
            if (event.keyCode === 39) {
              const incrementHeader = Object.values(this.headerKeys)[colIndex + 1];

              if (incrementHeader) {
                this.$set(this.value[rowIndex][incrementHeader], "active", true);

                if (dataType === "select") {
                  this.activeSelectSearch(event, rowIndex, colIndex, incrementHeader);
                }

                this.updateSelectedCell(incrementHeader, rowIndex, colIndex + 1);
              } else {
                this.$set(this.value[rowIndex][header], "active", true);

                if (dataType === "select") {
                  this.activeSelectSearch(event, rowIndex, colIndex, header);
                }

                this.updateSelectedCell(header, rowIndex, colIndex);
              }
            }

            // bottom
            if (event.keyCode === 40) {
              if (rowIndex + 1 !== rowMax) {
                this.$set(this.value[rowIndex + 1][header], "active", true);

                if (dataType === "select") {
                  this.activeSelectSearch(event, rowIndex + 1, colIndex, header);
                }

                this.updateSelectedCell(header, rowIndex + 1, colIndex);
              } else {
                this.$set(this.value[rowIndex][header], "active", true);

                if (dataType === "select") {
                  this.activeSelectSearch(event, rowIndex, colIndex, header);
                }

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
            if (this.$refs[`input-${this.customTable}-${colIndex}-${rowIndex}`]) {
              this.value[rowIndex][header].show = true;
              this.$refs[`input-${this.customTable}-${colIndex}-${rowIndex}`][0].focus();
            }

            this.$emit(
              "tbody-nav-enter",
              event,
              event.keyCode,
              this.actualElement,
              rowIndex,
              colIndex
            );
          }

          // press esc
          if (event.keyCode === 27) {
            this.value[rowIndex][header].active = false;
            this.storeCopyDatas = [];
            this.removeClass(["stateCopy"]);
          }
        }
      }
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
    moveOnSelect(event) {
      if (this.incrementOption <= this.filteredList.length) {
        const dropdown = this.$refs[`${this.customTable}-vueTbody`].$refs[
          `vsSelect-${this.customTable}-${this.lastSelectOpen.colIndex}-${this.lastSelectOpen.rowIndex}`
        ][0].$refs[
          `dropdown-${this.customTable}-${this.lastSelectOpen.colIndex}-${this.lastSelectOpen.rowIndex}`
        ];
        const cellHeight = 45;

        // top
        if (event.keyCode === 38) {
          // The distance between the top border of element with the top viewport border of parent (dropdown)
          const topOffsetElementWithinViewport =
            dropdown.children[this.incrementOption].offsetTop - dropdown.scrollTop;
          // Divided by cellHeight gives the index from *top* of the current element.
          const isFirstItemInViewport = topOffsetElementWithinViewport / cellHeight < 1;

          if (this.incrementOption <= this.filteredList.length && this.incrementOption > 0) {
            if (this.filteredList[this.incrementOption]) {
              this.$set(this.filteredList[this.incrementOption], "active", false);
              this.incrementOption -= 1;
              this.$set(this.filteredList[this.incrementOption], "active", true);
            } else {
              this.incrementOption -= 1;
              this.$set(this.filteredList[this.incrementOption], "active", false);
              this.incrementOption -= 1;
              this.$set(this.filteredList[this.incrementOption], "active", true);
            }

            if (isFirstItemInViewport) {
              dropdown.scrollTop -= cellHeight;
            }
          }
        }

        // bottom
        if (event.keyCode === 40) {
          /* The distance between the bottom border of element with the bottom viewport border of parent (dropdown)
           * The value is always negative, so we invert it with the first minus.
           * (dropdown.children[this.incrementOption].offsetTop + cellHeight) => offsetBottom of element
           * - dropdown.scrollTop => gives the offsetBottom starting from the top viewport border of dropdown
           * - dropdown.offsetHeight => gives the offsetBottom starting from the bottom of viewport dropdown
           * You should actually draw a schematic in order to properly understand this. It helped me!
           */
          const bottomOffsetElementWithinViewport = -(
            dropdown.children[this.incrementOption].offsetTop +
            cellHeight -
            (dropdown.offsetHeight + dropdown.scrollTop)
          );
          // Divided by cellHeight gives the index from *bottom* of the current element.
          const isLastItemInViewport = bottomOffsetElementWithinViewport / cellHeight < 1;

          if (this.incrementOption < this.filteredList.length - 1) {
            if (this.incrementOption === 0 || this.incrementOption === 1) {
              this.$set(this.filteredList[this.incrementOption], "active", true);
              this.incrementOption += 1;
              this.$set(this.filteredList[this.incrementOption], "active", true);
              this.$set(this.filteredList[this.incrementOption - 1], "active", false);
            } else if (this.incrementOption > 1) {
              this.$set(this.filteredList[this.incrementOption], "active", false);
              this.incrementOption += 1;
              this.$set(this.filteredList[this.incrementOption], "active", true);
            }
          }

          if (isLastItemInViewport) {
            dropdown.scrollTop += cellHeight;
          }
        }
      }

      // enter
      if (event.keyCode === 13) {
        const oldSelect = this.lastSelectOpen;
        const currentSelect = this.value[oldSelect.rowIndex][oldSelect.header];

        this.handleTbodySelectChange(
          event,
          oldSelect.header,
          currentSelect,
          this.filteredList[this.incrementOption],
          oldSelect.rowIndex,
          oldSelect.colIndex
        );
      }
    },
    pressShiftMultipleCell(event, h, rowMax, rowIndex, colMax, colIndex) {
      event.preventDefault();
      let header = h;

      this.$set(this.value[rowIndex][header], "active", false);
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

        this.removeClass(["selected"]);
      }

      // shift / top
      if (event.keyCode === 38) {
        this.incrementRow -= 1;

        if (this.incrementRow < 0) {
          this.incrementRow = 0;
        }

        this.removeClass(["selected"]);
      }

      // shift / right
      if (event.keyCode === 39) {
        if (colMax >= this.incrementCol + 2) {
          this.incrementCol += 1;
        } else {
          this.$set(this.value[rowIndex][header], "active", true);
        }
      }

      // shift / bottom
      if (event.keyCode === 40) {
        if (rowMax >= this.incrementRow + 2) {
          this.incrementRow += 1;
        } else {
          this.$set(this.value[rowIndex][header], "active", true);
        }
      }

      header = Object.values(this.headerKeys)[this.incrementCol];
      this.$set(this.value[this.incrementRow][header], "active", true);
      this.handleSelectMultipleCell(event, header, this.incrementRow, this.incrementCol);
    },
    handleTbodyNavBackspace(rowIndex, colIndex, header) {
      if (this.selectedMultipleCell) {
        this.modifyMultipleCell("removeValue");
      } else {
        const cell = this.value[rowIndex][header];

        if (!cell.disabled || !!cell.value) {
          cell.value = "";
          this.$emit("tbody-nav-backspace", rowIndex, colIndex, header, cell);
          this.changeData(rowIndex, header);
        }
      }
    },
    handleTbodySelectChange(event, header, col, option, rowIndex, colIndex) {
      const currentData = this.value[rowIndex][header];

      currentData.selectOptions.forEach((selectOption) => {
        const sOption = selectOption;

        sOption.active = false;
      });

      const value = option.value || option.item.value;

      currentData.selectOptions.find((x) => x.value === value).active = true;

      this.$set(currentData, "search", false);
      this.$set(currentData, "show", false);
      this.$set(currentData, "value", value);

      this.lastSelectOpen = null;
      // remove class show on select when it change
      if (this.oldTdShow) this.value[this.oldTdShow.row][this.oldTdShow.key].show = false;
      this.enableSubmenu();
      // callback
      this.$emit("tbody-select-change", event, header, col, option, rowIndex, colIndex);
      this.changeData(rowIndex, header);
    },
    updateSelectedCell(header, rowIndex, colIndex) {
      const td = this.$refs[`${this.customTable}-vueTbody`].$refs[
        `td-${this.customTable}-${colIndex}-${rowIndex}`
      ][0];

      this.value[rowIndex][header].stateCopy = false;
      cleanProperty(td);

      if (!this.setFirstCell) {
        this.$set(this.value[rowIndex][header], "rectangleSelection", true);
        this.setFirstCell = true;
      }

      this.selectedCell = {
        header,
        row: rowIndex,
        col: colIndex,
      };
      // highlight selected row and column
      this.highlightTdAndThead(rowIndex, colIndex);
    },
  },
};
