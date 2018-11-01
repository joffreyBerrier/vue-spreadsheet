# vuejs-dynamic-table

## Description

This project is allready in progress

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

:data="products" :headers="headers" :submenu-tbody="submenuTbody" :submenu-thead="submenuThead"></vue-table>

props               | Description
--------------------|-------------------------
  .. headers        | Array which contains headers
  .. data           | Array which contains data
  .. submenu-tbody  | Array which contains you submenu-tbody
  .. submenu-thead  | Array which contains you submenu-thead
  


## Exemple of headers

props               |  Type  | Description
--------------------|--------|-------------------
  .. headerName     | String | the name of your header write like you want
  .. headerkey      | String | the slut name of your header
  .. style          | Object | 

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
  .. key              | String | the name of your header write like you want
  .. type             | String | the type of render data (input, img, select)
  .. value(img/input) | String | 
  .. value(select)    | Array  | 
  .. selectedOptions  | String | only for type select, the value by default

```
products: [
  {
    img: {
      type: 'img',
      value: 'https://via.placeholder.com/350x150',
    },
    name: {
      type: 'input',
      value: '~',
    },
    surname: {
      type: 'input',
      value: '~',
    },
    age: {
      type: 'select',
      value: [~, ~, ~],
      selectedOptions: ~,
    },
    born: {
      type: 'select',
      value: [~, ~, ~],
      selectedOptions: ~,
    },
  },
],
```

## Exemple of submenu

props                 |  Type  | Description
----------------------|--------|-------------------
  .. type             | String | button
  .. value            | String | value of the button
  .. function         | String | function wich call when you click on the button | write like this (say-hello-world)
  .. disabled         | Array  | name of these object contains on headers / datas

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
