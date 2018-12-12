<template>
  <tbody>
    <template v-for="(row, rowIndex) in tbodyData">
      <tr class="table_row" :key="row + '' + rowIndex">
        <td class="index" v-if="tbodyIndex" :key="'td-index-' + rowIndex">
          {{rowIndex}}
        </td>
        <template v-for="(col, colIndex) in headerKeys">
          <td
            v-if="row[col]"
            class="td"
            :id="col"
            :data-col-index="colIndex"
            :data-row-index="rowIndex"
            :data-type="row[col].type"
            @click.shift.exact="handleSelectMultipleCell($event, col, rowIndex, colIndex, row[col].type)"
            @contextmenu="handleContextMenuTd($event, col, rowIndex, colIndex, row[col].type)"
            @click="handleClickTd($event, row[col], col, rowIndex, colIndex, row[col].type)"
            @dblclick="handleDoubleClickTd($event, col, row[col], rowIndex, colIndex, row[col].type)"
            @mousemove="handleMoveDragToFill($event, col, row[col], rowIndex, colIndex)"
            @mouseup="handleUpDragToFill($event, col, rowIndex, colIndex, row[col].type)"
            v-bind:class="{
              'active_td': row[col].active,
              'show': row[col].show,
              'selected': row[col].selected,
              'disabled': row[col].disabled || disableCells.find(x => x === col),
              'first': row[col].first,
            }"
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

            <div class="submenu" :ref="'contextMenu-' + colIndex + '-' + rowIndex">
              <div
                class="submenu_wrap"
                v-if="submenuTbody &&
                submenuStatusTbody &&
                rowIndex === submenuEnableRow &&
                colIndex === submenuEnableCol &&
                submenuTbody.find(sub => sub.disabled.includes(col) == 0)">
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
            </div>

            <!-- If Img -->
            <template v-if="row[col].type === 'img'">
              <span><img :src="row[col].value" :title="row[col].value" /></span>
            </template>

            <!-- If Input -->
            <template v-if="row[col].type === 'input'">
              <span>{{row[col].value}}</span>
              <textarea
                v-model="row[col].value"
                @change="inputHandleChange($event, col, rowIndex, colIndex)"
                @keyup.esc="escKeyup(row[col], rowIndex, col, colIndex, row[col].type)"
                :ref="'input-' + colIndex + '-' + rowIndex"
                :style="textareaStyle(row[col].value)"></textarea>
            </template>

            <!-- If Select -->
            <template v-if="row[col].type === 'select' && row[col].handleSearch">
              <span>{{row[col].value}}</span>
              <button @click.stop="enableSelect($event, col, row[col], rowIndex, colIndex)" v-bind:class="{'active': row[col].search === true}" class="enable_select"><i></i></button>
              <div class="dropdown">
                <input
                  v-model="searchInput"
                  :ref="'input-' + colIndex + '-' + rowIndex"
                  @keyup.esc="escKeyup(row[col], rowIndex, col, colIndex, row[col].type)"
                  @keyup="handleSearchInputSelect($event, searchInput, row[col], col, rowIndex)"/>
                <ul
                  v-bind:class="{'show': row[col].search}"
                  :ref="'dropdown-' + colIndex + '-' + rowIndex">
                  <template v-if="!row[col].typing">
                    <li v-for="(option, index) in row[col].selectOptions"
                      @click.stop="validSearch($event, col, row[col], option, rowIndex, colIndex)"
                      v-bind:class="{'active': option.active}"
                      :value="option.value"
                      :key="index + 'option'">
                        {{option.label}}
                    </li>
                  </template>
                  <template v-if="row[col].typing">
                    <li v-for="(option, index) in filteredList"
                      @click.stop="validSearch($event, col, row[col], option, rowIndex, colIndex)"
                      v-bind:class="{'active': option.active}"
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
                @change="selectHandleChange($event, col, row[col], option, rowIndex, colIndex)">
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
          <td v-else
            class="td"
            :id="col"
            :data-col-index="colIndex"
            :data-row-index="rowIndex"
            @contextmenu="handleContextMenuTd($event, col, rowIndex, colIndex, 'newCol')"
            @click="handleClickTd($event, row[col], col, rowIndex, colIndex, 'newCol')"
            @dblclick="handleDoubleClickTd($event, col, col, rowIndex, colIndex, 'newCol')"
            v-bind:class="{
              'active_td': newData.active,
              'show': newData.show,
              'disabled': newData.disabled,
              'selected': newData.selected,
              'disabled': disableCells.find(x => x === col),
            }"
            :ref="'td-' + colIndex + '-' + rowIndex"
            :key="col"
            :style="newData.style">

            <!-- If Input -->
            <template v-if="newData.type === 'input'">
              <span>{{newData.value}}</span>
              <textarea
              v-model="newData.value"
              @change="inputHandleChange($event, col, rowIndex, colIndex)"
              @keyup.esc="escKeyup(newData, rowIndex, colIndex, newData.type)"
              :ref="'input-' + colIndex + '-' + rowIndex"
              :style="textareaStyle(newData.value)"></textarea>
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
    filteredList: {
      type: Array,
      required: true,
    },
    headers: {
      type: Array,
      required: true,
    },
    tbodyData: {
      type: Array,
      required: true,
    },
    disableCells: {
      type: Array,
      required: false,
    },
    dragToFill: {
      type: Boolean,
      required: false,
    },
    newData: {
      type: Object,
      required: false,
    },
    tbodyIndex: {
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
      emptyCell: '',
      eventDrag: false,
      oldValue: null,
      searchInput: '',
      submenuEnableCol: null,
      submenuEnableRow: null,
    };
  },
  mounted() {
    window.addEventListener('keydown', this.moveKeydown);
    window.addEventListener('keyup', this.moveKeyup);
  },
  computed: {
    headerKeys() {
      return this.headers.map(x => x.headerKey);
    },
  },
  methods: {
    enableSelect(event, header, col, rowIndex, colIndex) {
      this.$emit('handle-to-open-select', event, header, col, rowIndex, colIndex);
    },
    escKeyup(col, rowIndex, header, colIndex, type) {
      this.$emit('tbody-handle-set-oldvalue', col, rowIndex, header, colIndex, type);
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
    handleSelectMultipleCell(event, header, rowIndex, colIndex, type) {
      this.$emit('tbody-select-multiple-cell', event, header, rowIndex, colIndex, type);
    },
    handleDownDragToFill(event, header, col, rowIndex, colIndex) {
      this.eventDrag = true;
      this.$emit('tbody-down-dragtofill', event, header, col, rowIndex, colIndex);
    },
    handleMoveDragToFill(event, header, col, rowIndex, colIndex) {
      if (this.eventDrag) {
        this.$emit('tbody-move-dragtofill', event, header, col, rowIndex, colIndex);
      }
    },
    handleUpDragToFill(event, header, rowIndex, colIndex, type) {
      if (this.eventDrag) {
        this.eventDrag = false;
        this.$emit('tbody-up-dragtofill', event, header, rowIndex, colIndex, type);
      }
    },
    handleClickTd(event, col, header, rowIndex, colIndex, type) {
      this.searchInput = '';
      this.$emit('tbody-td-click', event, col, header, rowIndex, colIndex, type);
    },
    handleDoubleClickTd(event, header, col, rowIndex, colIndex, type) {
      if (type === 'input') {
        this.$refs[`input-${colIndex}-${rowIndex}`][0].focus();
      }
      this.$emit('tbody-td-double-click', event, header, col, rowIndex, colIndex, type);
    },
    handleContextMenuTd(event, header, rowIndex, colIndex, type) {
      this.submenuEnableCol = colIndex;
      this.submenuEnableRow = rowIndex;
      this.$emit('handle-to-calculate-position', event, rowIndex, colIndex, 'contextMenu');
      this.$emit('submenu-enable', 'tbody');
      this.$emit('tbody-td-context-menu', event, header, rowIndex, colIndex, type);
    },
    inputHandleChange(event, header, rowIndex, colIndex) {
      this.$emit('tbody-input-change', event, header, rowIndex, colIndex);
    },
    selectHandleChange(event, header, col, option, rowIndex, colIndex) {
      this.$emit('tbody-select-change', event, header, col, option, rowIndex, colIndex);
    },
    handleSearchInputSelect(event, searchValue, col, header, rowIndex) {
      this.$emit('tbody-handle-search-input-select', event, searchValue, col, header, rowIndex);
    },
    validSearch(event, header, col, option, rowIndex, colIndex) {
      this.$emit('tbody-select-change', event, header, col, option, rowIndex, colIndex);
    },
    handleClickSubmenu(event, header, rowIndex, colIndex, type, submenuFunction) {
      this.$emit('tbody-submenu-click-callback', event, header, rowIndex, colIndex, type, submenuFunction);
    },
    moveKeydown(event) {
      this.$emit('tbody-move-keydown', event);
    },
    moveKeyup(event) {
      this.$emit('tbody-move-keyup', event);
    },
  },
};
</script>

