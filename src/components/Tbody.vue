<template>
  <tbody>
    <template v-for="(row, rowIndex) in rowData">
      <tr class="row" :key="row + '' + rowIndex">
        <template v-for="(col, entry, colIndex) in row">
          <td
            class="td"
            :id="entry"
            :data-col-index="colIndex"
            :data-row-index="rowIndex"
            @click.shift.exact="handleSelectMultipleCell($event, entry, rowIndex, colIndex, col.type)"
            @contextmenu="handleContextMenuTd($event, entry, rowIndex, colIndex, col.type)"
            @click="handleClickTd($event, entry, rowIndex, colIndex, col.type)"
            @dblclick="handleDoubleClickTd($event, entry, col, rowIndex, colIndex, col.type)"
            @mousemove="handleMoveDragToFill($event, entry, col, rowIndex, colIndex)"
            @mouseup="handleUpDragToFill($event, entry, rowIndex, colIndex, col.type)"
            v-bind:class="{'active_td': col.active, 'show': col.show, 'disabled': col.disabled, 'selected': col.selected}"
            :ref="'td-' + colIndex + '-' + rowIndex"
            :key="entry">

            <template
              v-if="dragToFill">
              <button
                class="drag_to_fill"
                @mousedown="handleDownDragToFill($event, entry, col, rowIndex, colIndex)"
                @mouseup="handleUpDragToFill($event, entry, rowIndex, colIndex, col.type)">
              </button>
            </template>

            <template v-if="submenuTbody &&
                submenuStatus &&
                rowIndex === submenuEnableRow &&
                colIndex === submenuEnableCol &&
                submenuTbody.find(sub => sub.disabled.includes(entry) == 0)">
              <div class="submenu_wrap">
                <template v-for="(submenu, index) in submenuTbody">
                  <template v-if="submenu.type === 'button'">
                    <button
                      v-if="submenu.disabled.includes(entry) == 0"
                      :key="index"
                      @click.stop="handleClickSubmenu($event, entry, rowIndex, colIndex, col.type, submenu.function)">
                      {{submenu.value}}
                    </button>
                  </template>
                </template>
              </div>
            </template>

            <!-- If Img -->
            <template v-if="col.type === 'img'">
              <span><img :src="col.value" :title="col.value" /></span>
            </template>

            <!-- If Input -->
            <template v-if="col.type === 'input'">
              <span :style="col.style">{{col.value}}</span>
              <textarea
                :style="textareaStyle(col.value)"
                v-model="col.value"
                :ref="'input-' + colIndex + '-' + rowIndex"
                @change="inputHandleChange($event, entry, rowIndex, colIndex)"></textarea>
            </template>

            <!-- If Select -->
            <template v-if="col.type === 'select' && col.handleSearch">
              <span :style="col.style">{{col.value}}</span>
              <div class="dropdown">
                <input
                  v-model="col.value"
                  :ref="'input-' + colIndex + '-' + rowIndex"
                  @keyup="searchHandleChange(col)"/>
                <ul v-bind:class="{'show': col.search}">
                  <li v-for="(option, index) in filteredList"
                    @click.stop="validSearch(option.value, col)"
                    :value="option.value"
                    :key="index">
                      {{option.label}}
                  </li>
                </ul>
              </div>
            </template>
            <template v-else-if="col.type === 'select'">
              <span :style="col.style">{{col.value}}</span>
              <select
                v-model="col.value"
                @change="selectHandleChange($event, entry, rowIndex, colIndex)">
                <option
                  v-for="(option, index) in col.selectOptions"
                  :value="option.value"
                  :key="index">
                    {{option.label}}
                </option>
              </select>
            </template>
          </td>
        </template>
      </tr>
    </template>
  </tbody>
</template>

