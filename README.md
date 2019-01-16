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
  :disable-cells                       | Array      | That contains the headerKey you want to disable
  :disable-sort-thead                  | Array      | That contains the disabled th
  :headers                             | Array      | That contains headers
  :new-data                            | Object     | That contains the type of data when you have empty cell in a row
  :parent-element-scroll               | Number     | That contains the OffsetTop of the parent
  :parent-scroll-element               | String     | That contains the HTML attribute which overflow-y: scroll (by-default is 'html')
  :select-position                     | Object     | That contains a top and left position you want to add to the select
  :sort-header                         | Boolean    | That activates sort button on header
  :style-wrap-vue-table                | Object     | That contains style of the wrapper tableVue
  :submenu-tbody                       | Array      | That contains the submenu-tbody
  :submenu-thead                       | Array      | That contains the submenu-thead
  :tbody-data                          | Array      | That contains data
  :tbody-index                         | Boolean    | That displays the index of each row on the left of the table

Function                               | Type       | Description
---------------------------------------|------------|-------------------------
  v-on:handle-up-drag-size-header      | Function   | Fired when the header size changed
  v-on:tbody-input-change              | Function   | When the **input changes**
  v-on:tbody-move-dragtofill           | Function   | Fired when moved on dragToFill
  v-on:tbody-nav-backspace             | Function   | When you press backspace on cell (event, actualElement, actualCol, rowIndex, colIndex)
  v-on:tbody-nav-multiple-backspace    | Function   | Fired when the multiple cell are delete
  v-on:tbody-change-data              | Function   | When you copy/paste - dragToFill
  v-on:tbody-select-change             | Function   | When the **select change**
  v-on:tbody-submenu-click-{#}         | Function   | {#} - Name of the function declared on **submenu-tbody**
  v-on:tbody-up-dragtofill             | Function   | Fired when pressed up on dragToFill
  v-on:thead-submenu-click-{#}         | Function   | {#} - Name of the function declared on **submenu-thead**
  v-on:thead-td-sort                   | Function   | When you press the button


### Example
``` javascript
  <vue-table
    :disable-cells="Array"
    :disable-sort-thead="Array"
    :drag-to-fill="Boolean"
    :headers="Array"
    :loading="Object"
    :new-data="Number"
    :parent-element-scroll="String"
    :parent-scroll-element="'Object'"
    :sort-header="Boolean"
    :style-wrap-vue-table="Object"
    :submenu-tbody="Array"
    :submenu-thead="Array"
    :tbody-data="Array"
    :tbody-index="Boolean"
    v-on:tbody-change-data="Function"
    v-on:tbody-input-change="Function"
    v-on:tbody-select-change="Function"
    v-on:tbody-up-dragtofill="Function"
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
      :disable-cells="disableCells"
      :disable-sort-thead="disableSortThead"
      :headers="headers"
      :loading="loading"
      :new-data="newData"
      :parent-element-scroll="0"
      :parent-scroll-element="'html'"
      :sort-header="sortHeader"
      :style-wrap-vue-table="styleWrapVueTable"
      :submenu-tbody="submenuTbody"
      :submenu-thead="submenuThead"
      :tbody-data="products"
      :tbody-index="tbodyIndex"
      v-on:tbody-change-data="changeData"
      v-on:tbody-input-change="inputChange"
      v-on:tbody-select-change="selectChange"
      v-on:tbody-submenu-click-change-color="changeColorTbody"
      v-on:tbody-submenu-click-change-value="changeValueTbody"
      v-on:thead-submenu-click-change-color="changeColorThead"
      v-on:thead-submenu-click-change-value="changeValueThead"
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
      disableCells: ['a'],
      sortHeader: true,
      tbodyIndex: true,
      loader: false,
      loading: false,
      selectPosition: {
        top: 0,
        left: 0,
      },
      disableSortThead: ['a'],
      styleWrapVueTable: {
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
            type: 'select',
            handleSearch: true,
            selectOptions: [
              {
                value: 'pet dolphin',
                label: 'pet dolphin',
              },
              {
                value: 'pet fish',
                label: 'pet fish',
              },
              {
                value: 'pet bib',
                label: 'pet bib',
              },
              {
                value: 'pet bob',
                label: 'pet bob',
              },
              {
                value: 'pet poty',
                label: 'pet poty',
              },
            ],
            value: '',
            active: false,
          },
        },
      ],
      submenuThead: [
        {
          type: 'button',
          value: 'change color',
          function: 'change-color',
          disabled: ['a'],
        },
        {
          type: 'select',
          disabled: ['a'],
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
        {
          type: 'button',
          value: 'change value',
          function: 'change-value',
          disabled: ['a', 'b'],
        },
      ],
      submenuTbody: [
        {
          type: 'button',
          value: 'change color',
          function: 'change-color',
          disabled: ['img'],
        },
        {
          type: 'button',
          value: 'change value',
          function: 'change-value',
          disabled: ['img', 'name'],
        },
      ],
    };
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
    },
    inputChange(event, entry, rowIndex, colIndex) {
    },
    selectChange(event, entry, col, option, rowIndex, colIndex) {
      this.changeValueSelect(rowIndex, colIndex);
    },
    sortProduct(event, entry, colIndex) {
    },
    // callback
    changeColorTbody(event, entry, rowIndex, colIndex, type) {
      if (type === 'input') {
        this.products[rowIndex][entry].style.color = '#e40000';
      }
    },
    changeValueTbody(event, entry, rowIndex, colIndex, type) {
      if (type === 'input') {
        this.products[rowIndex][entry].value = 'T-shirt';
      }
    },
    changeColorThead(event, entry, colIndex) {
      this.headers[colIndex].style.color = '#e40000';
    },
    changeValueThead(event, entry, colIndex) {
      this.headers[colIndex].headerName = 'T-shirt';
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
