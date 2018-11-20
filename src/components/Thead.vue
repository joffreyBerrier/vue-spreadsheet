<template>
  <thead class="thead">
    <tr
      @mousemove="handleMoveChangeSize($event)"
      @mouseup="handleUpDragToFill($event)">

      <template v-for="(header, colIndex) in headers">
        <th
          class="th"
          v-bind:class="{'disabled': header.disabled}"
          :key="header.headerKey"
          :style="header.style">

          <span>{{header.headerName}}</span>

          <template
            v-if="submenuThead && submenuThead.find(sub => sub.disabled.includes(header.headerKey) == 0)">
              <button
                @click="handleContextMenuTd($event, header.headerKey, colIndex)"
                class="button_submenu"
                v-bind:class="{'active': submenuThead && submenuStatus && colIndex === submenuEnableCol}">
                <i class="icon icon_menu"></i>
              </button>
          </template>

          <template
            v-if="submenuThead &&
              submenuStatus &&
              colIndex === submenuEnableCol &&
              submenuThead.find(sub => sub.disabled.includes(header.headerKey) == 0)">
            <div class="submenu_wrap">
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
          </template>

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
    headers: Array,
    submenuThead: Array,
    submenuStatus: Boolean,
  },
  data() {
    return {
      eventDrag: false,
      submenuEnableCol: null,
      beforeChangeSize: {},
      newSize: '',
    };
  },
  computed: {
  },
  methods: {
    handleDownChangeSize(event, header, colIndex) {
      this.eventDrag = true;
      const element = this.$refs['resize-' + colIndex][0];
      this.beforeChangeSize = {
        col: colIndex,
        elementLeft: event.currentTarget.parentElement.offsetLeft,
        header: header,
        width: parseInt(header.style.width),
      }
      header.active = true;
      header.style.left = event.clientX;
      this.$forceUpdate();
    },
    handleMoveChangeSize(event) {
      if (this.eventDrag) {
        const newWidth = event.clientX - this.beforeChangeSize.elementLeft + 5;
        const element = this.$refs['resize-' + this.beforeChangeSize.col][0];
        this.newSize = newWidth + 'px';
        element.style.left = event.clientX + 'px';
      }
    },
    handleUpDragToFill(event) {
      this.eventDrag = false;
      const element = this.$refs['resize-' + this.beforeChangeSize.col][0];
      element.style.left = 'auto';
      this.headers[this.beforeChangeSize.col].style.width = this.newSize;
      this.beforeChangeSize.header.active = false;
    },
    handleContextMenuTd(event, entry, colIndex) {
      this.submenuEnableCol = colIndex;
      if (this.submenuStatus === true) {
        this.$emit('submenu-enable', 'tbody');
      } else {
        this.$emit('submenu-enable', 'thead');
      }
      this.$emit('thead-td-context-menu', event, entry, colIndex);
    },
    handleClickSubmenu(event, entry, colIndex, submenuFunction, selectOptions) {
      if (selectOptions) {
        this.$emit('thead-submenu-click-callback', event, entry, colIndex, submenuFunction, selectOptions);
      } else {
        this.$emit('thead-submenu-click-callback', event, entry, colIndex, submenuFunction);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.th {
  height: 40px;
  line-height: 40px;
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
}
.resize {
  position: absolute;
  top: 0;
  right: 0;
  height: 43px;
  background: #c7d6f3;
  width: 5px;
  padding: 0;
  border: 0;
  cursor: col-resize;
  box-shadow: none;
  outline: none;
  opacity: 0;
  transition: all ease .5s;
  &:hover {
    opacity: 1;
  }
  &:after {
    content: '';
    display: block;
    height: 200px;
    position: absolute;
    top: 0;
    right: 0;
    border: 1px dashed #c7d6f3;
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
  top: 40px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background: white;
  z-index: 20;
  padding: 7px 0;
  box-shadow: 0 0 15px 5px rgba(0, 0, 0, 0.1);
  button {
    display: block;
    height: 30px;
    line-height: 20px;
    padding: 4px 8px;
    margin: 0 auto;
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
    margin: 7px auto 7px;
    padding: 10px 8px;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    h3 {
      font-size: 12px;
      font-weight: 400;
      line-height: 1;
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
  float: right;
  position: relative;
  width: 10px;
  height: 100%;
  background: transparent;
  outline: none;
  border: 0;
  cursor: pointer;
  .icon_menu{
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
  &.active .icon_menu{
    transform: translateY(-50%) rotate(0deg);
  }
}
</style>
