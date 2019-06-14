import {
  Component,
  Vue,
  Watch,
  Prop,
} from 'vue-property-decorator';

import VueTableInterface from '@/components/VueTable/VueTableInterface';
import TbodyInterface from '@/components/Tbody/TbodyInterface';

@Component
export default class VueThead extends Vue {
  name!: 'VueThead'

  // Prop
  @Prop({ required: true }) headerTop!: number

  @Prop({ required: true }) headers!: VueTable.Header[]

  @Prop({ required: true }) theadHighlight!: any[]

  @Prop({ required: true }) submenuThead!: VueTable.Submenu[]

  @Prop({ required: true }) disableSortThead!: VueTable.DisableSortThead[]

  @Prop({ required: false }) sortHeader!: boolean

  @Prop({ required: false }) tbodyIndex!: boolean

  @Prop({ required: false }) submenuStatusThead!: boolean


  // Data
  beforeChangeSize: any = {}

  eventDrag: boolean = false

  newSize: string = ''

  submenuEnableCol: number | null = null

  vueTableHeight: number = 0


  // Mounted
  mounted() {
    window.addEventListener('mousemove', this.handleMoveChangeSize);
  }

  // Methods
  removeClass(colIndex: number) {
    this.headers.forEach((header, index) => {
      if (index !== colIndex) {
        this.$set(this.headers[index], 'activeSort', '');
      }
    });
  }

  handleDownChangeSize(event: any, col: any, colIndex: number) {
    this.eventDrag = true;

    if (this.$parent && this.$parent.$refs && this.$parent.$refs.vueTable) {
      this.vueTableHeight = this.$parent.$refs.vueTable.offsetHeight;
    }

    this.beforeChangeSize = {
      col: colIndex,
      elementLeft: event.currentTarget.parentElement.offsetLeft,
      header: col,
      width: parseInt(col.style.width, 10),
    };

    col.active = true;
    col.style.left = event.clientX;

    const element = this.$refs[`resize-${this.beforeChangeSize.col}`][0];
    element.style.opacity = 0;
    element.style.top = `${element.parentElement.offsetTop}px`;
    element.style.opacity = 1;

    this.$forceUpdate();
  }

  handleMoveChangeSize(event: MouseEvent) {
    if (this.eventDrag) {
      const elm = this.$refs[`resize-${this.beforeChangeSize.col}`][0];
      const offsetTopVueTable = elm.offsetTop;
      const offsetBottomVueTable = offsetTopVueTable + elm.offsetHeight;

      if (offsetTopVueTable <= event.clientY && offsetBottomVueTable >= event.clientY) {
        const element = this.$refs[`resize-${this.beforeChangeSize.col}`][0];
        element.style.left = `${event.clientX}px`;
        // set height of after dragElement
        const heightTbody = this.vueTableHeight;
        element.style.setProperty('--dragHeaderHeight', `${heightTbody}px`);
      } else {
        this.handleUpDragToFill(event);
      }
    }
  }

  handleUpDragToFill(event: MouseEvent) {
    if (this.eventDrag) {
      this.eventDrag = false;
      // get new size
      let offsetParentLeft = 0;
      if (this.$refs[`th-${this.beforeChangeSize.col}`][0] && this.$refs[`th-${this.beforeChangeSize.col}`][0].offsetParent) {
        offsetParentLeft = this.$refs[`th-${this.beforeChangeSize.col}`][0].offsetParent.offsetLeft;
      }
      const scrollLeftParent = this.$parent.$refs.vueTable ? this.$parent.$refs.vueTable.scrollLeft : 0;
      const newWidth = ((event.clientX - (this.beforeChangeSize.elementLeft + offsetParentLeft)) + scrollLeftParent) + 5;
      this.newSize = `${newWidth}px`;
      // set initial style on button resize
      const element = this.$refs[`resize-${this.beforeChangeSize.col}`][0];
      element.style.left = 'auto';
      element.style.top = '0';
      element.style.opacity = '';
      // set height of after dragElement
      element.style.setProperty('--dragHeaderHeight', '100%');
      // set new size on header
      this.$set(this.headers[this.beforeChangeSize.col].style, 'width', this.newSize);
      this.$set(this.headers[this.beforeChangeSize.col].style, 'minWidth', this.newSize);
      this.$set(this.headers[this.beforeChangeSize.col], 'active', false);

      this.$emit('handle-up-drag-size-header', event, this.headers);
    }
  }

  handleSort(event: MouseEvent, col: any, colIndex: number) {
    if (!col.activeSort || col.activeSort === 'Z') {
      this.$set(this.headers[colIndex], 'activeSort', 'A');
    } else {
      this.$set(this.headers[colIndex], 'activeSort', 'Z');
    }

    this.removeClass(colIndex);
    this.$emit('thead-td-sort', event, col, colIndex);
  }

  handleContextMenuTd(event: MouseEvent, header: string, colIndex: number) {
    this.submenuEnableCol = colIndex;
    if (this.submenuStatusThead === true) {
      this.$emit('submenu-enable', 'tbody');
    } else {
      this.$emit('submenu-enable', 'thead');
    }
    this.$emit('thead-td-context-menu', event, header, colIndex);
  }

  handleClickSubmenu(event: MouseEvent, header: string, colIndex: number, submenuFunction: void, selectOptions: any) {
    if (selectOptions) {
      this.$emit('thead-submenu-click-callback', event, header, colIndex, submenuFunction, selectOptions);
    } else {
      this.$emit('thead-submenu-click-callback', event, header, colIndex, submenuFunction);
    }
  }
}
