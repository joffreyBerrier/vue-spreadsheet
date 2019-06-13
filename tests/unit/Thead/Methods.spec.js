import { mount } from '@vue/test-utils';
import Thead from '@/components/Thead/Thead.vue';

// data
import exempleData from '@/data';

let wrapper;

beforeEach(() => {
  const { headers } = exempleData;
  const { tbodyIndex } = exempleData;
  const { submenuThead } = exempleData;
  const { disableSortThead } = exempleData;
  const { sortHeader } = exempleData;
  const submenuStatusThead = true;
  const vueTableHeight = 400;
  const headerTop = 0;

  wrapper = mount(Thead, {
    propsData: {
      submenuStatusThead,
      submenuThead,
      headers,
      disableSortThead,
      sortHeader,
      tbodyIndex,
      vueTableHeight,
      headerTop,
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

  describe('Methods', () => {
    describe('removeClass', () => {
      test('return ""', () => {
        const tHead = wrapper.vm;
        tHead.headers[0].activeSort = 'Z';
        tHead.headers[1].activeSort = 'Z';
        tHead.removeClass(1);
        expect(tHead.headers[0].activeSort).toEqual('');
      });

      test('return Z', () => {
        const tHead = wrapper.vm;
        tHead.headers[0].activeSort = 'Z';
        tHead.headers[1].activeSort = 'Z';
        tHead.removeClass(1);
        expect(tHead.headers[1].activeSort).toEqual('Z');
      });

      test('return A', () => {
        const tHead = wrapper.vm;
        tHead.headers[0].activeSort = 'A';
        tHead.headers[1].activeSort = 'A';
        tHead.removeClass(1);
        expect(tHead.headers[1].activeSort).toEqual('A');
      });
    });

    describe('handleDownChangeSize', () => {
      test('event drag be true', () => {
        const tHead = wrapper.vm;
        const head = tHead.headers[1];
        const fakeEvent = {
          currentTarget: {
            parentElement: {
              offsetLeft: 10,
            },
          },
        };
        tHead.handleDownChangeSize(fakeEvent, head, 1);
        expect(tHead.eventDrag).toBeTruthy();
      });

      test('beforeChangeSize exist', () => {
        const tHead = wrapper.vm;
        const head = tHead.headers[1];
        const fakeEvent = {
          currentTarget: {
            parentElement: {
              offsetLeft: 10,
            },
          },
        };
        tHead.handleDownChangeSize(fakeEvent, head, 1);

        expect(tHead.beforeChangeSize.col).toEqual(1);
        expect(tHead.beforeChangeSize.header).toEqual(head);
        expect(tHead.beforeChangeSize.elementLeft).toEqual(10);
        expect(tHead.beforeChangeSize.width).toEqual(parseInt(head.style.width, 10));
      });

      test('current element has style', () => {
        const tHead = wrapper.vm;
        const head = tHead.headers[1];
        const fakeEvent = {
          currentTarget: {
            parentElement: {
              offsetLeft: 10,
            },
          },
        };
        tHead.handleDownChangeSize(fakeEvent, head, 1);

        expect(head.active).toBeTruthy();
        expect(tHead.$refs[`resize-${tHead.beforeChangeSize.col}`][0].style.opacity).toEqual('1');
        expect(tHead.$refs[`resize-${tHead.beforeChangeSize.col}`][0].style.top).toContain('px');
      });
    });

    describe('handleMoveChangeSize', () => {
      test('event drag is true', () => {
        const tHead = wrapper.vm;
        const head = tHead.headers[1];
        const fakeEvent = {
          currentTarget: {
            parentElement: {
              offsetLeft: 10,
            },
            offsetHeight: 0,
            offsetParent: {
              offsetTop: 0,
            },
          },
        };

        tHead.handleDownChangeSize(fakeEvent, head, 1);
        tHead.handleMoveChangeSize(fakeEvent);
        expect(tHead.eventDrag).toBeFalsy();
      });

      test('event drag is false', () => {
        const tHead = wrapper.vm;
        const fakeEvent = {
          currentTarget: {
            offsetHeight: 0,
            offsetParent: {
              offsetTop: 0,
            },
          },
        };

        expect(tHead.handleMoveChangeSize(fakeEvent)).toBeFalsy();
        expect(tHead.eventDrag).toBeFalsy();
      });
    });

    describe('handleUpDragToFill', () => {
      test('event drag are false', () => {
        const tHead = wrapper.vm;
        const fakeEvent = {
          currentTarget: {
            parentElement: {
              offsetLeft: 10,
            },
          },
        };

        expect(tHead.handleUpDragToFill(fakeEvent)).toBeFalsy();
        expect(tHead.eventDrag).toBeFalsy();
        expect(wrapper.emitted('handle-up-drag-size-header')).toBeFalsy();
      });
    });

    describe('handleSort', () => {
      test('send "" return A', () => {
        const tHead = wrapper.vm;
        const head = tHead.headers[3];

        tHead.headers[1].activeSort = 'Z';
        tHead.handleSort('', head, 3);

        expect(tHead.headers[3].activeSort).toEqual('A');
        expect(tHead.headers[1].activeSort).toEqual('');
        expect(wrapper.emitted('thead-td-sort')).toBeTruthy();
      });

      test('send Z return A', () => {
        const tHead = wrapper.vm;
        const head = tHead.headers[3];

        head.activeSort = 'Z';
        tHead.headers[1].activeSort = 'Z';
        tHead.handleSort('', head, 3);

        expect(tHead.headers[3].activeSort).toEqual('A');
        expect(tHead.headers[1].activeSort).toEqual('');
        expect(wrapper.emitted('thead-td-sort')).toBeTruthy();
      });

      test('send A return Z', () => {
        const tHead = wrapper.vm;
        const head = tHead.headers[1];

        head.activeSort = 'A';
        tHead.handleSort('', head, 1);

        expect(tHead.headers[1].activeSort).toEqual('Z');
        expect(wrapper.emitted('thead-td-sort')).toBeTruthy();
      });
    });

    describe('handleContextMenuTd', () => {
      test('expect submenuEnableCol', () => {
        const tHead = wrapper.vm;

        tHead.handleContextMenuTd('', 'e', 3);

        expect(tHead.submenuEnableCol).toEqual(3);
        expect(wrapper.emitted('thead-td-context-menu')).toBeTruthy();
      });

      test('submenuStatusThead = true', () => {
        const tHead = wrapper.vm;

        tHead.submenuStatusThead = true;
        tHead.handleContextMenuTd('', 'e', 3);

        expect(tHead.submenuEnableCol).toEqual(3);
        expect(tHead.submenuStatusThead).toBeTruthy();
        expect(wrapper.emitted('thead-td-context-menu')).toBeTruthy();
        expect(wrapper.emitted('submenu-enable')).toEqual([['tbody']]);
      });

      test('submenuStatusThead = false', () => {
        const { headers } = exempleData;
        const { tbodyIndex } = exempleData;
        const { submenuThead } = exempleData;
        const { disableSortThead } = exempleData;
        const { sortHeader } = exempleData;
        const submenuStatusThead = false;
        const vueTableHeight = 400;
        const headerTop = 0;

        wrapper = mount(Thead, {
          propsData: {
            submenuStatusThead,
            submenuThead,
            headers,
            disableSortThead,
            sortHeader,
            tbodyIndex,
            vueTableHeight,
            headerTop,
          },
        });

        const tHead = wrapper.vm;
        tHead.handleContextMenuTd('', 'e', 3);

        expect(tHead.submenuEnableCol).toEqual(3);
        expect(tHead.submenuStatusThead).toBeFalsy();
        expect(wrapper.emitted('thead-td-context-menu')).toBeTruthy();
        expect(wrapper.emitted('submenu-enable')).toEqual([['thead']]);
      });
    });

    describe('handleClickSubmenu', () => {
      test('Without selectOptions', () => {
        const tHead = wrapper.vm;

        tHead.handleClickSubmenu('', 'e', 3, 'change-color', undefined);

        expect(wrapper.emitted('thead-submenu-click-callback')).toBeTruthy();
        expect(wrapper.emitted('thead-submenu-click-callback')).toEqual([['', 'e', 3, 'change-color']]);
      });

      test('With selectOptions', () => {
        const tHead = wrapper.vm;

        tHead.handleClickSubmenu('', 'e', 3, 'change-color', ['e']);

        expect(wrapper.emitted('thead-submenu-click-callback')).toBeTruthy();
        expect(wrapper.emitted('thead-submenu-click-callback')).toEqual([['', 'e', 3, 'change-color', ['e']]]);
      });
    });
  });
});