<script type="text/javascript">
export default {
  name: 'vue-tbody',
  props: {
    rowData: Array,
    submenuTbody: Array,
    submenuStatus: Boolean,
    dragToFill: Boolean,
  },
  data() {
    return {
      oldValue: null,
      filteredList: [],
      submenuEnableCol: null,
      submenuEnableRow: null,
    };
  },
  mounted() {
    window.addEventListener('keyup', this.moveKeydown);
  },
  methods: {
    textareaStyle(value) {
      if (value.length > 100) {
        return {
          height: `${150}px`,
          width: `${400}px`,
        };
      }
      return {
        height: `${100}%`,
        width: `${100}%`,
      };
    },
    handleSelectMultipleCell(event, entry, rowIndex, colIndex, type) {
      this.$emit('tbody-select-multiple-cell', event, entry, rowIndex, colIndex, type);
    },
    handleDownDragToFill(event, entry, col, rowIndex, colIndex) {
      this.$emit('tbody-down-dragtofill', event, entry, col, rowIndex, colIndex);
    },
    handleMoveDragToFill(event, entry, col, rowIndex, colIndex) {
      this.$emit('tbody-move-dragtofill', event, entry, col, rowIndex, colIndex);
    },
    handleUpDragToFill(event, entry, rowIndex, colIndex, type) {
      this.$emit('tbody-up-dragtofill', event, entry, rowIndex, colIndex, type);
    },
    handleClickTd(event, entry, rowIndex, colIndex, type) {
      this.$emit('tbody-td-click', event, entry, rowIndex, colIndex, type);
    },
    handleDoubleClickTd(event, entry, col, rowIndex, colIndex, type) {
      if (type === 'input' || (col.type === 'select' && col.search)) {
        this.$refs[`input-${colIndex}-${rowIndex}`][0].focus();
      }
      this.$emit('tbody-td-double-click', event, entry, col, rowIndex, colIndex, type);
    },
    handleContextMenuTd(event, entry, rowIndex, colIndex, type) {
      this.submenuEnableCol = colIndex;
      this.submenuEnableRow = rowIndex;
      this.$emit('submenu-enable', 'tbody');
      this.$emit('tbody-td-context-menu', event, entry, rowIndex, colIndex, type);
    },
    inputHandleChange(event, entry, rowIndex, colIndex) {
      this.$emit('tbody-input-change', event, entry, rowIndex, colIndex);
    },
    selectHandleChange(event, entry, rowIndex, colIndex) {
      this.$emit('tbody-select-change', event, entry, rowIndex, colIndex);
    },
    searchHandleChange(col) {
      const column = col;
      column.search = true;

      this.filteredList = col.selectOptions.filter((option) => {
        if (typeof option.value === 'number') {
          return option.value.toString().toLowerCase().includes(col.value.toString().toLocaleLowerCase());
        }
        return option.value.toLowerCase().include(col.value.toLocaleLowerCase());
      });
    },
    validSearch(val, col) {
      const column = col;
      column.search = false;
      column.show = false;
      column.value = val;
    },
    handleClickSubmenu(event, entry, rowIndex, colIndex, type, submenuFunction) {
      this.$emit('tbody-submenu-click-callback', event, entry, rowIndex, colIndex, type, submenuFunction);
    },
    moveKeydown(event) {
      const actualElement = document.getElementsByClassName('active_td')[0];
      if (actualElement &&
        (event.keyCode === 37 ||
        event.keyCode === 39 ||
        event.keyCode === 40 ||
        event.keyCode === 38 ||
        event.keyCode === 13)) {

        const colIndex = Number(actualElement.getAttribute('data-col-index'));
        const rowIndex = Number(actualElement.getAttribute('data-row-index'));
        // remove active to before-active cell
        const actualCol = Object.keys(this.rowData[rowIndex])[colIndex];
        this.rowData[rowIndex][actualCol].active = false;

        // remove active class / blur
        actualElement.lastElementChild.blur();
        actualElement.classList.remove('active_td');

        // set colMax rowMax
        const colMax = Object.keys(this.rowData).length;
        const rowMax = this.rowData.length;

        // right
        if (event.keyCode === 39) {
          let col = Object.keys(this.rowData[rowIndex])[colIndex + 1];
          if (col) {
            this.rowData[rowIndex][col].active = true;
          } else {
            col = Object.keys(this.rowData[rowIndex])[colIndex - colMax];
            this.rowData[rowIndex][col].active = true;
          }
        }
        // left
        if (event.keyCode === 37) {
          let col = Object.keys(this.rowData[rowIndex])[colIndex - 1];
          if (col) {
            this.rowData[rowIndex][col].active = true;
          } else {
            col = Object.keys(this.rowData[rowIndex])[colIndex + colMax];
            this.rowData[rowIndex][col].active = true;
          }
        }
        // bottom
        if (event.keyCode === 40) {
          if (rowIndex + 1 !== rowMax) {
            this.rowData[rowIndex + 1][actualCol].active = true;
          } else {
            this.rowData[(rowIndex + 1) - rowMax][actualCol].active = true;
          }
        }
        // top
        if (event.keyCode === 38) {
          if (rowIndex !== 0) {
            this.rowData[rowIndex - 1][actualCol].active = true;
          } else {
            this.rowData[(rowIndex + rowMax) - 1][actualCol].active = true;
          }
        }
        // press enter
        if (event.keyCode === 13) {
          this.rowData[rowIndex][actualCol].show = true;
          this.$refs[`input-${colIndex}-${rowIndex}`][0].focus();
          this.$emit('tbody-nav-enter', event, event.keyCode, actualElement, rowIndex, colIndex);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.td {
  width: 120px;
  height: 40px;
  line-height: 40px;
  position: relative;
  background: white;
  border-right: 1px solid #e7ecf5;
  border-bottom: 1px solid #e7ecf5;
  padding: 0;
  text-align: left;
  box-sizing: border-box;
  transition: all ease 0.5s;
  &:first-child {
    border-left: 1px solid #e7ecf5;
  }
  &.active_td span,
  &.selected span {
    border: 1px solid #e9e9e9;
    background: aliceblue;
  }
  &.disabled {
    pointer-events: none;
    span {
      background: #cccccc;
      opacity: .5;
    }
  }
  &.show {
    textarea,
    select,
    .dropdown {
      z-index: 11;
    }
    textarea {
      font-size: 12px;
      line-height: 1.3;
      background: aliceblue;
      border: 1px solid #e9e9e9;
      z-index: 20;
      resize: none;
      opacity: 1;
    }
  }
  textarea,
  .dropdown {
    opacity: 0;
  }
  textarea,
  span,
  select {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    background: white;
    text-align: left;
    padding: 2px 5px;
    line-height: 40px;
    box-sizing: border-box;
    border: 1px solid transparent;
    outline: none;
  }
  textarea,
  select {
    z-index: 5;
  }
  span {
    z-index: 10;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  img {
    width: auto;
    height: 100%;
    display: block;
    margin: auto;
  }
  .drag_to_fill {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 6px;
    height: 6px;
    background: #e7ecf5;
    display: block;
    z-index: 11;
    border: 0;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    outline: none;
  }
  &:hover .drag_to_fill {
    opacity: 1;
    visibility: visible;
  }
  .dropdown {
    position: relative;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    background: white;
    line-height: 40px;
    box-sizing: border-box;
    border: 1px solid transparent;
    outline: none;
    opacity: 1;
    input {
      position: absolute;
      top: 0;
      left: 0;
      padding: 2px 5px;
      text-align: left;
      height: 100%;
      width: 100%;
      border: 0;
      outline: none;
    }
    ul {
      display: none;
      position: absolute;
      top: 38px;
      background-color: #fff;
      width: 100%;
      border: 1px solid #e7ecf5;
      box-shadow: 0px -8px 34px 0px rgba(0, 0, 0, 0.05);
      z-index: 1;
      padding: 0;
      margin: 0;
      li {
        list-style: none;
        font-size: 11px;
        line-height: 40px;
        padding: 2px 5px;
        text-decoration: none;
        display: block;
        cursor: pointer;
        transition: all ease .5s;
        &:hover {
          background: #e7ecf5;
        }
      }
      &.show {
        display: block;
      }
    }
  }
}
.submenu_wrap {
  position: absolute;
  top: 40px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background: white;
  z-index: 20;
  padding: 7px 14px;
  box-shadow: 0 0 15px 5px rgba(0, 0, 0, 0.1);
  button {
    width: 100%;
    height: 30px;
    line-height: 30px;
    padding: 0;
    text-align: center;
    border-radius: 4px;
    background: white;
    border: 1px solid #eee;
    outline: none;
    &:focus {
      box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
