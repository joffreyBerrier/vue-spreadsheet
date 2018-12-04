export default {
  dragToFill: true,
  disableCells: [],
  sortHeader: true,
  tbodyIndex: true,
  styleWrapVueTable: {
    width: '900px',
    height: '400px',
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
        width: '120px',
        minWidth: '120px',
        color: '#000',
      },
    },
    {
      headerName: 'B',
      headerKey: 'b',
      style: {
        width: '120px',
        minWidth: '120px',
        color: '#000',
      },
    },
    {
      headerName: 'C',
      headerKey: 'c',
      style: {
        width: '120px',
        minWidth: '120px',
        color: '#000',
      },
    },
    {
      headerName: 'D',
      headerKey: 'd',
      style: {
        width: '120px',
        minWidth: '120px',
        color: '#000',
      },
    },
    {
      headerName: 'E',
      headerKey: 'e',
      style: {
        width: '120px',
        minWidth: '120px',
        color: '#000',
      },
    },
    {
      headerName: 'F',
      headerKey: 'f',
      style: {
        width: '120px',
        minWidth: '120px',
        color: '#000',
      },
    },
    {
      headerName: 'G',
      headerKey: 'g',
      style: {
        width: '120px',
        minWidth: '120px',
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
        disabled: false,
      },
      b: {
        type: 'input',
        value: 'Jane',
        active: false,
        style: {
          color: '#000',
        },
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
      a: {
        type: 'img',
        value: 'https://via.placeholder.com/350x150',
        active: false,
        disabled: false,
      },
      b: {
        type: 'input',
        value: 'Jane',
        active: false,
        style: {
          color: '#000',
        },
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
      disabled: ['a'],
    },
    {
      type: 'button',
      value: 'change value',
      function: 'change-value',
      disabled: ['a', 'b'],
    },
  ],
};
