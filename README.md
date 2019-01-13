# VueJs Spreadsheet

## Description

:facepunch: An easier Spreadsheet in Vue.js :facepunch:

Do not hesitate to :star: my repo


## Project setup

```
yarn add vuejs-spreadsheet

npm i vuejs-spreadsheet
```

```
<script>
  import VueTable from 'vuejs-spreadsheet';
  export default {
    name: 'app',
    data() {
    },
    components: {
      VueTable,
    },
  };
</script>
```

## Wiki :mortar_board:

Props                                  | Type       | Description
---------------------------------------|------------|-------------------------
  :custom-options                      | Object     | That contains Options
  :headers                             | Array      | That contains headers
  :style-wrap-vue-table                | Object     | That contains style of the wrapper tableVue
  :tbody-data                          | Array      | That contains data


Options                                | Type       | Description
---------------------------------------|------------|-------------------------
  :disable-cells                       | Array      | That contains the headerKey you want to disable
  :disable-sort-thead                  | Array      | That contains the disabled th
  :drag-to-fill                        | Boolean    | That activates drag to fill
  :new-data                            | Object     | That contains the type of data when you have empty cell in a row
  :parent-element-scroll               | Number     | That contains the OffsetTop of the parent
  :parent-scroll-element               | String     | That contains the HTML attribute which overflow-y: scroll (by-default is 'html')
  :select-position                     | Object     | That contains a top and left position you want to add to the select
  :sort-header                         | Boolean    | That activates sort button on header
  :submenu-tbody                       | Array      | That contains the submenu-tbody
  :submenu-thead                       | Array      | That contains the submenu-thead
  :tbody-index                         | Boolean    | That displays the index of each row on the left of the table


