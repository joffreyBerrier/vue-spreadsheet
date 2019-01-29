import { mount } from '@vue/test-utils';
import Tbody from '@/components/Tbody.vue';

// data
import exempleData from '@/data';

let wrapper;

beforeEach(() => {
  const tbodyData = exempleData.products;
  const { headers } = exempleData;
  const { tbodyIndex } = exempleData.customOptions;
  const { trad } = exempleData.customOptions;
  const { disableCells } = exempleData;
  const { submenuTbody } = exempleData;
  const filteredList = exempleData.products[0].f.selectOptions;
  const submenuStatusTbody = true;

  wrapper = mount(Tbody, {
    propsData: {
      disableCells,
      headers,
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

describe('VueTable', () => {
  describe('Render component with props', () => {
    test('Vue Instance', () => {
      expect(wrapper.isVueInstance()).toBeTruthy();
    });
  });

  describe('Computed', () => {
    test('headerKeys', () => {
      const tBody = wrapper.vm;
      const headerKeysTest = tBody.headers.map(x => x.headerKey);
      expect(tBody.headerKeys).toEqual(headerKeysTest);
    });
  });
});
