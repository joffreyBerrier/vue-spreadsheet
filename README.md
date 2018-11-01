# vuejs-dynamic-table

## Description

** Project in progress **

An easier Spreadsheet in Vue.js

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

## Wiki

props               | Type  |Description
--------------------|-------|-------------------
  .. headers        | Array | That contains headers
  .. data           | Array | That contains data
  .. submenu-tbody  | Array | That contains your submenu-tbody
  .. submenu-thead  | Array | That contains your submenu-thead
  


## Exemple of headers

props               |  Type  | Description
--------------------|--------|-------------------
  .. headerName     | String | The name of your header written like you want
  .. headerkey      | String | The Slugify version of your headerName
  .. style          | Object | The style of your td

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

## Exemple of data

props                 |  Type  | Description
----------------------|--------|-------------------
  .. key              | String | The key of your object written in Slugify
  .. type             | String | The type of render data (``<input>``, ``<img>``, ``<select>``)
  .. value(img/input) | String | The value of your object in *String Type*
  .. value(select)    | Array  | The value of your object in *Array Type*
  .. selectedOptions  | String | The value by default - Only for type ``<select>``

```
products: [
  {
    img: {
      type: 'img',
      value: 'https://via.placeholder.com/350x150',
    },
    name: {
      type: 'input',
      value: 'text',
    },
    surname: {
      type: 'input',
      value: 'text',
    },
    age: {
      type: 'select',
      value: ['1', '2', '3'],
      selectedOptions: '1',
    },
    born: {
      type: 'select',
      value: ['1', '2', '3'],
      selectedOptions: '1',
    },
  },
],
```

## Exemple of submenu

props                 |  Type  | Description
----------------------|--------|-------------------
  .. type             | String | The type of render data (``<button>``) - Only type ``<button>`` for now
  .. value            | String | The value of your object in *String Type*
  .. function         | String | The name of your function called when you click on the button - *Written in Slugify*
  .. disabled         | Array  | The Name(s) of each objects you don't want to appear on submenu

```
  submenuTbody: [
    {
      type: 'button',
      value: 'Change Color',
      function: 'change-color',
      disabled: ['img'],
    },
    {
      type: 'button',
      value: 'Change Value',
      function: 'change-value',
      disabled: ['img', 'name'],
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
      type: 'button',
      value: 'Change Value',
      function: 'change-value',
      disabled: ['img', 'name'],
    },
  ],
```
