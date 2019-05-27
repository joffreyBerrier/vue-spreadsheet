import { mount } from '@vue/test-utils';
import VueTable from '@/components/VueTable.vue';

// data
import exempleData from '@/data';

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
      customOptions,
      disableCells,
      disableSortThead,
      headers,
      loading,
      parentScrollElement,
      selectPosition,
      styleWrapVueTable,
      submenuTbody,
      submenuThead,
      tbodyData,
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

      expect(vueTable.actualElement).toBeNull();
      expect(vueTable.changeDataIncrement).toEqual(0);
      expect(vueTable.copyMultipleCell).toBeNull();
      expect(vueTable.disableKeyTimeout).toBeNull();
      expect(vueTable.eventDrag).toBeFalsy();
      expect(vueTable.headerTop).toEqual(0);
      expect(vueTable.incrementCol).toEqual(0);
      expect(vueTable.incrementOption).toBeNull();
      expect(vueTable.incrementRow).toBeNull();
      expect(vueTable.keys).toEqual({});
      expect(vueTable.lastSelectOpen).toBeNull();
      expect(vueTable.lastSubmenuOpen).toBeNull();
      expect(vueTable.oldTdActive).toBeNull();
      expect(vueTable.oldTdShow).toBeNull();
      expect(vueTable.pressedShift).toEqual(0);
      expect(vueTable.rectangleSelectedCell).toBeNull();
      expect(vueTable.scrollDocument).toBeNull();
      expect(vueTable.scrollToSelectTimeout).toBeNull();
      expect(vueTable.selectedCell).toBeNull();
      expect(vueTable.selectedCoordCells).toBeNull();
      expect(vueTable.selectedCoordCopyCells).toBeNull();
      expect(vueTable.selectedMultipleCell).toBeFalsy();
      expect(vueTable.selectedMultipleCellActive).toBeFalsy();
      expect(vueTable.setFirstCell).toBeFalsy();
      expect(vueTable.storeCopyDatas).toEqual([]);
      expect(vueTable.storeRectangleSelection).toEqual([]);
      expect(vueTable.storeUndoData).toEqual([]);
      expect(vueTable.submenuStatusTbody).toBeFalsy();
      expect(vueTable.submenuStatusThead).toBeFalsy();
    });
  });
});
