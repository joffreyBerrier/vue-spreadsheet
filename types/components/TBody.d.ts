import { Vue } from "vue-property-decorator";
/**
 * Props
 */
interface FilteredList {
  label: string
  value: string
}
interface Style {
  string: [string]
}
interface Headers {
  headerKey: string
  headerName: string
  style: Style
}
interface CommentData {
  borderColor: string
  value: string
}
interface SelectOption {
  label: string
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
interface TbodyData {
  number: Data
}
interface KeyValue {
  string: [string]
}
interface Translation {
  en: KeyValue
  fr: KeyValue
  lang: string
}
interface SubmenuTbody {
  disabled: string[]
  function: string
  type: string
  value: string
}

/**
 * Data
 */
 interface VuetableTooltip {
  number: string
}
interface VueTableComment {
  number: string
}

export default class TBody<T> extends Vue {
  // Props
  tbodyHighlight: number[];
  filteredList: FilteredList[];
  headers: Headers[];
  currentTable: number;
  tbodyData: TbodyData[];
  trad: Translation;
  disableCells: string[];
  tbodyIndex: boolean;
  tbodyCheckbox: boolean;
  submenuStatusTbody: boolean;
  submenuTbody: SubmenuTbody[];

  // Data
  emptyCell: string;
  eventDrag: boolean;
  submenuEnableCol: null | number;
  submenuEnableRow: null | number;
  vuetableTooltip: VuetableTooltip;
  vueTableComment: VueTableComment;
}
