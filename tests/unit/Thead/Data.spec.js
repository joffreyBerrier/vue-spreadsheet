import { mount } from "@vue/test-utils";
import Thead from "@/components/Thead.vue";

// data
import exempleData from "@/data";

let wrapper;

beforeEach(() => {
  const { headers } = exempleData;
  const { tbodyIndex } = exempleData;
  const { submenuThead } = exempleData;
  const { disableSortThead } = exempleData;
  const { sortHeader } = exempleData;
  const theadHighlight = [];
  const currentTable = Date.now();
  const { tbodyCheckbox } = exempleData;
  const submenuStatusThead = true;
  const headerTop = 0;
  const vueTableHeight = 400;

  wrapper = mount(Thead, {
    propsData: {
      submenuStatusThead,
      theadHighlight,
      currentTable,
      tbodyCheckbox,
      headerTop,
      submenuThead,
      headers,
      disableSortThead,
      sortHeader,
      tbodyIndex,
      vueTableHeight,
    },
  });

  return wrapper;
});

describe("THead", () => {
  describe("Render component with props", () => {
    test("Vue Instance", () => {
      expect(wrapper.vm).toBeTruthy();
    });
  });

  describe("Data", () => {
    test("Present Data", () => {
      const tHead = wrapper.vm;

      expect(tHead.eventDrag).toBeFalsy();
      expect(tHead.submenuEnableCol).toBeNull();
      expect(tHead.beforeChangeSize).toEqual({});
      expect(tHead.newSize).toEqual("");
    });
  });
});
