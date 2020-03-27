<template>
  <div v-if="row[header].type === 'select' && row[header].handleSearch">
    <span :ref="`span-${currentTable}-${colIndex}-${rowIndex}`">{{ row[header].value }}</span>
    <i class="icon_glass" :class="{ show: row[header].search }" />
    <button
      :class="{ active: row[header].search === true }"
      class="enable_select"
      @click.stop="enableSelect($event, header, row[header], rowIndex, colIndex)"
    >
      <i />
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
      if (this.disabledEvent(col, header)) {
        this.searchInput = "";
        this.$emit("tbody-handle-to-open-select", event, header, col, rowIndex, colIndex);
      }
    },
    selectHandleChange(event, header, col, option, rowIndex, colIndex) {
      this.$emit("tbody-handle-select-change", event, header, col, option, rowIndex, colIndex);
    },
    handleSearchInputSelect(event, col, header, rowIndex, colIndex) {
      if (this.disabledEvent(col, header)) {
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
