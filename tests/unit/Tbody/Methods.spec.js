import { mount } from "@vue/test-utils";
import Tbody from "@/components/TBody/TBody.vue";

// data
import exempleData from "@/data";

let wrapper;

beforeEach(() => {
  const tbodyData = exempleData.products;
  const { headers } = exempleData;
  const { tbodyIndex } = exempleData.customOptions;
  const { trad } = exempleData.customOptions;
  const { disableCells } = exempleData;
  const tbodyHighlight = [];
  const { tbodyCheckbox } = exempleData;
  const { submenuTbody } = exempleData;
  const currentTable = Date.now();
  const filteredList = exempleData.products[0].f.selectOptions;
  const submenuStatusTbody = true;

  wrapper = mount(Tbody, {
    propsData: {
      disableCells,
      headers,
      currentTable,
      tbodyCheckbox,
      tbodyHighlight,
      submenuTbody,
      submenuStatusTbody,
      filteredList,
      tbodyData,
      trad,
      tbodyIndex,
    },
  });

  return wrapper;
});

describe("VueTable", () => {
  describe("Render component with props", () => {
    test("Vue Instance", () => {
      expect(wrapper.isVueInstance()).toBeTruthy();
    });
  });

  describe("Methods", () => {
    describe("DisabledEvent", () => {
      test("Disabled Col : false | with disableCells", () => {
        const fakeData = { disabled: false };

        expect(wrapper.vm.disabledEvent(fakeData, "a")).toBeTruthy();
      });
      test("Disabled Col : true | with disableCells", () => {
        const fakeData = { disabled: true };

        expect(wrapper.vm.disabledEvent(fakeData, "a")).toBeFalsy();
      });
      test("Disabled Col : false | without disableCells", () => {
        const fakeData = { disabled: false };

        expect(wrapper.vm.disabledEvent(fakeData, "b")).toBeTruthy();
      });
      test("Disabled Col : true | without disableCells", () => {
        const fakeData = { disabled: true };

        expect(wrapper.vm.disabledEvent(fakeData, "b")).toBeFalsy();
      });
    });

    describe("handleDownDragToFill", () => {
      test("return eventDrag to true", () => {
        const tBody = wrapper.vm;
        const col = exempleData.products[0].f;

        expect(tBody.eventDrag).toBeFalsy();
        tBody.handleDownDragToFill("", "f", col, 0, 7);
        expect(tBody.eventDrag).toBeTruthy();
      });

      test("emitted tbody-down-dragtofill", () => {
        const tBody = wrapper.vm;
        const col = exempleData.products[0].f;

        tBody.handleDownDragToFill("", "f", col, 0, 7);
        expect(wrapper.emitted("tbody-down-dragtofill")).toBeTruthy();
      });

      test("not emitted tbody-down-dragtofill", () => {
        const tBody = wrapper.vm;
        const col = exempleData.products[0].a;

        tBody.handleDownDragToFill("", "a", col, 0, 7);
        expect(wrapper.emitted("tbody-down-dragtofill")).toBeFalsy();
      });
    });

    describe("handleMoveDragToFill", () => {
      test("not emitted tbody-move-dragtofill", () => {
        const tBody = wrapper.vm;
        const col = exempleData.products[0].f;

        tBody.handleMoveDragToFill("", "f", col, 0, 7);
        expect(wrapper.emitted("tbody-move-dragtofill")).toBeFalsy();
      });

      test("emitted tbody-move-dragtofill", () => {
        const tBody = wrapper.vm;
        const col = exempleData.products[0].f;

        tBody.eventDrag = true;
        tBody.handleMoveDragToFill("", "f", col, 0, 7);
        expect(wrapper.emitted("tbody-move-dragtofill")).toBeTruthy();
      });
    });

    describe("handleUpDragToFill", () => {
      test("not emitted tbody-up-dragtofill", () => {
        const tBody = wrapper.vm;
        const col = exempleData.products[0].f;

        tBody.handleUpDragToFill("", "f", col, 0, 7);
        expect(wrapper.emitted("tbody-up-dragtofill")).toBeFalsy();
      });

      test("emitted tbody-up-dragtofill", () => {
        const tBody = wrapper.vm;
        const col = exempleData.products[0].f;

        tBody.eventDrag = true;
        tBody.handleUpDragToFill("", "f", col, 0, 7);
        expect(wrapper.emitted("tbody-up-dragtofill")).toBeTruthy();
        expect(Tbody.eventDrag).toBeFalsy();
      });
    });

    describe("handleClickTd", () => {
      test("emitted tbody-td-click", () => {
        const tBody = wrapper.vm;
        const col = exempleData.products[0].f;

        tBody.handleClickTd("", "f", col, 0, 7);
        // expect(tBody.searchInput).toEqual("");
        expect(wrapper.emitted("tbody-td-click")).toBeTruthy();
      });
    });

    describe("handleDoubleClickTd", () => {
      test("not emitted tbody-td-double-click", () => {
        const tBody = wrapper.vm;
        const col = exempleData.products[0].a;

        tBody.handleDoubleClickTd("", "a", col, 0, 7, "input");
        expect(wrapper.emitted("tbody-td-double-click")).toBeFalsy();
      });
    });

    describe("handleContextMenuTd", () => {
      test("submenuEnableCol / submenuEnableRow", () => {
        const tBody = wrapper.vm;

        tBody.handleContextMenuTd("", "a", 0, 7, "input");

        expect(tBody.submenuEnableCol).toEqual(7);
        expect(tBody.submenuEnableRow).toEqual(0);
      });

      test("emitted handle-to-calculate-position", () => {
        const tBody = wrapper.vm;

        tBody.handleContextMenuTd("", "a", 0, 7, "input");

        expect(wrapper.emitted("handle-to-calculate-position")).toBeTruthy();
      });

      test("emitted submenu-enable", () => {
        const tBody = wrapper.vm;

        tBody.handleContextMenuTd("", "a", 0, 7, "input");

        expect(wrapper.emitted("submenu-enable")).toBeTruthy();
      });

      test("emitted tbody-td-context-menu", () => {
        const tBody = wrapper.vm;

        tBody.handleContextMenuTd("", "a", 0, 7, "input");

        expect(wrapper.emitted("tbody-td-context-menu")).toBeTruthy();
      });
    });

    describe("inputHandleChange", () => {
      test("emitted tbody-input-change", () => {
        const tBody = wrapper.vm;

        tBody.inputHandleChange("", "a", 0, 7, "input");

        expect(wrapper.emitted("tbody-input-change")).toBeTruthy();
      });
    });

    describe("handleClickSubmenu", () => {
      test("emitted tbody-submenu-click-callback", () => {
        const tBody = wrapper.vm;

        tBody.handleClickSubmenu("", "a", 0, 7, "input");

        expect(wrapper.emitted("tbody-submenu-click-callback")).toBeTruthy();
      });
    });
  });
});
