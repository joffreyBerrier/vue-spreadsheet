export default {
  dragToFill: true,
  headers: [
    {
      headerName: 'Image',
      headerKey: 'img',
      style: {
        color: '#000',
      },
    },
    {
      headerName: 'Nom',
      headerKey: 'name',
      style: {
        color: '#000',
      },
    },
    {
      headerName: 'Prénom',
      headerKey: 'surname',
      style: {
        color: '#000',
      },
    },
    {
      headerName: 'Age',
      headerKey: 'age',
      style: {
        color: '#000',
      },
    },
    {
      headerName: 'Born',
      headerKey: 'born',
      style: {
        color: '#000',
      },
    },
  ],
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
        value: '1',
        active: false,
        style: {
          color: '#000',
        },
      },
      age: {
        type: 'select',
        handleSearch: true,
        value: [26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38],
        selectedOptions: 28,
        active: false,
      },
      born: {
        type: 'select',
        handleSearch: true,
        value: [1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992],
        selectedOptions: 1990,
        active: false,
      },
    },
    {
      img: {
        type: 'img',
        value: 'https://via.placeholder.com/350x150',
        active: false,
      },
      name: {
        type: 'input',
        value: 'Em',
        active: false,
        style: {
          color: '#000',
        },
      },
      surname: {
        type: 'input',
        value: '2',
        active: false,
        style: {
          color: '#000',
        },
      },
      age: {
        type: 'select',
        value: [26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38],
        selectedOptions: 25,
        active: false,
      },
      born: {
        type: 'select',
        value: [1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992],
        selectedOptions: 1993,
        active: false,
      },
    },
    {
      img: {
        type: 'img',
        value: 'https://via.placeholder.com/350x150',
        active: false,
      },
      name: {
        type: 'input',
        value: 'Tom',
        active: false,
        style: {
          color: '#000',
        },
      },
      surname: {
        type: 'input',
        value: '3',
        active: false,
        style: {
          color: '#000',
        },
      },
      age: {
        type: 'select',
        value: [26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38],
        selectedOptions: 25,
        active: false,
      },
      born: {
        type: 'select',
        value: [1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992],
        selectedOptions: 1998,
        active: false,
      },
    },
    {
      img: {
        type: 'img',
        value: 'https://via.placeholder.com/350x150',
        active: false,
      },
      name: {
        type: 'input',
        value: 'Tim',
        active: false,
        style: {
          color: '#000',
        },
      },
      surname: {
        type: 'input',
        value: '4',
        active: false,
        style: {
          color: '#000',
        },
      },
      age: {
        type: 'select',
        value: [26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38],
        selectedOptions: 25,
        active: false,
      },
      born: {
        type: 'select',
        value: [1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992],
        selectedOptions: 1995,
        active: false,
      },
    },
  ],
  submenuThead: [
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
