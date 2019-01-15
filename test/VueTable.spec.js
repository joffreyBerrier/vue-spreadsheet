import { mount } from '@vue/test-utils';
import VueTable from '../src/components/VueTable.vue';

// data
import exempleData from '../src/data';

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
});
