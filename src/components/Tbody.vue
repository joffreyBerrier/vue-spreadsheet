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
            @dblclick="handleDoubleClickTd($event, entry, rowIndex, colIndex, col.type)"
            @mousemove="handleMoveDragToFill($event, entry, col, rowIndex, colIndex)"
            @mouseup="handleUpDragToFill($event, entry, col, rowIndex, colIndex, col.type)"
            v-bind:class="{'active_td': col.active, 'show': col.show, 'disabled': col.disabled, 'selected': col.selected}"
            :key="entry">

            <template
              v-if="dragToFill">
              <button
                class="drag_to_fill"
                @mousedown="handleDownDragToFill($event, entry, col, rowIndex, colIndex)"
                @mouseup="handleUpDragToFill($event, entry, col, rowIndex, colIndex, col.type)">
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
                @change="inputHandleChange($event, entry, rowIndex, colIndex)"></textarea>
            </template>

            <!-- If Select -->
            <template v-if="col.type === 'select'">
              <span :style="col.style">{{col.selectedOptions}}</span>
              <select
                v-model="col.selectedOptions"
                @change="selectHandleChange($event, entry, rowIndex, colIndex)">
                <option
                  v-for="(val, index) in col.value"
                  :value="val"
                  :key="index">
                    {{val}}
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
    handleUpDragToFill(event, entry, col, rowIndex, colIndex, type) {
      this.$emit('tbody-up-dragtofill', event, entry, col, rowIndex, colIndex, type);
    },
    handleClickTd(event, entry, rowIndex, colIndex, type) {
      this.$emit('tbody-td-click', event, entry, rowIndex, colIndex, type);
    },
    handleDoubleClickTd(event, entry, rowIndex, colIndex, type) {
      this.$emit('tbody-td-double-click', event, entry, rowIndex, colIndex, type);
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
    handleClickSubmenu(event, entry, rowIndex, colIndex, type, submenuFunction) {
      this.$emit('tbody-submenu-click-callback', event, entry, rowIndex, colIndex, type, submenuFunction);
    },
    moveKeydown(event) {
      const actualElement = document.getElementsByClassName('active_td')[0];
      if (actualElement) {
        if (event.keyCode === 37 ||
            event.keyCode === 39 ||
            event.keyCode === 40 ||
            event.keyCode === 38) {
          // remove active class / blur
          actualElement.lastElementChild.blur();
          actualElement.classList.remove('active_td');
          const colIndex = Number(actualElement.getAttribute('data-col-index'));
          const rowIndex = Number(actualElement.getAttribute('data-row-index'));

          this.$emit('tbody-nav', event, event.keyCode, actualElement, rowIndex, colIndex);

          // right
          if (event.keyCode === 39) {
            if (!actualElement.nextElementSibling) {
              actualElement.parentElement.firstElementChild.classList.add('active_td');
            } else {
              actualElement.nextElementSibling.classList.add('active_td');
            }
          }
          // left
          if (event.keyCode === 37) {
            if (!actualElement.previousElementSibling) {
              actualElement.parentElement.lastElementChild.classList.add('active_td');
            } else {
              actualElement.previousElementSibling.classList.add('active_td');
            }
          }
          // bottom
          if (event.keyCode === 40) {
            if (!actualElement.parentElement.nextElementSibling) {
              actualElement.parentElement.parentElement.firstElementChild.childNodes[colIndex].classList.add('active_td');
            } else {
              actualElement.parentElement.nextElementSibling.childNodes[colIndex].classList.add('active_td');
            }
          }
          // top
          if (event.keyCode === 38) {
            if (!actualElement.parentElement.previousElementSibling) {
              actualElement.parentElement.parentElement.lastElementChild.childNodes[colIndex].classList.add('active_td');
            } else {
              actualElement.parentElement.previousElementSibling.childNodes[colIndex].classList.add('active_td');
            }
          }
        }
        if (event.keyCode === 13) {
          const rowIndex = Number(actualElement.getAttribute('data-row-index'));
          const colIndex = Number(actualElement.getAttribute('data-col-index'));
          this.$emit('tbody-nav-enter', event, event.keyCode, actualElement, rowIndex, colIndex);

          actualElement.classList.add('show');
          actualElement.lastElementChild.focus();
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
  border-right: 1px solid #dadada;
  border-bottom: 1px solid #dadada;
  padding: 0;
  text-align: left;
  box-sizing: border-box;
  transition: all ease 0.5s;
  &:first-child {
    border-left: 1px solid #dadada;
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
    select {
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
  textarea {
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
    background: #dadada;
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
