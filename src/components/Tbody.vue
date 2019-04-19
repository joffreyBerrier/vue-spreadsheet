<template>
  <tbody>
    <template v-for="(row, rowIndex) in tbodyData">
      <tr class="table_row" :key="row + '' + rowIndex">
        <td class="index" v-if="tbodyIndex" :key="'td-index-' + rowIndex">
          {{rowIndex + 1}}
        </td>
        <template v-for="(header, colIndex) in headerKeys">
          <td
            v-if="row[header]"
            class="td"
            :data-header="header"
            :data-col-index="colIndex"
            :data-row-index="rowIndex"
            :data-type="row[header].type"
            @mouseover.stop="handleHoverTooltip(header, rowIndex, colIndex, row[header].type)"
            @mouseout.stop="handleOutTooltip"
            @click.shift.exact="handleSelectMultipleCell($event, header, rowIndex, colIndex, row[header].type)"
            @contextmenu="handleContextMenuTd($event, header, rowIndex, colIndex, row[header].type)"
            @click.exact="handleClickTd($event, row[header], header, rowIndex, colIndex, row[header].type)"
            @dblclick="handleDoubleClickTd($event, header, row[header], rowIndex, colIndex, row[header].type)"
            @mousemove="handleMoveDragToFill($event, header, row[header], rowIndex, colIndex)"
            @mouseup="handleUpDragToFill($event, header, row[header], rowIndex, colIndex, row[header].type)"
            v-bind:class="{
              'active_td': row[header].active,
              'show': row[header].show,
              'selected': row[header].selected,
              'copy': row[header].stateCopy,
              'disabled': row[header].disabled || disableCells.find(x => x === header),
              'rectangleSelection': row[header].rectangleSelection,
            }"
            :ref="`td-${colIndex}-${rowIndex}`"
            :key="header"
            :style="row[header].style">

            <transition name="transitionTooltip">
              <div
                class="vuetable_tooltip"
                v-if="row[header].value !== '' &&
                !row[header].search &&
                !row[header].active &&
                row[header].type !== 'img' &&
                !row[header].selected &&
                vuetableTooltip[rowIndex] === header">
                {{row[header].value}}
              </div>
            </transition>

            <span
              class="vuetable_triange"
              :style="[row[header].comment.borderColor ? {'borderTopColor': row[header].comment.borderColor} : {}]"
              v-if="row[header].value !== '' && !row[header].search && row[header].comment"
              @mouseover.stop="handleHoverTriangleComment(header, rowIndex)"
              @mouseout.stop="handleOutTriangleComment">
              <transition name="transitionComment">
                <div class="vuetable_triange_comment"
                  v-if="vueTableComment[rowIndex] === header && row[header].comment.value">
                  {{row[header].comment.value}}
                </div>
              </transition>
            </span>

            <button
              class="drag_to_fill"
              @mousedown="handleDownDragToFill($event, header, row[header], rowIndex, colIndex)"
              @mouseup="handleUpDragToFill($event, header, row[header], rowIndex, colIndex, row[header].type)">
            </button>

            <div class="submenu" :ref="'contextMenu-' + colIndex + '-' + rowIndex">
              <div
                class="submenu_wrap"
                v-if="submenuTbody &&
                submenuStatusTbody &&
                rowIndex === submenuEnableRow &&
                colIndex === submenuEnableCol &&
                submenuTbody.find(sub => sub.disabled.includes(header) == 0)">
                <template v-for="(submenu, index) in submenuTbody">
                  <template v-if="submenu.type === 'button'">
                    <button
                      v-if="submenu.disabled.includes(header) == 0"
                      :key="index"
                      @click.stop="handleClickSubmenu($event, header, rowIndex, colIndex, row[header].type, submenu.function)">
                      {{submenu.value}}
                    </button>
                  </template>
                </template>
              </div>
            </div>

            <!-- If Img -->
            <template v-if="row[header].type === 'img'">
              <span>
                <img :src="row[header].value" :title="row[header].value" />
              </span>
            </template>

            <!-- If Input -->
            <template v-if="row[header].type === 'input'">
              <span :ref="`span-${colIndex}-${rowIndex}`">
                {{row[header].value}}
              </span>
              <textarea
                v-model="row[header].value"
                @change="inputHandleChange($event, header, rowIndex, colIndex)"
                @keyup.esc="escKeyup(row[header], rowIndex, header, colIndex, row[header].type)"
                :ref="'input-' + colIndex + '-' + rowIndex"></textarea>
            </template>

            <!-- If Select -->
            <template v-if="row[header].type === 'select' && row[header].handleSearch">
              <span :ref="`span-${colIndex}-${rowIndex}`">{{row[header].value}}</span>
              <i class="icon_glass"
                v-bind:class="{'show': row[header].search}">
              </i>
              <button
                @click.stop="enableSelect($event, header, row[header], rowIndex, colIndex)"
                v-bind:class="{'active': row[header].search === true}"
                class="enable_select"><i></i>
              </button>
              <div class="dropdown">
                <input
                  v-model="searchInput"
                  :ref="'input-' + colIndex + '-' + rowIndex"
                  @keyup.esc="escKeyup(row[header], rowIndex, header, colIndex, row[header].type)"
                  @keyup.exact="handleSearchInputSelect($event, row[header], header, rowIndex, colIndex)"
                  :placeholder="trad[trad.lang].select.placeholder" />
                <ul
                  v-bind:class="{'show': row[header].search}"
                  :ref="'dropdown-' + colIndex + '-' + rowIndex">
                  <li v-for="(option, index) in filteredList"
                    @click.stop="validSearch($event, header, row[header], option, rowIndex, colIndex)"
                    v-bind:class="{'active': option.active}"
                    :value="option.value"
                    :key="index">
                      {{option.label}}
                  </li>
                </ul>
              </div>
            </template>

            <template v-else-if="row[header].type === 'select'">
              <span :ref="`span-${colIndex}-${rowIndex}`">{{row[header].value}}</span>
              <select
                v-model="row[header].value"
                @change="selectHandleChange($event, header, row[header], option, rowIndex, colIndex)">
                <option
                  v-for="(option, index) in row[header].selectOptions"
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
      oldTooltipHover: {},
      oldValue: null,
      searchInput: '',
      submenuEnableCol: null,
      submenuEnableRow: null,
      vuetableTooltip: {},
      vueTableComment: {},
    };
  },
  computed: {
    headerKeys() {
      return this.headers.map(x => x.headerKey);
    },
  },
  methods: {
    handleHoverTriangleComment(header, rowIndex) {
      if (!this.vueTableComment[rowIndex]) {
        this.$set(this.vueTableComment, rowIndex, header);
      }
    },
    handleOutTriangleComment() {
      this.vueTableComment = {};
    },
    handleHoverTooltip(header, rowIndex, colIndex, type) {
      if (this.$refs[`span-${colIndex}-${rowIndex}`] && type !== 'img') {
        const element = this.$refs[`span-${colIndex}-${rowIndex}`][0];
        if (!this.vuetableTooltip[rowIndex] && element.scrollWidth > element.clientWidth) {
          this.$set(this.vuetableTooltip, rowIndex, header);
        }
      }
    },
    handleOutTooltip() {
      this.vuetableTooltip = {};
    },
    disabledEvent(col, header) {
      if (col.disabled === undefined) {
        return !this.disableCells.find(x => x === header);
      } else if (col.disabled) {
        return !col.disabled;
      }
      return true;
    },
    enableSelect(event, header, col, rowIndex, colIndex) {
      if (this.disabledEvent(col, header)) {
        this.searchInput = '';
        this.$emit('handle-to-open-select', event, header, col, rowIndex, colIndex);
      }
    },
    escKeyup(col, rowIndex, header, colIndex, type) {
      if (this.disabledEvent(col, header)) {
        this.$emit('tbody-handle-set-oldvalue', col, rowIndex, header, colIndex, type);
      }
    },
    handleSelectMultipleCell(event, header, rowIndex, colIndex, type) {
      this.$emit('tbody-select-multiple-cell', event, header, rowIndex, colIndex, type);
    },
    handleDownDragToFill(event, header, col, rowIndex, colIndex) {
      if (this.disabledEvent(col, header)) {
        this.eventDrag = true;
        this.$emit('tbody-down-dragtofill', event, header, col, rowIndex, colIndex);
      }
    },
    handleMoveDragToFill(event, header, col, rowIndex, colIndex) {
      if (this.eventDrag && this.disabledEvent(col, header)) {
        this.$emit('tbody-move-dragtofill', event, header, col, rowIndex, colIndex);
      }
    },
    handleUpDragToFill(event, header, col, rowIndex, colIndex, type) {
      if (this.eventDrag && this.disabledEvent(col, header)) {
        this.eventDrag = false;
        this.$emit('tbody-up-dragtofill', event, header, rowIndex, colIndex, type);
      }
    },
    handleClickTd(event, col, header, rowIndex, colIndex, type) {
      this.searchInput = '';
      this.$emit('tbody-td-click', event, col, header, rowIndex, colIndex, type);
    },
    handleDoubleClickTd(event, header, col, rowIndex, colIndex, type) {
      if (this.disabledEvent(col, header)) {
        if (type === 'input') {
          this.$refs[`input-${colIndex}-${rowIndex}`][0].focus();
        }
        this.$emit('tbody-td-double-click', event, header, col, rowIndex, colIndex);
      }
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
    validSearch(event, header, col, option, rowIndex, colIndex) {
      this.$emit('tbody-select-change', event, header, col, option, rowIndex, colIndex);
    },
    selectHandleChange(event, header, col, option, rowIndex, colIndex) {
      this.$emit('tbody-select-change', event, header, col, option, rowIndex, colIndex);
    },
    handleSearchInputSelect(event, col, header, rowIndex, colIndex) {
      if (this.disabledEvent(col, header)) {
        this.$emit('tbody-handle-search-input-select', event, this.searchInput, col, header, rowIndex, colIndex);
      }
    },
    handleClickSubmenu(event, header, rowIndex, colIndex, type, submenuFunction) {
      this.$emit('tbody-submenu-click-callback', event, header, rowIndex, colIndex, type, submenuFunction);
    },
  },
};
</script>

