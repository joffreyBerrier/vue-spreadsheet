import { mount } from "@vue/test-utils";
import VueTable from "@/components/VueTable.vue";

// data
import exempleData from "@/data";

let wrapper;

beforeEach(() => {
  const tbodyData = exempleData.products;
  const { headers } = exempleData;
  const { customOptions } = exempleData;
  const { styleWrapVueTable } = exempleData;
  const { disableCells } = exempleData;
  const { disableSortThead } = exempleData;
  const { loading } = exempleData;
  const { parentScrollElement } = exempleData;
  const { selectPosition } = exempleData;
  const { submenuTbody } = exempleData;
  const { submenuThead } = exempleData;

  wrapper = mount(VueTable, {
    propsData: {
      tbodyData,
      headers,
      customOptions,
      styleWrapVueTable,
      disableCells,
      disableSortThead,
      loading,
      parentScrollElement,
      selectPosition,
      submenuTbody,
      submenuThead,
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

  describe("createdCell", () => {
    test("return newData", () => {
      const tBody = wrapper.vm;
      const { newData } = exempleData.customOptions;

      expect(tBody.customOptions.newData).toEqual(newData);
    });

    test("return newProduct", () => {
      const tBody = wrapper.vm;
      const { newData } = exempleData.customOptions;
      const newHeader = {
        headerName: "H",
        headerKey: "h",
        style: {
          width: "200px",
          minWidth: "200px",
        },
      };

      tBody.headers.push(newHeader);
      tBody.headerKeys.push("h");

      expect(tBody.headerKeys.find((x) => x === "h")).toBeTruthy();
      expect(tBody.customOptions.newData).toEqual(newData);
      expect(tBody.tbodyData[0].h).toBeUndefined();

      tBody.createdCell();

      expect(tBody.tbodyData[0].h).toBeTruthy();
      expect(tBody.tbodyData[1].h).toBeTruthy();
      expect(tBody.tbodyData[2].h).toBeTruthy();
      expect(tBody.tbodyData[3].h).toBeTruthy();
      expect(tBody.tbodyData[4].h).toBeTruthy();
    });
  });

  describe("disabledEvent", () => {
    test("Disabled Col : false | with disableCells", () => {
      const fakeData = { disabled: false };

      expect(wrapper.vm.disabledEvent(fakeData, "a")).toBeFalsy();
    });
    test("Disabled Col : true | with disableCells", () => {
      const fakeData = { disabled: true };

      expect(wrapper.vm.disabledEvent(fakeData, "a")).toBeTruthy();
    });
    test("Disabled Col : undefined | with disableCells", () => {
      const fakeData = {};

      expect(wrapper.vm.disabledEvent(fakeData, "a")).toBeTruthy();
    });
    test("Disabled Col : false | without disableCells", () => {
      const fakeData = { disabled: false };

      expect(wrapper.vm.disabledEvent(fakeData, "b")).toBeFalsy();
    });
    test("Disabled Col : true | without disableCells", () => {
      const fakeData = { disabled: true };

      expect(wrapper.vm.disabledEvent(fakeData, "b")).toBeTruthy();
    });
    test("Disabled Col : undefined | without disableCells", () => {
      const fakeData = {};

      expect(wrapper.vm.disabledEvent(fakeData, "b")).toBeFalsy();
    });
  });

  describe("updateSelectedCell", () => {
    const row = 0;
    const col = 0;
    const header = "a";

    test("Check selectedCell", () => {
      wrapper.vm.updateSelectedCell(header, row, col);
      expect(wrapper.vm.selectedCell.header).toEqual(header);
      expect(wrapper.vm.selectedCell.row).toEqual(row);
      expect(wrapper.vm.selectedCell.col).toEqual(col);
    });

    test("setFirstCell = false", () => {
      wrapper.vm.setFirstCell = false;
      wrapper.vm.updateSelectedCell(header, row, col);
      expect(wrapper.vm.setFirstCell).toBeTruthy();
      expect(wrapper.vm.tbodyData[row][header].rectangleSelection).toBeTruthy();
    });
    test("setFirstCell = true", () => {
      wrapper.vm.setFirstCell = true;
      wrapper.vm.updateSelectedCell(header, row, col);
      expect(wrapper.vm.setFirstCell).toBeTruthy();
      expect(wrapper.vm.tbodyData[row][header].rectangleSelection).toBeTruthy();
    });
  });

  describe("enableSelect", () => {
    const rowIndex = 0;
    const colIndex = 5;
    const header = "f";

    test("search true", () => {
      const col = {
        search: true,
      };

      wrapper.vm.enableSelect("", header, col, rowIndex, colIndex);
      expect(wrapper.vm.tbodyData[rowIndex][header].search).toBeFalsy();
      expect(wrapper.vm.tbodyData[rowIndex][header].show).toBeFalsy();
      expect(wrapper.vm.lastSelectOpen).toBeNull();
    });
  });

  describe("showDropdown", () => {
    test("search true", () => {
      const rowIndex = 0;
      const colIndex = 5;

      wrapper.vm.showDropdown(colIndex, rowIndex);
    });
  });

  describe("handleTbodySelectChange", () => {
    test("return emit tbody-select-change", () => {
      const tBody = wrapper.vm;
      const data = tBody.tbodyData[0].f;
      const fakeEvent = {
        keyCode: 99,
      };
      const option = {
        active: true,
        label: "hagrid",
        value: "Hagrid",
      };

      tBody.handleTbodySelectChange(fakeEvent, "f", data, option, 0, 5);
      expect(wrapper.emitted("tbody-select-change")).toBeTruthy();
      expect(wrapper.emitted("tbody-select-change")).toEqual([
        [fakeEvent, "f", data, option, 0, 5],
      ]);
    });

    test("return emit tbody-change-data", () => {
      const tBody = wrapper.vm;
      const data = tBody.tbodyData[1].f;
      const fakeEvent = {
        keyCode: 99,
      };
      const option = {
        active: true,
        label: "hagrid",
        value: "Hagrid",
      };

      tBody.handleTbodySelectChange(fakeEvent, "f", data, option, 0, 5);
      expect(wrapper.emitted("tbody-change-data")).toBeTruthy();
      expect(wrapper.emitted("tbody-change-data")).toEqual([[0, "f"]]);
    });

    test("return currentData", () => {
      const tBody = wrapper.vm;
      const data = tBody.tbodyData[0].f;
      const fakeEvent = {
        keyCode: 99,
      };
      const option = {
        active: true,
        label: "hagrid",
        value: "Hagrid",
      };

      tBody.handleTbodySelectChange(fakeEvent, "f", data, option, 0, 5);

      expect(data.search).toBeFalsy();
      expect(data.show).toBeFalsy();
      expect(data.value).toEqual(option.value);

      expect(data.selectOptions.find((x) => x.value === option.value).active).toBeTruthy();

      expect(wrapper.emitted("tbody-select-change")).toBeTruthy();
      expect(wrapper.emitted("tbody-change-data")).toBeTruthy();
    });

    test("return currentData.show: false", () => {
      const tBody = wrapper.vm;
      const data = tBody.tbodyData[0].f;
      const fakeEvent = {
        keyCode: 99,
      };
      const option = {
        active: true,
        label: "hagrid",
        value: "Hagrid",
      };

      tBody.oldTdShow = { key: "f", row: 0, col: 6 };
      tBody.handleTbodySelectChange(fakeEvent, "f", data, option, 0, 5);

      expect(data.search).toBeFalsy();
      expect(data.show).toBeFalsy();
      expect(data.value).toEqual(option.value);
      expect(tBody.tbodyData[tBody.oldTdShow.row][tBody.oldTdShow.key].show).toBeFalsy();

      expect(data.selectOptions.find((x) => x.value === option.value).active).toBeTruthy();

      expect(wrapper.emitted("tbody-select-change")).toBeTruthy();
      expect(wrapper.emitted("tbody-change-data")).toBeTruthy();
    });
  });

  describe("setOldValueOnInputSelect", () => {
    test("return false", () => {
      const rowIndex = 0;
      const colIndex = 7;
      const header = "f";
      const data = wrapper.vm.tbodyData[rowIndex][header];
      const { type } = data;

      data.show = true;
      data.search = true;
      wrapper.vm.setOldValueOnInputSelect(data, rowIndex, header, colIndex, type);
      expect(data.show).toBeFalsy();
      expect(data.search).toBeFalsy();
    });
  });

  describe("enableSubmenu", () => {
    test("params Thead", () => {
      wrapper.vm.submenuStatusThead = false;
      wrapper.vm.submenuStatusTbody = true;
      wrapper.vm.enableSubmenu("thead");
      expect(wrapper.vm.submenuStatusThead).toBeTruthy();
      expect(wrapper.vm.submenuStatusTbody).toBeFalsy();
    });

    test("params Tbody", () => {
      wrapper.vm.submenuStatusThead = true;
      wrapper.vm.submenuStatusTbody = false;
      wrapper.vm.enableSubmenu("tbody");
      expect(wrapper.vm.submenuStatusThead).toBeFalsy();
      expect(wrapper.vm.submenuStatusTbody).toBeTruthy();
    });

    test("no Params", () => {
      wrapper.vm.submenuStatusThead = true;
      wrapper.vm.submenuStatusTbody = true;
      wrapper.vm.enableSubmenu();
      expect(wrapper.vm.submenuStatusThead).toBeFalsy();
      expect(wrapper.vm.submenuStatusTbody).toBeFalsy();
    });
  });

  describe("bindClassActiveOnTd", () => {
    const row = 0;
    const col = 0;
    const header = "a";

    test("show => be false | active => be truthly", () => {
      wrapper.vm.tbodyData[row][header].show = true;
      wrapper.vm.tbodyData[row][header].active = false;
      wrapper.vm.bindClassActiveOnTd(header, row, col);
      expect(wrapper.vm.tbodyData[row][header].show).toBeFalsy();
      expect(wrapper.vm.tbodyData[row][header].active).toBeTruthy();
    });
    test("oldTdActive equal to actualTd", () => {
      wrapper.vm.bindClassActiveOnTd(header, row, col);
      expect(wrapper.vm.oldTdActive.key).toEqual(header);
      expect(wrapper.vm.oldTdActive.row).toEqual(row);
      expect(wrapper.vm.oldTdActive.col).toEqual(col);
    });
  });

  describe("RemoveClass", () => {
    test("Keys to be falsy", () => {
      const fakeParams = [
        "selected",
        "rectangleSelection",
        "active",
        "show",
        "search",
        "typing",
        "stateCopy",
      ];
      // Add keys to true
      const data = wrapper.vm.tbodyData[0].a;

      data.rectangleSelection = false;
      data.active = true;
      data.show = true;
      data.search = true;
      data.typing = true;
      data.stateCopy = true;

      wrapper.vm.removeClass(fakeParams);

      // Expect keys are false
      Object.values(wrapper.vm.tbodyData[0]).forEach((tbodyData) => {
        const dataCompare = tbodyData;

        expect(dataCompare.selected).toBeFalsy();
        expect(dataCompare.rectangleSelection).toBeFalsy();
        expect(dataCompare.active).toBeFalsy();
        expect(dataCompare.show).toBeFalsy();
        expect(dataCompare.search).toBeFalsy();
        expect(dataCompare.typing).toBeFalsy();
        expect(dataCompare.stateCopy).toBeFalsy();
      });
    });

    test("selectedMultipleCellActive to be falsy", () => {
      wrapper.vm.selectedMultipleCellActive = true;
      wrapper.vm.removeClass(["selected"]);
      expect(wrapper.vm.selectedMultipleCellActive).toBeFalsy();
    });

    test("rectangleSelection to be falsy", () => {
      wrapper.vm.setFirstCell = true;
      wrapper.vm.removeClass(["rectangleSelection"]);
      expect(wrapper.vm.setFirstCell).toBeFalsy();
    });
  });

  describe("copyStoreData", () => {
    // 'drag / 'copy'
    test("Copy one cell", () => {
      const vueTable = wrapper.vm;
      const rowIndex = 0;
      const colIndex = 7;
      const header = "f";
      const data = vueTable.tbodyData[rowIndex][header];

      vueTable.selectedCell = {
        header,
        row: rowIndex,
        col: colIndex,
      };

      vueTable.copyStoreData("copy");
      expect(vueTable.storeCopyDatas[0].stateCopy).toBeFalsy();
      data.stateCopy = false;
      expect(vueTable.copyMultipleCell).toBeFalsy();
    });

    test("Copy multiple Col One Row", () => {
      const vueTable = wrapper.vm;
      const rowIndex = 0;
      const colIndex = 7;
      const header = "f";
      const multipleProduct = {
        colEnd: 3,
        colStart: 2,
        keyEnd: "d",
        keyStart: "c",
        rowEnd: 4,
        rowStart: 4,
      };

      vueTable.selectedCell = {
        header,
        row: rowIndex,
        col: colIndex,
      };
      vueTable.selectedCoordCells = multipleProduct;

      const col1 = vueTable.tbodyData[multipleProduct.rowStart][multipleProduct.keyStart];
      const col2 = vueTable.tbodyData[multipleProduct.rowEnd][multipleProduct.keyEnd];

      vueTable.selectedMultipleCell = true;
      vueTable.copyStoreData("copy");
      expect(vueTable.storeCopyDatas[0][multipleProduct.keyStart].stateCopy).toBeFalsy();
      expect(vueTable.storeCopyDatas[0][multipleProduct.keyEnd].stateCopy).toBeFalsy();

      vueTable.storeCopyDatas[0][multipleProduct.keyStart].stateCopy = false;
      col1.selected = false;
      col1.active = false;
      col1.stateCopy = false;
      col2.selected = false;
      col2.active = false;
      col2.stateCopy = false;

      expect(vueTable.storeCopyDatas[0][multipleProduct.keyStart]).toEqual(col1);
      expect(vueTable.storeCopyDatas[0][multipleProduct.keyEnd]).toEqual(col2);

      expect(vueTable.copyMultipleCell).toBeTruthy();
    });

    test("Copy multiple Col Multiple Row", () => {
      const rowIndex = 0;
      const colIndex = 7;
      const header = "f";
      const multipleProduct = {
        colEnd: 3,
        colStart: 2,
        keyEnd: "d",
        keyStart: "c",
        rowEnd: 5,
        rowStart: 4,
      };

      wrapper.vm.selectedCell = {
        header,
        row: rowIndex,
        col: colIndex,
      };
      wrapper.vm.selectedCoordCells = multipleProduct;

      const product1Col1 = wrapper.vm.tbodyData[multipleProduct.rowStart][multipleProduct.keyStart];
      const product1Col2 = wrapper.vm.tbodyData[multipleProduct.rowStart][multipleProduct.keyEnd];
      const product2Col1 = wrapper.vm.tbodyData[multipleProduct.rowEnd][multipleProduct.keyStart];
      const product2Col2 = wrapper.vm.tbodyData[multipleProduct.rowEnd][multipleProduct.keyEnd];

      wrapper.vm.selectedMultipleCell = true;
      wrapper.vm.copyStoreData("copy");

      expect(wrapper.vm.storeCopyDatas.length).toEqual(2);
      expect(Object.values(wrapper.vm.storeCopyDatas).length).toEqual(2);

      product1Col1.stateCopy = false;
      product1Col2.stateCopy = false;

      product2Col1.selected = false;
      product2Col1.stateCopy = false;
      product2Col1.active = false;

      product2Col2.selected = false;
      product2Col2.stateCopy = false;
      product2Col2.active = false;

      expect(wrapper.vm.storeCopyDatas[0][multipleProduct.keyStart]).toEqual(product1Col1);
      expect(wrapper.vm.storeCopyDatas[0][multipleProduct.keyEnd]).toEqual(product1Col2);

      expect(wrapper.vm.storeCopyDatas[1][multipleProduct.keyStart]).toEqual(product2Col1);
      expect(wrapper.vm.storeCopyDatas[1][multipleProduct.keyEnd]).toEqual(product2Col2);

      expect(wrapper.vm.copyMultipleCell).toBeTruthy();
    });

    test("Drag one cell", () => {
      const rowIndex = 0;
      const colIndex = 7;
      const header = "f";

      wrapper.vm.selectedCell = {
        header,
        row: rowIndex,
        col: colIndex,
      };

      wrapper.vm.copyStoreData("drag");
      expect(wrapper.vm.storeCopyDatas.length).toEqual(1);
    });
  });

  describe("moveOnTable", () => {
    test("top", () => {
      const tBody = wrapper.vm;
      const vueTable = tBody.$refs[`${tBody.customTable}-vueTable`];
      const fakeEvent = {
        keyCode: 38,
        preventDefault() {
          return "preventDefault";
        },
      };

      tBody.moveOnTable(fakeEvent, 0, 0);
      expect(vueTable.scrollTop).toEqual(-40);
      expect(vueTable.scrollLeft).toEqual(0);
    });

    test("bottom", () => {
      const tBody = wrapper.vm;
      const vueTable = tBody.$refs[`${tBody.customTable}-vueTable`];
      const fakeEvent = {
        keyCode: 40,
        preventDefault() {
          return "preventDefault";
        },
      };

      tBody.moveOnTable(fakeEvent, 0, 0);
      expect(vueTable.scrollTop).toEqual(40);
      expect(vueTable.scrollLeft).toEqual(0);
    });

    test("left", () => {
      const tBody = wrapper.vm;
      const vueTable = tBody.$refs[`${tBody.customTable}-vueTable`];
      const fakeEvent = {
        keyCode: 37,
        preventDefault() {
          return "preventDefault";
        },
      };

      tBody.moveOnTable(fakeEvent, 0, 0);
      expect(vueTable.scrollTop).toEqual(0);
      expect(vueTable.scrollLeft).toEqual(-200);
    });

    test("right", () => {
      const tBody = wrapper.vm;
      const vueTable = tBody.$refs[`${tBody.customTable}-vueTable`];
      const fakeEvent = {
        keyCode: 39,
        preventDefault() {
          return "preventDefault";
        },
      };

      tBody.moveOnTable(fakeEvent, 0, 0);
      expect(vueTable.scrollTop).toEqual(0);
      expect(vueTable.scrollLeft).toEqual(200);
    });

    test("top left", () => {
      const tBody = wrapper.vm;
      const vueTable = tBody.$refs[`${tBody.customTable}-vueTable`];
      const fakeEvent = {
        keyCode: 38,
        preventDefault() {
          return "preventDefault";
        },
      };
      const fakeEvent2 = {
        keyCode: 37,
        preventDefault() {
          return "preventDefault";
        },
      };

      tBody.moveOnTable(fakeEvent, 0, 0);
      tBody.moveOnTable(fakeEvent2, 0, 0);
      expect(vueTable.scrollTop).toEqual(-40);
      expect(vueTable.scrollLeft).toEqual(-200);
    });

    test("top right", () => {
      const tBody = wrapper.vm;
      const vueTable = tBody.$refs[`${tBody.customTable}-vueTable`];
      const fakeEvent = {
        keyCode: 38,
        preventDefault() {
          return "preventDefault";
        },
      };
      const fakeEvent2 = {
        keyCode: 39,
        preventDefault() {
          return "preventDefault";
        },
      };

      tBody.moveOnTable(fakeEvent, 0, 0);
      tBody.moveOnTable(fakeEvent2, 0, 0);
      expect(vueTable.scrollTop).toEqual(-40);
      expect(vueTable.scrollLeft).toEqual(200);
    });

    test("bottom left", () => {
      const tBody = wrapper.vm;
      const vueTable = tBody.$refs[`${tBody.customTable}-vueTable`];
      const fakeEvent = {
        keyCode: 40,
        preventDefault() {
          return "preventDefault";
        },
      };
      const fakeEvent2 = {
        keyCode: 37,
        preventDefault() {
          return "preventDefault";
        },
      };

      tBody.moveOnTable(fakeEvent, 0, 0);
      tBody.moveOnTable(fakeEvent2, 0, 0);
      expect(vueTable.scrollTop).toEqual(40);
      expect(vueTable.scrollLeft).toEqual(-200);
    });

    test("bottom right", () => {
      const tBody = wrapper.vm;
      const vueTable = tBody.$refs[`${tBody.customTable}-vueTable`];
      const fakeEvent = {
        keyCode: 40,
        preventDefault() {
          return "preventDefault";
        },
      };
      const fakeEvent2 = {
        keyCode: 39,
        preventDefault() {
          return "preventDefault";
        },
      };

      tBody.moveOnTable(fakeEvent, 0, 0);
      tBody.moveOnTable(fakeEvent2, 0, 0);
      expect(vueTable.scrollTop).toEqual(40);
      expect(vueTable.scrollLeft).toEqual(200);
    });
  });

  describe("callbackSort", () => {
    test("Emitted", () => {
      const tBody = wrapper.vm;

      tBody.callbackSort("fakeEvent", "h", 2);
      expect(wrapper.emitted("thead-td-sort")).toBeTruthy();
      expect(wrapper.emitted("thead-td-sort")).toEqual([["fakeEvent", "h", 2]]);
    });
  });

  describe("callbackSubmenuTbody", () => {
    test("Emitted", () => {
      const tBody = wrapper.vm;

      tBody.callbackSubmenuTbody("", "b", 0, 2, "input", "test-function");
      expect(wrapper.emitted("tbody-submenu-click-test-function")).toBeTruthy();
      expect(wrapper.emitted("tbody-submenu-click-test-function")).toEqual([
        ["", "b", 0, 2, "input", "test-function"],
      ]);
    });
  });

  describe("callbackSubmenuThead", () => {
    test("Emitted without option", () => {
      const tBody = wrapper.vm;

      tBody.submenuStatusThead = true;
      tBody.callbackSubmenuThead("fakeEvent", "b", 0, "test-function", undefined);
      expect(wrapper.emitted("thead-submenu-click-test-function")).toBeTruthy();
      expect(tBody.submenuStatusThead).toBeFalsy();
      expect(wrapper.emitted("thead-submenu-click-test-function")).toEqual([["fakeEvent", "b", 0]]);
    });

    test("Emitted with option", () => {
      const tBody = wrapper.vm;

      tBody.submenuStatusThead = true;
      tBody.callbackSubmenuThead("fakeEvent", "b", 0, "test-function", ["a"]);
      expect(wrapper.emitted("thead-submenu-click-test-function")).toBeTruthy();
      expect(tBody.submenuStatusThead).toBeFalsy();
      expect(wrapper.emitted("thead-submenu-click-test-function")).toEqual([
        ["fakeEvent", "b", 0, ["a"]],
      ]);
    });
  });

  describe("handleTheadContextMenu", () => {
    test("submenuStatusTbody: false", () => {
      const tBody = wrapper.vm;

      tBody.submenuStatusTbody = true;
      expect(tBody.submenuStatusTbody).toBeTruthy();
      tBody.handleTheadContextMenu();
      expect(tBody.submenuStatusTbody).toBeFalsy();
    });
  });

  describe("createdCell", () => {
    test("return newData", () => {
      const tBody = wrapper.vm;
      const { newData } = exempleData.customOptions;

      expect(tBody.customOptions.newData).toEqual(newData);
    });
  });

  describe("changeData", () => {
    test("return changeDataIncrement", () => {
      const tBody = wrapper.vm;

      tBody.changeData(1, "a");

      expect(tBody.changeDataIncrement).toEqual(1);
    });

    test("return storeUndoData", () => {
      const tBody = wrapper.vm;

      tBody.changeData(1, "a");

      expect(tBody.storeUndoData.length).toEqual(1);
    });

    test("return emit tbody-change-data", () => {
      const tBody = wrapper.vm;

      tBody.changeData(1, "a");

      expect(wrapper.emitted("tbody-change-data")).toBeTruthy();
    });
  });

  describe("rollBackUndo", () => {
    test("return changeDataIncrement", () => {
      const tBody = wrapper.vm;

      tBody.tbodyData[1].a.value = "fake";
      tBody.changeData(1, "a");
      const index = tBody.changeDataIncrement - 1;
      const store = tBody.storeUndoData[index];

      tBody.rollBackUndo();

      expect(tBody.tbodyData[store.rowIndex][store.header]).toEqual(store.cell.duplicate);
      expect(tBody.changeDataIncrement).toEqual(0);
      expect(tBody.storeUndoData).toEqual([]);
      expect(wrapper.emitted("tbody-undo-data")).toEqual([[store.rowIndex, store.header]]);
    });
  });
});
