import { mount } from '@vue/test-utils';
import VueTable from '../../src/components/VueTable.vue';

// data
import exempleData from '../../src/data';

let wrapper;

beforeEach(() => {
  const { disableCells } = exempleData;
  const { disableSortThead } = exempleData;
  const { dragToFill } = exempleData;
  const { headers } = exempleData;
  const { loading } = exempleData;
  const { newData } = exempleData;
  const { sortHeader } = exempleData;
  const { styleWrapVueTable } = exempleData;
  const { submenuTbody } = exempleData;
  const { submenuThead } = exempleData;
  const tbodyData = exempleData.products;
  const { tbodyIndex } = exempleData;
  const parentElementScroll = 0;
  const parentScrollElement = 'html';

  wrapper = mount(VueTable, {
    propsData: {
      disableCells,
      disableSortThead,
      dragToFill,
      headers,
      loading,
      newData,
      sortHeader,
      styleWrapVueTable,
      submenuTbody,
      submenuThead,
      tbodyData,
      tbodyIndex,
      parentElementScroll,
      parentScrollElement,
    },
  });
  return wrapper;
});

describe('VueTable', () => {

  describe('Render component with props', () => {
    test('Vue Instance', () => {
      expect(wrapper.isVueInstance()).toBeTruthy();
    });
  });

  describe('Data', () => {
    test('Present Data', () => {
      const vueTable = wrapper.vm;

      expect(vueTable.disableKeyTimeout).toEqual(null);
      expect(vueTable.eventDrag).toEqual(false);
      expect(vueTable.incrementCol).toEqual(0);
      expect(vueTable.incrementOption).toEqual(null);
      expect(vueTable.incrementRow).toEqual(null);
      expect(vueTable.keys).toEqual({});
      expect(vueTable.lastSelectOpen).toEqual(null);
      expect(vueTable.lastSubmenuOpen).toEqual(null);
      expect(vueTable.oldTdActive).toEqual(null);
      expect(vueTable.oldTdShow).toEqual(null);
      expect(vueTable.pressedShift).toEqual(0);
      expect(vueTable.rectangleSelectedCell).toEqual(null);
      expect(vueTable.scrollDocument).toEqual(null);
      expect(vueTable.scrollToSelectTimeout).toEqual(null);
      expect(vueTable.selectedCell).toEqual(null);
      expect(vueTable.selectedCoordCells).toEqual(null);
      expect(vueTable.selectedCoordCopyCells).toEqual(null);
      expect(vueTable.selectedMultipleCell).toEqual(false);
      expect(vueTable.selectedMultipleCellActive).toEqual(false);
      expect(vueTable.setFirstCell).toEqual(false);
      expect(vueTable.storeCopyDatas).toEqual([]);
      expect(vueTable.storeRectangleSelection).toEqual([]);
      expect(vueTable.submenuStatusTbody).toEqual(false);
      expect(vueTable.submenuStatusThead).toEqual(false);
    });
  });
  
  describe('Computed', () => {

    test('colHeaderWidths', () => {
      const { colHeaderWidths } = wrapper.vm;
      const colHeaderWidthsTest = wrapper.vm.headers.map(x => parseInt(x.style.width, 10));
      expect(colHeaderWidths).toEqual(colHeaderWidthsTest);
    });

    test('filteredList empty', () => {
      const { filteredList } = wrapper.vm;
      expect(filteredList).toEqual([]);
    });

    test('filteredList not empty', () => {
      wrapper.vm.lastSelectOpen = {
        col: {
          selectOptions: [
            {
              value: 'abcd efgh',
              label: 'abcd efgh',
            },
            {
              value: 'ijkl mnop',
              label: 'ijkl mnop',
            },
          ],
        },
        searchValue: 'abcd',
      };
      const { filteredList } = wrapper.vm;
      expect(filteredList[0].value).toEqual('abcd efgh');
    });

    test('headerKeys', () => {
      const { headerKeys } = wrapper.vm;
      const headerKeysTest = wrapper.vm.headers.map(header => header.headerKey);
      expect(headerKeys).toEqual(headerKeysTest);
    });
  });

  describe('Methods', () => {
    describe('DisabledEvent', () => {
      test('Disabled Col : false | with disableCells', () => {
        const fakeData = { disabled: false };
        expect(wrapper.vm.disabledEvent(fakeData, 'a')).toBeTruthy()
      })
      test('Disabled Col : true | with disableCells', () => {
        const fakeData = { disabled: true };
        expect(wrapper.vm.disabledEvent(fakeData, 'a')).toBeFalsy();
      });
      test('Disabled Col : false | without disableCells', () => {
        const fakeData = { disabled: false };
        expect(wrapper.vm.disabledEvent(fakeData, 'b')).toBeTruthy();
      });
      test('Disabled Col : true | without disableCells', () => {
        const fakeData = { disabled: true };
        expect(wrapper.vm.disabledEvent(fakeData, 'b')).toBeFalsy();
      });
    });

    describe('enableSubmenu', () => {
      test('params Thead', () => {
        wrapper.vm.submenuStatusThead = false;
        wrapper.vm.submenuStatusTbody = true;
        wrapper.vm.enableSubmenu('thead');
        expect(wrapper.vm.submenuStatusThead).toBeTruthy();
        expect(wrapper.vm.submenuStatusTbody).toBeFalsy();
      });

      test('params Tbody', () => {
        wrapper.vm.submenuStatusThead = true;
        wrapper.vm.submenuStatusTbody = false;
        wrapper.vm.enableSubmenu('tbody');
        expect(wrapper.vm.submenuStatusThead).toBeFalsy();
        expect(wrapper.vm.submenuStatusTbody).toBeTruthy();
      });

      test('no Params', () => {
        wrapper.vm.submenuStatusThead = true;
        wrapper.vm.submenuStatusTbody = true;
        wrapper.vm.enableSubmenu();
        expect(wrapper.vm.submenuStatusThead).toBeFalsy();
        expect(wrapper.vm.submenuStatusTbody).toBeFalsy();
      });
    });

    describe('bindClassActiveOnTd', () => {
      const row = 0;
      const col = 0;
      const header = 'a';

      test('show => be false | active => be truthly', () => {
        wrapper.vm.tbodyData[row][header].show = true;
        wrapper.vm.tbodyData[row][header].active = false;
        wrapper.vm.bindClassActiveOnTd(header, row, col);
        expect(wrapper.vm.tbodyData[row][header].show).toBeFalsy();
        expect(wrapper.vm.tbodyData[row][header].active).toBeTruthy();
      });
      test('oldTdActive equal to actualTd', () => {
        wrapper.vm.bindClassActiveOnTd(header, row, col);
        expect(wrapper.vm.oldTdActive.key).toEqual(header);
        expect(wrapper.vm.oldTdActive.row).toEqual(row);
        expect(wrapper.vm.oldTdActive.col).toEqual(col);
      });
    });

    describe('RemoveClass', () => {
      test('Keys to be falsy', () => {
        const fakeParams = ['selected', 'rectangleSelection', 'active', 'show', 'search', 'typing', 'stateCopy'];
        // Add keys to true
        Object.values(wrapper.vm.tbodyData[0]).forEach(tbodyData => {
          const data = tbodyData;
          data.selected = true;
          data.rectangleSelection = true;
          data.active = true;
          data.show = true;
          data.search = true;
          data.typing = true;
          data.stateCopy = true;
        });

        wrapper.vm.removeClass(fakeParams);

        // Expect keys are false
        Object.values(wrapper.vm.tbodyData[0]).forEach(tbodyData => {
          const data = tbodyData;
          expect(data.selected).toBeFalsy();
          expect(data.rectangleSelection).toBeFalsy();
          expect(data.active).toBeFalsy();
          expect(data.show).toBeFalsy();
          expect(data.search).toBeFalsy();
          expect(data.typing).toBeFalsy();
          expect(data.stateCopy).toBeFalsy();
        });
      });

      test('selectedMultipleCellActive to be falsy', () => {
        wrapper.vm.selectedMultipleCellActive = true;
        wrapper.vm.removeClass(['selected']);
        expect(wrapper.vm.selectedMultipleCellActive).toBeFalsy();
      });

      test('rectangleSelection to be falsy', () => {
        wrapper.vm.setFirstCell = true;
        wrapper.vm.removeClass(['rectangleSelection']);
        expect(wrapper.vm.setFirstCell).toBeFalsy();
      });
    });

    describe('updateSelectedCell', () => {
      const row = 0;
      const col = 0;
      const header = 'a';

      test('Check selectedCell', () => {
        wrapper.vm.updateSelectedCell(header, row, col);
        expect(wrapper.vm.selectedCell.header).toEqual(header);
        expect(wrapper.vm.selectedCell.row).toEqual(row);
        expect(wrapper.vm.selectedCell.col).toEqual(col);
      });

      test('setFirstCell = false', () => {
        wrapper.vm.setFirstCell = false;
        wrapper.vm.updateSelectedCell(header, row, col);
        expect(wrapper.vm.setFirstCell).toBeTruthy();
        expect(wrapper.vm.tbodyData[row][header].rectangleSelection).toBeTruthy()
      });
      
      test('setFirstCell = true', () => {
        wrapper.vm.setFirstCell = true;
        wrapper.vm.updateSelectedCell(header, row, col);
        expect(wrapper.vm.setFirstCell).toBeTruthy();
        expect(wrapper.vm.tbodyData[row][header].rectangleSelection).toBeTruthy();
      });
    });

    describe('enableSelect', () => {
      const rowIndex = 0;
      const colIndex = 5;
      const header = 'f';

      test('search true', () => {
        const col = {
          search: true,
        };

        wrapper.vm.enableSelect('', header, col, rowIndex, colIndex);
        expect(wrapper.vm.tbodyData[rowIndex][header].search).toBeFalsy();
        expect(wrapper.vm.tbodyData[rowIndex][header].show).toBeFalsy();
        expect(wrapper.vm.tbodyData[rowIndex][header].typing).toBeTruthy();
        expect(wrapper.vm.lastSelectOpen).toBeNull();
      });
    });

    describe('showDropdown', () => {
      test('search true', () => {
        const rowIndex = 0;
        const colIndex = 5;
        wrapper.vm.showDropdown(colIndex, rowIndex);
      });
    });
  });
});