<style lang="scss" scoped>
:root {
  // select style
  --selectLeft: 0;
  --selectTop: 0;
  --selectWidth: 0;

  // rectangle style
  --rectangleBottom: 0;
  --rectangleHeight: 40;
  --rectangleLeft: 0;
  --rectangleRight: 0;
  --rectangleTop: 0;
  --rectangleWidth: 100%;
}

.td {
  height: 40px;
  line-height: 40px;
  position: relative;
  background-color: white;
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
  &.active_td,
  &.selected {
    background: aliceblue;
  }
  &.selected {
    &.first:after {
      content: '';
      display: block;
      position: absolute;
      bottom: var(--rectangleBottom);
      height: var(--rectangleHeight);
      left: var(--rectangleLeft);
      right: var(--rectangleRight);
      top: var(--rectangleTop);
      width: var(--rectangleWidth);
      z-index: 3;
      border: 2px solid #0760fe;
      box-sizing: border-box;
    }
  }
  &.disabled {
    pointer-events: none;
    background: #cccccc;
    span {
      opacity: .5;
    }
    .enable_select {
      opacity: 0;
    }
  }
  &.show {
    textarea,
    select {
      opacity: 1;
      z-index: 13;
    }
    .dropdown {
      opacity: 1;
    }
    textarea {
      font-size: 12px;
      line-height: 1.3;
      border: 1px solid #e9e9e9;
      z-index: 20;
      resize: none;
    }
    span {
      opacity: 0;
    }
  }
  textarea,
  select,
  .dropdown {
    opacity: 0;
  }
  textarea,
  span,
  select,
  .dropdown {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    background: transparent;
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
    opacity: 1;
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
    width: 10px;
    height: 10px;
    background: #0760fe;
    display: block;
    z-index: 11;
    border: 0;
    padding: 0;
    cursor: cell;
    opacity: 0;
    visibility: hidden;
    outline: none;
    transition: all .3s ease;
  }
  .dropdown {
    input {
      position: absolute;
      top: 0;
      left: 0;
      padding: 2px 5px;
      text-align: left;
      height: 100%;
      width: 100%;
      border: 0;
      background: transparent;
      outline: none;
    }
    ul {
      display: none;
      position: fixed;
      margin: 0 auto;
      background-color: #fff;
      border: 1px solid #e7ecf5;
      box-shadow: 0px -8px 34px 0px rgba(0, 0, 0, 0.05);
      padding: 0;
      margin: 0;
      max-height: 140px;
      overflow-y: auto;
      // select style
      left: var(--selectLeft);
      top: var(--selectTop);
      width: var(--selectWidth);
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
        &.active {
          background: #e7ecf5;
        }
      }
      &.show {
        display: block;
        z-index: 14;
      }
    }
  }
}
.enable_select {
  position: absolute;
  top: 50%;
  right: 5px;
  z-index: 13;
  transform: translateY(-50%);
  border: 0;
  box-shadow: none;
  background: white;
  width: 16px;
  height: 16px;
  padding: 0;
  border-radius: 50%;
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
.submenu{
  position: fixed;
  z-index: 20;
  background: white;
}
.submenu_wrap {
  margin: 0 auto;
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
.index {
  width: 20px;
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid #e6ecf6;
  border-right: 1px solid #e6ecf6;
  border-left: 1px solid #e6ecf6;
  box-sizing: border-box;
}
</style>