<style lang="scss" scoped>

$rectangleBorder: 1px solid #3183fc;
$rectangleBg: #a0c3ff99;

$dragToFillSize: 9px;
$dragToFillColor:#3183fc;

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
  &:first-child {
    border-left: 1px solid #e7ecf5;
  }
  &.active_td {
    .drag_to_fill {
      opacity: 1;
      visibility: visible;
    }
  }
  &.active_td:after {
    content: '';
    display: block;
    position: absolute;
    bottom: 0;
    height: 40px;
    left: 0;
    right: 0;
    top: 0;
    width: 100%;
    z-index: 3;
    border: $rectangleBorder;
    background: $rectangleBg;
    box-sizing: border-box;
  }
  &.selected {
    &.rectangleSelection:after {
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
      border: $rectangleBorder;
      background: $rectangleBg;
      box-sizing: border-box;
    }
    &.active_td:after {
      display: none;
    }
    &.active_td.rectangleSelection:after {
      display: block;
    }
    &.active_td.copy:after {
      display: block;
    }
  }
  &.active_td.rectangleSelection {
    border: $rectangleBorder;
  }
  &.copy:after {
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
    border: $rectangleBorder;
    border-style: dashed;
    box-sizing: border-box;
  }
  &.disabled {
    background: #e0e0e0;
    span {
      opacity: .8;
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
    right: -4px;
    bottom: -4px;
    width: $dragToFillSize;
    height: $dragToFillSize;
    background: $dragToFillColor;
    border: 1px solid white;
    display: block;
    z-index: 11;
    padding: 0;
    cursor: cell;
    opacity: 0;
    visibility: hidden;
    outline: none;
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
      box-sizing: border-box;
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
      min-height: 140px;
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
        border-bottom: 1px solid #ebebeb;
        &:hover {
          background: #e7ecf5;
        }
        &.active {
          background: #e7ecf5;
        }
      }
      &.show {
        display: block;
        z-index: 15;
      }
    }
  }
  .vuetable_triange {
    width: 0;
    height: 0;
    border-style: solid;
    border-width: var(--borderCommentSize) var(--borderCommentSize) 0 0;
    border-color: var(--borderCommentColor) transparent transparent transparent;
    position: absolute;
    top: 0;
    padding: 0;
    z-index: 12;
    cursor: pointer;
    left: 0;
    overflow: visible;
    .vuetable_triange_comment {
      width: var(--boxCommentWidth);
      height: var(--BoxCommentHeight);
      position: absolute;
      white-space: normal;
      top: -10px;
      left: calc(#{var(--boxCommentWidth)} * -1);
      background: #FFF;
      padding: 10px 7px;
      line-height: 1.2;
      box-sizing: border-box;
      box-shadow: 0 0 15px 5px rgba(0, 0, 0, 0.1);
      z-index: 99999;
      transition: all ease .5s;
      &.showComment {
        opacity: 1;
        visibility: visible;
      }
    }
  }
}

