export default {
  customOptions: {
    tbodyIndex: true,
    tbodyCheckbox: true,
    sortHeader: true,
    trad: {
      lang: 'fr',
      en: {
        select: {
          placeholder: 'Search by typing',
        },
      },
      fr: {
        select: {
          placeholder: 'Taper pour chercher',
        },
      },
    },
    newData: {
      type: 'input',
      value: '',
      active: false,
      style: {
        color: '#000',
      },
    },
    fuseOptions: {
      shouldSort: true,
      threshold: 0.2,
      location: 0,
      distance: 30,
      maxPatternLength: 64,
      minMatchCharLength: 1,
      findAllMatches: false,
      tokenize: false,
      keys: [
        'value',
      ],
    },
  },
  loading: false,
  disableCells: ['a'],
  parentScrollElement: {
    attribute: 'html',
    positionTop: 0,
  },
  selectPosition: {
    top: 0,
    left: 0,
  },
  disableSortThead: ['a'],
  styleWrapVueTable: {
    height: '400px',
    overflow: 'visible',
    fontSize: '12px',
    comment: {
      borderColor: '#696969',
      borderSize: '8px',
      widthBox: '120px',
      heightBox: '80px',
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
        value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec aliquam magna. Sed consequat amet..',
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
        comment: {
          value: 'comment',
          borderColor: '#eee',
        },
        selectOptions: [
          {
            value: 'Harry Potter',
            label: 'harry potter',
          },
          {
            value: 'Hermione Granger',
            label: 'hermione granger',
          },
          {
            value: 'Ron Whisley',
            label: 'ron whisley',
          },
          {
            value: 'Dobby',
            label: 'dobby',
          },
          {
            value: 'Hagrid',
            label: 'hagrid',
          },
          {
            value: 'Professeur Rogue',
            label: 'professeur rogue',
          },
          {
            value: 'Professeur Mcgonagal',
            label: 'professeur mcgonagal',
          },
          {
            value: 'Professeur Dumbledor',
            label: 'professeur dumbledor',
          },
        ],
        value: 'professeur dumbledor',
        active: false,
      },
      g: {
        type: 'select',
        handleSearch: true,
        comment: {
          value: 'comment',
          borderColor: '#eee',
        },
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
        comment: {
          value: 'comment',
          borderColor: '#eee',
        },
        selectOptions: [
          {
            value: 'Harry Potter',
            label: 'harry potter',
          },
          {
            value: 'Hermione Granger',
            label: 'hermione granger',
          },
          {
            value: 'Ron Whisley',
            label: 'ron whisley',
          },
          {
            value: 'Dobby',
            label: 'dobby',
          },
          {
            value: 'Hagrid',
            label: 'hagrid',
          },
          {
            value: 'Professeur Rogue',
            label: 'professeur rogue',
          },
          {
            value: 'Professeur Mcgonagal',
            label: 'professeur mcgonagal',
          },
          {
            value: 'Professeur Dumbledor',
            label: 'professeur dumbledor',
          },
        ],
        value: 'Harry Potter',
        active: false,
      },
      g: {
        type: 'select',
        handleSearch: true,
        comment: {
          value: 'comment',
          borderColor: '#eee',
        },
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
        comment: {
          value: 'comment',
          borderColor: '#000',
        },
        selectOptions: [
          {
            value: 'Harry Potter',
            label: 'harry potter',
          },
          {
            value: 'Hermione Granger',
            label: 'hermione granger',
          },
          {
            value: 'Ron Whisley',
            label: 'ron whisley',
          },
          {
            value: 'Dobby',
            label: 'dobby',
          },
          {
            value: 'Hagrid',
            label: 'hagrid',
          },
          {
            value: 'Professeur Rogue',
            label: 'professeur rogue',
          },
          {
            value: 'Professeur Mcgonagal',
            label: 'professeur mcgonagal',
          },
          {
            value: 'Professeur Dumbledor',
            label: 'professeur dumbledor',
          },
        ],
        value: 'Hermione Granger',
        active: false,
      },
      g: {
        type: 'select',
        handleSearch: true,
        comment: {
          value: 'comment',
          borderColor: '#000',
        },
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
        comment: {
          value: 'comment',
          borderColor: '#000',
        },
        selectOptions: [
          {
            value: 'Harry Potter',
            label: 'harry potter',
          },
          {
            value: 'Hermione Granger',
            label: 'hermione granger',
          },
          {
            value: 'Ron Whisley',
            label: 'ron whisley',
          },
          {
            value: 'Dobby',
            label: 'dobby',
          },
          {
            value: 'Hagrid',
            label: 'hagrid',
          },
          {
            value: 'Professeur Rogue',
            label: 'professeur rogue',
          },
          {
            value: 'Professeur Mcgonagal',
            label: 'professeur mcgonagal',
          },
          {
            value: 'Professeur Dumbledor',
            label: 'professeur dumbledor',
          },
        ],
        value: 'Professeur Rogue',
        active: false,
      },
      g: {
        type: 'select',
        handleSearch: true,
        comment: {
          value: 'comment',
          borderColor: '#000',
        },
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
        comment: {
          value: 'comment',
          borderColor: '#000',
        },
        selectOptions: [
          {
            value: 'Harry Potter',
            label: 'harry potter',
          },
          {
            value: 'Hermione Granger',
            label: 'hermione granger',
          },
          {
            value: 'Ron Whisley',
            label: 'ron whisley',
          },
          {
            value: 'Dobby',
            label: 'dobby',
          },
          {
            value: 'Hagrid',
            label: 'hagrid',
          },
          {
            value: 'Professeur Rogue',
            label: 'professeur rogue',
          },
          {
            value: 'Professeur Mcgonagal',
            label: 'professeur mcgonagal',
          },
          {
            value: 'Professeur Dumbledor',
            label: 'professeur dumbledor',
          },
        ],
        value: 'Dobby',
        active: false,
      },
      g: {
        type: 'select',
        handleSearch: true,
        comment: {
          value: 'comment',
          borderColor: '#000',
        },
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
        comment: {
          value: 'comment',
          borderColor: '#000',
        },
        selectOptions: [
          {
            value: 'Harry Potter',
            label: 'harry potter',
          },
          {
            value: 'Hermione Granger',
            label: 'hermione granger',
          },
          {
            value: 'Ron Whisley',
            label: 'ron whisley',
          },
          {
            value: 'Dobby',
            label: 'dobby',
          },
          {
            value: 'Hagrid',
            label: 'hagrid',
          },
          {
            value: 'Professeur Rogue',
            label: 'professeur rogue',
          },
          {
            value: 'Professeur Mcgonagal',
            label: 'professeur mcgonagal',
          },
          {
            value: 'Professeur Dumbledor',
            label: 'professeur dumbledor',
          },
        ],
        value: 'Professeur Dumbledor',
        active: false,
      },
      g: {
        type: 'select',
        handleSearch: true,
        comment: {
          value: 'comment',
          borderColor: '#000',
        },
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
        comment: {
          value: 'comment',
          borderColor: '#000',
        },
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
        comment: {
          value: 'comment',
          borderColor: '#000',
        },
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
        comment: {
          value: 'comment',
          borderColor: '#000',
        },
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
        comment: {
          value: 'comment',
          borderColor: '#000',
        },
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
        comment: {
          value: 'comment',
          borderColor: '#000',
        },
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
        comment: {
          value: 'comment',
          borderColor: '#000',
        },
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
        comment: {
          value: 'comment',
          borderColor: '#000',
        },
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
        comment: {
          value: 'comment',
          borderColor: '#000',
        },
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
        comment: {
          value: 'comment',
          borderColor: '#000',
        },
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
        comment: {
          value: 'comment',
          borderColor: '#000',
        },
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
