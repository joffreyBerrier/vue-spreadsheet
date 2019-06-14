declare namespace VueTable {
  // styleWrapVueTable
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
  }

  // Style
  interface Style {
    color: string
    minWidth: string
    top: string
    width: string

  }

  // Header
  interface Header {
    activeSort: string
    headerKey: string
    headerName: string
    style: Style
  }

  // NewData
  interface NewData {
    active: boolean
    style: Style
    type: string
    value: string
  }

  // FuseOption
  interface FuseOption {
    distance: number
    findAllMatches: boolean
    keys: {
      [key: number]: string,
    }
    location: number
    maxPatternLength: number
    minMatchCharLength: number
    shouldSort: boolean
    threshold: number
    tokenize: boolean
  }

  // CustomOptions
  interface CustomOptions {
    fuseOptions: FuseOption
    newData: NewData
    sortHeader:true
    tbodyIndex:true
    trad: {
      [key: string]: string
    }
  }

  // Highlight
  interface Highlight {
    tbodyHighlight: {
      [key: number]: boolean
    },
    theadHighlight: {
      [key: number]: boolean
    },
  }

  // Submenu
  interface Submenu {
    disabled: {
      [key: string]: string
    }
    function: string
    type: string
    value: string
  }

  // DisableSortThead
  interface DisableSortThead {
    [key: number]: string
  }

  // SelectPosition
  interface SelectPosition {
    left: number,
    top: number
  }

  // parentScrollElement
  interface ParentScrollElement {
    attribute: string
    positionTop: number
  }

  // disableCells
  interface DisableCells {
    [key: number]: string
  }

  // FilteredList
  interface FilteredList {
    label: string
    value: string
  }
}
