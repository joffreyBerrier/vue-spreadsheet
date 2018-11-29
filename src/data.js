export default {
  dragToFill: true,
  disableCells: [],
  sortHeader: true,
  tbodyIndex: true,
  styleWrapVueTable: {
    width: '100%',
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
      headerName: 'Image',
      headerKey: 'img',
      style: {
        width: '120px',
        minWidth: '120px',
        color: '#000',
      },
    },
    {
      headerName: 'country',
      headerKey: 'country',
      style: {
        width: '120px',
        minWidth: '120px',
        color: '#000',
      },
    },
    {
      headerName: 'city',
      headerKey: 'city',
      style: {
        width: '120px',
        minWidth: '120px',
        color: '#000',
      },
    },
    {
      headerName: 'Nom',
      headerKey: 'name',
      style: {
        width: '120px',
        minWidth: '120px',
        color: '#000',
      },
    },
    {
      headerName: 'Prénom',
      headerKey: 'surname',
      style: {
        width: '120px',
        minWidth: '120px',
        color: '#000',
      },
    },
    {
      headerName: 'Age',
      headerKey: 'age',
      style: {
        width: '120px',
        minWidth: '120px',
        color: '#000',
      },
    },
    {
      headerName: 'Born',
      headerKey: 'born',
      style: {
        width: '120px',
        minWidth: '120px',
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
      },
      name: {
        type: 'input',
        value: 'Jane',
        active: false,
        style: {
          color: '#000',
        },
      },
      country: {
        type: 'input',
        value: 'Paris',
        active: false,
        style: {
          color: '#000',
        },
      },
      city: {
        type: 'input',
        value: 'France',
        active: false,
        style: {
          color: '#000',
        },
      },
      surname: {
        type: 'input',
        value: 'Boe',
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
            value: 26,
            label: 26,
          },
          {
            value: 27,
            label: 27,
          },
          {
            value: 28,
            label: 28,
          },
          {
            value: 29,
            label: 29,
          },
          {
            value: 30,
            label: 30,
          },
        ],
        value: 26,
        active: false,
      },
      born: {
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
          },
          {
            value: 1984,
            label: 1984,
          },
        ],
        value: 1990,
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
        value: 'Jane',
        active: false,
        style: {
          color: '#000',
        },
      },
      country: {
        type: 'input',
        value: 'Paris',
        active: false,
        style: {
          color: '#000',
        },
      },
      city: {
        type: 'input',
        value: 'France',
        active: false,
        style: {
          color: '#000',
        },
      },
      surname: {
        type: 'input',
        value: 'Boe',
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
            value: 26,
            label: 26,
          },
          {
            value: 27,
            label: 27,
          },
          {
            value: 28,
            label: 28,
          },
          {
            value: 29,
            label: 29,
          },
          {
            value: 30,
            label: 30,
          },
        ],
        value: 26,
        active: false,
      },
      born: {
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
          },
          {
            value: 1984,
            label: 1984,
          },
        ],
        value: 1990,
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
        value: 'Jane',
        active: false,
        style: {
          color: '#000',
        },
      },
      country: {
        type: 'input',
        value: 'Paris',
        active: false,
        style: {
          color: '#000',
        },
      },
      city: {
        type: 'input',
        value: 'France',
        active: false,
        style: {
          color: '#000',
        },
      },
      surname: {
        type: 'input',
        value: 'Boe',
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
            value: 26,
            label: 26,
          },
          {
            value: 27,
            label: 27,
          },
          {
            value: 28,
            label: 28,
          },
          {
            value: 29,
            label: 29,
          },
          {
            value: 30,
            label: 30,
          },
        ],
        value: 26,
        active: false,
      },
      born: {
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
          },
          {
            value: 1984,
            label: 1984,
          },
        ],
        value: 1990,
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
        value: 'Jane',
        active: false,
        style: {
          color: '#000',
        },
      },
      country: {
        type: 'input',
        value: 'Paris',
        active: false,
        style: {
          color: '#000',
        },
      },
      city: {
        type: 'input',
        value: 'France',
        active: false,
        style: {
          color: '#000',
        },
      },
      surname: {
        type: 'input',
        value: 'Boe',
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
            value: 26,
            label: 26,
          },
          {
            value: 27,
            label: 27,
          },
          {
            value: 28,
            label: 28,
          },
          {
            value: 29,
            label: 29,
          },
          {
            value: 30,
            label: 30,
          },
        ],
        value: 26,
        active: false,
      },
      born: {
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
          },
          {
            value: 1984,
            label: 1984,
          },
        ],
        value: 1990,
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
