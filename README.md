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
```

## Wiki

props            | Description
-----------------|-------------------------
  .. type        | Type of what you want => 'input' or 'select'
  .. data        | format array object


## Exemple of headers

```
headers: [
    {
      headerName: 'Image',
      headerKey: 'img',
    },
    {
      headerName: 'Name',
      headerKey: 'name',
    },
  ],
```


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