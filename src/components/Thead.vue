<template>
  <thead class="thead">
    <tr>
      <template v-for="(header, colIndex) in header">
        <th
          class="th"
          :key="header.headerKey"
          @contextmenu="handleContextMenuTd($event, header.headerKey, colIndex)">
          <span>{{header.headerName | truncate}}</span>
            <template
              v-if="submenuThead &&
                submenuStatus &&
                colIndex === submenuEnableCol &&
                submenuThead.find(sub => sub.disabled.includes(header.headerKey) == 0)">
              <div class="submenu_wrap">
                <template v-for="(submenu, index) in submenuThead">
                  <template v-if="submenu.type === 'button'">
                    <button
                      v-if="submenu.disabled.includes(header.headerKey) == 0"
                      :key="index"
                      @click.stop="handleClickSubmenu($event, header.headerKey, colIndex, submenu.function)">
                      {{submenu.value}}
                    </button>
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
      this.$emit('submenu-enable', 'thead');
      this.$emit('thead-td-context-menu', event, entry, colIndex);
    },
    handleClickSubmenu(event, entry, colIndex, submenuFunction) {
      console.log(submenuFunction);
      this.$emit(`thead-submenu-click-${submenuFunction}`, event, entry, colIndex, submenuFunction);
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
  background: #dadada;
  border: 1px solid white;
  z-index: 15;
  text-align: left;
  padding: 2px 5px;
  box-sizing: border-box;
  border-right: 0;
  border-top: 0;
  transition: all ease 0.5s;
  &:last-child {
    border-right: 1px solid white;
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
