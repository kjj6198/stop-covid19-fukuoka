const detail = {
  age: {
    name: '年代',
    type: 'text',
    sortable: true,
    comparator: (a, b) => {
      const [ageA] = a.match(/(\d+)/);
      const [ageB] = b.match(/(\d+)/);

      return +ageB - +ageA;
    },
  },
  publishedAt: {
    name: '公表時間',
    type: 'text',
    sortable: true,
    comparator: (a, b) => new Date(b).getTime() - new Date(a).getTime(),
  },
  gender: {
    name: '性別',
    type: 'text',
    formatter: (d) => d[0],
  },
  hasDischarged: {
    name: '退院',
    sortable: true,
    comparator: (a, b) => (b === '1' ? 1 : -1),
    formatter: (text) =>
      text === '1'
        ? // TODO: extract
          `O`
        : '',
    type: 'text',
  },
  liveAt: {
    name: '地域',
    type: 'text',
  },
};

module.exports = { detail };
