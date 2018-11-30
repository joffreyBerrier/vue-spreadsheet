<template>
  <thead class="thead"
    @mousemove="handleMoveChangeSize($event)"
    @mouseup="handleUpDragToFill($event)">
    <tr>
      <th v-if="tbodyIndex" class="index" key="th-index"></th>
      <template v-for="(header, colIndex) in headers">
        <th
          class="th"
          v-bind:class="{'disabled': header.disabled}"
          :key="header.headerKey"
          :style="header.style">

          <span>{{header.headerName}}</span>

          <template
            v-if="submenuThead &&
            submenuThead.find(sub => sub.disabled.includes(header.headerKey) == 0)">
              <button
                @click="handleContextMenuTd($event, header.headerKey, colIndex)"
                v-bind:class="{'active': submenuThead && submenuStatusThead && colIndex === submenuEnableCol}"
                class="button_submenu button_submenu-2">
                <span class="icon icon_menu">
                  <i class="bullet bullet-1"></i>
                  <i class="bullet bullet-2"></i>
                  <i class="bullet bullet-3"></i>
                </span>
              </button>
          </template>

          <template v-if="sortHeader &&
          submenuThead.find(sub => sub.disabled.includes(header.headerKey) == 0)">
              <button
                @click="handleSort($event, header, colIndex)"
                v-bind:class="{'sort_A': header.activeSort === 'A', 'sort_Z' : header.activeSort === 'Z'}"
                class="button_submenu">
                <i class="icon sort"></i>
                <i class="icon sort"></i>
              </button>
          </template>

          <transition name="fade">
            <div
              v-if="submenuThead &&
              submenuStatusThead &&
              colIndex === submenuEnableCol &&
              submenuThead.find(sub => sub.disabled.includes(header.headerKey) == 0)"
              :key="'submenu-' + header.headerKey"
              class="submenu_wrap">
              <template v-for="(sub, index) in submenuThead">
                <template v-if="sub.type === 'button'">
                  <button
                    v-if="sub.disabled.includes(header.headerKey) == 0"
                    :key="index"
                    @click.stop="handleClickSubmenu($event, header, colIndex, sub.function)">
                    {{sub.value}}
                  </button>
                </template>
                <template v-if="sub.type === 'select'">
                  <div class="menu_option" :key="index" v-if="sub.disabled.includes(header.headerKey) == 0">
                    <template v-if="sub.subtitle"><h3>{{sub.subtitle}}</h3></template>
                    <select v-model="sub.value">
                      <option
                        v-for="(option, index) in sub.selectOptions"
                        :value="option.value"
                        :key="index">
                          {{option.label}}
                      </option>
                    </select>
                    <button
                      :style="sub.buttonOption.style"
                      @click.stop="handleClickSubmenu($event, header, colIndex, sub.buttonOption.function, sub.value)">
                        {{sub.buttonOption.value}}
                    </button>
                  </div>
                </template>
              </template>
            </div>
          </transition>

          <button
            :ref="'resize-' + colIndex"
            @mousedown="handleDownChangeSize($event, header, colIndex)"
            @mouseup="handleUpDragToFill($event, header, colIndex)"
            class="resize"
            v-bind:class="{'active': header.active}">
          </button>
        </th>
      </template>
    </tr>
  </thead>
</template>

