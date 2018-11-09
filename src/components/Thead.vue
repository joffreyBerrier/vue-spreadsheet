<template>
  <thead class="thead">
    <tr>
      <template v-for="(header, colIndex) in header">
        <th
          class="th"
          :style="header.style"
          v-bind:class="{'disabled': header.disabled}"
          :key="header.headerKey">
          <span>{{header.headerName | truncate}}</span>

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
                    @click.stop="handleClickSubmenu($event, header.headerKey, colIndex, sub.function)">
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
                      @click.stop="handleClickSubmenu($event, header.headerKey, colIndex, sub.buttonOption.function, sub.value)">
                        {{sub.buttonOption.value}}
                    </button>
                  </div>
                </template>
              </template>
            </div>
          </template>
        </th>
      </template>
    </tr>
  </thead>
</template>

<script type="text/javascript">
export default {
  name: 'vue-thead',
  props: {
    header: Array,
    submenuThead: Array,
    submenuStatus: Boolean,
  },
  data() {
    return {
      submenuEnableCol: null,
    };
  },
  computed: {
  },
  methods: {
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
  width: 120px;
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
