# Spreadsheet Vue.js

## Description

** Project in progress **

:facepunch: An easier Spreadsheet in Vue.js :facepunch:

Do not hesitate to :star: my repo

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```
<!-- 
### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
``` -->

## Wiki :mortar_board:

props                             | Type       | Description
----------------------------------|------------|-------------------
  :data                           | Array      | That contains data
  :headers                        | Array      | That contains headers
  :drag-to-fill                   | Boolean    | That active dragToFill
  :submenu-tbody                  | Array      | That contains your submenu-tbody
  :submenu-thead                  | Array      | That contains your submenu-thead
  v-on:tbody-input-change         | Function   | Name of your function called when **input change**
  v-on:tbody-select-change        | Function   | Name of your function called when **select change**
  v-on-thead-submenu-click-{#}    | Function   | {#} - Name of your function declare on **submenu-thead**
  v-on:tbody-submenu-click-{#}    | Function   | {#} - Name of your function declare on **submenu-tbody**

### Exemple

```
  <vue-table
    :data="Array"
    :headers="Array"
    :drag-to-fill="Boolean"
    :submenu-tbody="Array"
    :submenu-thead="Array"
    v-on:thead-submenu-click-customize-function="Function"
    v-on:tbody-submenu-click-customize-function="Function"
    v-on:tbody-input-change="Function"
    v-on:tbody-select-change="Function">
  </vue-table>
```

### Headers :tiger:

  Name              |  Type   | Description
--------------------|---------|-------------------
  headerName        | String  | The name of your header written like you want
  headerkey         | String  | The Slugify version of your headerName
  style             | Object  | The style of your td

#### Exemple

```
headers: [
  {
    headerName: 'Image',
    headerKey: 'img',
    style: {
      color: '#ddd',
    },
  },
  {
    headerName: 'Nom',
    headerKey: 'name',
    style: {
      color: '#ddd',
    },
  },
  {
    headerName: 'Prénom',
    headerKey: 'surname',
    style: {
      color: '#ddd',
    },
  },
  {
    headerName: 'Age',
    headerKey: 'age',
    style: {
      color: '#ddd',
    },
  },
  {
    headerName: 'Born',
    headerKey: 'born',
    style: {
      color: '#ddd',
    },
  },
],
```

### Data :honeybee:

  Name                |  Type   | Description
----------------------|---------|-------------------
  key                 | String  | The key of your object written in Slugify
  type                | String  | The type of render data (``<textarea>``, ``<img>``, ``<select>``)
  value(img/input)    | String  | The value of your object in *String Type*
  value(select)       | Array   | The value of your object in *Array Type*
  selectedOptions     | String  | The value by default - Only for type ``<select>``
  active              | Boolean | The status of cell false by default
  style               | Object  | The Style of your cell

#### Exemple

```
products: [
  {
    img: {
      active: false,
      type: 'img',
      value: 'https://via.placeholder.com/350x150',
    },
    name: {
      active: false,
      type: 'input',
      value: 'John',
      style: {
        color: '#000',
      },
    },
    surname: {
      active: false,
      type: 'input',
      value: 'Doe',
      style: {
        color: '#000',
      },
    },
    age: {
      active: false,
      type: 'select',
      value: [1, 2, 3],
      selectedOptions: 2,
    },
    born: {
      active: false,
      type: 'select',
      value: [11, 12, 13],
      selectedOptions: 12,
    },
  },
],
```

### submenu :monkey_face:

  Name             |  Type  | Description
-------------------|--------|-------------------
  type             | String | The type of render data (``<button>``) - Only type ``<button>`` for now
  value            | String | The value of your object in *String Type*
  function         | String | The name of your function called when you click on the button - *Written in Slugify*
  disabled         | Array  | The Name(s) of each objects you don't want to appear on submenu

#### Exemple

```
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
  ],
```

## Exemple :mortar_board: :tiger:

````
  # Template

  <vue-table
    :data="data"
    :headers="headers"
    :drag-to-fill="dragToFill"
    :submenu-tbody="submenuTbody"
    :submenu-thead="submenuThead"
    v-on:tbody-input-change="InputChange"
    v-on:tbody-select-change="SelectChange">
    v-on:thead-submenu-click-change-color="changeColor"
    v-on:tbody-submenu-click-change-color="changeColorTbody"
  </vue-table>

  # Data

  data() {
    return {
      dragToFill: true,
      headers: [
        {
          headerName: 'Image',
          headerKey: 'img',
          style: {
            color: '#000',
          },
        },
      ],
      products: [
        {
          img: {
            active: false,
            type: 'img',
            value: 'https://via.placeholder.com/350x150',
          },
          name: {
            active: false,
            type: 'input',
            value: 'John',
            style: {
              color: '#000',
            },
          },
          surname: {
            active: false,
            type: 'input',
            value: 'Doe',
            style: {
              color: '#000',
            },
          },
          age: {
            active: false,
            type: 'select',
            value: [1, 2, 3],
            selectedOptions: 2,
          },
          born: {
            active: false,
            type: 'select',
            value: [11, 12, 13],
            selectedOptions: 12,
          },
        },
      ],
      submenuThead: [
        {
          type: 'button',
          value: 'change color',
          function: 'change-color',
          disabled: ['img', 'name'],
        },
      ],
      submenuTbody: [
        {
          type: 'button',
          value: 'change color',
          function: 'change-color',
          disabled: ['img'],
        },
      ],
    };
  },
  methods: {
    inputChange(event, entry, rowIndex, colIndex) {
      // Called when <input /> change
    },
    selectChange(event, entry, rowIndex, colIndex) {
      // Called when <select></select> change
    },
    changeColor(event, entry, rowIndex, colIndex, type, submenuFunction) {
      if (type === 'input') {
        this.headers[colIndex].style.color = '#e40000';
      }
    },
    changeColorTbody(event, entry, rowIndex, colIndex, type, submenuFunction) {
      if (type === 'input') {
        this.products[rowIndex][entry].value = 'T-shirt';
      }
    },
  },

````
