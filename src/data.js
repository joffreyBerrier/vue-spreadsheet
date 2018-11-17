export default {
  dragToFill: true,
  newData: {
    type: 'input',
    value: '',
    active: false,
    style: {
      color: '#000',
      background: '#cfffcf',
    },
  },
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
      age: {
        type: 'select',
        handleSearch: true,
        selectOptions: [
          {
            value: 'paris',
            label: 'paris',
          },
          {
            value: 'new york',
            label: 'new york',
          },
          {
            value: 'berlin',
            label: 'berlin',
          },
          {
            value: 'monaco',
            label: 'monaco',
          },
          {
            value: 'Clermont-Ferrand',
            label: 'Clermont-Ferrand',
          },
        ],
        value: '',
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
        disabled: false,
      },
      name: {
        type: 'input',
        value: 'Jane',
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
        handleSearch: false,
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
        handleSearch: false,
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
        disabled: false,
      },
      name: {
        type: 'input',
        value: 'Jim',
        active: false,
        style: {
          color: '#000',
        },
      },
      surname: {
        type: 'input',
        value: 'Die',
        active: false,
        style: {
          color: '#000',
        },
      },
      age: {
        type: 'select',
        handleSearch: false,
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
        value: 30,
        active: false,
      },
      born: {
        type: 'select',
        handleSearch: false,
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
        disabled: false,
      },
      name: {
        type: 'input',
        value: 'Jam',
        active: false,
        style: {
          color: '#000',
        },
      },
      surname: {
        type: 'input',
        value: 'Dam',
        active: false,
        style: {
          color: '#000',
        },
      },
      age: {
        type: 'select',
        handleSearch: false,
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
        value: 28,
        active: false,
      },
      born: {
        type: 'select',
        handleSearch: false,
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
