import { mount } from '@vue/test-utils';
import Tbody from '../../src/components/Tbody.vue';

// data
import exempleData from '../../src/data';

let wrapper;

beforeEach(() => {
  const { disableCells } = exempleData;
  const { dragToFill } = exempleData;
  const { headers } = exempleData;
  const { newData } = exempleData;
  const { submenuTbody } = exempleData;
  const submenuStatusTbody = true;
  const filteredList = exempleData.products[0].f.selectOptions;
  const tbodyData = exempleData.products;
  const { tbodyIndex } = exempleData;

  wrapper = mount(Tbody, {
    propsData: {
      disableCells,
      dragToFill,
      headers,
      newData,
      submenuTbody,
      submenuStatusTbody,
      filteredList,
      tbodyData,
      tbodyIndex,
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
      const tBody = wrapper.vm;

      expect(tBody.emptyCell).toEqual('');
      expect(tBody.eventDrag).toBeFalsy();
      expect(tBody.oldValue).toBeNull();
      expect(tBody.searchInput).toEqual('');
      expect(tBody.submenuEnableCol).toBeNull();
      expect(tBody.submenuEnableRow).toBeNull();
    });
  });

  describe('Computed', () => {
    test('headerKeys', () => {
      const tBody = wrapper.vm;
      const headerKeysTest = tBody.headers.map(x => x.headerKey);
      expect(tBody.headerKeys).toEqual(headerKeysTest);
    });
  });

  describe('Methods', () => {
    describe('DisabledEvent', () => {
      test('Disabled Col : false | with disableCells', () => {
        const fakeData = { disabled: false };
        expect(wrapper.vm.disabledEvent(fakeData, 'a')).toBeTruthy();
      });
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

    describe('textareaStyle', () => {
      test('value.length > 100', () => {
        const tBody = wrapper.vm;
        const col = exempleData.products[0].c;
        expect(tBody.textareaStyle(col.value)).toEqual({ height: '150px', width: '400px' });
      });

      test('value.length < 100', () => {
        const tBody = wrapper.vm;
        const col = exempleData.products[0].f;
        expect(tBody.textareaStyle(col.value)).toEqual({ height: '100%', width: '100%' });
      });
    });

    describe('handleDownDragToFill', () => {
      test('return eventDrag to true', () => {
        const tBody = wrapper.vm;
        const col = exempleData.products[0].f;

        expect(tBody.eventDrag).toBeFalsy();
        tBody.handleDownDragToFill('', 'f', col, 0, 7);
        expect(tBody.eventDrag).toBeTruthy();
      });

      test('emitted tbody-down-dragtofill', () => {
        const tBody = wrapper.vm;
        const col = exempleData.products[0].f;

        tBody.handleDownDragToFill('', 'f', col, 0, 7);
        expect(wrapper.emitted('tbody-down-dragtofill')).toBeTruthy();
      });

      test('not emitted tbody-down-dragtofill', () => {
        const tBody = wrapper.vm;
        const col = exempleData.products[0].a;

        tBody.handleDownDragToFill('', 'a', col, 0, 7);
        expect(wrapper.emitted('tbody-down-dragtofill')).toBeFalsy();
      });
    });

    describe('handleMoveDragToFill', () => {
      test('not emitted tbody-move-dragtofill', () => {
        const tBody = wrapper.vm;
        const col = exempleData.products[0].f;

        tBody.handleMoveDragToFill('', 'f', col, 0, 7);
        expect(wrapper.emitted('tbody-move-dragtofill')).toBeFalsy();
      });

      test('emitted tbody-move-dragtofill', () => {
        const tBody = wrapper.vm;
        const col = exempleData.products[0].f;

        tBody.eventDrag = true;
        tBody.handleMoveDragToFill('', 'f', col, 0, 7);
        expect(wrapper.emitted('tbody-move-dragtofill')).toBeTruthy();
      });
    });

    describe('handleUpDragToFill', () => {
      test('not emitted tbody-up-dragtofill', () => {
        const tBody = wrapper.vm;
        const col = exempleData.products[0].f;

        tBody.handleUpDragToFill('', 'f', col, 0, 7);
        expect(wrapper.emitted('tbody-up-dragtofill')).toBeFalsy();
      });

      test('emitted tbody-up-dragtofill', () => {
        const tBody = wrapper.vm;
        const col = exempleData.products[0].f;

        tBody.eventDrag = true;
        tBody.handleUpDragToFill('', 'f', col, 0, 7);
        expect(wrapper.emitted('tbody-up-dragtofill')).toBeTruthy();
        expect(Tbody.eventDrag).toBeFalsy();
      });
    });

    describe('handleClickTd', () => {
      test('emitted tbody-td-click', () => {
        const tBody = wrapper.vm;
        const col = exempleData.products[0].f;

        tBody.handleClickTd('', 'f', col, 0, 7);
        expect(tBody.searchInput).toEqual('');
        expect(wrapper.emitted('tbody-td-click')).toBeTruthy();
      });
    });

    describe('handleDoubleClickTd', () => {
      test('not emitted tbody-td-double-click', () => {
        const tBody = wrapper.vm;
        const col = exempleData.products[0].a;

        tBody.handleDoubleClickTd('', 'a', col, 0, 7, 'input');
        expect(wrapper.emitted('tbody-td-double-click')).toBeFalsy();
      });
    });

    describe('handleContextMenuTd', () => {
      test('submenuEnableCol / submenuEnableRow', () => {
        const tBody = wrapper.vm;
        tBody.handleContextMenuTd('', 'a', 0, 7, 'input');

        expect(tBody.submenuEnableCol).toEqual(7);
        expect(tBody.submenuEnableRow).toEqual(0);
      });

      test('emitted handle-to-calculate-position', () => {
        const tBody = wrapper.vm;
        tBody.handleContextMenuTd('', 'a', 0, 7, 'input');

        expect(wrapper.emitted('handle-to-calculate-position')).toBeTruthy();
      });

      test('emitted submenu-enable', () => {
        const tBody = wrapper.vm;
        tBody.handleContextMenuTd('', 'a', 0, 7, 'input');

        expect(wrapper.emitted('submenu-enable')).toBeTruthy();
      });

      test('emitted tbody-td-context-menu', () => {
        const tBody = wrapper.vm;
        tBody.handleContextMenuTd('', 'a', 0, 7, 'input');

        expect(wrapper.emitted('tbody-td-context-menu')).toBeTruthy();
      });
    });

    describe('inputHandleChange', () => {
      test('emitted tbody-input-change', () => {
        const tBody = wrapper.vm;
        tBody.inputHandleChange('', 'a', 0, 7, 'input');

        expect(wrapper.emitted('tbody-input-change')).toBeTruthy();
      });
    });

    describe('validSearch', () => {
      test('emitted tbody-select-change', () => {
        const tBody = wrapper.vm;
        tBody.validSearch('', 'a', 0, 7, 'input');

        expect(wrapper.emitted('tbody-select-change')).toBeTruthy();
      });
    });

    describe('selectHandleChange', () => {
      test('emitted tbody-select-change', () => {
        const tBody = wrapper.vm;
        tBody.selectHandleChange('', 'a', 0, 7, 'input');

        expect(wrapper.emitted('tbody-select-change')).toBeTruthy();
      });
    });

    describe('handleSearchInputSelect', () => {
      test('emitted tbody-handle-search-input-select', () => {
        const tBody = wrapper.vm;
        tBody.handleSearchInputSelect('', 'f', 0, 7, 'input');

        expect(wrapper.emitted('tbody-handle-search-input-select')).toBeTruthy();
      });

      test('not emitted tbody-handle-search-input-select', () => {
        const tBody = wrapper.vm;
        const col = exempleData.products[0].a;
        tBody.handleSearchInputSelect('', col, 'a', 0, 7, 'input');

        expect(wrapper.emitted('tbody-handle-search-input-select')).toBeFalsy();
      });
    });

    describe('handleClickSubmenu', () => {
      test('emitted tbody-submenu-click-callback', () => {
        const tBody = wrapper.vm;
        tBody.handleClickSubmenu('', 'a', 0, 7, 'input');

        expect(wrapper.emitted('tbody-submenu-click-callback')).toBeTruthy();
      });
    });
  });
});
