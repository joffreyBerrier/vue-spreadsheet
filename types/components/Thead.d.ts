import { Vue } from "vue-property-decorator";
/**
 * Props
 */
interface Style {
  string: [string]
}
interface Headers {
  headerKey: string
  headerName: string
  style: Style
}
interface SubmenuThead {
  disabled: string[]
  function: string
  type: string
  value: string
}

/**
 * Data
 */
interface BeforeChangeSize {
  col: number
  offset: number
  size: number
}

export default class THead<T> extends Vue {
  // Props
  theadHighlight: number[];
  headerTop: number;
  headers: Headers[]
  currentTable: number;
  submenuThead: SubmenuThead[];
  disableSortThead: string[];
  sortHeader: boolean;
  tbodyIndex: boolean;
  tbodyCheckbox: boolean;
  submenuStatusThead: boolean;

  // Data
  checkedAll: boolean;
  beforeChangeSize: BeforeChangeSize;
  eventDrag: boolean;
  newSize: string;
  submenuEnableCol: null | number;
  vueTableHeight: number
}
