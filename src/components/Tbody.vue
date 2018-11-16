<template>
  <tbody>
    <template v-for="(row, rowIndex) in rowData">
      <tr class="table_row" :key="row + '' + rowIndex">
        <template v-for="(col, colIndex) in headerKeys">
          <td
            v-if="row[col]"
            class="td"
            :id="col"
            :data-col-index="colIndex"
            :data-row-index="rowIndex"
            @click.shift.exact="handleSelectMultipleCell($event, col, rowIndex, colIndex, row[col].type)"
            @contextmenu="handleContextMenuTd($event, col, rowIndex, colIndex, row[col].type)"
            @click="handleClickTd($event, col, rowIndex, colIndex, row[col].type)"
            @dblclick="handleDoubleClickTd($event, col, row[col], rowIndex, colIndex, row[col].type)"
            @mousemove="handleMoveDragToFill($event, col, row[col], rowIndex, colIndex)"
            @mouseup="handleUpDragToFill($event, col, rowIndex, colIndex, row[col].type)"
            v-bind:class="{'active_td': row[col].active, 'show': row[col].show, 'disabled': row[col].disabled, 'selected': row[col].selected}"
            :ref="'td-' + colIndex + '-' + rowIndex"
            :key="col"
            :style="row[col].style">

            <template
              v-if="dragToFill">
              <button
                class="drag_to_fill"
                @mousedown="handleDownDragToFill($event, col, row[col], rowIndex, colIndex)"
                @mouseup="handleUpDragToFill($event, col, rowIndex, colIndex, row[col].type)">
              </button>
            </template>

            <template v-if="submenuTbody &&
                submenuStatus &&
                rowIndex === submenuEnableRow &&
                colIndex === submenuEnableCol &&
                submenuTbody.find(sub => sub.disabled.includes(col) == 0)">
              <div class="submenu_wrap">
                <template v-for="(submenu, index) in submenuTbody">
                  <template v-if="submenu.type === 'button'">
                    <button
                      v-if="submenu.disabled.includes(col) == 0"
                      :key="index"
                      @click.stop="handleClickSubmenu($event, col, rowIndex, colIndex, row[col].type, submenu.function)">
                      {{submenu.value}}
                    </button>
                  </template>
                </template>
              </div>
            </template>

            <!-- If Img -->
            <template v-if="row[col].type === 'img'">
              <span><img :src="row[col].value" :title="row[col].value" /></span>
            </template>

            <!-- If Input -->
            <template v-if="row[col].type === 'input'">
              <span>{{row[col].value}}</span>
              <textarea
                :style="textareaStyle(row[col].value)"
                v-model="row[col].value"
                :ref="'input-' + colIndex + '-' + rowIndex"
                @change="inputHandleChange($event, col, rowIndex, colIndex)"></textarea>
            </template>

            <!-- If Select -->
            <template v-if="row[col].type === 'select' && row[col].handleSearch">
              <span>{{row[col].value}}</span>
              <button @click="enableSelect(row[col], rowIndex, colIndex, row[col].type)" v-bind:class="{'active': row[col].search === true}" class="enable_select"><i></i></button>
              <div class="dropdown">
                <input
                  v-model="row[col].value"
                  :ref="'input-' + colIndex + '-' + rowIndex"
                  @keyup="searchHandleChange(row[col])"/>
                <ul v-bind:class="{'show': row[col].search}">
                  <template v-if="!row[col].typing">
                    <li v-for="(option, index) in row[col].selectOptions"
                      @click.stop="validSearch($event, col, row[col], rowIndex, colIndex, option.value)"
                      :value="option.value"
                      :key="index + 'option'">
                        {{option.label}}
                    </li>
                  </template>
                  <template v-if="row[col].typing">
                    <li v-for="(option, index) in filteredList"
                      @click.stop="validSearch($event, col, row[col], rowIndex, colIndex, option.value)"
                      :value="option.value"
                      :key="index">
                        {{option.label}}
                    </li>
                  </template>
                </ul>
              </div>
            </template>
            <template v-else-if="row[col].type === 'select'">
              <span>{{row[col].value}}</span>
              <select
                v-model="row[col].value"
                @change="selectHandleChange($event, col, row[col], rowIndex, colIndex)">
                <option
                  v-for="(option, index) in row[col].selectOptions"
                  :value="option.value"
                  :key="index">
                    {{option.label}}
                </option>
              </select>
            </template>
          </td>

          <!-- If Empty Cell -->
          <td
            v-else
            class="td"
            :id="col"
            :data-col-index="colIndex"
            :data-row-index="rowIndex"
            :ref="'td-' + colIndex + '-' + rowIndex"
            @contextmenu="handleContextMenuTd($event, col, rowIndex, colIndex, 'newCol')"
            @click="handleClickTd($event, col, rowIndex, colIndex, 'newCol')"
            @dblclick="handleDoubleClickTd($event, col, col, rowIndex, colIndex, 'newCol')"
            :key="col[col]">

            <!-- If Input -->
            <span></span>
            <textarea
              v-model="emptyCell"
              :ref="'input-' + colIndex + '-' + rowIndex"
              @change="inputHandleChange($event, col, rowIndex, colIndex)"></textarea>
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
    dragToFill: Boolean,
    headers: Array,
    rowData: Array,
    submenuStatus: Boolean,
    submenuTbody: Array,
  },
  data() {
    return {
      emptyCell: '',
      eventDrag: false,
      headerKeys: [],
      filteredList: [],
      oldValue: null,
      submenuEnableCol: null,
      submenuEnableRow: null,
    };
  },
  mounted() {
    this.headerKeys = this.headers.map(x => x.headerKey);
    window.addEventListener('keyup', this.moveKeydown);
  },
  methods: {
    enableSelect(col, rowIndex, colIndex, type) {
      if (!col.search) {
        this.$refs[`input-${colIndex}-${rowIndex}`][0].focus();
        col.search = true;
        col.typing = false;
      } else {
        col.search = false;
        col.typing = false;
      }
    },
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
      this.eventDrag = true;
      this.$emit('tbody-down-dragtofill', event, entry, col, rowIndex, colIndex);
    },
    handleMoveDragToFill(event, entry, col, rowIndex, colIndex) {
      if (this.eventDrag) {
        this.$emit('tbody-move-dragtofill', event, entry, col, rowIndex, colIndex);
      }
    },
    handleUpDragToFill(event, entry, rowIndex, colIndex, type) {
      if (this.eventDrag) {
        this.eventDrag = false;
        this.$emit('tbody-up-dragtofill', event, entry, rowIndex, colIndex, type);
      }
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
    selectHandleChange(event, entry, col, rowIndex, colIndex) {
      this.$emit('tbody-select-change', event, entry, col, rowIndex, colIndex);
    },
    searchHandleChange(col) {
      const column = col;
      column.typing = true;
      this.filteredList = col.selectOptions.filter((option) => {
        if (typeof option.value === 'number') {
          return option.value.toString().toLowerCase().includes(col.value.toString().toLowerCase());
        }
        return option.value.toLowerCase().includes(col.value.toLowerCase());
      });
    },
    validSearch($event, entry, col, rowIndex, colIndex, val) {
      const column = col;
      column.search = false;
      column.show = false;
      column.value = val;
      this.$emit('tbody-select-change', event, entry, col, rowIndex, colIndex);
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
        event.keyCode === 13 ||
        event.keyCode === 8)) {
        const colIndex = Number(actualElement.getAttribute('data-col-index'));
        const rowIndex = Number(actualElement.getAttribute('data-row-index'));
        // remove active to before-active cell
        const actualCol = Object.values(this.headerKeys)[colIndex];
        this.rowData[rowIndex][actualCol].active = false;

        // remove active class / blur
        actualElement.lastElementChild.blur();
        actualElement.classList.remove('active_td');

        // set colMax rowMax
        const colMax = Object.keys(this.rowData).length;
        const rowMax = this.rowData.length;

        // right
        if (event.keyCode === 39) {
          let col = Object.values(this.headerKeys)[colIndex + 1];
          if (col) {
            this.rowData[rowIndex][col].active = true;
          } else {
            col = Object.keys(this.rowData[rowIndex])[colIndex - colMax];
            this.rowData[rowIndex][col].active = true;
          }
        }
        // left
        if (event.keyCode === 37) {
          let col = Object.values(this.headerKeys)[colIndex - 1];
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
        // press backspace
        if (event.keyCode === 8) {
          this.$emit('tbody-nav-backspace', event, actualElement, actualCol, rowIndex, colIndex);
          this.rowData[rowIndex][actualCol].value = '';
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
  &.active_td {
    .drag_to_fill {
      opacity: 1;
      visibility: visible;
    }
  }
  &.active_td span,
  &.selected span {
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
    width: 100%;
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
    width: 7px;
    height: 7px;
    background: #0760fe;
    display: block;
    z-index: 11;
    border: 0;
    padding: 0;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    outline: none;
    transition: all .3s ease;
  }
  .dropdown {
    position: relative;
    top: 0;
    left: 0;
    display: block;
    width: 92%;
    height: 92%;
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
      height: 140px;
      width: 110%;
      overflow-y: auto;
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
        z-index: 13;
      }
    }
  }
}
.enable_select {
  position: absolute;
  top: 50%;
  right: 5px;
  z-index: 12;
  transform: translateY(-50%);
  border: 0;
  box-shadow: none;
  background: transparent;
  width: 15px;
  height: 15px;
  outline: none;
  cursor: pointer;
  transform: translateY(-50%) rotate(0deg);
  transition: all ease .5s;
  i {
    display: block;
    position: absolute;
    top: 50%;
    right: 5px;
    transform: translateY(-50%) rotate(180deg);
    font-size: 16px;
    transition: all ease .5s;
    &:before {
      content: '';
      display: block;
      height: 1px;
      width: 5px;
      transform: rotate(45deg) translate(1px, -2px);
      background: black;
    }
    &:after {
      content: '';
      display: block;
      height: 1px;
      width: 5px;
      transform: rotate(135deg) translate(0px, 2px);
      background: black;
    }
  }
  &.active {
    transform: translateY(-50%) rotate(180deg);
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
