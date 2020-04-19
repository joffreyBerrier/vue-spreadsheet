import { mount } from "@vue/test-utils";
import VSelect from "@/components/TBody/VSelect.vue";

// data
import exempleData from "@/data";

let wrapper;
const colIndex = 1;
const currentTable = Date.now();

let disabledEvent = () => {
  return true;
};

const header = "f";
const filteredList = exempleData.products[0].f.selectOptions;
const row = exempleData.products[0];
const rowIndex = 2;
const { trad } = exempleData.customOptions;

beforeEach(() => {
  wrapper = mount(VSelect, {
    propsData: {
      colIndex,
      currentTable,
      disabledEvent,
      filteredList,
      header,
      row,
      rowIndex,
      trad,
    },
  });

  return wrapper;
});

describe("Select", () => {
  describe("Render component with props", () => {
    test("Vue Instance", () => {
      expect(wrapper.isVueInstance()).toBeTruthy();
    });
  });

  describe("enableSelect", () => {
    test("emitted tbody-handle-to-open-select", () => {
      const select = wrapper.vm;

      select.enableSelect("", header, row, rowIndex, colIndex);

      expect(wrapper.emitted("tbody-handle-to-open-select")).toBeTruthy();
    });
    test("not emitted tbody-handle-to-open-select", () => {
      disabledEvent = () => {
        return false;
      };

      const newWrapper = mount(VSelect, {
        propsData: {
          colIndex,
          currentTable,
          disabledEvent,
          filteredList,
          header,
          row,
          rowIndex,
          trad,
        },
      });
      const select = newWrapper.vm;

      select.enableSelect("", header, row, rowIndex, colIndex);

      expect(wrapper.emitted("tbody-handle-to-open-select")).toBeFalsy();
    });
  });

  describe("selectHandleChange", () => {
    test("emitted tbody-select-change", () => {
      disabledEvent = () => {
        return true;
      };

      const select = wrapper.vm;

      select.selectHandleChange("", header, row, "", rowIndex, colIndex);

      expect(wrapper.emitted("tbody-handle-select-change")).toBeTruthy();
    });
  });

  describe("handleSearchInputSelect", () => {
    test("emitted tbody-handle-search-input-select", () => {
      const select = wrapper.vm;

      select.handleSearchInputSelect("", header, row, "f", rowIndex, colIndex);

      expect(wrapper.emitted("tbody-handle-search-input-select")).toBeTruthy();
    });

    test("not emitted tbody-handle-search-input-select", () => {
      disabledEvent = () => {
        return false;
      };

      const newWrapper = mount(VSelect, {
        propsData: {
          colIndex,
          currentTable,
          disabledEvent,
          filteredList,
          header,
          row,
          rowIndex,
          trad,
        },
      });
      const select = newWrapper.vm;

      select.handleSearchInputSelect("", header, row, "f", rowIndex, colIndex);

      expect(wrapper.emitted("tbody-handle-search-input-select")).toBeFalsy();
    });
  });
});
