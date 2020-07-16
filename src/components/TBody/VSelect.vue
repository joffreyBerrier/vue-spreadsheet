<template>
  <div v-if="row[header].type === 'select' && row[header].handleSearch">
    <button
      class="select_btn"
      @click.stop="enableSelect($event, header, row[header], rowIndex, colIndex)"
    >
      <span :ref="`span-${currentTable}-${colIndex}-${rowIndex}`">{{ row[header].value }}</span>
      <i class="glass_icon" :class="{ show: row[header].search }" />
      <i class="select_icon" :class="{ active: row[header].search === true }" />
    </button>

    <div v-if="row[header].search === true" class="dropdown">
      <input
        :ref="`input-${currentTable}-${colIndex}-${rowIndex}`"
        v-model="searchInput"
        :placeholder="trad[trad.lang].select.placeholder"
        @keyup.esc="escKeyup(row[header], rowIndex, header, colIndex, row[header].type)"
        @keyup.exact="handleSearchInputSelect($event, row[header], header, rowIndex, colIndex)"
      />
      <ul
        :ref="`dropdown-${currentTable}-${colIndex}-${rowIndex}`"
        :class="{ show: row[header].search }"
      >
        <li
          v-for="(option, index) in filteredList"
          :key="index"
          :class="{ active: option.active }"
          :value="option.value"
          @click.stop="selectHandleChange($event, header, row[header], option, rowIndex, colIndex)"
        >
          {{ option.label }}
        </li>
      </ul>
    </div>
  </div>

  <div v-else-if="row[header].type === 'select'">
    <span :ref="`span-${currentTable}-${colIndex}-${rowIndex}`">{{ row[header].value }}</span>
    <select
      v-model="row[header].value"
      @change="selectHandleChange($event, header, row[header], option, rowIndex, colIndex)"
    >
      <option
        v-for="(option, index) in row[header].selectOptions"
        :key="index"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "VsSelect",
  props: {
    colIndex: {
      type: Number,
      require: true,
    },
    currentTable: {
      type: Number,
      required: true,
    },
    disabledEvent: {
      type: Function,
      required: true,
    },
    filteredList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    header: {
      type: String,
      default: "",
    },
    row: {
      type: Object,
      default: () => {
        return {};
      },
    },
    rowIndex: {
      type: Number,
      require: true,
    },
    trad: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      searchInput: "",
    };
  },
  methods: {
    enableSelect(event, header, col, rowIndex, colIndex) {
      if (!this.disabledEvent(col, header)) {
        this.searchInput = "";
        this.$emit("tbody-handle-to-open-select", event, header, col, rowIndex, colIndex);
      }
    },
    selectHandleChange(event, header, col, option, rowIndex, colIndex) {
      this.$emit("tbody-handle-select-change", event, header, col, option, rowIndex, colIndex);
    },
    handleSearchInputSelect(event, col, header, rowIndex, colIndex) {
      if (!this.disabledEvent(col, header)) {
        this.$emit(
          "tbody-handle-search-input-select",
          event,
          header,
          col,
          this.searchInput,
          rowIndex,
          colIndex
        );
      }
    },
  },
};
</script>

<style lang="scss" scoped>
$icon-color: lighten(black, 10%);

.glass_icon {
  position: absolute;
  top: 12px;
  right: 25px;
  z-index: 13;
  width: 12px;
  height: 12px;
  border-radius: 50px;
  border: 1px solid $icon-color;
  opacity: 0;
  visibility: hidden;
  transition: all 300ms ease;
  &:after {
    content: "";
    display: block;
    position: absolute;
    transform: rotate(45deg);
    bottom: 0;
    right: -4px;
    height: 1px;
    width: 5px;
    background: $icon-color;
  }
  &.show {
    opacity: 1;
    visibility: visible;
  }
}
.select_btn {
  cursor: pointer;
  border: none;
  background: transparent;
}
.select_icon {
  $size: 7px;
  position: absolute;
  display: inline-block;
  right: 8px;
  top: 0;
  bottom: 0;
  margin: auto;
  width: $size;
  height: $size;
  border-top: 1px solid $icon-color;
  border-left: 1px solid $icon-color;
  background: transparent;
  color: transparent;
  text-decoration: none;
  transform: rotate(225deg);
  transition: transform 250ms ease-in-out;
  &.active {
    transform: rotate(45deg);
  }
}
</style>
