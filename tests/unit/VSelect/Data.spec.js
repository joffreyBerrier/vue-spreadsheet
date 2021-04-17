import { mount } from "@vue/test-utils";
import VSelect from "@/components/TBody/VSelect.vue";

// data
import exempleData from "@/data";

let wrapper;

beforeEach(() => {
  const colIndex = 1;
  const currentTable = Date.now();

  const disabledEvent = (col, header) => {
    if (col.disabled === undefined) {
      return this.disableCells.some((x) => x === header);
    }

    return col.disabled;
  };

  const filteredList = exempleData.products[0].f.selectOptions;
  const header = "f";
  const row = exempleData.products[0];
  const rowIndex = 2;
  const { trad } = exempleData.customOptions;

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

describe("VSelect", () => {
  describe("Render component with props", () => {
    test("Vue Instance", () => {
      expect(wrapper.vm).toBeTruthy();
    });
  });

  describe("Data", () => {
    test("Present Data", () => {
      const select = wrapper.vm;

      expect(select.searchInput).toEqual("");
    });
  });
});