.vuetable_tooltip {
  background: white;
  box-shadow: 0 0 15px 5px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  font-size: 12px;
  height: auto;
  left: 0;
  line-height: 1.3;
  max-height: 80px;
  min-height: 40px;
  overflow-y: auto;
  padding: 5px;
  position: absolute;
  position: absolute;
  top: 40px;
  width: 100%;
  z-index: 20;
}

.icon_glass {
  position: absolute;
  top: 50%;
  right: 25px;
  z-index: 13;
  transform: translateY(-50%);
  width: 12px;
  height: 12px;
  border-radius: 50px;
  border: 1px solid #000000;
  opacity: 0;
  visibility: hidden;
  transition: all ease .2s;
  &:after {
    content: '';
    display: block;
    position: absolute;
    transform: rotate(45deg);
    bottom: 0;
    right: -4px;
    height: 1px;
    width: 5px;
    background: #000000;
  }
  &.show {
    opacity: 1;
    visibility: visible;
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
  background: transparent;
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
  left: var(--selectLeft);
  top: var(--selectTop);
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
  background: transparent;
  box-sizing: border-box;
}

// transition tooltip
.transitionTooltip-enter-active {
  transition: all .5s ease 1.5s;
}
.transitionTooltip-leave-active {
  transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.transitionTooltip-enter,
.transitionTooltip-leave-to {
  transform: translateY(10px);
  opacity: 0;
}

// transition comment
.transitionComment-enter-active {
  transition: all .5s ease 1s;
}
.transitionComment-leave-active {
  transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.transitionComment-enter,
.transitionComment-leave-to {
  transform: translateX(-10px);
  opacity: 0;
}
</style>