Function                               | Type       | Description
---------------------------------------|------------|-------------------------
  v-on:handle-up-drag-size-header      | Function   | Fired when the header size changed
  v-on:tbody-input-change              | Function   | When the **input changes**
  v-on:tbody-move-dragtofill           | Function   | Fired when moved on dragToFill
  v-on:tbody-nav-backspace             | Function   | When you press backspace on cell (event, actualElement, actualCol, rowIndex, colIndex)
  v-on:tbody-nav-multiple-backspace    | Function   | Fired when the multiple cell are delete
  v-on:tbody-replace-data              | Function   | When you copy/paste - dragToFill
  v-on:tbody-select-change             | Function   | When the **select change**
  v-on:tbody-submenu-click-{#}         | Function   | {#} - Name of the function declared on **submenu-tbody**
  v-on:tbody-up-dragtofill             | Function   | Fired when pressed up on dragToFill
  v-on:thead-submenu-click-{#}         | Function   | {#} - Name of the function declared on **submenu-thead**
  v-on:thead-td-sort                   | Function   | When you press the button


### Example
``` javascript
  <vue-table
    :custom-options="Object"
    :headers="Array"
    :style-wrap-vue-table="Object"
    :tbody-data="Array"
    v-on:handle-up-drag-size-header="Function"
    v-on:tbody-input-change="Function"
    v-on:tbody-move-dragtofill="Function"
    v-on:tbody-nav-backspace="Function"
    v-on:tbody-nav-multiple-backspace="Function"
    v-on:tbody-replace-data="Function"
    v-on:tbody-select-change="Function"
    v-on:tbody-submenu-click-customize-function="Function"
    v-on:tbody-up-dragtofill="Function"
    v-on:thead-submenu-click-customize-function="Function"
    v-on:thead-td-sort="Function">

    // if your want to add an specific header
    <div slot="header">
      Specific Header
    </div>

    // if your want to add a loader
    <div slot="loader" v-if="loader">
      Loader
    </div>

  </vue-table>
```

### Options :honeybee:
```
  customOptions: {
    disableCells: ['name of headerKey you want to disable'],
    disableSortThead: ['name of headerKey you want to disable'],
    dragToFill: true,
    loading: false,
    newData: {
      type: 'input',
      value: '',
      active: false,
      style: {
        color: '#000',
      },
    },
    parentElementScroll: 0,
    parentScrollElement: 'html',
    sortHeader: true,
    selectPosition: {
      top: 0,
      left: 0,
    },
    submenuThead: [
      {
        type: 'button',
        value: 'value',
        function: 'name-of-function',
        disabled: ['name of headerKey you want to disable'],
      },
      {
        type: 'select',
        disabled: ['name of headerKey you want to disable'],
        subtitle: 'Subtitle:',
        selectOptions: [],
        value: 'value',
        buttonOption: {
          value: 'value',
          function: 'name-of-function',
          style: {
            display: 'block',
          },
        },
      },
    ],
    submenuTbody: [
      {
        type: 'button',
        value: 'value',
        function: 'v',
        disabled: ['name of headerKey you want to disable'],
      },
    ],
    tbodyIndex: true,
  },
```

### Headers :tiger:

  Name              |  Type   | Description
--------------------|---------|-------------------
  headerName        | String  | The chosen header name
  headerkey         | String  | The Slugify version of the headerName
  style             | Object  | The style of the td
    - width         | String  | Indicate the width of ``<th>``
    - minWidth      | String  | minWidth must be equal to width
  disabled          | Boolean | optional - Disabled cell

#### Example

``` javascript
headers: [
  {
    headerName: 'Image',
    headerKey: 'img',
    style: {
      width: '100px'
      minWidth: '100px'
    },
  },
  {
    headerName: 'Nom',
    headerKey: 'name',
    style: {
      width: '100px'
      minWidth: '100px'
    },
  },
  {
    headerName: 'Prénom',
    headerKey: 'surname',
    style: {
      width: '100px'
      minWidth: '100px'
    },
  },
  {
    headerName: 'Age',
    headerKey: 'age',
    style: {
      width: '100px'
      minWidth: '100px'
    },
  },
  {
    headerName: 'Born',
    headerKey: 'born',
    style: {
      width: '100px'
      minWidth: '100px'
    },
  },
],
```

### Data :honeybee:

  Name                |  Type   | Description
----------------------|---------|-------------------
  key                 | String  | The key of the object written in Slugify
  type                | String  | The type of data rendered (``<textarea>``, ``<img>``, ``<select>``)
  value(img/input)    | String  | The value of the object in *String Type*
  value(select)       | Array   | The value of the object in *Array Type*
  selectOptions       | Array   | That contains objects {value: ~, label: ~}
  style               | Object  | The Style of the cell
  active              | Boolean | Of the cell, false by default
  handleSearch        | Boolean | -	Activates search when selected
  disabled            | Boolean | optional - Disabled cell

#### Example

``` javascript
products: [
  {
    img: {
      type: 'img',
      value: 'https://via.placeholder.com/350x150',
      active: false,
      disabled: true,
    },
    name: {
      type: 'input',
      value: 'John',
      active: false,
      style: {
        color: '#000',
      },
    },
    surname: {
      type: 'input',
      value: 'Doe',
      active: false,
      style: {
        color: '#000',
      },
    },
    age: {
      type: 'select',
      handleSearch: true,
      selectOptions: [
        {
          value: 'paris',
          label: 'Paris',
        },
        {
          value: 'new-york',
          label: 'New York',
        },
      ],
      value: 'paris',
      active: false,
    },
    born: {
      type: 'select',
      handleSearch: true,
      selectOptions: [
        {
          value: 'france',
          label: 'France',
        },
        {
          value: 'usa',
          label: 'United States of America',
        },
      ],
      value: 'france',
      active: false,
    },
  },
],
```

### New Data :tiger:

#### Example

Same Object describe on the top

If you choose an input

```
newData: {
  type: 'input',
  value: '',
  active: false,
  style: {
    color: '#000',
    background: '#cfffcf',
  },
},
```

### submenu :monkey_face:

  Name             |  Type  | Description
-------------------|--------|---------------------------------------------------------------------------------------
  type             | String | The type of data rendered (``<button>`` || ``<select>``)
  value            | String | The value of the function
  function         | String | The name of the function called when you click on the button - *Written in Slugify*
  disabled         | Array  | Each object which you want to hide on the submenu
  subtitle         | String | Of the select
  selectOptions    | Array  | That contains objects {value: ~, label: ~}
  buttonOption     | Object | Description
  . value          | String | The value of the button
  . function       | String | The name of the function called when you click on the button - *Written in Slugify*
  . style          | Object | The style of the button

#### Example

``` javascript
  submenuTbody: [
    {
      type: 'button',
      value: 'Change Color',
      function: 'change-color',
      disabled: ['img'],
    },
  ],
  submenuThead: [ 
    {
      type: 'button',
      value: 'Change Color',
      function: 'change-color',
      disabled: ['img', 'name'],
    },
    {
      type: 'select',
      disabled: ['img'],
      subtitle: 'Select state:',
      selectOptions: [
        {
          value: 'new-york',
          label: 'new-york',
        },
        {
          value: 'france',
          label: 'france',
        },
      ],
      value: 'new-york',
      buttonOption: {
        value: 'change city',
        function: 'change-city',
        style: {
          display: 'block',
        },
      },
    },
  ],
```

## Example :mortar_board: :tiger:

``` javascript

<template>
  <div id="app">
    <vue-table
      :headers="headers"
      :tbody-data="products"
      :submenu-tbody="submenuTbody"
      :submenu-thead="submenuThead"
      :disable-cells="disableCells"
      :disable-sort-thead="disableSortThead"
      :drag-to-fill="dragToFill"
      :fuse-options="fuseOptions"
      :loading="loading"
      :new-data="newData"
      :parent-scroll-element="parentScrollElement"
      :sort-header="sortHeader"
      :style-wrap-vue-table="styleWrapVueTable"
      :tbody-index="tbodyIndex"
      :trad="trad"
      v-on:tbody-change-data="changeData"
      v-on:tbody-submenu-click-change-color="changeColorTbody"
      v-on:tbody-submenu-click-change-value="changeValueTbody"
      v-on:thead-submenu-click-change-color="changeColor"
      v-on:thead-submenu-click-change-value="changeValue"
      v-on:thead-td-sort="sortProduct">
    <div slot="header">
      Specific Header
    </div>
    <div slot="loader" v-if="loader">
      Loader
    </div>
    </vue-table>
  </div>
</template>

<script>
import VueTable from './components/VueTable.vue';

export default {
  name: 'app',
  data() {
    return {
      dragToFill: true,
      disableCells: ['a'],
      sortHeader: true,
      tbodyIndex: true,
      loader: false,
      loading: false,
      parentScrollElement: {
        attribute: 'html',
        positionTop: 0,
      },
      trad: {
        lang: 'fr',
        en: {
          select: {
            placeholder: 'Search by typing',
          },
        },
        fr: {
          select: {
            placeholder: 'Taper pour chercher',
          },
        },
      },
      fuseOptions: {
        shouldSort: true,
        threshold: 0.2,
        location: 0,
        distance: 30,
        maxPatternLength: 64,
        minMatchCharLength: 1,
        findAllMatches: false,
        tokenize: false,
        keys: [
          'value',
        ],
      },
      selectPosition: {
        top: 0,
        left: 0,
      },
      disableSortThead: ['a'],
      styleWrapVueTable: {
        height: '400px',
        width: '700px',
        overflow: 'scroll',
      },
      newData: {
        type: 'input',
        value: '',
        active: false,
        style: {
          color: '#000',
        },
      },
      headers: [
        {
          headerName: 'A',
          headerKey: 'a',
          style: {
            width: '200px',
            minWidth: '200px',
            color: '#000',
          },
        },
        {
          headerName: 'B',
          headerKey: 'b',
          style: {
            width: '200px',
            minWidth: '200px',
            color: '#000',
          },
        },
        {
          headerName: 'C',
          headerKey: 'c',
          style: {
            width: '200px',
            minWidth: '200px',
            color: '#000',
          },
        },
        {
          headerName: 'D',
          headerKey: 'd',
          style: {
            width: '200px',
            minWidth: '200px',
            color: '#000',
          },
        },
        {
          headerName: 'E',
          headerKey: 'e',
          style: {
            width: '200px',
            minWidth: '200px',
            color: '#000',
          },
        },
        {
          headerName: 'F',
          headerKey: 'f',
          style: {
            width: '200px',
            minWidth: '200px',
            color: '#000',
          },
        },
        {
          headerName: 'G',
          headerKey: 'g',
          style: {
            width: '200px',
            minWidth: '200px',
            color: '#000',
          },
        },
      ],
      products: [
        {
          a: {
            type: 'img',
            value: 'https://via.placeholder.com/350x150',
            active: false,
          },
          c: {
            type: 'input',
            value: 'Paris',
            active: false,
            style: {
              color: '#000',
            },
          },
          d: {
            type: 'input',
            value: 'France',
            active: false,
            style: {
              color: '#000',
            },
          },
          e: {
            type: 'input',
            value: 'Boe',
            active: false,
            style: {
              color: '#000',
            },
          },
          f: {
            type: 'select',
            handleSearch: true,
            selectOptions: [
              {
                value: 'Harry Potter',
                label: 'harry potter',
              },
              {
                value: 'Hermione Granger',
                label: 'hermione granger',
              },
              {
                value: 'Ron Whisley',
                label: 'ron whisley',
              },
              {
                value: 'Dobby',
                label: 'dobby',
              },
              {
                value: 'Hagrid',
                label: 'hagrid',
              },
              {
                value: 'Professeur Rogue',
                label: 'professeur rogue',
              },
              {
                value: 'Professeur Mcgonagal',
                label: 'professeur mcgonagal',
              },
              {
                value: 'Professeur Dumbledor',
                label: 'professeur dumbledor',
              },
            ],
            value: 'professeur dumbledor',
            active: false,
          },
          g: {
            type: 'select',
            handleSearch: true,
            selectOptions: [
              {
                value: 1980,
                label: 1980,
              },
              {
                value: 1981,
                label: 1981,
              },
              {
                value: 1982,
                label: 1982,
              },
              {
                value: 1983,
                label: 1983,
                active: true,
              },
              {
                value: 1984,
                label: 1984,
              },
            ],
            value: 1983,
            active: false,
          },
        },
      },
    }
  },
  components: {
    VueTable,
  },
  mounted() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 300);
  },
  methods: {
    changeData(row, header) {
      console.log(row, header);
    },
    sortProduct(event, entry, colIndex) {
      // console.log('sort product');
    },
    // callback
    changeColor(event, entry, colIndex) {
      // console.log('changeColor', event, entry, colIndex);
      this.headers[colIndex].style.color = '#e40000';
    },
    changeValue(event, entry, colIndex) {
      // console.log('changeValue', event, entry, colIndex);
      this.headers[colIndex].headerName = 'T-shirt';
    },
    changeColorTbody(event, entry, rowIndex, colIndex, type) {
      // console.log('changeColorTbody', event, entry, rowIndex, colIndex, type);
      if (type === 'input') {
        this.products[rowIndex][entry].style.color = '#e40000';
      }
    },
    changeValueTbody(event, entry, rowIndex, colIndex, type) {
      // console.log('changeValueTbody', event, entry, rowIndex, colIndex, type);
      if (type === 'input') {
        this.products[rowIndex][entry].value = 'T-shirt';
      }
    },
  },
};
</script>

<style lang="scss">
::-moz-selection {
  color: #2c3e50;
  background: transparent;
}
::selection {
  color: #2c3e50;
  background: transparent;
}
</style>


````
//parentScrollElement object