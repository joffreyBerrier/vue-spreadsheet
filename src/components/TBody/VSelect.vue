<template>
  <div v-if="value[header] && value[header].type === 'select'">
    <span :ref="`span-${currentTable}-${colIndex}-${rowIndex}`">{{ value[header].value }}</span>

    <!-- Select with custom dropdown -->
    <template v-if="value[header].handleSearch">
      <i class="glass_icon" :class="{ show: value[header].search }" />
      <button
        class="select_btn"
        @click.stop="enableSelect($event, header, value[header], rowIndex, colIndex)"
      >
        <i class="select_icon" :class="{ active: value[header].search === true }" />
      </button>

      <div v-if="value[header].search === true" class="dropdown">
        <input
          :ref="`input-${currentTable}-${colIndex}-${rowIndex}`"
          v-model="searchInput"
          :placeholder="trad[trad.lang].select.placeholder"
          @keyup.esc="escKeyup(value[header], rowIndex, header, colIndex, value[header].type)"
          @keyup.exact="handleSearchInputSelect($event, value[header], header, rowIndex, colIndex)"
        />
        <ul
          :ref="`dropdown-${currentTable}-${colIndex}-${rowIndex}`"
          :class="{ show: value[header].search }"
        >
          <li
            v-for="(option, index) in filteredList"
            :key="index"
            :class="{ active: option.active }"
            :value="option.value || option.item.value"
            @click.stop="
              selectHandleChange($event, header, value[header], option, rowIndex, colIndex)
            "
          >
            {{ option.label || option.item.label }}
          </li>
        </ul>
      </div>
    </template>

    <!-- Defaut user-agent select -->
    <template v-else>
      <select
        :value="value[header].value"
        @change="selectHandleChange($event, header, value[header], option, rowIndex, colIndex)"
      >
        <option
          v-for="(option, index) in value[header].selectOptions"
          :key="index"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
    </template>
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
    value: {
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
    enableSelect(event, header, cell, rowIndex, colIndex) {
      if (!this.disabledEvent(cell, header)) {
        this.searchInput = "";
        const activeOption = cell.selectOptions.find((opt) => opt.value === cell.value);

        if (activeOption) {
          activeOption.active = true;
        }

        this.$emit("tbody-handle-to-open-select", event, header, cell, rowIndex, colIndex);
      }
    },
    selectHandleChange(event, header, col, option, rowIndex, colIndex) {
      this.$emit("input", event.target.value);
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

<style scoped>
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
}
.glass_icon:after {
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

.glass_icon.show {
  opacity: 1;
  visibility: visible;
}
.select_btn {
  cursor: pointer;
  border: none;
  outline: none;
  background: transparent;
  position: absolute;
  z-index: 10;
  right: 8px;
  top: 0;
  bottom: 0;
}
.select_icon {
  display: inline-block;
  $size: 7px;
  width: $size;
  height: $size;
  border-top: 1px solid $icon-color;
  border-left: 1px solid $icon-color;
  background: transparent;
  color: transparent;
  text-decoration: none;
  transform: rotate(225deg);
  transition: transform 250ms ease-in-out;
}
.select_icon.active {
  transform: rotate(45deg);
}
</style>