<script type="text/javascript">
export default {
  name: 'vue-thead',
  props: {
    headers: {
      type: Array,
      required: true,
    },
    sortHeader: {
      type: Boolean,
      required: false,
    },
    tbodyIndex: {
      type: Boolean,
      required: false,
    },
    submenuStatusThead: {
      type: Boolean,
      required: false,
    },
    submenuThead: {
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      eventDrag: false,
      submenuEnableCol: null,
      beforeChangeSize: {},
      newSize: '',
    };
  },
  methods: {
    handleDownChangeSize(event, header, colIndex) {
      this.eventDrag = true;
      const head = header;

      this.beforeChangeSize = {
        col: colIndex,
        elementLeft: event.currentTarget.parentElement.offsetLeft,
        header: head,
        width: parseInt(head.style.width, 10),
      };

      head.active = true;
      head.style.left = event.clientX;

      const element = this.$refs[`resize-${this.beforeChangeSize.col}`][0];
      element.style.opacity = 0;
      element.style.top = `${element.parentElement.offsetTop}px`;
      element.style.opacity = 1;

      this.$forceUpdate();
    },
    handleMoveChangeSize(event) {
      if (this.eventDrag) {
        const element = this.$refs[`resize-${this.beforeChangeSize.col}`][0];
        element.style.left = `${event.clientX}px`;
      }
    },
    handleUpDragToFill(event) {
      if (this.eventDrag) {
        this.eventDrag = false;
        // get new size
        const newWidth = ((event.clientX - this.beforeChangeSize.elementLeft) + this.$parent.$refs.vueTable.scrollLeft) + 5;
        this.newSize = `${newWidth}px`;
        // set initial style on button resize
        const element = this.$refs[`resize-${this.beforeChangeSize.col}`][0];
        element.style.left = 'auto';
        element.style.top = '0';
        element.style.opacity = '';
        // set new size on header
        this.headers[this.beforeChangeSize.col].style.width = this.newSize;
        this.headers[this.beforeChangeSize.col].style.minWidth = this.newSize;
        this.beforeChangeSize.header.active = false;

        this.$emit('handle-up-drag-size-header', event, this.headers);
      }
    },
    handleSort(event, header, colIndex) {
      if (!header.activeSort || header.activeSort === 'Z') {
        header.activeSort = 'A';
      } else {
        header.activeSort = 'Z';
      }
      this.$forceUpdate();
      this.$emit('thead-td-sort', event, header, colIndex);
    },
    handleContextMenuTd(event, header, colIndex) {
      this.submenuEnableCol = colIndex;
      if (this.submenuStatusThead === true) {
        this.$emit('submenu-enable', 'tbody');
      } else {
        this.$emit('submenu-enable', 'thead');
      }
      this.$emit('thead-td-context-menu', event, header, colIndex);
    },
    handleClickSubmenu(event, header, colIndex, submenuFunction, selectOptions) {
      if (selectOptions) {
        this.$emit('thead-submenu-click-callback', event, header, colIndex, submenuFunction, selectOptions);
      } else {
        this.$emit('thead-submenu-click-callback', event, header, colIndex, submenuFunction);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.th {
  height: 45px;
  line-height: 41px;
  position: relative;
  background: #e7ecf5;
  z-index: 15;
  text-align: left;
  padding: 2px 5px;
  box-sizing: border-box;
  border-right: 0;
  border-top: 0;
  border-right: 1px solid white;
  transition: all ease 0.5s;
  &.disabled {
    pointer-events: none;
    span {
      background: #cccccc;
      opacity: .5;
    }
  }
  span {
    display: block;
    width: calc(100% - 30px);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.resize {
  position: absolute;
  top: 0;
  right: 0;
  height: 43px;
  background: #7d8ba5;
  width: 5px;
  padding: 0;
  border: 0;
  cursor: col-resize;
  box-shadow: none;
  outline: none;
  opacity: 0;
  transition: opacity ease .5s;
  &:hover {
    opacity: 1;
  }
  &:after {
    content: '';
    display: block;
    height: 100vh;
    position: absolute;
    top: 0;
    right: 0;
    border: 1px dashed #7d8ba5;
    opacity: 0;
    visibility: hidden;
  }
  &.active {
    opacity: 1;
    position: fixed;
    top: auto;
    &:after {
      opacity: 1;
      visibility: visible;
    }
  }
}
.submenu_wrap {
  position: absolute;
  top: 45px;
  right: 0;
  max-width: 180px;
  min-width: 180px;
  background: white;
  z-index: 20;
  padding: 0 0 0 0;
  box-shadow: 0 0 15px 5px rgba(0, 0, 0, 0.1);
  button {
    display: block;
    height: 30px;
    line-height: 20px;
    padding: 4px 8px;
    margin: 7px auto;
    text-align: center;
    border-radius: 4px;
    background: white;
    border: 1px solid #eee;
    outline: none;
    cursor: pointer;
    &:hover {
      background: #e7ecf5;
    }
    &:focus {
      box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.1);
    }
  }
  .menu_option {
    background: #eee;
    margin: 7px auto 0;
    padding: 10px 8px;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    h3 {
      font-size: 12px;
      font-weight: 400;
      line-height: 1;
      margin: 0;
    }
    select {
      display: block;
      width: 100%;
      margin: 15px auto;
      background: white;
    }
  }
}

.button_submenu {
  position: absolute;
  right: 10px;
  width: 10px;
  height: 100%;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  outline: none;
  border: 0;
  padding: 0;
  &-2 {
    right: 10px;
    & + .button_submenu {
      right: 25px;
    }
  }
  cursor: pointer;
  .sort{
    display: block;
    position: absolute;
    top: 20px;
    right: 2px;
    transform: rotate(0deg);
    font-size: 16px;
    opacity: .4;
    transition: all ease .5s;
    &:before,
    &:after {
      content: '';
      display: block;
      height: 2px;
      width: 5px;
      background: #555;
      transform: rotate(45deg) translate(0px, -1px);
    }
    &:after {
      transform: rotate(135deg) translate(0px, 3px);
    }
    &+.sort {
      top: 25px;
      transform: rotate(180deg);
      right: 3px;
    }
  }
  &.sort_Z .sort{
    opacity: 1;
    &:after,
    &:before {
      background: #000;
    }
    &+.sort {
      opacity: .4;
      &:before,
      &:after {
        background: #555;
      }
    }
  }
  &.sort_A .sort + .sort {
    opacity: 1;
    &:after,
    &:before {
      background: #000;
    }
  }
  .icon_menu {
    width: 10px;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    .bullet {
      display: block;
      width: 3px;
      height: 3px;
      margin: 0 auto;
      background: #555;
      border-radius: 50%;
      transition: all ease .5s;
      &-2 {
        margin: 2px auto;
      }
    }
  }
  &.active .icon_menu .bullet{
    background: #000;
    &-2 {
      background: #000;
    }
  }
}

.index {
  width: 20px;
  padding: 0;
  text-align: center;
  border-top: 1px solid #e6ecf6;
  border-bottom: 1px solid #e6ecf6;
  border-left: 1px solid #e6ecf6;
  box-sizing: border-box;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
