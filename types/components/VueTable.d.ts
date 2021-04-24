import { Vue } from "vue-property-decorator";
/**
 * Props
 */
interface FuseOption {
  distance: number
  findAllMatches: boolean
  location: number
  maxPatternLength: number
  minMatchCharLength: number
  shouldSort: boolean
  threshold: number
  tokenize: boolean
}
interface Style {
  string: [string]
}
interface NewData {
  style: Style
  type: string
  value: string
}
interface Headers {
  headerKey: string
  headerName: string
  style: Style
}
interface KeyValue {
  string: [string]
}
interface Translation {
  en: KeyValue
  fr: KeyValue
  lang: string
}
interface CustomOptions {
  fuseOptions: FuseOption
  newData: NewData
  sortHeader: boolean
  tbodyCheckbox: boolean
  tbodyIndex: boolean
  trad: Translation
}
interface ParentScrollElement {
  attribute: string
  positionTop: number
}
interface SelectPosition {
  left: number
  top: number
}
interface Comment {
  borderColor: string
  borderSize: string
  heightBox: string
  widthBox: string
}
interface StyleWrapVueTable {
  comment: Comment
  fontSize: string
  height: string
  overflow: string
  string: [string]
}
interface Submenu {
  disabled: string[]
  function: string
  type: string
  value: string
}
interface Data {
  comment?: CommentData
  disabled?: boolean
  duplicate?: Data
  handleSearch?: boolean
  numeric?: boolean
  selectOptions?: SelectOption[]
  style?: Style
  type: string
  value: string
}
interface Value {
  number: Data
}

/**
 * Data
 */
interface Highlight {
  tbody: string[]
  thead: string[]
}
interface Comment {
  borderColor: string
  value: string
}
interface SelectOption {
  label: string
  value: string
}
interface Col {
  comment: Comment
  duplicate: Col
  handleSearch: boolean
  search: boolean
  selectOptions: SelectOption[]
  show: boolean
  type: string
  value: string
}
interface LastSelectOpen {
  col: Col
  colIndex: number
  event: MouseEvent
  header: string
  rowIndex: number
}
interface SelectedCell {
  col: number
  header: string
  row: number
}

export default class VueTable<T> extends Vue {
  // Props
  customOptions: CustomOptions;
  disableCells: string[];
  disableSortThead: string[];
  headers: Headers;
  loading: boolean;
  parentScrollElement: ParentScrollElement;
  selectPosition: SelectPosition;
  styleWrapVueTable: StyleWrapVueTable;
  submenuTbody: Submenu[];
  submenuThead: Submenu[];
  value: Value[];

  // Data
  customTable: number;
  highlight: null | Highlight;
  incrementOption: null | number;
  lastSelectOpen: null | LastSelectOpen;
  scrollDocument: null | number;
  scrollToSelectTimeout: null | number;
  selectedCell: null | SelectedCell;
  selectedMultipleCell: boolean;
  selectedMultipleCellActive: boolean;
  setFirstCell: boolean;
  submenuStatusTbody: boolean;
  submenuStatusThead: boolean;
}
