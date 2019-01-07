export default {
  dragToFill: true,
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
            value: 'pet',
            label: 'pet',
          },
          {
            value: 'pet country',
            label: 'pet country',
          },
          {
            value: 'pet cat',
            label: 'pet cat',
          },
          {
            value: 'pet doggy dog',
            label: 'pet doggy dog',
          },
          {
            value: 'pet horse',
            label: 'pet horse',
          },
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
            value: 'pet pet',
            label: 'pet pet',
          },
          {
            value: 'pet put',
            label: 'pet put',
          },
          {
            value: 'pet poty',
            label: 'pet poty',
          },
          {
            value: 'pet petete',
            label: 'pet petete',
          },
          {
            value: 'pet harry',
            label: 'pet harry',
          },
          {
            value: 'pet potter',
            label: 'pet potter',
          },
          {
            value: 'pet watson',
            label: 'pet watson',
          },
          {
            value: 'pet djobi',
            label: 'pet djobi',
          },
          {
            value: 'pet djoba',
            label: 'pet djoba',
          },
          {
            value: 'doby',
            label: 'doby',
          },
          {
            value: 'joffrey',
            label: 'joffrey',
          },
          {
            value: 'fake data',
            label: 'fake data',
          },
          {
            value: 'fake data 2',
            label: 'fake data 2',
          },
        ],
        value: '',
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
    {
      a: {
        type: 'img',
        value: 'https://via.placeholder.com/350x150',
        active: false,
      },
      b: {
        type: 'input',
        value: 'Jane',
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
            active: true,
          },
        ],
        value: 30,
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
    {
      a: {
        type: 'img',
        value: 'https://via.placeholder.com/350x150',
        active: false,
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
            active: true,
          },
        ],
        value: 30,
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
    {
      a: {
        type: 'img',
        value: 'https://via.placeholder.com/350x150',
        active: false,
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
            active: true,
          },
        ],
        value: 30,
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
    {
      a: {
        type: 'img',
        value: 'https://via.placeholder.com/350x150',
        active: false,
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
            active: true,
          },
        ],
        value: 30,
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
    {
      a: {
        type: 'img',
        value: 'https://via.placeholder.com/350x150',
        active: false,
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
            active: true,
          },
        ],
        value: 30,
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
    {
      a: {
        type: 'img',
        value: 'https://via.placeholder.com/350x150',
        active: false,
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
            active: true,
          },
        ],
        value: 30,
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
    {
      a: {
        type: 'img',
        value: 'https://via.placeholder.com/350x150',
        active: false,
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
            active: true,
          },
        ],
        value: 30,
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
    {
      a: {
        type: 'img',
        value: 'https://via.placeholder.com/350x150',
        active: false,
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
            active: true,
          },
        ],
        value: 30,
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
    {
      a: {
        type: 'img',
        value: 'https://via.placeholder.com/350x150',
        active: false,
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
            active: true,
          },
        ],
        value: 30,
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
    {
      a: {
        type: 'img',
        value: 'https://via.placeholder.com/350x150',
        active: false,
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
            active: true,
          },
        ],
        value: 30,
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
